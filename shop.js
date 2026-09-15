(function () {
  "use strict";
  var ORDER_FORM_BASE =
    "https://docs.google.com/forms/d/e/1FAIpQLSc_zSNk0W6VYLay9R_7cM30Isjs-5scb00EQOhBfQkiLrJ5Qw/viewform?usp=pp_url&entry.1000027=%22We+Are+One%22+-+24%22+x+18%22";
  var PRINT_ENTRY_ID = "entry.1000027";

  var modal = document.getElementById("product-modal");
  var backdrop = document.getElementById("product-modal-backdrop");
  var dialog = document.getElementById("product-modal-dialog");
  var closeBtn = document.getElementById("product-modal-close");
  var modalImage = document.getElementById("product-modal-image");
  var modalTitle = document.getElementById("product-modal-title");
  var modalDetails = document.getElementById("product-modal-details");
  var modalPrice = document.getElementById("product-modal-price");
  var modalOrder = document.getElementById("product-modal-order");

  if (!modal) return;

  var lastFocused = null;

  function buildOrderHref(data) {
    if (data.printLabel) {
      return (
        ORDER_FORM_BASE +
        "?usp=pp_url&" +
        PRINT_ENTRY_ID +
        "=" +
        encodeURIComponent(data.printLabel)
      );
    }
    return data.orderHref || ORDER_FORM_BASE;
  }

  function openModal(trigger) {
    var data = trigger.dataset;

    modalImage.src = data.image || "";
    modalImage.alt = data.imageAlt || data.title || "";
    modalTitle.textContent = data.title || "";
    modalDetails.textContent = data.details || "";
    modalPrice.textContent = data.price || "";
    modalOrder.setAttribute("href", buildOrderHref(data));

    lastFocused = trigger;
    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("is-open");
    document.body.classList.add("product-modal-open");
    closeBtn.focus();

    document.addEventListener("keydown", onKeydown);
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("product-modal-open");
    document.removeEventListener("keydown", onKeydown);
    if (lastFocused) lastFocused.focus();
  }

  function onKeydown(event) {
    if (event.key === "Escape") {
      closeModal();
      return;
    }

    if (event.key === "Tab") {
      var focusable = dialog.querySelectorAll(
        'button, a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  document.querySelectorAll(".product-card__trigger").forEach(function (trigger) {
    trigger.addEventListener("click", function () {
      openModal(trigger);
    });
  });

  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
})();