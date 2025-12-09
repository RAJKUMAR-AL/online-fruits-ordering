const cartSidebar = document.createElement('aside');
cartSidebar.style.cssText = `
  position: fixed; top: 0; right: 0;
  width: 320px; height: 100vh;
  background: #28a745;
  color: white;
  box-shadow: -5px 0 30px rgba(0,0,0,0.4);
  transform: translateX(100%);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10001;
  padding: 24px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: column;
`;

const cartTitle = document.createElement('h2');
cartTitle.textContent = 'Your Cart';
cartTitle.style.marginBottom = '20px';
cartSidebar.appendChild(cartTitle);

const cartList = document.createElement('ul');
cartList.style.listStyle = 'none';
cartList.style.padding = '0';
cartList.style.flexGrow = '1';
cartList.style.overflowY = 'auto';
cartSidebar.appendChild(cartList);

const cartTotal = document.createElement('p');
cartTotal.style.fontWeight = '700';
cartTotal.style.fontSize = '18px';
cartTotal.style.marginTop = '15px';
cartSidebar.appendChild(cartTotal);

const orderBtn = document.createElement('button');
orderBtn.textContent = 'Order Now';
orderBtn.style.cssText = `
  background: white; 
  color: #28a745;
  border: none; 
  padding: 10px 15px;
  border-radius: 6px; 
  font-weight: 600;
  cursor: pointer;
  margin-top: 15px;
  width: 100%;
  transition: background-color 0.3s ease;
`;
orderBtn.addEventListener('click', () => {
  if (Object.keys(cart).length === 0) {
    alert('Your cart is empty! Please add some fruits first.');
  } else {
    // ✅ Save FULL cart object (all fruits) to localStorage
    localStorage.setItem("cartData", JSON.stringify(cart));
    // Go to order form page
    window.location.href = "r2.html";
  }
});


// orderBtn.addEventListener('click', () => {
//   if (Object.keys(cart).length === 0) {
//     alert('Your cart is empty! Please add some fruits first.');
//   } else {
//     alert('Thank you for your order! We will process it shortly.');
//     for (const key in cart) delete cart[key];
//     updateCartUI();
//     cartSidebar.style.transform = 'translateX(100%)';
//   }
// });
cartSidebar.appendChild(orderBtn);

const closeCartBtn = document.createElement('button');
closeCartBtn.textContent = 'Close';
closeCartBtn.style.cssText = `
  background: white; 
  color: #28a745;
  border: none; 
  padding: 10px 15px;
  border-radius: 6px; 
  font-weight: 600;
  cursor: pointer;
  margin-top: 15px;
  align-self: flex-end;
  transition: background-color 0.3s ease;
`;
closeCartBtn.addEventListener('click', () => {
  cartSidebar.style.transform = 'translateX(100%)';
});
cartSidebar.appendChild(closeCartBtn);

document.body.appendChild(cartSidebar);

// const cartToggleBtn = document.createElement('button');
// cartToggleBtn.textContent = '🛒 Cart';
// cartToggleBtn.style.cssText = `
//   position: fixed; top: 90px; right: 20px;
//   background: #28a745; color: white;
//   border: none; border-radius: 50px;
//   padding: 12px 20px;
//   font-size: 20px;
//   cursor: pointer;
//   box-shadow: 0 0 10px #28a745;
//   z-index: 10002;
//   transition: background-color 0.3s ease;
// `;
// cartToggleBtn.addEventListener('click', () => {
//   cartSidebar.style.transform = cartSidebar.style.transform === 'translateX(0%)' ? 'translateX(100%)' : 'translateX(0%)';
// });
// document.body.appendChild(cartToggleBtn);

const cart = {};

function updateCartUI() {
  cartList.innerHTML = '';
  let total = 0;
  for (const id in cart) {
    const item = cart[id];
    const li = document.createElement('li');
    li.style.marginBottom = '15px';
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';

    li.innerHTML = `<span>${item.name} x${item.qty}</span><span>₹${item.price * item.qty}</span>`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '✖';
    removeBtn.style.marginLeft = '12px';
    removeBtn.style.background = 'transparent';
    removeBtn.style.border = 'none';
    removeBtn.style.color = 'white';
    removeBtn.style.fontSize = '18px';
    removeBtn.style.cursor = 'pointer';
    removeBtn.addEventListener('click', () => {
      if (item.qty > 1) item.qty--;
      else delete cart[id];
      updateCartUI();
    });
    li.appendChild(removeBtn);

    cartList.appendChild(li);
    total += item.price * item.qty;
  }
  cartTotal.textContent = `Total: ₹${total}`;
}

// Add to cart buttons
document.querySelectorAll('.btn-success.btn-sm').forEach(btn => {
  btn.addEventListener('click', e => {
    e.preventDefault();
    let card = btn.closest('.product-card');
    if (!card) return;
    const name = card.querySelector('.card-title').textContent;
    const price = Number(card.querySelector('.card-text').textContent.replace(/[^0-9.]/g, ''));
    if (!cart[name]) cart[name] = { name, price, qty: 1 };
    else cart[name].qty++;
    updateCartUI();
    cartSidebar.style.transform = 'translateX(0%)';
  });
});