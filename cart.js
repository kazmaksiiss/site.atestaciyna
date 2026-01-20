// ===== КОШИК (ГЛОБАЛЬНИЙ) =====
var cart = [];

// Завантаження кошика з localStorage
function loadCart() {
    var savedCart = localStorage.getItem('corsarCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartCount();
}

// Збереження кошика в localStorage
function saveCart() {
    localStorage.setItem('corsarCart', JSON.stringify(cart));
    updateCartCount();
}

// Оновлення лічильника кошика
function updateCartCount() {
    var countElements = document.querySelectorAll('#cartCount');
    var totalItems = 0;
    
    for (var i = 0; i < cart.length; i++) {
        totalItems += cart[i].quantity;
    }
    
    for (var i = 0; i < countElements.length; i++) {
        countElements[i].textContent = totalItems;
    }
}

// Додавання товару в кошик
function addToCart(productId, quantity) {
    var product = null;
    for (var i = 0; i < products.length; i++) {
        if (products[i].id == productId) {
            product = products[i];
            break;
        }
    }
    
    if (!product) return;
    
    // Перевіряємо чи продукт вже в кошику
    var existingItem = null;
    var existingIndex = -1;
    
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].product.id == productId) {
            existingItem = cart[i];
            existingIndex = i;
            break;
        }
    }
    
    if (existingItem) {
        cart[existingIndex].quantity += quantity;
    } else {
        cart.push({
            product: product,
            quantity: quantity
        });
    }
    
    saveCart();
    showCartNotification(product.name);
}

// Показати повідомлення про додавання в кошик
function showCartNotification(productName) {
    var notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = '✓ ' + productName + ' додано в кошик!';
    document.body.appendChild(notification);
    
    setTimeout(function() {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(function() {
        notification.classList.remove('show');
        setTimeout(function() {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Зміна кількості товару
function changeCartQuantity(index, delta) {
    if (cart[index]) {
        cart[index].quantity += delta;
        if (cart[index].quantity < 1) {
            cart[index].quantity = 1;
        }
        saveCart();
        renderCartPage();
    }
}

// Видалення товару з кошика
function removeFromCart(index) {
    if (confirm('Видалити товар з кошика?')) {
        cart.splice(index, 1);
        saveCart();
        renderCartPage();
    }
}

// Очистити кошик
function clearCart() {
    if (confirm('Очистити весь кошик?')) {
        cart = [];
        saveCart();
        renderCartPage();
    }
}

// Відображення кошика на сторінці cart.html
function renderCartPage() {
    var cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart"><h3>Кошик порожній</h3><p>Додайте товари щоб продовжити</p><a href="products.html" class="btn btn-primary">Переглянути продукцію</a></div>';
        document.getElementById('totalItems').textContent = '0';
        document.getElementById('totalPrice').textContent = '0 грн';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    var totalPrice = 0;
    var totalItems = 0;
    
    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var itemTotal = item.product.price * item.quantity;
        totalPrice += itemTotal;
        totalItems += item.quantity;
        
        var itemDiv = document.createElement('div');
        itemDiv.className = 'cart-page-item';
        
        var emoji = item.product.category.includes('Рідинне') ? '❄️' : '🌀';
        
        itemDiv.innerHTML = '<div class="cart-item-image">' + emoji + '</div>' +
            '<div class="cart-item-details">' +
            '<h3>' + item.product.name + '</h3>' +
            '<p>' + item.product.category + '</p>' +
            '<p class="item-price">' + item.product.price.toLocaleString('uk-UA') + ' грн</p>' +
            '</div>' +
            '<div class="cart-item-controls">' +
            '<div class="quantity-controls">' +
            '<button onclick="changeCartQuantity(' + i + ', -1)">-</button>' +
            '<span>' + item.quantity + '</span>' +
            '<button onclick="changeCartQuantity(' + i + ', 1)">+</button>' +
            '</div>' +
            '<p class="item-total">' + itemTotal.toLocaleString('uk-UA') + ' грн</p>' +
            '<button class="remove-item" onclick="removeFromCart(' + i + ')">Видалити</button>' +
            '</div>';
        
        cartItemsContainer.appendChild(itemDiv);
    }
    
    document.getElementById('totalItems').textContent = totalItems;
    document.getElementById('totalPrice').textContent = totalPrice.toLocaleString('uk-UA') + ' грн';
}

// Перехід до оформлення замовлення
function goToCheckout() {
    if (cart.length === 0) {
        alert('Кошик порожній!');
        return;
    }
    window.location.href = 'contact.html';
}

// Ініціалізація при завантаженні
document.addEventListener('DOMContentLoaded', function() {
    loadCart();
    
    // Якщо це сторінка кошика
    if (window.location.pathname.includes('cart.html')) {
        renderCartPage();
    }
});