document.addEventListener("DOMContentLoaded", () => {
  const fruitInput = document.getElementById("fruitName");
  const quantityInput = document.getElementById("quantity");
  const phoneInput = document.getElementById("phone");
  const orderForm = document.querySelector("form");

  // Autofill fruit name from localStorage (if any)
  const selectedFruit = localStorage.getItem("selectedFruit");
  if (selectedFruit) {
    fruitInput.value = selectedFruit;
    localStorage.removeItem("selectedFruit");
  }

  // Phone input validation: exactly 10 digits
  phoneInput.addEventListener("input", () => {
    const isValidPhone = /^\d{10}$/.test(phoneInput.value);
    phoneInput.setCustomValidity(isValidPhone ? "" : "Phone number must be 10 digits");
  });

  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fruit = fruitInput.value.trim();
    const qty = quantityInput.value.trim();
    const name = document.getElementById("customerName").value.trim();
    const deliveryType = document.getElementById("deliveryType").value;
    const address = document.getElementById("Address").value.trim();

    // Basic validation before confirmation
    if (!fruit || !qty || !name || !deliveryType || !address) {
      alert("Please fill in all required fields.");
      return;
    }

    if (isNaN(qty) || Number(qty) <= 0) {
      alert("Please enter a valid quantity greater than 0.");
      return;
    }

    alert(`🎉 Thank you, ${name}!\nYour order of ${qty} KG ${fruit} for ${deliveryType === 'home' ? 'Home Delivery' : 'Pickup'} has been received.`);
    orderForm.reset();
  });
});
