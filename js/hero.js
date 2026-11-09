/* Hero banner slideshow: autoplay, arrows, dots, swipe; pauses on hover/focus and when the tab is hidden. */
window.TVS = window.TVS || {};

TVS.hero = (function () {
  var INTERVAL_MS = 5000;
  var root = document.getElementById("hero");
  if (!root) return { stop: function () {} };

  var track = root.querySelector(".hero__track");
  var slides = Array.prototype.slice.call(root.querySelectorAll(".hero__slide"));
  var dotsWrap = root.querySelector(".hero__dots");
  var prev = root.querySelector(".hero__arrow--prev");
  var next = root.querySelector(".hero__arrow--next");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var index = 0, timer = null, paused = false, stopped = false;

  var dots = slides.map(function (slide, i) {
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", (i + 1) + " of " + slides.length);
    var dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", "Show banner " + (i + 1));
    dot.addEventListener("click", function () { go(i); restart(); });
    dotsWrap.appendChild(dot);
    return dot;
  });

  function go(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = "translateX(" + (-100 * index) + "%)";
    slides.forEach(function (s, n) {
      var active = n === index;
      s.setAttribute("aria-hidden", active ? "false" : "true");
      var link = s.querySelector("a");
      if (link) link.tabIndex = active ? 0 : -1;
      dots[n].setAttribute("aria-current", active ? "true" : "false");
    });
  }

  function tick() { if (!paused) go(index + 1); }
  function restart() {
    clearInterval(timer);
    if (!stopped && !reduceMotion) timer = setInterval(tick, INTERVAL_MS);
  }

  prev.hidden = false;
  next.hidden = false;
  prev.addEventListener("click", function () { go(index - 1); restart(); });
  next.addEventListener("click", function () { go(index + 1); restart(); });

  root.addEventListener("mouseenter", function () { paused = true; });
  root.addEventListener("mouseleave", function () { paused = false; });
  root.addEventListener("focusin", function () { paused = true; });
  root.addEventListener("focusout", function () { paused = false; });
  document.addEventListener("visibilitychange", function () { paused = document.hidden; });

  var startX = null;
  root.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
  root.addEventListener("touchend", function (e) {
    if (startX === null) return;
    var dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) { go(index + (dx < 0 ? 1 : -1)); restart(); }
    startX = null;
  });

  go(0);
  restart();

  return {
    stop: function () { stopped = true; clearInterval(timer); },
    start: function () { stopped = false; restart(); }
  };
})();
