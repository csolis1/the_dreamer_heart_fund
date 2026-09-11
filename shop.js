/*
  shop.js
  Powers the product pop-up on shop.html. No product data lives here —
  it's all read from each card's data-* attributes in the HTML, so adding
  or editing a print only ever means editing shop.html.
*/
(function () {
  "use strict";

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

  function openModal(trigger) {
    var data = trigger.dataset;

    modalImage.src = data.image || "";
    modalImage.alt = data.imageAlt || data.title || "";
    modalTitle.textContent = data.title || "";
    modalDetails.textContent = data.details || "";
    modalPrice.textContent = data.price || "";
    modalOrder.setAttribute("href", data.orderHref || "order.html");

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

    // Simple focus trap: keep Tab cycling within the dialog.
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