// ===== ОФОРМЛЕННЯ ЗАМОВЛЕННЯ =====

console.log('✅ checkout.js завантажено');

// Відображення товарів з кошика на сторінці оформлення
function displayOrderItems() {
    console.log('📦 Відображення товарів, кошик:', cart);
    
    var orderItemsContainer = document.getElementById('orderItems');
    var orderTotalElement = document.getElementById('orderTotalPrice');
    
    if (!orderItemsContainer) {
        console.log('⚠️ orderItems контейнер не знайдено');
        return;
    }
    
    if (!cart || cart.length === 0) {
        orderItemsContainer.innerHTML = '<p style="color: #b8b8b8; text-align: center; padding: 2rem; background: rgba(157, 78, 221, 0.1); border-radius: 10px;">Кошик порожній. <a href="products.html" style="color: var(--accent-color);">Перейти до покупок</a></p>';
        if (orderTotalElement) {
            orderTotalElement.textContent = '0 грн';
        }
        return;
    }
    
    orderItemsContainer.innerHTML = '';
    var totalPrice = 0;
    
    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var itemTotal = item.product.price * item.quantity;
        totalPrice += itemTotal;
        
        var emoji = item.product.category.includes('Рідинне') ? '❄️' : '🌀';
        
        var itemDiv = document.createElement('div');
        itemDiv.style.padding = '1.5rem';
        itemDiv.style.background = 'rgba(157, 78, 221, 0.1)';
        itemDiv.style.borderRadius = '12px';
        itemDiv.style.marginBottom = '1rem';
        itemDiv.style.display = 'flex';
        itemDiv.style.justifyContent = 'space-between';
        itemDiv.style.alignItems = 'center';
        itemDiv.style.gap = '1rem';
        itemDiv.style.border = '1px solid var(--border-color)';
        itemDiv.style.transition = 'all 0.3s ease';
        
        itemDiv.innerHTML = 
            '<div style="font-size: 2.5rem;">' + emoji + '</div>' +
            '<div style="flex: 1;">' +
                '<strong style="color: var(--accent-color); font-size: 1.1rem;">' + item.product.name + '</strong><br>' +
                '<span style="color: var(--text-secondary); font-size: 0.9rem;">' + item.product.category + '</span><br>' +
                '<span style="color: var(--text-secondary);">' + item.quantity + ' шт. × ' + item.product.price.toLocaleString('uk-UA') + ' грн</span>' +
            '</div>' +
            '<div style="text-align: right;">' +
                '<div style="font-weight: bold; color: var(--accent-color); font-size: 1.3rem;">' + itemTotal.toLocaleString('uk-UA') + ' грн</div>' +
            '</div>';
        
        orderItemsContainer.appendChild(itemDiv);
    }
    
    if (orderTotalElement) {
        orderTotalElement.textContent = totalPrice.toLocaleString('uk-UA') + ' грн';
    }
    
    console.log('✅ Відображено товарів:', cart.length, 'Сума:', totalPrice);
}

// Обробка форми замовлення
function initCheckoutForm() {
    var form = document.getElementById('orderForm');
    if (!form) {
        console.log('⚠️ orderForm не знайдено');
        return;
    }
    
    console.log('✅ orderForm знайдено, додаємо обробник');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        console.log('📝 Форма відправлена, перевірка кошика...');
        
        if (!cart || cart.length === 0) {
            showModal('Помилка', 'Кошик порожній! Додайте товари перед оформленням замовлення.');
            return;
        }
        
        var formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        console.log('📋 Дані форми:', formData);
        
        if (validateCheckoutForm(formData)) {
            processCheckoutOrder(formData);
        }
    });
    
    console.log('✅ Обробник форми встановлено');
}

// Валідація форми
function validateCheckoutForm(data) {
    if (!data.name.trim()) {
        showModal('Помилка', 'Будь ласка, введіть ваше ім\'я');
        return false;
    }
    
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showModal('Помилка', 'Будь ласка, введіть коректний email');
        return false;
    }
    
    var phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(data.phone) || data.phone.replace(/\D/g, '').length < 9) {
        showModal('Помилка', 'Будь ласка, введіть коректний номер телефону');
        return false;
    }
    
    return true;
}

// Обробка замовлення
function processCheckoutOrder(data) {
    console.log('⚙️ Обробка замовлення...');
    
    // Формуємо список продуктів для email (ВИПРАВЛЕНО - emoji в img тегах)
    var productsListHTML = '';
    var totalPrice = 0;
    
    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var itemTotal = item.product.price * item.quantity;
        totalPrice += itemTotal;
        
        // Використовуємо img теги замість emoji для кращої сумісності
        var emojiImg = item.product.category.includes('Рідинне') 
            ? '❄️' // Unicode emoji
            : '🌀';
        
        productsListHTML += 
            '<div style="background: #f9f9f9; padding: 20px; margin: 15px 0; border-radius: 12px; border-left: 4px solid #9d4edd; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">' +
                '<table width="100%" cellpadding="0" cellspacing="0" border="0">' +
                    '<tr>' +
                        '<td width="60" style="font-size: 50px; vertical-align: middle;">' + emojiImg + '</td>' +
                        '<td style="padding: 0 15px; vertical-align: middle;">' +
                            '<h3 style="margin: 0 0 8px 0; color: #7b2cbf; font-size: 18px;">' + item.product.name + '</h3>' +
                            '<p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">' + item.product.category + '</p>' +
                            '<p style="margin: 0; color: #333;"><strong>Кількість:</strong> ' + item.quantity + ' шт. × ' + item.product.price.toLocaleString('uk-UA') + ' грн</p>' +
                        '</td>' +
                        '<td width="120" style="text-align: right; vertical-align: middle;">' +
                            '<p style="margin: 0; font-size: 24px; font-weight: bold; color: #9d4edd;">' + itemTotal.toLocaleString('uk-UA') + ' грн</p>' +
                        '</td>' +
                    '</tr>' +
                '</table>' +
            '</div>';
    }
    
    // Генеруємо унікальний ID замовлення
    var orderId = 'ORD-' + Date.now();
    var confirmUrl = window.location.origin + '/site.atestaciyna/confirm-order.html?order=' + orderId;
    
    var orderData = {
        customerName: data.name,
        customerEmail: data.email,
        customerPhone: data.phone,
        productsListHTML: productsListHTML,
        totalPrice: totalPrice.toLocaleString('uk-UA') + ' грн',
        message: data.message || 'Без додаткових коментарів',
        orderDate: new Date().toLocaleString('uk-UA'),
        orderId: orderId,
        confirmUrl: confirmUrl
    };
    
    console.log('📧 Підготовлено дані для відправки:', orderData);
    
    sendCheckoutEmail(orderData);
}

// Відправка email
function sendCheckoutEmail(orderData) {
    var submitBtn = document.getElementById('submitBtn');
    var originalText = submitBtn.innerHTML;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Відправка...</span>';
    
    var templateParams = {
        to_email: orderData.customerEmail,
        customer_name: orderData.customerName,
        customer_email: orderData.customerEmail,
        customer_phone: orderData.customerPhone,
        products_html: orderData.productsListHTML,
        total_price: orderData.totalPrice,
        customer_message: orderData.message,
        order_date: orderData.orderDate,
        order_id: orderData.orderId,
        confirm_url: orderData.confirmUrl
    };
    
    console.log('📧 Відправка email через EmailJS:', templateParams);
    
    emailjs.send(EMAILJS_CONFIG.serviceID, EMAILJS_CONFIG.templateID, templateParams)
        .then(function(response) {
            console.log('✅ Email відправлено успішно!', response);
            showCheckoutSuccess(orderData);
            
            // Очищаємо кошик після успішного замовлення
            cart = [];
            saveCart();
            
            document.getElementById('orderForm').reset();
            displayOrderItems();
            
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        })
        .catch(function(error) {
            console.error('❌ Помилка відправки email:', error);
            
            var errorMsg = 'Помилка відправки замовлення.';
            if (error.text) {
                errorMsg += ' Деталі: ' + error.text;
            }
            
            showModal('Помилка', errorMsg + '\n\nБудь ласка, зв\'яжіться з нами за телефоном: +380 44 123 45 67');
            
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        });
}

// Показати успішне замовлення
function showCheckoutSuccess(orderData) {
    var productsListHTML = '';
    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var emoji = item.product.category.includes('Рідинне') ? '❄️' : '🌀';
        productsListHTML += '<p style="margin: 8px 0; padding: 10px; background: rgba(157, 78, 221, 0.1); border-radius: 8px;"><span style="font-size: 1.5rem;">' + emoji + '</span> <strong>' + item.product.name + '</strong> (' + item.quantity + ' шт.) - ' + (item.product.price * item.quantity).toLocaleString('uk-UA') + ' грн</p>';
    }
    
    var modalBody = '<div style="text-align: center; padding: 30px;">' +
        '<div style="font-size: 80px; color: #9d4edd; margin-bottom: 20px; animation: successPulse 1s ease-in-out;">✓</div>' +
        '<h2 style="color: #9d4edd; margin-bottom: 15px; font-size: 2rem;">Замовлення прийнято!</h2>' +
        '<p style="color: #b8b8b8; margin-bottom: 20px; font-size: 1.1rem;">Дякуємо, ' + orderData.customerName + '! 🎉</p>' +
        '<div style="background: rgba(157, 78, 221, 0.1); padding: 25px; border-radius: 15px; margin: 25px 0; text-align: left; border: 1px solid var(--border-color);">' +
        '<h3 style="color: #9d4edd; margin-bottom: 15px; text-align: center;">📦 Ваше замовлення ' + orderData.orderId + '</h3>' +
        productsListHTML +
        '<hr style="border: none; border-top: 2px solid var(--border-color); margin: 20px 0;">' +
        '<p style="margin: 15px 0; font-size: 1.4rem; text-align: center;"><strong>Загальна сума:</strong> <span style="color: #c77dff; font-size: 1.6rem;">' + orderData.totalPrice + '</span></p>' +
        '</div>' +
        '<div style="background: #fff8e1; border: 2px solid #ffd54f; border-radius: 12px; padding: 20px; margin: 20px 0;">' +
        '<p style="color: #333; margin-bottom: 10px; font-size: 1.1rem;"><strong>📧 Перевірте вашу пошту!</strong></p>' +
        '<p style="color: #666; margin: 0; font-size: 0.95rem;">Підтвердження відправлено на: <strong style="color: #7b2cbf;">' + orderData.customerEmail + '</strong></p>' +
        '<p style="color: #666; margin: 10px 0 0 0; font-size: 0.9rem;">⚠️ Не забудьте перевірити папку "Спам"</p>' +
        '</div>' +
        '<p style="color: #b8b8b8; font-size: 1rem; margin-bottom: 10px;">Натисніть кнопку <strong style="color: #9d4edd;">"ПІДТВЕРДИТИ ЗАМОВЛЕННЯ"</strong> в email</p>' +
        '<p style="color: #b8b8b8; font-size: 1rem;">Наш менеджер зв\'яжеться з вами протягом 1-2 годин! 📞</p>' +
        '<a href="index.html" class="btn btn-primary" style="margin-top: 25px; display: inline-block; text-decoration: none;">Повернутися на головну</a>' +
        '</div>';
    
    var modal = document.getElementById('modal');
    var modalBodyElement = document.getElementById('modalBody');
    
    modalBodyElement.innerHTML = modalBody;
    modal.style.display = 'block';
}

// Ініціалізація при завантаженні сторінки contact.html
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 DOMContentLoaded - перевірка сторінки...');
    console.log('📍 Поточна сторінка:', window.location.pathname);
    
    // Перевіряємо чи це сторінка contact.html
    if (window.location.pathname.includes('contact.html') || document.getElementById('orderItems')) {
        console.log('✅ Це сторінка оформлення замовлення!');
        
        // Завантажуємо кошик
        if (typeof loadCart === 'function') {
            loadCart();
            console.log('✅ Кошик завантажено');
        } else {
            console.log('⚠️ Функція loadCart не знайдена');
        }
        
        // Відображаємо товари
        setTimeout(function() {
            displayOrderItems();
            console.log('✅ displayOrderItems викликано');
        }, 100);
        
        // Ініціалізуємо форму
        initCheckoutForm();
        
        // Ініціалізуємо модальне вікно
        if (typeof initModal === 'function') {
            initModal();
            console.log('✅ Modal ініціалізовано');
        }
    }
});


console.log('✅ checkout.js повністю завантажено');


