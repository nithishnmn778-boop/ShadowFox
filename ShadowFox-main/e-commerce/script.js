document.addEventListener('DOMContentLoaded', () => {

    // ===== 1. OUR "SEED" LIST OF UNIQUE BASE PRODUCTS WITH IMAGES =====
    const baseProducts = [
        // Stationery
        { baseId: 1, name: 'Artisan Leather Journal', category: 'Stationery', price: 45.00, rating: 4.9, imageUrl: 'https://m.media-amazon.com/images/I/71lfZtAhjrL._AC_UF1000,1000_QL80_.jpg', description: 'Hand-stitched journal for your thoughts and sketches.' },
        { baseId: 2, name: 'Calligraphy Pen Set', category: 'Stationery', price: 75.50, rating: 4.8, imageUrl: 'https://m.media-amazon.com/images/I/71USF6du5TL._AC_SL1500_.jpg', description: 'Elegant fountain pen with multiple nibs for beautiful handwriting.' },
        { baseId: 3, name: 'Wax Seal Stamp Kit', category: 'Stationery', price: 35.00, rating: 4.7, imageUrl: 'https://m.media-amazon.com/images/I/91PQUWJYlyL.jpg', description: 'Personalize your letters with a classic wax seal.' },
        // Home Decor
        { baseId: 4, name: 'Minimalist Desk Lamp', category: 'Home Decor', price: 120.00, rating: 4.7, imageUrl: 'https://m.media-amazon.com/images/I/71xomxwBxNL.jpg', description: 'Sleek, modern design with adjustable warm light.' },
        { baseId: 5, name: 'Handwoven Wool Throw', category: 'Home Decor', price: 150.00, rating: 4.9, imageUrl: 'https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTL3-cLoQFWbGPqB9FIDLdW2i4szzA7PvsNbMZpR-mMUIXgqi8ZmWDLqwkspPkj8GAv9nF7l5LZ5D69aOklWHD-MJ_nKzpJ52x5SAa5yiKZ', description: 'Luxuriously soft and warm, perfect for cozy evenings.' },
        { baseId: 6, name: 'Abstract Ceramic Vase', category: 'Home Decor', price: 88.00, rating: 4.6, imageUrl: 'https://th.bing.com/th?id=OPAC.laf%2b3h1WGUiTuw474C474&w=592&h=550&o=5&dpr=1.3&pid=21.1', description: 'A modern ceramic vase to elevate your floral arrangements.' },
        // Accessories
        { baseId: 7, name: 'Silk Scarf "Azure"', category: 'Accessories', price: 85.00, rating: 4.9, imageUrl: 'https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRgEzFwSNjyTRirdAmsPlvRZP2nenEB0y4gETjI1uS12V_9K-H-DFCIDr7EUIIxJaAFBbg2xhBAlzIisTATN4GmuQdcV9ZH2nkSVhXO7Yk', description: 'A luxurious 100% silk scarf with a beautiful, artistic print.' },
        { baseId: 8, name: 'Chronograph Watch "Voyager"', category: 'Accessories', price: 350.00, rating: 4.8, imageUrl: 'https://images-magento.shoppersstop.com/pub/media/catalog/product/W28000191D_base/W28000191D_NoColour/W28000191D_NoColour.jpg_2000Wx3000H', description: 'A sophisticated timepiece with a stainless steel case.' },
        { baseId: 9, name: 'Leather Messenger Bag', category: 'Accessories', price: 275.00, rating: 4.8, imageUrl: 'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQHOs4pnS5z1AhP_SUEd-MlEjEK9tORftPh3j34eWo-8AvY30mwwF5oYwtwe1FhiH_us7eRkG1YmouL0xJnoroWJ1jqxo7bSq5-as4vL2Qv3R8tcy7xjIvo7YM', description: 'Full-grain leather bag for your laptop and essentials.' },
        // Gourmet
        { baseId: 10, name: 'Gourmet Coffee Beans', category: 'Gourmet', price: 25.00, rating: 4.9, imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.KK5wEU7WtadyJKMPyr-51gHaE5?rs=1&pid=ImgDetMain&o=7&rm=3', description: 'Single-origin, ethically sourced coffee beans.' },
        { baseId: 11, name: 'Artisanal Dark Chocolate', category: 'Gourmet', price: 42.00, rating: 4.9, imageUrl: 'https://assets.winni.in/c_limit,dpr_1,fl_progressive,q_80,w_600/28752_artisanal-dark-chocolate-bar.jpeg', description: 'A curated selection of five dark chocolate bars.' },
        { baseId: 12, name: 'Truffle Infused Olive Oil', category: 'Gourmet', price: 30.00, rating: 4.7, imageUrl: 'https://tse2.mm.bing.net/th/id/OIP.3HCWevETEntoVJf93ttI7QHaE7?rs=1&pid=ImgDetMain&o=7&rm=3', description: 'Elevate any dish with the rich, earthy aroma of black truffles.' },
        // Tech
        { baseId: 13, name: 'Noise-Cancelling Headphones', category: 'Tech', price: 299.99, rating: 4.8, imageUrl: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcS1WtvYKNNAFWWSpVUmNGAgSaPFM1PS0YfJYMK-HTlFOUuc-iv0LRO3065zE32I3rt9uAIWQM8ZAlftBUjCrwOAoKEjoG4X-CcRGcxaL_c_iFnM5yyc8JvD', description: 'Immerse yourself in pure sound with industry-leading ANC.' },
        { baseId: 14, name: 'Portable Projector "Cinema Mini"', category: 'Tech', price: 450.00, rating: 4.6, imageUrl: 'https://m.media-amazon.com/images/I/71XjPYm7quL.jpg', description: 'Turn any room into a movie theater with this compact projector.' },
        { baseId: 15, name: 'Smart Garden Kit', category: 'Tech', price: 150.00, rating: 4.7, imageUrl: 'https://m.media-amazon.com/images/I/81TtShJzFBL.jpg', description: 'Grow fresh herbs indoors with an automated smart garden.' },
    ];
    
    // ===== PRODUCT GENERATOR FUNCTION =====
    function generateFullProductCatalog(baseItems, variationsPerItem) {
        const fullCatalog = [];
        let currentId = 1;
        
        baseItems.forEach(baseItem => {
            // Add the original base item first
            fullCatalog.push({ ...baseItem, id: currentId++ });
            
            // Create variations
            const variations = ['Deluxe', 'Classic', 'Limited Edition', 'Midnight Black', 'Pearl White'];
            for (let i = 0; i < variationsPerItem; i++) {
                const variationName = variations[i % variations.length];
                fullCatalog.push({
                    ...baseItem,
                    id: currentId++,
                    name: `${baseItem.name} - ${variationName}`,
                    price: parseFloat((baseItem.price * (1 + (i * 0.15))).toFixed(2)), 
                });
            }
        });
        
        return fullCatalog;
    }
    
    // MODIFIED: Generate a smaller, more manageable catalog (1 variation per base item)
    const products = generateFullProductCatalog(baseProducts, 1);

    // ===== APP STATE =====
    let cart = [];

    // ===== ELEMENT SELECTORS =====
    const getEl = (id) => document.getElementById(id);
    const entryPage = getEl('entry-page');
    const enterStoreButton = getEl('enter-store-button');
    const mainStore = getEl('main-store');
    const productsGrid = getEl('products-grid');
    const categoryFiltersContainer = getEl('category-filters');
    const priceSlider = getEl('price-slider');
    const priceValue = getEl('price-value');
    const sortSelect = getEl('sort-select');
    const searchInput = getEl('search-input'); // ADDED: Selector for search input
    const cartIcon = getEl('cart-icon');
    const cartBadge = getEl('cart-count');
    const sideCart = getEl('side-cart');
    const closeCartBtn = getEl('close-cart-btn');
    const cartItemsContainer = getEl('cart-items-container');
    const cartSubtotal = getEl('cart-subtotal');
    const checkoutButton = getEl('checkout-button');
    const checkoutPage = getEl('checkout-page');
    const backToStoreBtn = getEl('back-to-store-btn');
    const paymentForm = getEl('payment-form');
    const orderSuccess = getEl('order-success');
    const returnToStoreBtn = getEl('return-to-store-btn');
    const checkoutSummaryItems = getEl('checkout-summary-items');
    const checkoutTotalPrice = getEl('checkout-total-price');

    // ===== RENDER & LOGIC FUNCTIONS =====
    
    const renderProducts = (productsToRender) => {
        productsGrid.innerHTML = '';
        if (productsToRender.length === 0) {
            productsGrid.innerHTML = '<p>No products match your criteria.</p>';
            return;
        }
        productsToRender.forEach(p => {
            productsGrid.innerHTML += `
                <div class="product-card">
                    <img src="${p.imageUrl}" alt="${p.name}" class="product-image">
                    <div class="product-content">
                        <p class="product-category">${p.category}</p>
                        <h3 class="product-name">${p.name}</h3>
                        <p class="product-description">${p.description}</p>
                        <div class="product-footer">
                            <p class="product-price">$${p.price.toFixed(2)}</p>
                            <button class="add-to-cart-btn" data-product-id="${p.id}">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
        });
    };

    const populateFilters = () => {
        const categories = [...new Set(products.map(p => p.category))];
        categoryFiltersContainer.innerHTML = '<h3>Category</h3>';
        categories.forEach(c => {
            categoryFiltersContainer.innerHTML += `
                <label class="category-label">
                    <input type="checkbox" class="category-filter" value="${c}"> ${c}
                </label>
            `;
        });
    };

    const applyFiltersAndSort = () => {
        let filtered = [...products];
        
        // ADDED: Search filter logic
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm) {
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(searchTerm) ||
                p.description.toLowerCase().includes(searchTerm)
            );
        }

        const selectedCategories = [...document.querySelectorAll('.category-filter:checked')].map(el => el.value);
        if (selectedCategories.length > 0) {
            filtered = filtered.filter(p => selectedCategories.includes(p.category));
        }
        
        filtered = filtered.filter(p => p.price <= parseFloat(priceSlider.value));
        
        const sortValue = sortSelect.value;
        if (sortValue === 'price-asc') filtered.sort((a, b) => a.price - b.price);
        else if (sortValue === 'price-desc') filtered.sort((a, b) => b.price - a.price);
        else if (sortValue === 'rating-desc') filtered.sort((a, b) => b.rating - a.rating);
        
        renderProducts(filtered);
    };

    const updateCart = () => {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="padding: 1rem; text-align: center;">Your cart is currently empty.</p>';
        }
        let subtotal = 0;
        cart.forEach(item => {
            cartItemsContainer.innerHTML += `
                <div class="cart-item" data-product-id="${item.id}">
                    <img src="${item.imageUrl}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <p class="cart-item-title">${item.name}</p>
                        <div class="quantity-controls">
                            <button class="quantity-btn decrease-qty">-</button>
                            <span class="item-quantity">${item.quantity}</span>
                            <button class="quantity-btn increase-qty">+</button>
                        </div>
                    </div>
                    <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
                </div>
            `;
            subtotal += item.price * item.quantity;
        });
        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartBadge.textContent = totalItems;
        cartBadge.style.display = totalItems > 0 ? 'block' : 'none';
    };

    const addToCart = (productId) => {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            const product = products.find(p => p.id === productId);
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    };

    const adjustQuantity = (productId, change) => {
        const item = cart.find(i => i.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                cart = cart.filter(i => i.id !== productId);
            }
        }
        updateCart();
    };
    
    const showCheckoutPage = () => {
        mainStore.classList.add('hidden');
        sideCart.classList.remove('open');
        checkoutPage.classList.remove('hidden');
        getEl('checkout-flow-container').classList.remove('hidden');
        orderSuccess.classList.add('hidden');
        
        checkoutSummaryItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            checkoutSummaryItems.innerHTML += `<p>${item.name} x ${item.quantity}      $${(item.price * item.quantity).toFixed(2)}</p>`;
            total += item.price * item.quantity;
        });
        checkoutTotalPrice.textContent = `$${total.toFixed(2)}`;
    };

    // ===== EVENT LISTENERS =====
    
    enterStoreButton.addEventListener('click', () => {
        entryPage.style.opacity = '0';
        setTimeout(() => { entryPage.classList.add('hidden'); }, 1000);
        mainStore.classList.remove('hidden');
    });

    priceSlider.addEventListener('input', () => {
        priceValue.textContent = priceSlider.value;
        applyFiltersAndSort();
    });

    // ADDED: Event listener for the search input
    searchInput.addEventListener('input', applyFiltersAndSort);
    
    [categoryFiltersContainer, sortSelect].forEach(el => el.addEventListener('change', applyFiltersAndSort));

    productsGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const button = e.target;
            addToCart(parseInt(button.dataset.productId));
            sideCart.classList.add('open');
            button.textContent = '✓ Added';
            setTimeout(() => { button.textContent = 'Add to Cart'; }, 1500);
        }
    });

    cartIcon.addEventListener('click', () => sideCart.classList.toggle('open'));
    closeCartBtn.addEventListener('click', () => sideCart.classList.remove('open'));
    
    cartItemsContainer.addEventListener('click', (e) => {
        const cartItem = e.target.closest('.cart-item');
        if (!cartItem) return;
        const productId = parseInt(cartItem.dataset.productId);
        if (e.target.classList.contains('increase-qty')) adjustQuantity(productId, 1);
        if (e.target.classList.contains('decrease-qty')) adjustQuantity(productId, -1);
    });

    checkoutButton.addEventListener('click', () => {
        if (cart.length > 0) showCheckoutPage();
        else alert('Your cart is empty!');
    });
    
    backToStoreBtn.addEventListener('click', () => {
        checkoutPage.classList.add('hidden');
        mainStore.classList.remove('hidden');
    });

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        getEl('checkout-flow-container').classList.add('hidden');
        orderSuccess.classList.remove('hidden');
        cart = [];
        updateCart();
    });
    
    returnToStoreBtn.addEventListener('click', () => {
        orderSuccess.classList.add('hidden');
        getEl('checkout-flow-container').classList.remove('hidden');
        checkoutPage.classList.add('hidden');
        mainStore.classList.remove('hidden');
    });

    // ===== INITIALIZATION =====
    populateFilters();
    applyFiltersAndSort(); // This will now apply the default sort ("Top Rated") on load
    updateCart();
});