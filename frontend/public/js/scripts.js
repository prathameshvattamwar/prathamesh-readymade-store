document.addEventListener('DOMContentLoaded', async function() {
    console.log('Prathamesh Readymade website loaded!');
    
    // Check if we're on the homepage
    if (document.querySelector('.featured-products')) {
        try {
            // Load featured products
            const featuredProducts = await window.API.Product.getFeaturedProducts();
            displayFeaturedProducts(featuredProducts);
            
            // Load new arrivals
            const newArrivals = await window.API.Product.getNewArrivals();
            displayNewArrivals(newArrivals);
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }
    
    // Check if we're on the products page
    if (document.querySelector('.product-listing')) {
        try {
            // Get query parameters
            const urlParams = new URLSearchParams(window.location.search);
            const category = urlParams.get('category') || '';
            const keyword = urlParams.get('keyword') || '';
            const page = parseInt(urlParams.get('page')) || 1;
            
            // Load products based on filters
            const productsData = await window.API.Product.getProducts(keyword, page, category);
            displayProducts(productsData.products, productsData.page, productsData.pages);
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }
    
    // Check if we're on the product detail page
    if (document.querySelector('.product-detail')) {
        try {
            // Get product ID from URL
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');
            
            if (productId) {
                // Load product details
                const product = await window.API.Product.getProductById(productId);
                displayProductDetails(product);
            }
        } catch (error) {
            console.error('Error loading product details:', error);
        }
    }
    
    // Initialize tooltips
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
});

// Function to display featured products
function displayFeaturedProducts(products) {
    const featuredProductsContainer = document.querySelector('.featured-products .row');
    if (!featuredProductsContainer) return;
    
    featuredProductsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productHtml = `
            <div class="col-md-3 col-6 mb-4">
                <div class="card product-card h-100">
                    <div class="position-relative">
                        ${product.onSale ? '<span class="badge bg-danger position-absolute top-0 start-0 m-2">SALE</span>' : ''}
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="product-actions position-absolute bottom-0 start-0 end-0 p-3 bg-white bg-opacity-75 d-flex justify-content-center">
                            <a href="product-detail.html?id=${product._id}" class="btn btn-sm btn-outline-dark mx-1" data-bs-toggle="tooltip" title="View Details">
                                <i class="fas fa-eye"></i>
                            </a>
                            <button class="btn btn-sm btn-outline-dark mx-1 add-to-wishlist" data-product-id="${product._id}" data-bs-toggle="tooltip" title="Add to wishlist">
                                <i class="far fa-heart"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-dark mx-1 add-to-cart" data-product-id="${product._id}" data-bs-toggle="tooltip" title="Add to cart">
                                <i class="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="card-text text-muted small mb-1">${product.category}</p>
                        <h5 class="card-title mb-1">
                            <a href="product-detail.html?id=${product._id}" class="text-dark text-decoration-none">${product.name}</a>
                        </h5>
                        <div class="price-block">
                            ${product.onSale 
                                ? `<span class="text-decoration-line-through text-muted me-2">₹${product.price}</span>
                                   <span class="fw-bold">₹${product.salePrice}</span>`
                                : `<span class="fw-bold">₹${product.price}</span>`
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        featuredProductsContainer.innerHTML += productHtml;
    });
    
    // Re-initialize tooltips after adding new elements
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    // Add event listeners to the new buttons
    initializeProductButtons();
}

// Function to display new arrivals
function displayNewArrivals(products) {
    const newArrivalsContainer = document.querySelector('.new-arrivals .row');
    if (!newArrivalsContainer) return;
    
    newArrivalsContainer.innerHTML = '';
    
    products.forEach(product => {
        const productHtml = `
            <div class="col-md-3 col-6 mb-4">
                <div class="card product-card h-100">
                    <div class="position-relative">
                        <span class="badge bg-success position-absolute top-0 start-0 m-2">NEW</span>
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="product-actions position-absolute bottom-0 start-0 end-0 p-3 bg-white bg-opacity-75 d-flex justify-content-center">
                            <a href="product-detail.html?id=${product._id}" class="btn btn-sm btn-outline-dark mx-1" data-bs-toggle="tooltip" title="View Details">
                                <i class="fas fa-eye"></i>
                            </a>
                            <button class="btn btn-sm btn-outline-dark mx-1 add-to-wishlist" data-product-id="${product._id}" data-bs-toggle="tooltip" title="Add to wishlist">
                                <i class="far fa-heart"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-dark mx-1 add-to-cart" data-product-id="${product._id}" data-bs-toggle="tooltip" title="Add to cart">
                                <i class="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="card-text text-muted small mb-1">${product.category}</p>
                        <h5 class="card-title mb-1">
                            <a href="product-detail.html?id=${product._id}" class="text-dark text-decoration-none">${product.name}</a>
                        </h5>
                        <div class="price-block">
                            ${product.onSale 
                                ? `<span class="text-decoration-line-through text-muted me-2">₹${product.price}</span>
                                   <span class="fw-bold">₹${product.salePrice}</span>`
                                : `<span class="fw-bold">₹${product.price}</span>`
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        newArrivalsContainer.innerHTML += productHtml;
    });
    
    // Re-initialize tooltips and buttons
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    initializeProductButtons();
}

// Function to display products on the products page
function displayProducts(products, currentPage, totalPages) {
    const productsContainer = document.querySelector('.product-listing .row');
    if (!productsContainer) return;
    
    productsContainer.innerHTML = '';
    
    if (products.length === 0) {
        productsContainer.innerHTML = `
            <div class="col-12 text-center py-5">
                <h4>No products found</h4>
                <p>Try changing your search or filter criteria.</p>
            </div>
        `;
        return;
    }
    
    products.forEach(product => {
        const productHtml = `
            <div class="col-md-4 mb-4">
                <div class="card product-card h-100">
                    <div class="position-relative">
                        ${product.onSale ? '<span class="badge bg-danger position-absolute top-0 start-0 m-2">SALE</span>' : ''}
                        ${product.isNewArrival ? '<span class="badge bg-success position-absolute top-0 start-0 m-2">NEW</span>' : ''}
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="product-actions position-absolute bottom-0 start-0 end-0 p-3 bg-white bg-opacity-75 d-flex justify-content-center">
                            <a href="product-detail.html?id=${product._id}" class="btn btn-sm btn-outline-dark mx-1" data-bs-toggle="tooltip" title="View Details">
                                <i class="fas fa-eye"></i>
                            </a>
                            <button class="btn btn-sm btn-outline-dark mx-1 add-to-wishlist" data-product-id="${product._id}" data-bs-toggle="tooltip" title="Add to wishlist">
                                <i class="far fa-heart"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-dark mx-1 add-to-cart" data-product-id="${product._id}" data-bs-toggle="tooltip" title="Add to cart">
                                <i class="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                    <div class="card-body">
                        <p class="card-text text-muted small mb-1">${product.category}</p>
                        <h5 class="card-title mb-1">
                            <a href="product-detail.html?id=${product._id}" class="text-dark text-decoration-none">${product.name}</a>
                        </h5>
                        <div class="price-block">
                            ${product.onSale 
                                ? `<span class="text-decoration-line-through text-muted me-2">₹${product.price}</span>
                                   <span class="fw-bold">₹${product.salePrice}</span>`
                                : `<span class="fw-bold">₹${product.price}</span>`
                            }
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        productsContainer.innerHTML += productHtml;
    });
    
    // Update pagination
    updatePagination(currentPage, totalPages);
    
    // Re-initialize tooltips and buttons
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
    
    initializeProductButtons();
}

// Function to update pagination
function updatePagination(currentPage, totalPages) {
    const paginationContainer = document.querySelector('.pagination');
    if (!paginationContainer) return;
    
    let paginationHtml = '';
    
    // Previous button
    paginationHtml += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="?page=${currentPage - 1}" tabindex="-1" ${currentPage === 1 ? 'aria-disabled="true"' : ''}>Previous</a>
        </li>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `
            <li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="?page=${i}">${i}</a>
            </li>
        `;
    }
    
    // Next button
    paginationHtml += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="?page=${currentPage + 1}" ${currentPage === totalPages ? 'aria-disabled="true"' : ''}>Next</a>
        </li>
    `;
    
    paginationContainer.innerHTML = paginationHtml;
}

// Function to display product details
function displayProductDetails(product) {
    // Update product title
    document.querySelector('.product-title').textContent = product.name;
    
    // Update main image
    document.querySelector('.main-image img').src = product.image;
    
    // Update price
    const priceContainer = document.querySelector('.product-price');
    if (product.onSale) {
        priceContainer.innerHTML = `
            <span class="text-decoration-line-through text-muted me-2">₹${product.price}</span>
            <span class="fw-bold fs-4">₹${product.salePrice}</span>
            <span class="text-success ms-2">(${Math.round((1 - product.salePrice / product.price) * 100)}% OFF)</span>
        `;
    } else {
        priceContainer.innerHTML = `<span class="fw-bold fs-4">₹${product.price}</span>`;
    }
    
    // Update description
    document.querySelector('.product-description').textContent = product.description;
    
    // Update stock status
    document.querySelector('.additional-info p:first-child').innerHTML = 
        `<i class="fas ${product.countInStock > 0 ? 'fa-check-circle text-success' : 'fa-times-circle text-danger'} me-2"></i> 
         ${product.countInStock > 0 ? `In stock (${product.countInStock} items)` : 'Out of stock'}`;
    
    // Update sizes
    const sizeContainer = document.querySelector('.size-selection .btn-group');
    sizeContainer.innerHTML = '';
    
    product.sizes.forEach((size, index) => {
        sizeContainer.innerHTML += `
            <input type="radio" class="btn-check" name="size" id="size-${size.toLowerCase()}" ${index === 0 ? 'checked' : ''} autocomplete="off">
            <label class="btn btn-outline-dark me-2" for="size-${size.toLowerCase()}">${size}</label>
        `;
    });
    
    // Update colors
    const colorContainer = document.querySelector('.color-selection .d-flex');
    colorContainer.innerHTML = '';
    
    // Map color names to CSS colors
    const colorMap = {
        'Black': '#000000',
        'White': '#FFFFFF',
        'Red': '#FF0000',
        'Blue': '#0000FF',
        'Green': '#008000',
        'Yellow': '#FFFF00',
        'Brown': '#A52A2A',
        'Grey': '#808080',
        'Navy Blue': '#000080'
    };
    
    product.colors.forEach((color, index) => {
        colorContainer.innerHTML += `
            <div class="color-option me-2 ${index === 0 ? 'active' : ''}" 
                 style="background-color: ${colorMap[color] || color};"
                 data-color="${color}"></div>
        `;
    });
    
    // Update product tabs
    document.querySelector('#description .product-description').innerHTML = `
        <p>${product.description}</p>
        <h5>Features:</h5>
        <ul>
            <li>High-quality materials</li>
            <li>Comfortable fit</li>
            <li>Durable construction</li>
            <li>Easy to maintain</li>
            <li>Available in multiple colors and sizes</li>
        </ul>
    `;
    
    document.querySelector('#specifications tbody').innerHTML = `
        <tr>
            <th style="width: 30%;">Brand</th>
            <td>${product.brand}</td>
        </tr>
        <tr>
            <th>Category</th>
            <td>${product.category}</td>
        </tr>
        <tr>
            <th>Available Colors</th>
            <td>${product.colors.join(', ')}</td>
        </tr>
        <tr>
            <th>Available Sizes</th>
            <td>${product.sizes.join(', ')}</td>
        </tr>
        <tr>
            <th>In Stock</th>
            <td>${product.countInStock} items</td>
        </tr>
    `;
    
    // Initialize color and size selection
    initializeProductDetailButtons();
}

// Function to initialize product buttons
function initializeProductButtons() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            addToCart(productId, 1);
        });
    });
    
    // Add to wishlist buttons
    const addToWishlistButtons = document.querySelectorAll('.add-to-wishlist');
    addToWishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.dataset.productId;
            addToWishlist(productId);
        });
    });
}

// Function to initialize product detail page buttons
function initializeProductDetailButtons() {
    // Color selection
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            colorOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Add to cart button
    const addToCartBtn = document.getElementById('add-to-cart');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            const productId = new URLSearchParams(window.location.search).get('id');
            const size = document.querySelector('.btn-check:checked').id.replace('size-', '');
            const color = document.querySelector('.color-option.active').dataset.color;
            const quantity = parseInt(document.getElementById('quantity').value);
            
            addToCart(productId, quantity, size, color);
        });
    }
}

// Function to add product to cart
function addToCart(productId, quantity = 1, size = '', color = '') {
    // Get existing cart from localStorage or initialize empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if product already in cart
    const existingItemIndex = cart.findIndex(item => 
        item.productId === productId && 
        (size ? item.size === size : true) && 
        (color ? item.color === color : true)
    );
    
    if (existingItemIndex >= 0) {
        // Update quantity if product already in cart
        cart[existingItemIndex].quantity += quantity;
    } else {
        // Add new item to cart
        cart.push({
            productId,
            quantity,
            size,
            color
        });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count display
    updateCartCount();
    
    // Show success message
    alert('Product added to cart!');
}

// Function to add product to wishlist
function addToWishlist(productId) {
    // Get existing wishlist from localStorage or initialize empty array
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    // Check if product already in wishlist
    const existingItemIndex = wishlist.findIndex(item => item.productId === productId);
    
    if (existingItemIndex >= 0) {
        // Remove item if already in wishlist
        wishlist.splice(existingItemIndex, 1);
        alert('Product removed from wishlist!');
    } else {
        // Add new item to wishlist
        wishlist.push({
            productId,
            addedAt: new Date().toISOString()
        });
        alert('Product added to wishlist!');
    }
    
    // Save updated wishlist to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    
    // Update wishlist count display
    updateWishlistCount();
}

// Function to update cart count display
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartBadge = document.querySelector('.fa-shopping-cart + .badge');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
    }
}

// Function to update wishlist count display
function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const wishlistCount = wishlist.length;
    
    const wishlistBadge = document.querySelector('.fa-heart + .badge');
    if (wishlistBadge) {
        wishlistBadge.textContent = wishlistCount;
    }
}

// Initialize cart and wishlist counts on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    updateWishlistCount();
});