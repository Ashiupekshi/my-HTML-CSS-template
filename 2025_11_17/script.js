
function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartTable = document.getElementById('cart-items');
    let totalElement = document.getElementById('total-price');
    let total = 0;

    cartTable.innerHTML = ''; 

    if (cart.length === 0) {
        cartTable.innerHTML = '<tr><td colspan="4">ඔබේ Cart එක හිස්ය.</td></tr>';
    } else {
        cart.forEach((item, index) => {
            let row = `
                <tr>
                    <td><img src="${item.image}" width="50"></td>
                    <td>${item.name}</td>
                    <td>Rs. ${item.price}</td>
                    <td><button class="remove-btn" onclick="removeFromCart(${index})">Remove</button></td>
                </tr>
            `;
            cartTable.innerHTML += row;
            total += parseInt(item.price);
        });
    }
    
    if(totalElement) {
        totalElement.innerText = "Total: Rs. " + total;
    }
}


function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); 
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart(); 
}


if (window.location.pathname.includes('cart.html')) {
    window.onload = loadCart;
}


const products = [
    { id: 1, name: "Lavender Soap", price: 15.00, img: "resouses/images/1.png" },
    { id: 2, name: "Rose Petal Bar", price: 18.50, img: "resouses/images/2.png" },
    { id: 3, name: "Green Tea Scrub", price: 16.00, img: "resouses/images/3.png" },
    { id: 4, name: "Vanilla Candle", price: 25.00, img: "resouses/images/4.png" },
    { id: 5, name: "Charcoal Detox", price: 14.00, img: "resouses/images/5.png" },
    { id: 6, name: "Honey & Oat", price: 12.50, img: "resouses/images/6.png" },
    { id: 7, name: "Jasmine Oil", price: 30.00, img: "resouses/images/7.png" }, 
    { id: 8, name: "Lemon Zest", price: 13.00, img: "resouses/images/8.png" },
    { id: 9, name: "Ocean Breeze", price: 19.00, img: "resouses/images/9.png" },
    { id: 10, name: "Mint Fresh", price: 15.00, img: "resouses/images/10.png" },
    { id: 11, name: "Coco Butter", price: 22.00, img: "resouses/images/1.png" },
    { id: 12, name: "Berry Blast", price: 17.00, img: "resouses/images/3.png" }
];


const itemsPerPage = 4; 
let currentPage = 1;
let cart = [];


const productContainer = document.getElementById('product-container');
const paginationContainer = document.getElementById('pagination');
const cartSidebar = document.getElementById('cart-sidebar');
const cartItemsContainer = document.getElementById('cart-items');
const cartCountElement = document.getElementById('cart-count');
const cartTotalElement = document.getElementById('cart-total');
const toast = document.getElementById('toast');


function displayProducts(page) {
    productContainer.innerHTML = "";
    page--; 

    let start = page * itemsPerPage;
    let end = start + itemsPerPage;
    let paginatedItems = products.slice(start, end);

    paginatedItems.forEach(product => {
        let productHTML = `
            <div class="product-card">
                <img src="${product.img}" alt="${product.name}" class="product-img">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <span class="price">$${product.price.toFixed(2)}</span>
                    <button class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        `;
        productContainer.innerHTML += productHTML;
    });

    setupPagination();
}

function setupPagination() {
    paginationContainer.innerHTML = "";
    let pageCount = Math.ceil(products.length / itemsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        let btn = document.createElement('button');
        btn.innerText = i;
        if (currentPage == i) btn.classList.add('active');
        
        btn.addEventListener('click', function() {
            currentPage = i;
            displayProducts(currentPage);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        paginationContainer.appendChild(btn);
    }
}


function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCartUI();
    showToast();
    
   
}


function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}


function updateCartUI() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p class='empty-msg'>Your cart is empty.</p>";
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            cartItemsContainer.innerHTML += `
                <div class="cart-item">
                    <div>
                        <h4>${item.name}</h4>
                        <span>$${item.price.toFixed(2)}</span>
                    </div>
                    <span class="remove-item" onclick="removeFromCart(${index})"><i class="fas fa-trash"></i></span>
                </div>
            `;
        });
    }

    cartCountElement.innerText = cart.length;
    cartTotalElement.innerText = total.toFixed(2);
}


function toggleCart() {
    cartSidebar.classList.toggle('open');
}


function showToast() {
    toast.className = "show";
    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
}

// Initialize
displayProducts(currentPage);