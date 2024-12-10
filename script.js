// Глобальные переменные
let isSidebarOpen = false;

// Функция управления боковой панелью
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    const content = document.querySelector('.content');
    const body = document.body;
    const mobileNavBtn = document.querySelector('.mobile-nav-btn');
    
    isSidebarOpen = !isSidebarOpen;
    
    if (isSidebarOpen) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        body.classList.add('menu-open');
        mobileNavBtn.innerHTML = '<i class="fas fa-times"></i>';
        
        // Анимация пунктов меню
        document.querySelectorAll('.nav-links li').forEach((item, index) => {
            item.style.setProperty('--i', index);
        });
    } else {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
        mobileNavBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
}

// Функции для работы с активной вкладкой
function saveActiveTab(tabId) {
    localStorage.setItem('activeTab', tabId);
}

function getActiveTab() {
    return localStorage.getItem('activeTab') || 'algorithms';
}

// Функция для переключения разделов
function switchTab(tabId) {
    // Скрываем все разделы
    document.querySelectorAll('.topic-content').forEach(topic => {
        topic.classList.add('hidden');
    });
    
    // Показываем нужный раздел
    const selectedTopic = document.getElementById(tabId);
    if (selectedTopic) {
        selectedTopic.classList.remove('hidden');
    }
    
    // Обновляем активный пункт меню
    document.querySelectorAll('.nav-links li').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.topic === tabId) {
            link.classList.add('active');
        }
    });
    
    // Сохраняем выбор
    saveActiveTab(tabId);
}

// Функция для переключения типов алгоритмов
function initAlgorithmTypes() {
    const tabButtons = document.querySelectorAll('.types-tabs .tab-btn');
    const typeContents = document.querySelectorAll('.type-content');

    function showAlgorithmType(typeId) {
        // Скрываем все содержимое
        typeContents.forEach(content => {
            content.classList.remove('active');
        });

        // Убираем активный класс у всех кнопок
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // Показываем выбранное содержимое и активируем кнопку
        const selectedContent = document.getElementById(typeId);
        const selectedButton = document.querySelector(`[data-type="${typeId}"]`);
        
        if (selectedContent) {
            selectedContent.classList.add('active');
        }
        
        if (selectedButton) {
            selectedButton.classList.add('active');
        }
    }

    // Добавляем обработчики для кнопок
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const typeId = button.dataset.type;
            showAlgorithmType(typeId);
        });
    });

    // Показываем линейный алгоритм по умолчанию
    showAlgorithmType('linear');
}

// Обновим инициализацию
document.addEventListener('DOMContentLoaded', () => {
    // Инициализация навигации
    const navLinks = document.querySelectorAll('.nav-links li');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const topic = link.dataset.topic;
            switchTab(topic);
            
            // Закрываем меню на мобильных после выбора раздела
            if (window.innerWidth <= 768 && isSidebarOpen) {
                toggleSidebar();
            }
        });
    });

    // Восстанавливаем последний активный раздел
    const activeTab = getActiveTab();
    switchTab(activeTab);
    
    // Добавляем мобильную кнопку и оверлей
    const mobileNavBtn = document.createElement('button');
    mobileNavBtn.className = 'mobile-nav-btn';
    mobileNavBtn.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.appendChild(mobileNavBtn);

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // Обработчики событий для мобильного меню
    mobileNavBtn.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', () => {
        if (isSidebarOpen) toggleSidebar();
    });

    // Обработчик изменения размера окна
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768 && isSidebarOpen) {
                toggleSidebar();
            }
        }, 100);
    }, { passive: true });

    // Инициализация типов алгоритмов
    initAlgorithmTypes();
}); 