(function () {
  "use strict";

  /* Sticky header shadow */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* Mobile navigation */
  var toggle = document.querySelector(".nav-toggle");
  var root = document.documentElement;
  if (toggle) {
    toggle.addEventListener("click", function () {
      var isOpen = root.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      document.body.style.overflow = isOpen ? "hidden" : "";
    });

    document.querySelectorAll(".mobile-nav__link").forEach(function (link) {
      link.addEventListener("click", function () {
        root.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      });
    });
  }

  /* Scroll reveal */
  var revealTargets = document.querySelectorAll("[data-reveal], [data-reveal-group], [data-reveal-clip]");
  if ("IntersectionObserver" in window && revealTargets.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* Portrait parallax */
  var parallaxImgs = document.querySelectorAll(".about-bleed__img");
  if (parallaxImgs.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var updateParallax = function () {
      parallaxImgs.forEach(function (img) {
        var rect = img.parentElement.getBoundingClientRect();
        var vh = window.innerHeight;
        var progress = (vh - rect.top) / (vh + rect.height);
        var clamped = Math.min(Math.max(progress, 0), 1);
        var offset = (clamped - 0.5) * 32;
        img.style.transform = "translateY(" + offset.toFixed(1) + "px)";
      });
    };
    var parallaxTicking = false;
    var onParallaxScroll = function () {
      if (parallaxTicking) return;
      parallaxTicking = true;
      window.requestAnimationFrame(function () {
        updateParallax();
        parallaxTicking = false;
      });
    };
    updateParallax();
    window.addEventListener("scroll", onParallaxScroll, { passive: true });
    window.addEventListener("resize", onParallaxScroll);
  }

  /* Process rail: scroll-linked progress line through the Vorgehensweise steps */
  var railList = document.querySelector("[data-process-rail]");
  if (railList) {
    var railTrack = railList.querySelector(".process-rail");
    var railFill = railList.querySelector("[data-rail-fill]");
    var railSteps = railList.querySelectorAll("[data-process-step]");

    var updateRail = function () {
      var vh = window.innerHeight;
      var activationLine = vh * 0.62;
      var trackRect = railTrack.getBoundingClientRect();
      var filledPx = Math.min(Math.max(activationLine - trackRect.top, 0), trackRect.height);
      var pct = trackRect.height > 0 ? (filledPx / trackRect.height) * 100 : 0;
      railFill.style.height = pct + "%";

      railSteps.forEach(function (step) {
        var numEl = step.querySelector(".process-step__num");
        var r = numEl.getBoundingClientRect();
        var center = r.top + r.height / 2;
        step.classList.toggle("is-active", center <= activationLine);
      });
    };

    var railTicking = false;
    var onRailScroll = function () {
      if (railTicking) return;
      railTicking = true;
      window.requestAnimationFrame(function () {
        updateRail();
        railTicking = false;
      });
    };

    updateRail();
    window.addEventListener("scroll", onRailScroll, { passive: true });
    window.addEventListener("resize", onRailScroll);
  }

  /* Contact form handling */
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var statusBox = form.querySelector("[data-form-status]");
    var submitBtn = form.querySelector("[data-form-submit]");

    var showStatus = function (type, message) {
      statusBox.textContent = message;
      statusBox.classList.remove("is-success", "is-error");
      statusBox.classList.add(type === "success" ? "is-success" : "is-error");
      statusBox.setAttribute("role", "status");
      statusBox.focus({ preventScroll: false });
    };

    var validateField = function (field) {
      var errorEl = form.querySelector('[data-error-for="' + field.name + '"]');
      if (!errorEl) return true;
      if (!field.checkValidity()) {
        errorEl.textContent = field.validationMessage;
        return false;
      }
      errorEl.textContent = "";
      return true;
    };

    form.querySelectorAll("input, select, textarea").forEach(function (field) {
      field.addEventListener("blur", function () {
        validateField(field);
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      /* Honeypot spam protection */
      var honeypot = form.querySelector('input[name="website"]');
      if (honeypot && honeypot.value) {
        return;
      }

      var valid = true;
      form.querySelectorAll("input, select, textarea").forEach(function (field) {
        if (!validateField(field)) valid = false;
      });

      if (!valid) {
        showStatus("error", "Bitte überprüfen Sie Ihre Angaben – einige Pflichtfelder sind noch nicht korrekt ausgefüllt.");
        return;
      }

      var endpoint = form.getAttribute("data-endpoint");
      if (!endpoint || endpoint === "#") {
        /* No backend configured yet: show success state so the UX can be reviewed end-to-end. */
        form.reset();
        form.hidden = true;
        var successState = document.querySelector("[data-form-success]");
        if (successState) successState.hidden = false;
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Wird gesendet …";

      fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      })
        .then(function (response) {
          if (response.ok) {
            form.reset();
            form.hidden = true;
            var successState = document.querySelector("[data-form-success]");
            if (successState) successState.hidden = false;
          } else {
            showStatus("error", "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt per E-Mail.");
          }
        })
        .catch(function () {
          showStatus("error", "Es gab ein Verbindungsproblem. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt per E-Mail.");
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = "Anfrage senden";
        });
    });
  }
})();
