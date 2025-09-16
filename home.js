//   document.addEventListener('DOMContentLoaded', function () {
//     const authLinksContainer = document.getElementById('auth-links');
//     const token = localStorage.getItem('token');

//     if (token) {
   
//       authLinksContainer.innerText="Logout";

//       document.getElementById('auth-links').addEventListener('click', function (e) {
//         e.preventDefault();
//         localStorage.removeItem('token');
//         localStorage.removeItem('user_id');
//         window.location.href = 'login.html';
//       });
//     } else {
      
//       authLinksContainer.innerText="Login"
//     }
//   });


// document.addEventListener("DOMContentLoaded", () => {
//     displaySpecialOffer();
//   });

//   function displaySpecialOffer() {
//     fetch("http://127.0.0.1:8000/api/special-offers/")
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         const slider = document.getElementById("pizza-slider");


//         if (data.length === 0) {
//           slider.innerHTML = `<li><p class="text-center text-muted">No special offers available at the moment.</p></li>`;
//           return;
//         }

//         const fragment = document.createDocumentFragment();

//         data.forEach(item => {
//           const li = document.createElement("li");
//           li.classList.add("slide-visible");

//           li.innerHTML = `
//             <div class="card h-100 border-0">
//               <div class="ratio ratio-4x3">
//                 <img src="${item.image}" class="card-img-top" loading="lazy" alt="${item.name}">
//               </div>
//               <div class="card-body p-3 p-xl-5">
//                 <h1 class="text-center">${item.name}</h1>
//                 <p class="card-text text-center">${item.description}</p>
//                 <div class="price mb-3">
//                   <span class="text-muted text-decoration-line-through me-2">$${item.before_price}</span>
//                   <span class="fw-bold text-warning fs-5">$${item.after_price}</span>
//                 </div>
//                 <button class="btn btn-warning text-white add-to-cart-btn" data-itemid="${item.id1}">
//                     Add to Cart
//                 </button>
//               </div>
//             </div>
//           `;
//           console.log("Item ID:", item.id1);
//           fragment.appendChild(li);
//         });

//         slider.appendChild(fragment);

     
//         const indicatorWrapper = slider.parentElement.querySelector(".slider-indicators");

//         if (indicatorWrapper) {
//           indicatorWrapper.innerHTML = ""; // Clear existing indicators

//           for (let i = 0; i < data.length; i++) {
//             const button = document.createElement("button");
//             button.setAttribute("aria-label", `Go to slide ${i + 1}`);
//             if (i === 0) button.classList.add("active");
//             indicatorWrapper.appendChild(button);
//           }
//         }

//         // ✅ Re-initialize Swiffy Slider after DOM changes
//         if (window.swiffyslider && typeof window.swiffyslider.init === "function") {
//           window.swiffyslider.init();
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching pizza data:", error);
//         const slider = document.getElementById("pizza-slider");
//         if (slider) {
//           slider.innerHTML = `<li><p class="text-danger text-center">Failed to load special offers.</p></li>`;
//         }
//       });
//   }

  
// document.addEventListener("DOMContentLoaded", () => {
//   const token = localStorage.getItem("token");

//   const reviewContainer = document.getElementById("review-slider-container");
//   const indicatorContainer = document.getElementById("review-slider-indicators");

//   const headers = {
//     "Content-Type": "application/json",
//   };

//   if (token) {
//     headers["Authorization"] = `Token ${token}`;
//   }





//   fetch("http://127.0.0.1:8000/api/review/", {
//     method: "GET",
//     headers: headers,
//   })
//     .then((res) => {
//       if (!res.ok) throw new Error("Failed to fetch reviews");
//       return res.json();
//     })
//     .then((data) => {
//       reviewContainer.innerHTML = "";
//       indicatorContainer.innerHTML = "";

//       data.forEach((review, index) => {
//         const reviewItem = `
//           <li>
//             <div class="card h-100 review-card border-0 shadow-sm rounded-4 p-4">
//               <h5 class="fw-semibold">${review.review_title}</h5>
//               <p class="text-muted small mb-3">${review.content}</p>
//               <small class="text-muted">
//                 Reviewed by <strong>${review.user_name || 'Anonymous'}</strong>
//                 on <em>${formatDate(review.review_date)}</em>
//               </small>
//             </div>
//           </li>
//         `;

//         const indicator = `
//           <button aria-label="Slide ${index + 1}" class="${index === 0 ? 'active' : ''}"></button>
//         `;

//         reviewContainer.innerHTML += reviewItem;
//         indicatorContainer.innerHTML += indicator;
//       });
//     })
//     .catch((err) => {
//       console.error("Error loading reviews:", err);
//     });
// });

// // 📅 Date format: DD/MM/YY
// function formatDate(dateStr) {
//   const date = new Date(dateStr);
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const year = String(date.getFullYear()).slice(-2);
//   return `${day}/${month}/${year}`;
// }



  document.addEventListener('DOMContentLoaded', function () {
    const authLink = document.getElementById('auth-link');
    const cartLink = document.getElementById('cart-link');
    const orderLink = document.getElementById('order-link');
    const token = localStorage.getItem('token');

    if (token) {
    
      cartLink.style.display = "inline";
      orderLink.style.display = "inline";
      authLink.textContent = "Logout";
      authLink.href = "#";

      authLink.addEventListener('click', function (e) {
        e.preventDefault();
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        window.location.href = 'login.html';
      });
    } else {

      cartLink.style.display = "none";
      orderLink.style.display = "none";
      authLink.textContent = "Login";
      authLink.href = "login.html";
    }
  });


document.addEventListener("DOMContentLoaded", () => {
    displaySpecialOffer();
  });

  function displaySpecialOffer() {
    fetch("https://foodie-restaurent-3.onrender.com/api/special-offers/")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const slider = document.getElementById("pizza-slider");


        if (data.length === 0) {
          slider.innerHTML = `<li><p class="text-center text-muted">No special offers available at the moment.</p></li>`;
          return;
        }

        const fragment = document.createDocumentFragment();

        data.forEach(item => {
          const li = document.createElement("li");
          li.classList.add("slide-visible");

          li.innerHTML = `
            <div class="card h-100 border-0">
              <div class="ratio ratio-4x3">
                <img src="${item.image}" class="card-img-top" loading="lazy" alt="${item.name}">
              </div>
              <div class="card-body p-3 p-xl-5">
                <h1 class="text-center">${item.name}</h1>
                <p class="card-text text-center">${item.description}</p>
                <div class="price mb-3">
                  <span class="text-muted text-decoration-line-through me-2">$${item.before_price}</span>
                  <span class="fw-bold text-warning fs-5">$${item.after_price}</span>
                </div>
                <button class="btn btn-warning text-white add-to-cart-btn" data-itemid="${item.id1}">
                    Add to Cart
                </button>
              </div>
            </div>
          `;
          console.log("Item ID:", item.id1);
          fragment.appendChild(li);
        });

        slider.appendChild(fragment);

     
        const indicatorWrapper = slider.parentElement.querySelector(".slider-indicators");

        if (indicatorWrapper) {
          indicatorWrapper.innerHTML = "";

          for (let i = 0; i < data.length; i++) {
            const button = document.createElement("button");
            button.setAttribute("aria-label", `Go to slide ${i + 1}`);
            if (i === 0) button.classList.add("active");
            indicatorWrapper.appendChild(button);
          }
        }

  
        if (window.swiffyslider && typeof window.swiffyslider.init === "function") {
          window.swiffyslider.init();
        }
      })

      .catch(error => {
        console.error("Error fetching pizza data:", error);
        const slider = document.getElementById("pizza-slider");
        if (slider) {
          slider.innerHTML = `<li><p class="text-danger text-center">Failed to load special offers.</p></li>`;
        }
      });
  }

  
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  const reviewContainer = document.getElementById("review-slider-container");
  const indicatorContainer = document.getElementById("review-slider-indicators");

  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Token ${token}`;
  }





  fetch("https://foodie-restaurent-3.onrender.com/api/review/", {
    method: "GET",
    headers: headers,
  })
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch reviews");
      return res.json();
    })
    .then((data) => {
      reviewContainer.innerHTML = "";
      indicatorContainer.innerHTML = "";

      data.forEach((review, index) => {
        const reviewItem = `
          <li>
            <div class="card h-100 review-card border-0 shadow-sm rounded-4 p-4">
              <h5 class="fw-semibold">${review.review_title}</h5>
              <p class="text-muted small mb-3">${review.content}</p>
              <small class="text-muted">
                Reviewed by <strong>${review.user_name || 'Anonymous'}</strong>
                on <em>${formatDate(review.review_date)}</em>
              </small>
            </div>
          </li>
        `;

        const indicator = `
          <button aria-label="Slide ${index + 1}" class="${index === 0 ? 'active' : ''}"></button>
        `;

        reviewContainer.innerHTML += reviewItem;
        indicatorContainer.innerHTML += indicator;
      });
    })
    .catch((err) => {
      console.error("Error loading reviews:", err);
    });
});


function formatDate(dateStr) {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}
