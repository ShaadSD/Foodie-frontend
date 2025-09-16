let nextUrl = null;
let prevUrl = null;


const showLoader = () => {
    const loader = document.getElementById("loading");
    const container = document.getElementById("food-container");
    if (loader && container) {
        loader.style.display = "block";
        container.style.display = "none";
    }
};

const hideLoader = () => {
    const loader = document.getElementById("loading");
    const container = document.getElementById("food-container");
    if (loader && container) {
        loader.style.display = "none";
        container.style.display = "flex";
    }
};


const loadFoods = (url = "https://foodie-restaurent-3.onrender.com/api/items/") => {
    showLoader();
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            displayFoods(data.results);
            nextUrl = data.next;
            prevUrl = data.previous;
            updatePaginationButtons();
        })
        .catch(error => console.error("Error loading foods:", error))
   
        .finally(() => {
            setTimeout(hideLoader, 1000);
        });
};


const searchFoods = (search) => {
    showLoader();
    fetch(`https://foodie-restaurent-3.onrender.com/api/items/?search=${search}`)
        .then((res) => res.json())
        .then((data) => {
            displayFoods(data.results);
            nextUrl = data.next;
            prevUrl = data.previous;
            updatePaginationButtons();
        })
        .catch(error => console.error("Error searching foods:", error))
        .finally(() => {
            setTimeout(hideLoader, 500);
        });
};


const loadFoodsCategory = (category) => {
    showLoader();
    fetch(`https://foodie-restaurent-3.onrender.com/api/items/?category=${category}`)
        .then((res) => res.json())
        .then((data) => {
            displayFoods(data.results);
            nextUrl = data.next;
            prevUrl = data.previous;
            updatePaginationButtons();
        })
        .catch(error => console.error("Error loading category foods:", error))
        .finally(() => {
            setTimeout(hideLoader, 500);
        });
};


const displayFoods = (foods) => {
    const container = document.getElementById("food-container");
    container.innerHTML = "";
    document.getElementById("search-box").value = "";

    if (foods.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center mt-5">
                <h3>No data found.</h3>
            </div>
        `;
        return;
    }

    foods.forEach((food) => {
        const div = document.createElement('div');
        div.classList.add("col-md-4", "col-lg-4", "mt-5", "card-container");

        div.innerHTML = `
            <div class="card h-100 border-0">
                <div class="ratio ratio-4x3"> 
                    <img src="${food.image}" class="card-img-top" loading="lazy" alt="${food.name}"> 
                </div>
                <div class="card-body p-3 p-xl-5"> 
                    <h1 class="text-center">${food.name}</h1> 
                    <p class="card-text text-center">${food.description}.</p>
                    <div class="price mb-3">
                        <span class="fw-bold fs-5">৳${food.price}</span>
                    </div>
                    <button class="btn btn-warning text-white add-to-cart-btn" data-itemid="${food.id}">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        container.appendChild(div);
    });
};


const handleSearch = (event) => {
    event.preventDefault();
    const value = document.getElementById("search-box").value.trim();
    searchFoods(value);
};


document.querySelectorAll("#category-list li").forEach((li) => {
    li.addEventListener("click", () => {
        const category = li.textContent.trim();
        if (category === 'All Product') {
            loadFoods();
        } else {
            loadFoodsCategory(category);
        }
    });
});


const updatePaginationButtons = () => {
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");


    if (prevUrl) {
        prevBtn.classList.remove("disabled");
        prevBtn.onclick = (e) => {
            e.preventDefault();
            loadFoods(prevUrl);
        };
    } else {
        prevBtn.classList.add("disabled");
        prevBtn.onclick = (e) => e.preventDefault();
    }

   
    if (nextUrl) {
        nextBtn.classList.remove("disabled");
        nextBtn.onclick = (e) => {
            e.preventDefault();
            loadFoods(nextUrl);
        };
    } else {
        nextBtn.classList.add("disabled");
        nextBtn.onclick = (e) => e.preventDefault();
    }
};


loadFoods();
