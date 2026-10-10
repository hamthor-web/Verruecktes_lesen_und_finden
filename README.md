# Verrückt gesucht! – Lesen und Bilder finden

**Projektstatus (10.10.2026):** Startarchiv des Projekts; der ursprüngliche interaktive Pfau-Prototyp wurde **nicht** als Quelldatei gespeichert. Es gibt derzeit **keinen implementierten Spielcode** in diesem Repository.

## Spielidee
Ein Kind liest einen lustigen/verrückten Satz und findet das dazu passende Bild auf einem Suchspielfeld. **Der Pfau ist nicht das Suchspiel**, sondern ausschließlich die Belohnungs-/Fortschrittsanzeige nach einer richtigen Antwort.

## Festgelegter Ablauf der Pfau-Belohnung
- Zu Beginn steht der Pfau klein am Rand. Pro Aufgabe ist genau ein weißes Fragezeichen als Platzhalter sichtbar (z. B. 6, 8, 10 oder 12).
- Bei jeder richtigen Antwort vergrößert sich der Pfau in die Mitte. Genau **ein vorher unsichtbares** Teil fliegt auf einen **festgelegten** Platz. Das zugehörige Fragezeichen verschwindet.
- Danach wird der Pfau wieder klein am Rand dargestellt; bereits erworbene Elemente bleiben sichtbar.
- Bei der letzten richtigen Antwort bleibt der vollständig ergänzte Pfau **groß in der Mitte**, bis das Kind ihn antippt.
- Keine zusätzlichen Lobsprüche, keine Belohnung bei falscher Antwort.

## Stand der Materialien
Es existieren außerhalb des Repositories eine Übergabeanweisung, **13 neue Federbilder** und zwei Screenshots einer **Entwickler-Testansicht**. Diese Bilddateien wurden noch nicht ins Repository übertragen. Der Basis-Pfau, Original-Fußvarianten und bisheriger Prototyp-Quellcode fehlen ebenfalls.

## Nächster Schritt
Zunächst fehlende Original-Assets erfassen; bestehende Zahlen/Positionen aus `docs/PFAU_SLOTS.md` als historische Referenzen behandeln. Nichts willkürlich platzieren oder eine komplette Neuentwicklung als alten Stand ausgeben.
