(function () {
  "use strict";

  // ---------- Session picker ----------
  var picker = document.getElementById("session-picker");
  var sessionInput = document.getElementById("signup-session");

  if (picker && sessionInput) {
    var buttons = picker.querySelectorAll(".session-btn");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
        btn.setAttribute("aria-pressed", "true");
        sessionInput.value = btn.getAttribute("data-session") || "";
      });
    });
  }

  // -Book Now / Interest Form buttons -//
  var CALENDLY_URL = "https://calendly.com/dreamerheartfund/surrealism-art-class"; // TODO: your real Calendly event URL
  var GOOGLE_FORM_BASE_URL = "https://docs.google.com/forms/d/e/1FAIpQLScc5WC2Orc7DLaIpyK6JP1rb64L7h4pwOeZRxQ7YwlVLJ-chQ/viewform";

  var GOOGLE_FORM_ENTRY_IDS = {
    name: "entry.689751762",
    email: "entry.68503790",
    notes: "entry.195501984"
  };

  var nameInput = document.getElementById("signup-name");
  var emailInput = document.getElementById("signup-email");
  var notesInput = document.getElementById("signup-notes");
  var status = document.getElementById("signup-status");

  function getFieldValues() {
    return {
      name: nameInput ? nameInput.value.trim() : "",
      email: emailInput ? emailInput.value.trim() : "",
      session: sessionInput ? sessionInput.value.trim() : "",
      notes: notesInput ? notesInput.value.trim() : ""
    };
  }

  // Require at least a name //
  function validate(values) {
    if (!values.name) {
      if (status) {
        status.textContent = "Please add your name first.";
      }
      return false;
    }
    if (status) {
      status.textContent = "";
    }
    return true;
  }

  function buildCalendlyUrl(values) {
    var params = new URLSearchParams();
    if (values.name) params.set("name", values.name);
    if (values.email) params.set("email", values.email);
    // Calendly custom question answers use a1, a2, a3... in the order
    // those questions appear on your event type. Adjust as needed —
    // this assumes session -> a1, notes -> a2.
    if (values.session) params.set("a1", values.session);
    if (values.notes) params.set("a2", values.notes);
    return CALENDLY_URL + "?" + params.toString();
  }

  function buildGoogleFormUrl(values) {
    var params = new URLSearchParams();
    params.set("usp", "pp_url");
    if (values.name) params.set(GOOGLE_FORM_ENTRY_IDS.name, values.name);
    if (values.email) params.set(GOOGLE_FORM_ENTRY_IDS.email, values.email);
    if (values.notes) params.set(GOOGLE_FORM_ENTRY_IDS.notes, values.notes);
    return GOOGLE_FORM_BASE_URL + "?" + params.toString();
  }

  var bookNowBtn = document.getElementById("book-now-btn");
  if (bookNowBtn) {
    bookNowBtn.addEventListener("click", function () {
      var values = getFieldValues();
      if (!validate(values)) return;
      window.open(buildCalendlyUrl(values), "_blank", "noopener");
    });
  }

  var interestFormBtn = document.getElementById("interest-form-btn");
  if (interestFormBtn) {
    interestFormBtn.addEventListener("click", function () {
      var values = getFieldValues();
      if (!validate(values)) return;
      window.open(buildGoogleFormUrl(values), "_blank", "noopener");
    });
  }
})();