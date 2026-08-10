/* =============================================================
   DESIGN ZARIYA — deck runtime
   Anonymous Digital × Ambuja Neotia
   No frameworks, no build step. Open index.html and present.
   -------------------------------------------------------------
   Keys   ← →  ·  space / pageup / pagedown  ·  home / end
          N    toggle direction notes (presenter aid)
          F    fullscreen
   URL    ?print   sequential layout for PDF export
          #12      deep-link to a slide
   ============================================================= */
(function () {
  'use strict';

  var viewport   = document.getElementById('viewport');
  var stage      = document.getElementById('stage');
  var slides     = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  var counterCur = document.querySelector('.counter__cur');
  var counterTot = document.querySelector('.counter__tot');
  var progress   = document.getElementById('progressFill');
  var chapterLbl = document.getElementById('chapterLabel');
  var notesPanel = document.getElementById('notesPanel');
  var notesBody  = document.getElementById('notesBody');
  var prevBtn    = document.getElementById('prevBtn');
  var nextBtn    = document.getElementById('nextBtn');
  var hint       = document.getElementById('hint');

  var TOTAL   = slides.length;
  var current = 0;
  var notesOn = false;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  /* ---------------------------------------------------------
     1. Print / PDF export mode
     --------------------------------------------------------- */
  var isPrint = /(?:^|[?&])print(?:=|&|$)/.test(window.location.search);
  if (isPrint) {
    document.body.classList.add('is-print');
    slides.forEach(function (s) { s.classList.add('is-active'); });
  }

  /* ---------------------------------------------------------
     2. Stage fit — 16:9, letterboxed, never stretched or cropped
     --------------------------------------------------------- */
  var STAGE_W = 1600, STAGE_H = 900;
  function fitStage() {
    if (document.body.classList.contains('is-print')) return;
    var scale = Math.min(window.innerWidth / STAGE_W, window.innerHeight / STAGE_H);
    stage.style.transform = 'scale(' + scale + ')';
  }
  window.addEventListener('resize', fitStage, { passive: true });
  window.addEventListener('orientationchange', fitStage);
  fitStage();

  /* ---------------------------------------------------------
     3. Chapters (for the small chrome label)
     --------------------------------------------------------- */
  var chapters = [];
  var currentChapter = 'The Foundation';
  slides.forEach(function (s) {
    var c = s.getAttribute('data-chapter');
    if (c) currentChapter = c;
    chapters.push(currentChapter);
  });

  /* ---------------------------------------------------------
     4. Higgsfield placeholders
        Labelled pastel blocks, so the deck reads as designed
        before a single real frame exists. Once a real image is
        dropped in (src != placeholder.svg) the block steps aside.
     --------------------------------------------------------- */
  var slots = Array.prototype.slice.call(document.querySelectorAll('.hs-image'));
  slots.forEach(function (slot) {
    var img = slot.querySelector('img');
    var real = img && img.getAttribute('src') && img.getAttribute('src').indexOf('placeholder.svg') === -1;
    if (real) { slot.classList.add('has-photo'); return; }

    var label = document.createElement('span');
    label.className = 'hs-label';
    label.innerHTML =
      '<b>Higgsfield image — slide ' + (slot.getAttribute('data-slide') || '—') + '</b>' +
      (slot.getAttribute('data-slot') || '') +
      ' &nbsp;·&nbsp; ' + (slot.getAttribute('data-aspect') || '16:9');
    slot.appendChild(label);

    /* the placeholder svg is decorative only while unfilled */
    if (img) { img.style.opacity = '0'; img.setAttribute('aria-hidden', 'true'); }
  });

  /* ---------------------------------------------------------
     5. Text choreography — per-chapter stagger, with a decay so
        list-heavy slides never crawl
     --------------------------------------------------------- */
  function primeStagger(slide) {
    var step = parseFloat(getComputedStyle(slide).getPropertyValue('--stagger')) || 110;
    var items = slide.querySelectorAll('[data-anim]');
    var acc = 0;
    for (var i = 0; i < items.length; i++) {
      items[i].style.setProperty('--d', Math.round(acc) + 'ms');
      acc += step * (i < 5 ? 1 : i < 11 ? 0.52 : 0.3);
    }
  }
  slides.forEach(primeStagger);

  /* ---------------------------------------------------------
     6. Asset preloading — next slide's imagery, warmed early
     --------------------------------------------------------- */
  function preload(index) {
    [index, index + 1].forEach(function (i) {
      var s = slides[i];
      if (!s) return;
      s.querySelectorAll('img').forEach(function (img) {
        img.loading = 'eager';
        if (!img.complete && img.src) { var p = new Image(); p.src = img.src; }
      });
    });
  }

  /* ---------------------------------------------------------
     7. Navigation
     --------------------------------------------------------- */
  var busy = false;
  var busyTimer = null;

  function render(index) {
    var s = slides[index];
    document.body.classList.toggle('on-dark',
      s.classList.contains('s-window') || s.classList.contains('s-visual'));
    counterCur.textContent = pad(index + 1);
    counterTot.textContent = pad(TOTAL);
    progress.style.width = ((index + 1) / TOTAL * 100) + '%';
    chapterLbl.textContent = chapters[index];
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === TOTAL - 1;
    notesBody.textContent = (slides[index].querySelector('.notes') || {}).textContent || '';
    document.title = 'Design Zariya — ' + pad(index + 1) + '/' + pad(TOTAL);
    if (history.replaceState) history.replaceState(null, '', '#' + (index + 1));
  }

  function go(index, direction) {
    if (document.body.classList.contains('is-print')) return;
    index = Math.max(0, Math.min(TOTAL - 1, index));
    if (index === current || busy) return;

    var dir = direction || (index > current ? 1 : -1);
    viewport.classList.toggle('dir-prev', dir < 0);

    var outgoing = slides[current];
    var incoming = slides[index];

    /* clear any half-finished exits so rapid nav can't stack */
    slides.forEach(function (s) { if (s !== outgoing) s.classList.remove('is-leaving'); });

    outgoing.classList.remove('is-active');
    outgoing.classList.add('is-leaving');

    primeStagger(incoming);
    incoming.classList.add('is-active');
    resetParallax(incoming);

    current = index;
    render(index);
    preload(index);

    var dur = reduced ? 240 : (parseFloat(getComputedStyle(incoming).getPropertyValue('--dur-slide')) || 600);
    busy = true;
    clearTimeout(busyTimer);
    busyTimer = setTimeout(function () {
      outgoing.classList.remove('is-leaving');
      busy = false;
    }, Math.min(dur, 900));

    hideHint();
  }

  var next = function () { go(current + 1, 1); };
  var prev = function () { go(current - 1, -1); };

  nextBtn.addEventListener('click', next);
  prevBtn.addEventListener('click', prev);

  /* click zones: right third advances, left third goes back, the middle
     is dead so a stray click never jumps the deck mid-sentence */
  viewport.addEventListener('click', function (e) {
    if (e.target.closest('.chrome__nav') || e.target.closest('.notes-panel')) return;
    var x = e.clientX / window.innerWidth;
    if (x > 0.62) next();
    else if (x < 0.38) prev();
  });

  document.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ':
        e.preventDefault(); next(); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
        e.preventDefault(); prev(); break;
      case 'Home': e.preventDefault(); go(0, -1); break;
      case 'End':  e.preventDefault(); go(TOTAL - 1, 1); break;
      case 'n': case 'N': toggleNotes(); break;
      case 'f': case 'F': toggleFullscreen(); break;
      case 'Escape': if (notesOn) toggleNotes(); break;
    }
  });

  /* swipe */
  var tx = 0, ty = 0, tt = 0;
  viewport.addEventListener('touchstart', function (e) {
    var t = e.changedTouches[0];
    tx = t.clientX; ty = t.clientY; tt = Date.now();
  }, { passive: true });
  viewport.addEventListener('touchend', function (e) {
    var t = e.changedTouches[0];
    var dx = t.clientX - tx, dy = t.clientY - ty;
    if (Date.now() - tt > 800) return;
    if (Math.abs(dx) < 44 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
    if (dx < 0) next(); else prev();
  }, { passive: true });

  /* ---------------------------------------------------------
     8. Presenter notes  (N) — never part of the client view
     --------------------------------------------------------- */
  function toggleNotes() {
    notesOn = !notesOn;
    notesPanel.hidden = !notesOn;
    if (notesOn) notesBody.textContent = (slides[current].querySelector('.notes') || {}).textContent || '';
  }

  /* ---------------------------------------------------------
     9. Fullscreen (F)
     --------------------------------------------------------- */
  function toggleFullscreen() {
    var el = document.documentElement;
    if (!document.fullscreenElement) {
      (el.requestFullscreen || el.webkitRequestFullscreen || function () {}).call(el);
    } else {
      (document.exitFullscreen || document.webkitExitFullscreen || function () {}).call(document);
    }
  }

  /* ---------------------------------------------------------
     10. Nesties parallax — gentle, pointer-driven, chapter-only
     --------------------------------------------------------- */
  function resetParallax(slide) {
    slide.querySelectorAll('.parallax').forEach(function (el) {
      el.style.setProperty('--px', '0px');
      el.style.setProperty('--py', '0px');
    });
  }
  if (!reduced) {
    viewport.addEventListener('pointermove', function (e) {
      var slide = slides[current];
      if (!slide || slide.getAttribute('data-motion') !== 'nesties') return;
      var nx = (e.clientX / window.innerWidth - 0.5);
      var ny = (e.clientY / window.innerHeight - 0.5);
      slide.querySelectorAll('.parallax').forEach(function (el) {
        el.style.setProperty('--px', (-nx * 18).toFixed(2) + 'px');
        el.style.setProperty('--py', (-ny * 14).toFixed(2) + 'px');
      });
    }, { passive: true });
  }

  /* ---------------------------------------------------------
     11. Hint chrome — shows once, then gets out of the way
     --------------------------------------------------------- */
  var hintTimer = setTimeout(hideHint, 6000);
  function hideHint() {
    clearTimeout(hintTimer);
    hint.classList.add('is-hidden');
  }

  /* ---------------------------------------------------------
     12. Boot
     --------------------------------------------------------- */
  if (!isPrint) {
    var start = parseInt((window.location.hash || '').replace('#', ''), 10);
    current = (start >= 1 && start <= TOTAL) ? start - 1 : 0;
    slides[current].classList.add('is-active');
    render(current);
    preload(current);
  } else {
    render(0);
  }
})();
