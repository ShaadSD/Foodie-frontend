document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login to see your order history");
    window.location.href = "login.html";
    return;
  }

  fetch("https://foodie-restaurent-3.onrender.com/api/order/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${token}`,
    },
  })
    .then(response => response.json())
    .then(data => {
      const tbody = document.querySelector("tbody");

      data.forEach(order => {
        const row = document.createElement("tr");

      
      
        let statusStyle = "";

        if (order.order_status === "Order Processing") {
          statusStyle = "background-color:rgb(245, 245, 150);1 color: #000;";
        } else if (order.order_status === "Complete") {
          statusStyle = "background-color: rgb(198, 243, 198); color: #000;";
        } else if (order.order_status === "Order Canceled") {
          statusStyle = "background-color:rgb(241, 157, 157);color: #000;";
        }

        row.innerHTML = `
          <th class="p-4">#${order.id}</th>
          <td class="p-4">${new Date(order.date).toLocaleDateString()}</td>
          <td class="p-4">
            <div style="max-height: 60px; overflow-y: auto;">
              ${order.ordered_items.map(item => `<div>${item.item_name}</div>`).join("")}
            </div>
          </td>
          <td class="p-4">$${order.total}</td>
          <td class="p-4">
            <span class="p-2 rounded" style="${statusStyle}">${order.order_status}</span>
          </td>
          <td class="align-middle">
            <button class="btn btn-danger">
              <a class="text-decoration-none text-white" href="review.html">Review</a>
            </button>
          </td>
        `;

        tbody.appendChild(row);
      });
    })
    .catch(err => {
      console.error("Error loading orders:", err);
      alert("Something went wrong while loading order history.");
    });
});
