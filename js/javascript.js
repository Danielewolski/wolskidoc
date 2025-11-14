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

document.addEventListener('DOMContentLoaded', function() {

    // NUOVA FUNZIONE: Genera la navigazione della sidebar
    function renderSidebar(data) {
        const sidebarContent = document.querySelector('.sidebar-content');
        
        // Funzione helper per creare l'HTML della lista interna (accordion-item)
        function createAccordionGroup(group) {
            const listItems = group.links.map(link => 
                `<li class="list-item"><a href="#${link.id}">${link.text}</a></li>`
            ).join('');

            return `
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        ${group.header}
                        <span class="toggle-icon">+</span>
                    </h2>
                    <div class="accordion-content">
                        <ul>${listItems}</ul>
                    </div>
                </div>
            `;
        }
        
        // Itera sulla struttura dati principale (main-accordion-item)
        data.forEach(mainSection => {
            const mainGroup = document.createElement('div');
            mainGroup.className = 'main-accordion-item';

            // Costruisce l'intestazione principale (Glossary)
            const mainHeaderHTML = `
                <h1 class="main-accordion-header">
                    ${mainSection.title}
                    <span class="main-toggle-icon">+</span>
                </h1>
            `;
            
            // Costruisce il contenuto principale (main-accordion-content)
            const subGroupsHTML = mainSection.groups.map(createAccordionGroup).join('');
            const mainContentHTML = `
                <div class="main-accordion-content">
                    <div class="accordion">
                        ${subGroupsHTML}
                    </div>
                </div>
            `;

            mainGroup.innerHTML = mainHeaderHTML + mainContentHTML;
            sidebarContent.appendChild(mainGroup);
        });
    }

    // CHIAMATA ALLA FUNZIONE: Esegue il rendering della sidebar con i dati
    renderSidebar(sidebarData);

    // Funzione generica per gestire il toggle di qualsiasi accordion
    function setupAccordion(headerSelector, contentSelector, iconSelector) {
        const headers = document.querySelectorAll(headerSelector);

        headers.forEach(header => {
            header.addEventListener('click', function() {
                // Il contenitore del gruppo (main-accordion-item o accordion-item)
                const item = this.closest(headerSelector.includes('main') ? '.main-accordion-item' : '.accordion-item');
                // Il contenuto da aprire/chiudere
                const content = item.querySelector(contentSelector);
                // L'icona +/-
                const icon = item.querySelector(iconSelector);

                // Toggle della classe 'open'
                content.classList.toggle('open');

                // Aggiornamento dell'icona
                if (content.classList.contains('open')) {
                    icon.textContent = '-';
                } else {
                    icon.textContent = '+';
                }
            });
        });
    }

    // A. Setup per l'accordion PRINCIPALE (Glossary)
    setupAccordion('.main-accordion-header', '.main-accordion-content', '.main-toggle-icon');

    // B. Setup per gli accordion SECONDARI (Fondamenti, Architettura)
    setupAccordion('.accordion-header', '.accordion-content', '.toggle-icon');
});










// Dati che definiscono la struttura della sidebar e i link
const sidebarData = [
    {
        title: "Glossary",
        isMain: true, // Indica che questo è il container principale
        groups: [
            {
                header: "Fondamenti di Programmazione e Strutture Dati",
                links: [
                    { text: "Logica & Linguaggi", id: "logica-linguaggi" },
                    { text: "Dati & Strutture", id: "dati-strutture" },
                    { text: "Contesto & Ambito", id: "contesto-ambito" },
                    { text: "Scripting & Runtime", id: "scripting-runtime" },
                ]
            },
            {
                header: "Architettura Web e Reti (Networking)",
                links: [
                    { text: "Protocolli Web", id: "protocolli-web" },
                    { text: "Internet & Rete", id: "internet-rete" },
                    { text: "Comunicazione & Dati", id: "comunicazione-dati" },
                    { text: "Sicurezza delle Reti", id: "sicurezza-reti" },
                ]
            },
            {
                header: "Sicurezza (Cryptography e Web Security)",
                links: [
                    { text: "Criptografia & Algoritmi", id: "criptografia-algoritmi" },
                    { text: "Protocolli Sicuri", id: "protocolli-sicuri" },
                    { text: "Vulnerabilità Web", id: "vulnerabilita-web" },
                    { text: "Gestione Accessi", id: "gestione-accessi" },
                ]
            },
            {
                header: "Front-End Development e Design (HTML, CSS, JavaScript)",
                links: [
                    { text: "Markup & Struttura", id: "markup-struttura" },
                    { text: "Stile & Layout (CSS)", id: "stile-layout" },
                    { text: "Interattività & Scripting", id: "interattivita-scripting" },
                    { text: "User Interface (UI/UX)", id: "ui-ux" },
                    { text: "Grafica & Media", id: "grafica-media" },
                ]
            },
            {
                header: "Browser e Motori",
                links: [
                    { text: "Browser", id: "browser" },
                    { text: "Motori", id: "motori" },
                    { text: "Contesto Browser", id: "contesto-browser" },
                    { text: "Prestazioni", id: "prestazioni" },
                ]
            },
            {
                header: "Sviluppo e Strumenti (DevOps e Processo)",
                links: [
                    { text: "Strumenti e Metodi", id: "strumenti-metodi" },
                    { text: "Testing & Debug", id: "testing-debug" },
                    { text: "Strutture Informatiche", id: "strutture-informatiche" },
                ]
            },
            {
                header: "Acronimi e Terminologia Specifica",
                links: [
                    { text: "Acronimi Rilevanti", id: "acronimi-rilevanti" },
                ]
            },
            {
                header: "Tipografia e Contenuti (Accessibilità e Media)",
                links: [
                    { text: "Tipografia", id: "tipografia" },
                    { text: "Accessibilità", id: "accessibilita" },
                    { text: "Geolocalizzazione", id: "geolocalizzazione" },
                ]
            },
            {
                header: "Cloud, Database e Strutture Dati",
                links: [
                    { text: "Cloud & DB", id: "cloud-db" },
                    { text: "Dati & Storage", id: "dati-storage" },
                ]
            },
        ]
    },
    // Aggiungi qui altre sezioni principali (es. "Getting Started", "API Reference", ecc.)
];

const glossTerms = [
    {
        main: "Glossary",
        groups: [
            {
                title: "Fondamenti di programmazione e struttura dati",
                groups: [
                    {
                        category: "Logica & Linguaggi",
                        terms: ["Algoritmo (Algorithm)", "Programmazione informatica (Computer Programming)", "Flusso di controllo (Control flow)", 
                            "Funzione (Function)", "IIFE", "Metodo (Method)", "Argomento (Argument)", "Parametro (Parameter)", "Firma di funzione (Function signature)",
                            "API", "Tipo (Type)", "Tipo coercizione (Type coercion)", "Conversione di tipo (Type conversion)", "Tipizzazione statica (Static typing)",
                            "Tipizzazione dinamica (Dynamic typing)", "Sintassi (Syntax)", "Errore di sintassi (Syntax error)", "Dichiarazione (Statement)",
                            "Costante (Constant)", "Variabile (Variable)", "Parola chiave (Keyword)", "Letterale (Literal)", "Simbolo (Symbol)", "Identificatore (Identifier)",
                            "Interpolazione (Interpolation)", "Compilazione (Compile)", "Tempo di compilazione (Compile time)", "Compilazione Just-In-Time (JIT)",
                            "Interprete (Interpeter)", "Astrazione (Abstraction)", "Incapsulamento (Encapsulation)", "Eredità (Inheritance)", "Polimorfismo (Polymorphism)",
                            "Overloading/Overriding", "Programmazione orientata agli oggetti (OOP - Object-Oriented Programming)",
                            "Classe (Class)", "Istanza (Instance)", "Costruttore (Constructor)", "Prototipo (Prototype)",
                            "Programmazione basata su prototipi (Prototype-based programming)", "Garbage collection", "Flag bit a bit (Bitwise flags)",
                            "Condizione (Condition)", "Loop", "Ricorsione (Recursion)", 
                        ]
                    },
                    {
                        category: "Dati & Strutture",
                        terms: []
                    },
                    {
                        category: "Contesto & Ambito",
                        terms: []
                    },
                    {
                        category: "Scripting & Runtime",
                        terms: []
                    }
                ]
            }
        ]
    }
]
