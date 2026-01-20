// =============================================
// CORSAR - Покращений JavaScript
// =============================================

// === КОНФІГУРАЦІЯ EMAILJS ===
const EMAILJS_CONFIG = {
    serviceID: 'service_h62fto9',
    templateID: 'template_rykn568',
    publicKey: 'MIot4KpfOpWeL38hF'
};

// === ДАНІ ПРОДУКТІВ ===
const products = [
    {
        id: 1,
        name: "CORSAR Arctic Pro 360",
        category: "Рідинне охолодження",
        price: 4999,
        image: "products/arctic-pro-360.jpg",
        description: "Преміальна система рідинного охолодження з радіатором 360мм для екстремального розгону.",
        specs: [
            "Радіатор: 360мм (3x120мм)",
            "Підсвітка: RGB",
            "TDP: до 350W",
            "Шум: 18-32 дБ",
            "Гарантія: 5 років"
        ]
    },
    {
        id: 2,
        name: "CORSAR Frost Tower X",
        category: "Повітряне охолодження",
        price: 2499,
        image: "products/frost-tower-x.jpg",
        description: "Потужний башточний кулер з 6 тепловими трубками для високопродуктивних систем.",
        specs: [
            "Теплові трубки: 6x6мм",
            "Вентилятор: 140мм PWM",
            "TDP: до 220W",
            "Шум: 19-28 дБ",
            "Гарантія: 3 роки"
        ]
    },
    {
        id: 3,
        name: "CORSAR Hydro Elite 280",
        category: "Рідинне охолодження",
        price: 4299,
        image: "products/hydro-elite-280.jpg",
        description: "Компактна система рідинного охолодження з відмінним балансом продуктивності та тиші.",
        specs: [
            "Радіатор: 280мм (2x140мм)",
            "Підсвітка: RGB",
            "TDP: до 300W",
            "Шум: 20-30 дБ",
            "Гарантія: 5 років"
        ]
    },
    {
        id: 4,
        name: "CORSAR Breeze Compact",
        category: "Повітряне охолодження",
        price: 899,
        image: "products/breeze-compact.jpg",
        description: "Компактний кулер для офісних та мультимедійних систем з низьким рівнем шуму.",
        specs: [
            "Теплові трубки: 3x6мм",
            "Вентилятор: 92мм PWM",
            "TDP: до 95W",
            "Шум: 15-24 дБ",
            "Гарантія: 2 роки"
        ]
    },
    {
        id: 5,
        name: "CORSAR Glacier 240",
        category: "Рідинне охолодження",
        price: 3699,
        image: "products/glacier-240.jpg",
        description: "Ідеальне рішення для ігрових систем середнього класу з RGB підсвіткою.",
        specs: [
            "Радіатор: 240мм (2x120мм)",
            "Підсвітка: RGB",
            "TDP: до 250W",
            "Шум: 21-29 дБ",
            "Гарантія: 4 роки"
        ]
    },
    {
        id: 6,
        name: "CORSAR Titan Dual",
        category: "Повітряне охолодження",
        price: 1899,
        image: "products/titan-dual.jpg",
        description: "Двовежова система з двома вентиляторами для максимальної ефективності охолодження.",
        specs: [
            "Теплові трубки: 5x6мм",
            "Вентилятори: 2x120мм PWM",
            "TDP: до 180W",
            "Шум: 18-26 дБ",
            "Гарантія: 3 роки"
        ]
    }
];

// =============================================
// PRELOADER (ЕКРАН ЗАВАНТАЖЕННЯ)
// =============================================
window.addEventListener('load', function() {
    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('hidden');
        }
    }, 1500); // Затримка 1.5 секунди
});

// =============================================
// ІНІЦІАЛІЗАЦІЯ ПРИ ЗАВАНТАЖЕННІ
// =============================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 CORSAR - Сайт завантажується...');
    
    // Ініціалізація всіх компонентів
    initProducts();
    initMobileMenu();
    initSmoothScroll();
    initHeaderScroll();
    initScrollToTop();
    initAOS();
    initFAQ();
    initCounters();
    initProductFilters();
    initModal();
    
    console.log('✅ Всі компоненти ініціалізовано успішно!');
});

// =============================================
// ПРОДУКТИ
// =============================================
function initProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    if (!productsGrid) {
        console.log('ℹ️ Сітка продуктів не знайдена');
        return;
    }
    
    // Показуємо перші 6 продуктів на головній
    const productsToShow = window.location.pathname.includes('products.html') ? products : products.slice(0, 6);
    
    for (let i = 0; i < productsToShow.length; i++) {
        const product = productsToShow[i];
        const productCard = createProductCard(product, i);
        productsGrid.appendChild(productCard);
    }
    
    console.log('✓ Завантажено продуктів:', productsToShow.length);
}

function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-aos', 'fade-up');
    card.setAttribute('data-aos-delay', (index % 3) * 100);
    card.setAttribute('data-category', product.category.includes('Рідинне') ? 'liquid' : 'air');
    
    let specsHTML = '';
    for (let i = 0; i < product.specs.length; i++) {
        specsHTML += '<li>' + product.specs[i] + '</li>';
    }
    
    const emoji = product.category.includes('Рідинне') ? '❄️' : '🌀';
    
    card.innerHTML = 
        '<div class="product-image">' + emoji + '</div>' +
        '<div class="product-info">' +
            '<h3>' + product.name + '</h3>' +
            '<p>' + product.description + '</p>' +
            '<div class="product-specs"><ul>' + specsHTML + '</ul></div>' +
            '<div class="product-price">' + product.price.toLocaleString('uk-UA') + ' грн</div>' +
            '<button class="btn btn-primary" onclick="selectProduct(' + product.id + ')">' +
                '<span>Замовити</span>' +
                '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                    '<path d="M5 12h14M12 5l7 7-7 7"/>' +
                '</svg>' +
            '</button>' +
        '</div>';
    
    return card;
}

function selectProduct(productId) {
    addToCart(productId, 1);
}

// =============================================
// ФІЛЬТРИ ПРОДУКТІВ
// =============================================
function initProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    if (filterBtns.length === 0) return;
    
    for (let i = 0; i < filterBtns.length; i++) {
        filterBtns[i].addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Оновлюємо активну кнопку
            for (let j = 0; j < filterBtns.length; j++) {
                filterBtns[j].classList.remove('active');
            }
            this.classList.add('active');
            
            // Фільтруємо продукти
            filterProducts(filter);
        });
    }
}

function filterProducts(filter) {
    const productCards = document.querySelectorAll('.product-card');
    
    for (let i = 0; i < productCards.length; i++) {
        const card = productCards[i];
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || filter === category) {
            card.style.display = 'flex';
            card.style.animation = 'fadeIn 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    }
}

// =============================================
// МОБІЛЬНЕ МЕНЮ
// =============================================
function initMobileMenu() {
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('navLinks');
    
    if (!burger || !navLinks) return;
    
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });
    
    const links = navLinks.querySelectorAll('a');
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function() {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        });
    }
    
    console.log('✓ Мобільне меню ініціалізовано');
}

// =============================================
// ПЛАВНА ПРОКРУТКА
// =============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    console.log('✓ Плавна прокрутка ініціалізована');
}

// =============================================
// HEADER ПРИ ПРОКРУТЦІ
// =============================================
function initHeaderScroll() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    console.log('✓ Header scroll ініціалізовано');
}

// =============================================
// SCROLL TO TOP
// =============================================
function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    console.log('✓ Scroll to top ініціалізовано');
}

// =============================================
// AOS (ANIMATE ON SCROLL)
// =============================================
function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver(function(entries) {
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                entries[i].target.classList.add('aos-animate');
            }
        }
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    for (let i = 0; i < elements.length; i++) {
        observer.observe(elements[i]);
    }
    
    console.log('✓ AOS animations ініціалізовано');
}

// =============================================
// COUNTERS (АНІМОВАНІ ЛІЧИЛЬНИКИ)
// =============================================
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver(function(entries) {
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].isIntersecting) {
                animateCounter(entries[i].target);
                observer.unobserve(entries[i].target);
            }
        }
    }, { threshold: 0.5 });
    
    for (let i = 0; i < counters.length; i++) {
        observer.observe(counters[i]);
    }
    
    console.log('✓ Counters ініціалізовано');
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(function() {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// =============================================
// FAQ TOGGLE
// =============================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    for (let i = 0; i < faqItems.length; i++) {
        const question = faqItems[i].querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                const item = this.parentElement;
                const wasActive = item.classList.contains('active');
                
                // Закриваємо всі інші
                for (let j = 0; j < faqItems.length; j++) {
                    faqItems[j].classList.remove('active');
                }
                
                // Відкриваємо поточний (якщо він не був активним)
                if (!wasActive) {
                    item.classList.add('active');
                }
            });
        }
    }
    
    console.log('✓ FAQ toggle ініціалізовано');
}

// =============================================
// МОДАЛЬНІ ВІКНА
// =============================================
function initModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.style.display = 'none';
        };
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
    
    console.log('✓ Modal ініціалізовано');
}

function showModal(title, message) {
    const modalBody = 
        '<div style="text-align: center; padding: 20px;">' +
            '<h2 style="color: #9d4edd; margin-bottom: 20px;">' + title + '</h2>' +
            '<p style="color: #b8b8b8; font-size: 1.1rem;">' + message + '</p>' +
        '</div>';
    
    const modal = document.getElementById('modal');
    const modalBodyElement = document.getElementById('modalBody');
    
    modalBodyElement.innerHTML = modalBody;
    modal.style.display = 'block';
}

// =============================================
// ФОРМИ ТА ЗАМОВЛЕННЯ
// =============================================
function initOrderForm() {
    const form = document.getElementById('orderForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value
        };
        
        if (validateForm(formData)) {
            processOrder(formData);
        }
    });
    
    console.log('✓ Order form ініціалізовано');
}

function validateForm(data) {
    if (!data.name.trim()) {
        showModal('Помилка', 'Будь ласка, введіть ваше ім\'я');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showModal('Помилка', 'Будь ласка, введіть коректний email');
        return false;
    }
    
    const phoneRegex = /^[\d\s\+\-\(\)]+$/;
    if (!phoneRegex.test(data.phone) || data.phone.replace(/\D/g, '').length < 9) {
        showModal('Помилка', 'Будь ласка, введіть коректний номер телефону');
        return false;
    }
    
    return true;
}

function processOrder(data) {
    console.log('Обробка замовлення:', data);
    showModal('Дякуємо!', 'Ваше замовлення прийнято. Ми зв\'яжемося з вами найближчим часом!');
}

// =============================================
// ПРЕЗЕНТАЦІЯ
// =============================================
function loadPresentation() {
    const frame = document.getElementById('presentationFrame');
    const note = document.querySelector('.presentation-note');
    if (!frame) return;
    
    const pptxUrl = 'presentation.pptx';
    const pdfUrl = 'presentation.pdf';
    
    fetch(pptxUrl, { method: 'HEAD' })
        .then(function(response) {
            if (response.ok) {
                const currentUrl = window.location.href.replace('index.html', '').replace('media.html', '');
                const presentationFullUrl = currentUrl + pptxUrl;
                frame.src = 'https://view.officeapps.live.com/op/embed.aspx?src=' + encodeURIComponent(presentationFullUrl);
                
                if (note) {
                    note.innerHTML = '<strong>✓ Презентація завантажена!</strong> Використовуйте стрілки для гортання слайдів';
                    note.style.background = 'rgba(76, 175, 80, 0.1)';
                    note.style.borderLeftColor = '#4caf50';
                }
                console.log('✓ PowerPoint презентація завантажена');
            } else {
                tryLoadPDF();
            }
        })
        .catch(function(error) {
            tryLoadPDF();
        });
    
    function tryLoadPDF() {
        fetch(pdfUrl, { method: 'HEAD' })
            .then(function(response) {
                if (response.ok) {
                    frame.src = pdfUrl;
                    if (note) {
                        note.innerHTML = '<strong>✓ PDF презентація завантажена!</strong>';
                        note.style.background = 'rgba(76, 175, 80, 0.1)';
                        note.style.borderLeftColor = '#4caf50';
                    }
                    console.log('✓ PDF презентація завантажена');
                } else {
                    showPresentationInstructions();
                }
            })
            .catch(function(error) {
                showPresentationInstructions();
            });
    }
    
    function showPresentationInstructions() {
        if (note) {
            note.innerHTML = '<strong>📊 Як додати презентацію:</strong><br><br>' +
                '<strong>Варіант 1:</strong> Покладіть файл <strong>presentation.pptx</strong> в корінь папки сайту<br>' +
                '<strong>Варіант 2:</strong> Покладіть файл <strong>presentation.pdf</strong> в корінь папки сайту';
        }
        console.log('ℹ️ Презентація не знайдена');
    }
}

function loadBrochure() {
    const frame = document.getElementById('brochureFrame');
    const note = document.querySelector('.brochure-note');
    if (!frame) return;
    
    const brochureUrl = 'brochure.pdf';
    
    fetch(brochureUrl, { method: 'HEAD' })
        .then(function(response) {
            if (response.ok) {
                frame.src = brochureUrl;
                if (note) {
                    note.innerHTML = '<strong>✓ Буклет завантажено!</strong>';
                    note.style.background = 'rgba(76, 175, 80, 0.1)';
                    note.style.borderLeftColor = '#4caf50';
                }
                console.log('✓ Буклет завантажено');
            } else {
                if (note) {
                    note.innerHTML = '<strong>📄 Як додати буклет:</strong><br>Покладіть файл <strong>brochure.pdf</strong> в корінь папки';
                }
                console.log('ℹ️ Буклет не знайдено');
            }
        })
        .catch(function(error) {
            if (note) {
                note.innerHTML = '<strong>📄 Як додати буклет:</strong><br>Покладіть файл <strong>brochure.pdf</strong> в корінь папки';
            }
            console.log('ℹ️ Буклет не знайдено');
        });
}

function downloadBrochure() {
    window.open('brochure.pdf', '_blank');
}

console.log('✅ CORSAR JavaScript завантажено успішно!');
