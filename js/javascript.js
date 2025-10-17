// Seleziona gli elementi
const menuToggle = document.getElementById('menuToggle');
const closeSidebar = document.getElementById('closeSidebar');
const sidebar = document.getElementById('sidebar');

// Funzione per aprire la sidebar
menuToggle.addEventListener('click', () => {
    sidebar.classList.add('open');
    menuToggle.setAttribute('aria-expanded', 'true');
});

// Funzione per chiudere la sidebar
closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
});

// Opzionale: chiudere la sidebar se si ridimensiona a desktop mentre è aperta
window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
        sidebar.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
});