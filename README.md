# TickTack GmbH

Probe-Website fuer das fiktive Uhrenunternehmen **TickTack GmbH**, entwickelt im Rahmen des Moduls **Web Engineering 1** an der Hochschule Stralsund. Die Seite demonstriert den Einsatz von HTML, CSS und JavaScript zur Erstellung einer modernen, interaktiven Unternehmenswebsite.

---

## Projektidee

TickTack GmbH ist ein (fiktives) Unternehmen, das sich auf historische und aussergewoehnliche Zeitmessung spezialisiert hat – von Sanduhren ueber Sonnenuhren bis hin zu Kerzenuhren. Die Website praesentiert das Produktsortiment und das Team, und passt sich dynamisch der Tageszeit des Besuchers an.

---

## Features

- **Digitale Echtzeituhr** – zeigt Stunden, Minuten und Sekunden live an
- **Tageszeit-abhaengiges Theme** – Hintergrundgradient wechselt automatisch zwischen Morgen-, Tag- und Abend-Theme
- **Dynamische Begruessungen** – persoenliche Anrede basierend auf Uhrzeit und Wochentag
- **Mehrsprachigkeit** – Umschalten zwischen Deutsch und Englisch per Dropdown
- **Produktseite** – drei Uhrenmodelle mit Bildern, Merkmalen und Preisen
- **Mitarbeiterseite** – Teamvorstellung mit Foto, Position und Beschreibung
- **Responsives Layout** – funktioniert auf Desktop, Tablet und Smartphone
- **CSS-Animationen** – Fade-In-Effekte, Glow-Effekt auf der Uhr, Hover-Transitions

---

## Seiten

### Startseite (`index.html`)

Die Hauptseite der Website. Enthaelt:
- **Header** mit Logo, Firmenname und Navigationsleiste (Startseite, Mitarbeiter, Sprachauswahl)
- **Digitale Uhr** mit Live-Anzeige und Begruessungstext
- **Produktuebersicht** der drei Uhrenmodelle als Card-Grid:
  - **SandMaster Deluxe** – Sanduhr mit Rosenholz-Rahmen (Preis: 299 €)
  - **SolarTime Professional** – Sonnenuhr aus Granit mit astronomischer Kalibrierung (Preis: 599 €)
  - **FlameTimer Exclusive** – Kerzenuhr aus Bienenwachs mit 12-Stunden-Laufzeit (Preis: 449 €)
- **Footer** mit Copyright-Hinweis

### Mitarbeiterseite (`mitarbeiter.html`)

Vorstellung des fiktiven Teams unter dem Titel "Unser Team":
- **Herr Mueller** – Geschaeftsfuehrer & Zeitphilosoph, Experte fuer gravitationsbasierte Chronometrie und Sandkorn-Physik
- **Frau Schmidt** – Chefdesignerin & Sonnenstand-Expertin, spezialisiert auf astronomisch kalibrierte Steinsonnenuhren
- **Herr Weber** – Technischer Leiter & Kerzen-Ingenieur, Experte fuer Hochpraezisions-Kerzenuhren und Docht-Algorithmen

---

## Projektstruktur

```
TickTack/
├── index.html              # Startseite (Produkte, Uhr, Begruessung)
├── mitarbeiter.html        # Teamvorstellung
├── style.css               # Gesamtes Styling (Themes, Grid, Animationen)
├── script.js               # JavaScript-Logik (Uhr, Themes, Sprache, Begruessung)
├── index.js                # Node.js-Einstiegspunkt (Platzhalter)
├── package.json            # Node.js-Projektdatei
├── logo.jpg                # Firmenlogo
├── chair.png               # Mitarbeiter 1
├── token_3.png             # Mitarbeiter 2
├── mitarbeiter.jpg         # Mitarbeiter 3
├── sanduhr.jpg             # Produktbild: SandMaster Deluxe
├── sonnenuhr.jpg           # Produktbild: SolarTime Professional
├── kerzenuhr.jpg           # Produktbild: FlameTimer Exclusive
└── .idea/                  # WebStorm-Projektdateien
```

---

## Technisches Design

### HTML
- Semantisches HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`)
- Zwei separate Seiten mit gemeinsamer Navigation und geteiltem Stylesheet
- Sprachauswahl per `<select>`-Element

### CSS (`style.css`, 575 Zeilen)
- **CSS Grid** fuer das Produkt-Card-Layout (`grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))`)
- **Flexbox** fuer Header- und Navigations-Alignment
- **Tageszeit-Themes** via Body-Klassen (`.morning-theme`, `.day-theme`, `.evening-theme`) mit unterschiedlichen `linear-gradient`-Hintergruenden
- **Goldenes Farbschema** (`#d4af37`, `#f4d03f`) fuer Akzente, Raender und Schatten
- **CSS-Animationen:** `fadeIn` (Karten-Einblendung), `glow` (Uhr-Leuchteffekt), `pop` (Bubble-Effekt)
- **Responsive Breakpoints:** 768px (Tablet) und 480px (Smartphone)
- Hover-Transitions auf allen interaktiven Elementen (`transition: all 0.3s ease`)

### JavaScript (`script.js`, 309 Zeilen)
- **`updateClock()`** – liest aktuelle Uhrzeit per `new Date()` und aktualisiert die Anzeige
- **`startClockInterval()`** – ruft `updateClock()` jede Sekunde (`setInterval`, 1000ms) auf
- **`getTimeOfDay()`** – bestimmt ob Morgen, Tag oder Abend
- **`isWeekend()`** – prueft ob Wochentag oder Wochenende
- **`updateGreeting()`** – generiert Begruessungstext aus dem `translations`-Objekt abhaengig von Tageszeit und Wochentag
- **`updateTheme()`** – setzt die passende Theme-Klasse auf `document.body`
- **`setupLanguageSelector()`** – Event-Listener auf dem Sprachauswahl-Dropdown; aktualisiert Uhr und Begruessungstext bei Sprachwechsel
- **`init()`** – Einstiegspunkt, ruft alle Setup-Funktionen auf
- Unterstuetzte Sprachen: Deutsch (`de`), Englisch (`en`)

---

## Verwendete Technologien

| Technologie | Einsatz |
|---|---|
| HTML5 | Seitenstruktur und Semantik |
| CSS3 | Layout, Themes, Animationen, Responsivitaet |
| JavaScript (ES6+) | Uhr, Themes, Sprachumschaltung, Begruessungen |
| Node.js / npm | Projektgrundstruktur (package.json) |
| WebStorm | Entwicklungsumgebung |

---

## Autor

**Jonas Rohe**  
Matrikelnummer: 21511  
Hochschule Stralsund – Web Engineering 1
