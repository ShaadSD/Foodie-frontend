const handlePlaceOrder = (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    const id = localStorage.getItem('cartId');

    if (!token) {
        alert("Please login first.");
        window.location.href = 'login.html';
        return;
    }

    const email = getValue('email');
    const phone = getValue('phone');
    const first_name = getValue('first_name');
    const last_name = getValue('last_name');
    const address = getValue('address');

  
    const cashOption = document.getElementById('cashOption');
    if (!cashOption.checked) {
        alert("Please select 'Cash on Delivery' to proceed.");
        return;
    }

    if (!email || !phone || !first_name || !last_name || !address) {
        alert("Please fill out all fields.");
        return;
    }

    const info = {
        id,
        phone,
        email,
        first_name,
        last_name,
        address,
    };

    fetch(`https://foodie-restaurent-3.onrender.com/api/order/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${token}`
        },
        body: JSON.stringify(info),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to place order");
        }
        return res.json();
    })
    .then((data) => {
        console.log("Order placed successfully:", data);
        alert("Order placed successfully!");
        localStorage.removeItem('cartId');
        window.location.href = "order_history.html";
    })
    .catch((error) => {
        console.error("Error placing order:", error);
        alert("There was an error placing your order. Please try again.");
    });
};

const getValue = (id) => {
    return document.getElementById(id).value.trim();
};

document.addEventListener("DOMContentLoaded", () => {
    renderCartSummary();
});

const renderCartSummary = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    const orderSummary = document.querySelector(".order-summary");
    orderSummary.innerHTML = "<p>Loading cart...</p>";

    fetch("https://foodie-restaurent-3.onrender.com/api/cart/", {
        method: "GET",
        headers: {
            "Authorization": `Token ${token}`,
            "Content-Type": "application/json"
        }
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error("Failed to fetch cart");
        }
        return res.json();
    })
    .then((data) => {
        if (!data.cartItem || data.cartItem.length === 0) {
            orderSummary.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        const itemsHTML = data.cartItem.map((item) => `
            <div class="d-flex justify-content-between mb-2">
                <span>${item.item.name}</span>
                <span>${item.quantity}</span>
                <span>$${item.subtotal}</span>
            </div>
        `).join("");

        const delivery = 100;
        const total = data.total + delivery;

        localStorage.setItem("cartId", data.id);
        orderSummary.innerHTML="";
        orderSummary.innerHTML = `
            <h2 class="section-title mb-4">Your Order</h2>

            <div class="d-flex justify-content-between fw-semibold border-bottom pb-2 mb-3">
                <span>Item</span>
                <span>Qty</span>
                <span>Total</span>
            </div>

            ${itemsHTML}

            <div class="d-flex justify-content-between mb-2">
                <span>Delivery</span>
                <span></span>
                <span>$${delivery}</span>
            </div>

            <hr>

            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5 class="fw-bold">TOTAL</h5>
                <h5 class="fw-bold text-success">$${total}</h5>
            </div>

            <h5 class="mb-3">Payment Methods</h5>

            <div class="payment-option">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="paymentMethod" id="cashOption" value="cash">
                    <label class="form-check-label" for="cashOption">Cash on Delivery</label>
                </div>
            </div>

            <div class="payment-option">
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="paymentMethod" id="otherOption" disabled>
                    <label class="form-check-label" for="otherOption">Other (Coming Soon)</label>
                </div>
            </div>
        `;
    })
    .catch((error) => {
        console.error("Error loading cart:", error);
        orderSummary.innerHTML = "<p>Failed to load cart. Please try again.</p>";
    });
};
