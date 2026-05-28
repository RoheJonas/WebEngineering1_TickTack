'use strict';


// Übersetzungen für Begrüßungen in verschiedenen Sprachen
const translations = {
    de: {
        morning: 'Moooooin',
        day: 'Guten Tag',
        evening: 'Guten Abend',
        weekday: 'nett, dass Sie vorbeischauen!',
        weekend: 'Schönes Wochenende! Genießen Sie Ihre (noch) freie Zeit!',
        days: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
        months: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
            'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
    },
    en: {
        morning: 'Good Morning',
        day: 'Good Day',
        evening: 'Good Evening',
        weekday: 'Nice to see you!',
        weekend: 'Happy Weekend! Enjoy your free time!',
        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        months: ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December']
    },
};

// Aktuelle Sprache (Standard: Deutsch)
let currentLanguage = 'de';

// Letzte hervorgehobene Uhr (um Wiederholungen zu vermeiden)
let lastHighlightedIndex = -1;

/**
 * Initialisiert die Anwendung beim Laden der Seite
 */
function init() {
    updateClock();
    updateGreeting();
    updateTheme();
    startClockInterval();
    startHighlightInterval();
    setupLanguageSelector();
    startBubbleGeneration();
}

/**
 * Aktualisiert die digitale Uhr und Datumsanzeige
 */
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    // Datumsanzeige aktualisieren
    const dateElement = document.getElementById('date');
    if (dateElement) {
        const lang = translations[currentLanguage];
        const dayName = lang.days[now.getDay()];
        const day = now.getDate();
        const monthName = lang.months[now.getMonth()];
        const year = now.getFullYear();

        dateElement.textContent = `${dayName}, ${day}. ${monthName} ${year}`;
    }
}

/**
 * Startet das Intervall für die Uhr-Aktualisierung (jede Sekunde)
 */
function startClockInterval() {
    setInterval(() => {
        updateClock();
        updateGreeting();
        updateTheme();
    }, 1000);
}

/**
 * Bestimmt die Tageszeit basierend auf der aktuellen Stunde
 * @returns {string} 'morning', 'day', oder 'evening'
 */
function getTimeOfDay() {
    const hour = new Date().getHours();

    if (hour >= 0 && hour < 10) {
        return 'morning';
    } else if (hour >= 10 && hour < 18) {
        return 'day';
    } else {
        return 'evening';
    }
}

/**
 * Prüft, ob heute Wochenende ist
 * @returns {boolean} true wenn Samstag oder Sonntag
 */
function isWeekend() {
    const day = new Date().getDay();
    return day === 0 || day === 6; // 0 = Sonntag, 6 = Samstag
}

/**
 * Aktualisiert die Begrüßungsnachricht basierend auf Uhrzeit, Wochentag und Sprache
 */
function updateGreeting() {
    const greetingElement = document.getElementById('greeting');
    if (!greetingElement) return;

    const timeOfDay = getTimeOfDay();
    const lang = translations[currentLanguage];

    // Zeitabhängige Begrüßung
    let greeting = lang[timeOfDay];

    // Wochenend-/Wochentag-Zusatz
    const additionalMessage = isWeekend() ? lang.weekend : lang.weekday;
    greeting += `! ${additionalMessage}`;

    greetingElement.textContent = greeting;

    // CSS-Klasse für Styling setzen
    greetingElement.className = 'greeting-message greeting-' + timeOfDay;
}

/**
 * Aktualisiert das Farbthema basierend auf der Tageszeit
 */
function updateTheme() {
    const timeOfDay = getTimeOfDay();
    const body = document.body;

    // Alle Theme-Klassen entfernen
    body.classList.remove('morning-theme', 'day-theme', 'evening-theme');

    // Entsprechende Theme-Klasse hinzufügen
    body.classList.add(timeOfDay + '-theme');
}

/**
 * Hebt eine zufällige Uhr hervor
 * Vermeidet Wiederholung der gleichen Uhr
 */
function highlightRandomWatch() {
    const watches = document.querySelectorAll('.uhr-item');
    if (watches.length === 0) return;

    // Vorherige Hervorhebung entfernen
    watches.forEach(watch => watch.classList.remove('highlighted'));

    // Zufälligen Index wählen (unterschiedlich vom letzten)
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * watches.length);
    } while (randomIndex === lastHighlightedIndex && watches.length > 1);

    lastHighlightedIndex = randomIndex;

    // Neue Uhr hervorheben
    watches[randomIndex].classList.add('highlighted');
}

/**
 * Startet das Intervall für die zufällige Hervorhebung (alle 10 Sekunden)
 */
function startHighlightInterval() {
    // Erste Hervorhebung sofort
    highlightRandomWatch();

    // Dann alle 10 Sekunden wiederholen
    setInterval(highlightRandomWatch, 10000);
}

/**
 * Richtet den Event-Listener für die Sprachauswahl ein
 */
function setupLanguageSelector() {
    const selector = document.getElementById('language-selector');
    if (!selector) return;

    selector.addEventListener('change', (event) => {
        currentLanguage = event.target.value;
        updateClock();
        updateGreeting();
    });
}

/**
 * Startet die kontinuierliche Seifenblasen-Generierung
 */
function startBubbleGeneration() {
    setInterval(createBubble, 800);
}

/**
 * Erstellt eine neue Seifenblase mit zufälligen Eigenschaften
 */
function createBubble() {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';

    const size = Math.random() * 80 + 40;
    const startX = Math.random() * (window.innerWidth - size);
    const startY = window.innerHeight + size;

    const hue = Math.random() * 360;
    const saturation = Math.random() * 30 + 50;
    const lightness = Math.random() * 20 + 70;
    const opacity = Math.random() * 0.4 + 0.5;

    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = startX + 'px';
    bubble.style.top = startY + 'px';
    bubble.style.background = 'radial-gradient(circle at 30% 30%, hsla(' + hue + ', ' + saturation + '%, ' + (lightness + 10) + '%, ' + opacity + '), hsla(' + (hue + 20) + ', ' + saturation + '%, ' + lightness + '%, ' + (opacity - 0.1) + ') 50%, hsla(' + (hue + 40) + ', ' + saturation + '%, ' + (lightness - 10) + '%, ' + (opacity - 0.2) + '))';

    const duration = Math.random() * 4000 + 6000;
    const swayAmount = Math.random() * 30 + 20;

    bubble.addEventListener('click', function() {
        popBubble(bubble);
    });

    bubble.addEventListener('mouseenter', function() {
        bubble.style.transform = 'scale(1.15)';
        bubble.style.filter = 'brightness(1.2)';
    });

    bubble.addEventListener('mouseleave', function() {
        bubble.style.transform = 'scale(1)';
        bubble.style.filter = 'brightness(1)';
    });

    document.body.appendChild(bubble);

    animateBubble(bubble, duration, swayAmount);

    setTimeout(function() {
        if (bubble.parentNode) {
            bubble.remove();
        }
    }, duration);
}

/**
 * Animiert eine Seifenblase nach oben mit Schwankungen
 * @param {HTMLElement} bubble - Die zu animierende Seifenblase
 * @param {number} duration - Dauer der Animation in Millisekunden
 * @param {number} swayAmount - Ausmaß der horizontalen Schwankung
 */
function animateBubble(bubble, duration, swayAmount) {
    const startTime = Date.now();
    const startY = parseFloat(bubble.style.top);
    const targetY = -parseFloat(bubble.style.height) - 50;
    const startX = parseFloat(bubble.style.left);

    function animate() {
        if (!bubble.parentNode) return;

        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;

        if (progress < 1 && !bubble.classList.contains('popping')) {
            const currentY = startY + (targetY - startY) * progress;
            const swayX = Math.sin(progress * Math.PI * 4) * swayAmount;
            const currentOpacity = 0.8 - (progress * 0.8);

            bubble.style.top = currentY + 'px';
            bubble.style.left = (startX + swayX) + 'px';
            bubble.style.opacity = currentOpacity;

            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

/**
 * Lässt eine Seifenblase platzen
 * @param {HTMLElement} bubble - Die zu platzende Seifenblase
 */
function popBubble(bubble) {
    if (bubble.classList.contains('popping')) return;

    bubble.classList.add('popping');
    bubble.style.pointerEvents = 'none';

    setTimeout(function() {
        if (bubble.parentNode) {
            bubble.remove();
        }
    }, 300);
}

// Initialisierung beim Laden der Seite
// Alternative zu window.onload: nutzt DOMContentLoaded für schnellere Initialisierung
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
