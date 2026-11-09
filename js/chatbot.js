/* Chat widget UI (screens only - no conversation logic yet).
   TVS.chat.setContext() swaps the greeting when the visitor is personalised. */
window.TVS = window.TVS || {};

TVS.chat = (function () {
  var fab = document.getElementById("chat-fab");
  var toggle = document.getElementById("chat-toggle");
  var openBtn = document.getElementById("chat-open");
  var menuItems = fab.querySelectorAll(".chat-fab__btn");
  var teaser = document.getElementById("chat-teaser");
  var win = document.getElementById("chat");
  var body = document.getElementById("chat-body");
  var form = document.getElementById("chat-form");
  var context = null;

  var LANGUAGES = ["English", "हिंदी", "मराठी", "ಕನ್ನಡ", "தமிழ்", "తెలుగు"];

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function timeNow() {
    return new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }).toUpperCase();
  }

  function botGroup(messages, chips) {
    var group = el("div", "chat-msg");
    var avatar = el("span", "brand-avatar brand-avatar--sm");
    var img = document.createElement("img");
    img.src = "assets/img/tvs-horse.svg";
    img.alt = "";
    avatar.appendChild(img);
    group.appendChild(avatar);

    var stack = el("div", "chat-msg__stack");
    messages.forEach(function (lines) {
      var bubble = el("div", "chat-bubble");
      lines.forEach(function (line) { bubble.appendChild(el("p", null, line)); });
      stack.appendChild(bubble);
    });
    stack.appendChild(el("span", "chat-msg__time", timeNow()));
    if (chips && chips.length) {
      var chipWrap = el("div", "chat-chips");
      chips.forEach(function (label) {
        var chip = el("button", "chat-chip", label);
        chip.type = "button";
        chipWrap.appendChild(chip);
      });
      stack.appendChild(chipWrap);
    }
    group.appendChild(stack);
    return group;
  }

  function render() {
    body.textContent = "";
    body.appendChild(el("p", "chat-day", "Today"));
    if (!context) {
      body.appendChild(botGroup([[
        "Welcome to TVS Motor Company 🙏",
        "Thank you for reaching out to us! I'm here to help you with any queries you might have. 😊",
        "Kindly choose your preferred language."
      ]], LANGUAGES));
      return;
    }
    body.appendChild(botGroup([
      ["Hi " + context.firstName + " 👋 Welcome back to TVS Motor!"],
      [context.journeyText],
      ["How can I help you with your " + context.vehicleName + " today?"]
    ], context.chips));
  }

  function setMenu(open) {
    fab.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close chat options" : "Open chat options");
    Array.prototype.forEach.call(menuItems, function (item) { item.tabIndex = open ? 0 : -1; });
    if (open) teaser.hidden = true;
  }

  function openChat() {
    setMenu(false);
    teaser.hidden = true;
    fab.hidden = true;
    win.hidden = false;
    win.querySelector("#chat-input").focus();
  }

  function hideChat(resetConversation) {
    win.hidden = true;
    fab.hidden = false;
    if (resetConversation) render();
    toggle.focus();
  }

  toggle.addEventListener("click", function () { setMenu(!fab.classList.contains("is-open")); });
  openBtn.addEventListener("click", openChat);
  teaser.addEventListener("click", openChat);
  document.getElementById("chat-min").addEventListener("click", function () { hideChat(false); });
  document.getElementById("chat-close").addEventListener("click", function () { hideChat(true); });
  document.getElementById("chat-refresh").addEventListener("click", render);
  form.addEventListener("submit", function (e) { e.preventDefault(); });
  win.addEventListener("keydown", function (e) { if (e.key === "Escape") hideChat(false); });

  render();

  return {
    setContext: function (ctx) {
      context = ctx;
      render();
      if (ctx && ctx.teaser && win.hidden) {
        teaser.textContent = ctx.teaser;
        teaser.hidden = false;
      }
    }
  };
})();
