
document.addEventListener("DOMContentLoaded", function () {
addEventListener('click', (event) => {
  if (event.target.classList.contains('add-to-cart-btn')) {
    const itemId = event.target.getAttribute('data-itemid');
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please log in to add items to your cart.');
      window.location.href = 'login.html';
      return;
    }

    fetch('https://foodie-restaurent-3.onrender.com/api/add_to_cart/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify({ id: itemId }),
      
      
    })
    .then(response => {
      if (!response.ok) throw new Error("Not authorized");
      return response.json();
    })
    .then(data => {
      console.log('Item added to cart:', data);
      alert('Item added to cart!');
 
    })
    .catch(err => {
      console.error('Error adding to cart:', err);
      alert('Failed to add item to cart');
    });
  }
});

});

let cartId = null;

const loadCart=()=>{
    const token = localStorage.getItem('token');
    if(!token){
        alert('Please login to view your cart');
        window.location.href = 'login.html'
        return;
    }
    fetch('https://foodie-restaurent-3.onrender.com/api/cart/',{
        method: 'GET',
        headers :{
            'Content-Type':'application/json',
            'Authorization': `Token ${token}`
        }
    })
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data);
        cartId = data.id;
        localStorage.setItem('cartId', cartId);
        displayMycart(data.cartItem)
    })
 
}

const displayMycart = (items) => {
  let grandTotal = 0;
  const container = document.getElementById("cart-container");
  container.innerHTML = "";

  items.forEach(item => {
    grandTotal += item.subtotal;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="d-flex align-items-center gap-3">
        <img src="https://foodie-restaurent-3.onrender.com${item.item.image}" class="img-thumbnail" style="width: 80px;" alt="${item.item.name}">
        <div>
          <h6 class="mb-1">${item.item.name}</h6>
          <small class="text-muted">${item.item.description}</small>
        </div>
      </td>
      <td class="text-center fw-bold text-dark">$${item.price}</td>
      <td>
        <div class="d-flex justify-content-center align-items-center gap-2">
          <button class="btn-qty minus" data-id="${item.id}">−</button>
          <input type="number" class="qty-input text-center" value="${item.quantity}" min="1" style="width: 40px;" disabled>
          <button class="btn-qty plus" data-id="${item.id}">+</button>
        </div>
      </td>
      <td class="text-center fw-bold text-dark total-price">$${item.subtotal}</td>
      <td class="text-center text-danger fw-bold remove-btn" data-id="${item.id}" style="cursor:pointer;">✕</td>
    `;
    container.appendChild(row);
  });
  document.getElementById("grand-total").innerText = `$${grandTotal.toFixed(2)}`;
 
};




document.getElementById("cart-container").addEventListener("click", (event) => {
  const id = event.target.getAttribute("data-id");
  const token = localStorage.getItem("token");

  if (!id || !token) return;

 
  if (event.target.classList.contains("plus")) {
    fetch(`https://foodie-restaurent-3.onrender.com/api/increase/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
      },
      body: JSON.stringify({ id: id }),
    })
      .then(res => res.json())
      .then(() => loadCart());
  }


  if (event.target.classList.contains("minus")) {
    fetch(`https://foodie-restaurent-3.onrender.com/api/decrease/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
      },
      body: JSON.stringify({ id: id }),
    })
      .then(res => res.json())
      .then(() => loadCart());
  }


  if (event.target.classList.contains("remove-btn")) {
    fetch(`https://foodie-restaurent-3.onrender.com/api/delete_cart/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
      },
      body: JSON.stringify({ id: id }),
    })
      .then(res => res.json())
      .then(() => loadCart());
  }
});


const deleteAll = () => {
    const token = localStorage.getItem('token');
    const id=localStorage.getItem('cartId', cartId);
    if (!token) {
        alert("Please login first");
        return;
    }

    fetch(`https://foodie-restaurent-3.onrender.com/api/full_delete/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`,
        },
        body: JSON.stringify({ id: cartId }),
    })
    .then(res => res.json())
    .then(() => {
        alert("All items deleted");
        loadCart();
    })
    .catch(err => {
        console.error("Failed to delete all:", err);
        alert("Something went wrong");
    });
};

loadCart()