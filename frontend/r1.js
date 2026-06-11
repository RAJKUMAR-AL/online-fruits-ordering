const cart = {};

// --- View Cart Button (top-right) ---
const viewCartBtn = document.createElement('button');
viewCartBtn.id = 'viewCartBtn';
viewCartBtn.textContent = '🛒 View Cart (0)';
viewCartBtn.style.cssText = `
  position: fixed;
  top: 70px;
  right: 16px;
  z-index: 9999;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
`;
document.body.appendChild(viewCartBtn);

// --- Cart Modal ---
const modal = document.createElement('div');
modal.id = 'cartModal';
modal.style.cssText = `
  display: none;
  position: fixed;
  top: 110px;
  right: 16px;
  width: 300px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  z-index: 10000;
  padding: 16px;
  font-family: 'Segoe UI', sans-serif;
`;

modal.innerHTML = `
  <h5 style="margin:0 0 12px;color:#28a745;font-weight:700;">🛒 Your Cart</h5>
  <ul id="modalCartList" style="list-style:none;padding:0;margin:0;max-height:250px;overflow-y:auto;"></ul>
  <p id="modalCartTotal" style="font-weight:700;margin:12px 0 0;color:#333;"></p>
  <button id="orderNowBtn" style="
    width:100%;margin-top:10px;padding:10px;
    background:#28a745;color:white;
    border:none;border-radius:8px;
    font-weight:600;font-size:15px;cursor:pointer;">
    Order Now
  </button>
  <button id="closeModalBtn" style="
    width:100%;margin-top:8px;padding:8px;
    background:#f1f1f1;color:#333;
    border:none;border-radius:8px;
    font-weight:600;cursor:pointer;">
    Close
  </button>
`;
document.body.appendChild(modal);

// --- Toggle modal on View Cart click ---
viewCartBtn.addEventListener('click', () => {
  modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('closeModalBtn').addEventListener('click', () => {
  modal.style.display = 'none';
});

document.getElementById('orderNowBtn').addEventListener('click', () => {
  if (Object.keys(cart).length === 0) {
    alert('Your cart is empty! Please add some fruits first.');
    return;
  }
  localStorage.setItem("cartData", JSON.stringify(cart));
  window.location.href = "r2.html";
});

// --- Update cart UI ---
function updateCartUI() {
  const list = document.getElementById('modalCartList');
  const totalEl = document.getElementById('modalCartTotal');
  list.innerHTML = '';
  let total = 0;
  let count = 0;

  for (const id in cart) {
    const item = cart[id];
    count += item.qty;
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    const li = document.createElement('li');
    li.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-size:14px;';
    li.innerHTML = `
      <span>${item.name} x${item.qty}</span>
      <span>₹${itemTotal}</span>
    `;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '✖';
    removeBtn.style.cssText = 'background:none;border:none;color:#dc3545;font-size:14px;cursor:pointer;margin-left:8px;';
    removeBtn.addEventListener('click', () => {
      if (item.qty > 1) item.qty--;
      else delete cart[id];
      updateCartUI();
    });
    li.appendChild(removeBtn);
    list.appendChild(li);
  }

  totalEl.textContent = count > 0 ? `Total: ₹${total}` : 'Cart is empty';
  viewCartBtn.textContent = `🛒 View Cart (${count})`;
}

// --- Add to cart buttons ---
document.querySelectorAll('.btn-success.btn-sm').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    const card = btn.closest('.product-card');
    if (!card) return;
    const name = card.querySelector('.card-title').textContent;
    const price = Number(card.querySelector('.card-text').textContent.replace(/[^0-9.]/g, ''));
    if (!cart[name]) cart[name] = { name, price, qty: 1 };
    else cart[name].qty++;
    updateCartUI();
  });
});
