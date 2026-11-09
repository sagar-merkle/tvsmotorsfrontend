/* Personalised view: nudge -> phone dialog -> lookup -> swap images/text on the page.
   Layout never changes; only content is replaced. */
window.TVS = window.TVS || {};

TVS.personalise = (function () {
  var STORAGE_KEY = "tvs.personalisedPhone";
  var NUDGE_DELAY_MS = 1500;
  var STEPS = ["Explore", "Test ride", "Quote", "Booking", "Delivery"];

  var $ = function (id) { return document.getElementById(id); };
  var nudge = $("p-nudge");
  var modal = $("p-modal");
  var form = $("p-form");
  var phoneInput = $("p-phone");
  var errorEl = $("p-error");
  var submitBtn = $("p-submit");
  var demoSelect = $("p-demo-select");

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }
  function day(iso) {
    return new Date(iso).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
  }
  function time(iso) {
    return new Date(iso).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
  }
  function rupees(n) { return "₹" + Number(n).toLocaleString("en-IN"); }

  /* Stage -> UI copy. `step` is the current position on the journey tracker. */
  var STAGES = {
    EXPLORING: {
      step: 0, label: "Exploring",
      primary: "Book a Test Ride", secondary: "Download Brochure", card: "Test Ride",
      message: function (p, v) { return "You were checking out the " + v.name + ". Take it for a test ride at " + p.dealer.name + "."; },
      teaser: function (p, v) { return "Hi " + p.customer.firstName + "! Want to test ride the " + v.name + "?"; },
      chips: ["Book a test ride", "Compare variants", "EMI options", "Find a dealer"]
    },
    TEST_RIDE_SCHEDULED: {
      step: 1, label: "Test ride scheduled",
      primary: "Reschedule Test Ride", secondary: "Get Directions", card: "Reschedule",
      message: function (p, v) {
        var at = p.journey.testRide.scheduledAt;
        return "Your test ride of the " + v.name + " is on " + day(at) + " at " + time(at) + ", " + p.dealer.name + ".";
      },
      teaser: function (p) { return "Hi " + p.customer.firstName + "! Your test ride is on " + day(p.journey.testRide.scheduledAt) + ". Need directions?"; },
      chips: ["Reschedule my test ride", "Get directions", "What should I bring?", "Talk to an expert"]
    },
    TEST_RIDE_COMPLETED: {
      step: 2, label: "Test ride completed",
      primary: "Book Now", secondary: "Get On-road Quote", card: "Book Now",
      message: function (p, v) { return "Hope you enjoyed riding the " + v.name + "! Get your on-road quote and book it today."; },
      teaser: function (p, v) { return "Hi " + p.customer.firstName + "! Ready to book your " + v.name + "?"; },
      chips: ["Get on-road price", "Book now", "EMI options", "Exchange my old vehicle"]
    },
    QUOTE_SHARED: {
      step: 3, label: "Quote shared",
      primary: "Book Now", secondary: "Call Dealer", card: "Book Now",
      message: function (p, v) {
        var q = p.journey.quote;
        return p.dealer.name + " shared your on-road quote of " + rupees(q.onRoadPrice) + " for the " + v.name + ", valid till " + day(q.validTill) + ".";
      },
      teaser: function (p) { return "Hi " + p.customer.firstName + "! Your quote is valid till " + day(p.journey.quote.validTill) + ". Any questions?"; },
      chips: ["Book now", "EMI options", "Talk to my dealer", "Available colours"]
    },
    BOOKED: {
      step: 4, label: "Booked",
      primary: "Track Booking", secondary: "Explore Accessories", card: "Track Booking",
      message: function (p, v) {
        var b = p.journey.booking;
        return "Booking " + b.bookingId + " for your " + v.name + " is confirmed. Expected delivery: " + day(b.expectedDelivery) + ".";
      },
      teaser: function (p, v) { return "Hi " + p.customer.firstName + "! Track your " + v.name + " delivery here."; },
      chips: ["Track my booking", "Accessories", "Insurance", "Delivery checklist"]
    },
    OWNER: {
      step: 5, label: "Owner",
      primary: "Book a Service", secondary: "Explore Upgrades", card: "Book Service",
      message: function (p, v) {
        var o = p.journey.ownership;
        return "Your " + v.name + " (" + o.registrationNo + ") is due for service on " + day(o.nextServiceDue) + ".";
      },
      teaser: function (p) { return "Hi " + p.customer.firstName + "! Your service is due on " + day(p.journey.ownership.nextServiceDue) + ". Book now?"; },
      chips: ["Book a service", "Roadside assistance", "Genuine parts", "Upgrade offers"]
    }
  };

  /* ---------- Nudge ---------- */
  function showNudge() {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    setTimeout(function () { nudge.hidden = false; }, NUDGE_DELAY_MS);
  }
  $("p-nudge-open").addEventListener("click", openModal);
  $("p-nudge-close").addEventListener("click", function () { nudge.hidden = true; });

  /* ---------- Dialog ---------- */
  var demoLoaded = false;
  function openModal() {
    nudge.hidden = true;
    errorEl.textContent = "";
    modal.showModal();
    phoneInput.focus();
    if (!demoLoaded) {
      demoLoaded = true;
      TVS.api.listDemoCustomers().then(function (list) {
        list.forEach(function (c) {
          var v = TVS.catalogue[c.vehicleId];
          var stage = STAGES[c.stage];
          var opt = el("option", null, c.phone + " · " + c.firstName + " · " + (v ? v.name : c.vehicleId) + " · " + (stage ? stage.label : c.stage));
          opt.value = c.phone;
          demoSelect.appendChild(opt);
        });
      }).catch(function () { demoSelect.closest(".p-demo").hidden = true; });
    }
  }
  $("p-modal-close").addEventListener("click", function () { modal.close(); });
  modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });

  phoneInput.addEventListener("input", function () {
    phoneInput.value = phoneInput.value.replace(/\D/g, "").slice(0, 10);
    errorEl.textContent = "";
  });
  demoSelect.addEventListener("change", function () {
    if (!demoSelect.value) return;
    phoneInput.value = demoSelect.value;
    form.requestSubmit();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var phone = phoneInput.value.replace(/\D/g, "");
    if (!/^[6-9]\d{9}$/.test(phone)) {
      errorEl.textContent = "Please enter a valid 10-digit mobile number.";
      phoneInput.focus();
      return;
    }
    setLoading(true);
    TVS.api.getPersonalisation(phone).then(function (profile) {
      if (!profile) {
        errorEl.textContent = "We couldn't find a personalised view for this number. Try one of the demo customers below.";
        return;
      }
      sessionStorage.setItem(STORAGE_KEY, phone);
      apply(profile);
      modal.close();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }).catch(function () {
      errorEl.textContent = "Something went wrong. Please try again.";
    }).then(function () { setLoading(false); });
  });

  function setLoading(on) {
    submitBtn.disabled = on;
    submitBtn.classList.toggle("is-loading", on);
    submitBtn.textContent = on ? "Personalising your view…" : "Personalise my view";
  }

  /* ---------- Apply ---------- */
  function apply(profile) {
    var vehicleId = profile.interest.vehicleId;
    var v = TVS.catalogue[vehicleId];
    if (!v) return;
    var stage = STAGES[profile.journey.stage] || STAGES.EXPLORING;

    renderHero(profile, v);
    renderJourney(profile, v, stage);
    personaliseRide(profile, v, vehicleId, stage);
    personaliseDealer(profile.dealer);
    $("account-label").textContent = "Hi, " + profile.customer.firstName;
    nudge.hidden = true;

    TVS.chat.setContext({
      firstName: profile.customer.firstName,
      vehicleName: v.name,
      journeyText: stage.message(profile, v),
      chips: stage.chips,
      teaser: stage.teaser(profile, v)
    });
  }

  function picture(mobileSrc, desktopSrc, alt) {
    var pic = document.createElement("picture");
    var img = document.createElement("img");
    if (desktopSrc) {
      var source = document.createElement("source");
      source.media = "(max-width: 767px)";
      source.srcset = mobileSrc;
      pic.appendChild(source);
      img.src = desktopSrc;
    } else {
      img.src = mobileSrc;
    }
    img.alt = alt;
    pic.appendChild(img);
    return pic;
  }

  function renderHero(profile, v) {
    TVS.hero.stop();
    var hero = $("hero");
    var slot = $("hero-personal");
    slot.textContent = "";

    if (v.banner.desktop) {
      var link = el("a", "hero-personal__banner");
      link.href = "#vehicles";
      link.appendChild(picture(v.banner.mobile, v.banner.desktop, v.name + " - " + v.tagline));
      slot.appendChild(link);
    } else {
      // Designed fallback for vehicles without an official desktop banner.
      var designed = el("div", "hero-designed");
      var inner = el("div", "container hero-designed__inner");
      var text = el("div", "hero-designed__text");
      text.appendChild(el("p", "hero-designed__eyebrow", v.name));
      text.appendChild(el("h2", "hero-designed__title", v.tagline));
      text.appendChild(el("p", "hero-designed__copy", v.summary));
      var cta = el("a", "btn btn--light", "Know More");
      cta.href = "#vehicles";
      text.appendChild(cta);
      var media = el("div", "hero-designed__media");
      media.appendChild(picture(v.banner.mobile, null, v.name));
      inner.appendChild(text);
      inner.appendChild(media);
      designed.appendChild(inner);
      slot.appendChild(designed);
    }

    var badge = el("p", "hero-personal__badge");
    badge.appendChild(el("span", "hero-personal__spark", "✦"));
    badge.appendChild(document.createTextNode(" Picked for you, " + profile.customer.firstName));
    slot.appendChild(badge);

    hero.classList.add("is-personal");
    slot.hidden = false;
  }

  function renderJourney(profile, v, stage) {
    var section = $("journey");
    section.textContent = "";
    var container = el("div", "container");
    var inner = el("div", "journey__card");

    var intro = el("div", "journey__intro");
    intro.appendChild(el("span", "journey__avatar", profile.customer.firstName.charAt(0).toUpperCase()));
    var copy = el("div");
    var hello = el("p", "journey__hello", "Welcome back, " + profile.customer.firstName);
    hello.appendChild(el("span", "journey__stage", stage.label));
    copy.appendChild(hello);
    copy.appendChild(el("p", "journey__msg", stage.message(profile, v)));
    var meta = [v.name, profile.interest.variant, profile.dealer.name].filter(Boolean).join(" · ");
    copy.appendChild(el("p", "journey__meta", meta));
    intro.appendChild(copy);

    var steps = el("ol", "journey__steps");
    STEPS.forEach(function (label, i) {
      var li = el("li", i < stage.step ? "is-done" : i === stage.step ? "is-current" : "");
      li.appendChild(el("span", "journey__dot"));
      li.appendChild(el("span", "journey__label", label));
      if (i === stage.step) li.setAttribute("aria-current", "step");
      steps.appendChild(li);
    });

    var actions = el("div", "journey__cta");
    var primary = el("a", "btn btn--primary", stage.primary);
    primary.href = "#";
    var secondary = el("a", "btn btn--outline", stage.secondary);
    secondary.href = "#";
    actions.appendChild(primary);
    actions.appendChild(secondary);
    var exit = el("button", "journey__exit", "Not " + profile.customer.firstName + "? Exit personalised view");
    exit.type = "button";
    exit.addEventListener("click", reset);
    actions.appendChild(exit);

    inner.appendChild(intro);
    inner.appendChild(steps);
    inner.appendChild(actions);
    container.appendChild(inner);
    section.appendChild(container);
    section.hidden = false;
  }

  function personaliseRide(profile, v, vehicleId, stage) {
    $("ride-eyebrow").textContent = "Picked for you";
    $("ride-title").textContent = "Your ride, " + profile.customer.firstName;

    var radio = $(TVS.categoryTab[v.category]);
    if (radio) radio.checked = true;

    var card = document.querySelector('.bike-card[data-vehicle="' + vehicleId + '"]');
    if (!card) return;
    var row = card.parentElement;
    row.insertBefore(card, row.firstElementChild);
    row.scrollLeft = 0;
    card.classList.add("is-pick");
    card.insertBefore(el("span", "bike-card__badge", "Your pick"), card.firstChild);
    var cta = card.querySelector(".bike-card__cta .btn--primary");
    if (cta) cta.textContent = stage.card;
  }

  function personaliseDealer(dealer) {
    $("dealer-copy").textContent = "Your dealer: " + dealer.name + ", " + dealer.address + ". Call " + dealer.phone + " or get directions in one tap.";
    $("dealer-cta").textContent = "Get Directions";
  }

  function reset() {
    sessionStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }

  /* ---------- Init ---------- */
  var saved = sessionStorage.getItem(STORAGE_KEY);
  if (saved) {
    TVS.api.getPersonalisation(saved).then(function (profile) {
      if (profile) apply(profile);
      else { sessionStorage.removeItem(STORAGE_KEY); showNudge(); }
    }).catch(showNudge);
  } else {
    showNudge();
  }

  return { open: openModal, apply: apply, reset: reset };
})();
