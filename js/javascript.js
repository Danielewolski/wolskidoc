////Sidebar
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

////Reload page
// 1. Salva la posizione di scroll prima di lasciare/aggiornare la pagina
window.addEventListener('beforeunload', function() {
    // Salva la posizione verticale di scroll (scrollY) nel sessionStorage
    // sessionStorage è perfetto perché i dati vengono eliminati quando il tab/browser si chiude
    sessionStorage.setItem('scrollPosition', window.scrollY);
});

// 2. Ripristina la posizione di scroll al caricamento della pagina
window.addEventListener('load', function() {
    // Controlla se una posizione di scroll è stata salvata
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    
    if (scrollPosition) {
        // Esegue lo scroll alla posizione salvata.
        // Il 'scrollPosition' è una stringa, ma 'scrollTo' la gestisce correttamente.
        window.scrollTo(0, parseInt(scrollPosition));
        
        // Opzionale: Rimuovi la posizione salvata per le visite successive
        // sessionStorage.removeItem('scrollPosition');
    }
});
