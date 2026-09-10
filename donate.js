(function () {
  "use strict";

  var MAX_AMOUNT = 100000;

  var amountButtons = document.querySelectorAll(".amount-btn");
  var customInput = document.getElementById("donate-amount");
  var note = document.getElementById("donate-form-note");
  var buttonContainer = document.getElementById("paypal-button-container");

  if (!customInput || !buttonContainer) return;

  var defaultNoteText = note ? note.textContent : "";
  var selectedAmount = null;
  var buttonsInstance = null;

  function clearPresetSelection() {
    amountButtons.forEach(function (b) {
      b.classList.remove("is-selected");
      b.setAttribute("aria-pressed", "false");
    });
  }

  function resetNote() {
    if (!note) return;
    note.textContent = defaultNoteText;
    note.classList.remove("is-error");
  }

  function showError(message) {
    if (!note) return;
    note.textContent = message;
    note.classList.add("is-error");
  }

  function getValidAmount() {
    var raw = customInput.value ? customInput.value : selectedAmount;
    if (!raw) return null;
    var num = Number(raw);
    if (!isFinite(num) || num <= 0 || num > MAX_AMOUNT) return null;
    return Math.round(num * 100) / 100;
  }

  customInput.addEventListener("input", function () {
    customInput.value = customInput.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
    if (customInput.value) {
      clearPresetSelection();
      selectedAmount = null;
    }
    refreshButtonState();
  });

  amountButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      clearPresetSelection();
      btn.classList.add("is-selected");
      btn.setAttribute("aria-pressed", "true");
      selectedAmount = btn.getAttribute("data-amount");
      customInput.value = "";
      refreshButtonState();
    });
  });

  function refreshButtonState() {
    var amount = getValidAmount();
    resetNote();
    if (!window.paypal) return;
    if (amount) {
      buttonContainer.classList.remove("is-disabled");
    } else {
      buttonContainer.classList.add("is-disabled");
    }
  }

  function initPayPalButtons() {
    if (!window.paypal || !window.paypal.Buttons) return;

    buttonsInstance = window.paypal.Buttons({
      style: { layout: "horizontal", color: "gold", label: "donate", height: 45 },

      createOrder: function (data, actions) {
        var amount = getValidAmount();
        if (!amount) {
          showError("Please choose or enter an amount before continuing.");
          return Promise.reject(new Error("No valid amount selected"));
        }
        return actions.order.create({
          purchase_units: [
            {
              amount: { value: amount.toFixed(2), currency_code: "USD" },
              description: "Donation to The Dreamer Heart Fund",
            },
          ],
        });
      },

      onApprove: function (data, actions) {
        return actions.order.capture().then(function () {
          resetNote();
          if (note) {
            note.textContent = "Thank you — your donation went through. You'll get a receipt from PayPal by email.";
          }
        });
      },

      onError: function (err) {
        showError("Something went wrong reaching PayPal. Please try again, or use the direct link below.");
        console.error("PayPal donation error:", err);
      },
    });

    buttonsInstance
      .render("#paypal-button-container")
      .then(function () {
        refreshButtonState();
      });
  }

  if (window.paypal) {
    initPayPalButtons();
  } else {
    window.addEventListener("load", initPayPalButtons);
  }
})();