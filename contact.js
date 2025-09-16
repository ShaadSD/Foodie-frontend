document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("user_id");

  if (token && userId) {
  
    fetch(`https://foodie-restaurent-3.onrender.com/api/user/list/${userId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user details.");
        return res.json();
      })
      .then((data) => {
        document.getElementById("firstName").placeholder = data.first_name || "Name";
        document.getElementById("email").placeholder = data.email || "Email";

        document.getElementById("firstName").value = data.first_name || "";
        document.getElementById("email").value = data.email || "";
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Could not load user details.");
      });
  }
});


document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const message = document.getElementById('message').value.trim();

  if (!message) {
    alert("Please write a message.");
    return;
  }



  fetch("https://foodie-restaurent-3.onrender.com/api/user/contact/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",

    },
    body: JSON.stringify({ message: message })
  })
    .then(response => response.json().then(data => {
      if (response.ok) {
        alert(data.message || "Message sent successfully!");
        document.getElementById('message').value = "";
      } else {
        alert(data.error || "Something went wrong!");
      }
    }))
    .catch(error => {
      console.error("Error:", error);
      alert("An error occurred while sending the message.");
    });
});
