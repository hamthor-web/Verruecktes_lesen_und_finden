# Verrückt gesucht! – Nachtrag zur Spielakte
Datum: 5. November 2026
Bereich: Startbildschirm, Spielansicht, mobile Lesbarkeit

## Bestätigter Änderungsauftrag
- Startbildschirm im Handy-Hochformat: Einführung mit den drei Beispielbildern oberhalb des Auswahlbereichs statt zwei enger nebeneinander liegender Spalten.
- Spielfläche: Aufgaben und Bildkarten auf hohen Displays mittiger bzw. über die verfügbare Höhe verteilt, ohne Karten bei kleinen Displays abzuschneiden.
- Leseaufgabe: Schrift größer und mit direkt sichtbaren A− / 100 % / A+ Schaltflächen in der Fragebox zoombar; Einstellung bleibt lokal auf dem Gerät erhalten.
- Spielmechanik, Lernkarten, Animationen und gespeicherte Fortschritte bleiben unverändert.

## Technischer Stand
In `main` umgesetzt:
- `style.css`: einspaltiger Startbereich für Hochformat bis 950px, sichtbar bleibende Beispielbilder, responsives Höhenlayout des Spiels, Schriftgröße und Zoombedienung.
- `index.html`: drei barrierefrei beschriftete Schriftgrößenschalter, aktualisierte CSS/JS-Versionen.
- `app.js`: Textgröße in Stufen von 85 bis 160 Prozent, dauerhafte Speicherung in `localStorage`, Rückstellung auf 100 Prozent.
- `sw.js`: Offline-Version `2026-11-05-mobile-layout-text-zoom-1` für Update der installierten Web-App.

## Kontrolle und offen
Quellcode, Dateiverweise und JavaScript-Syntax im Repository geprüft. Darstellungsprüfung auf realem Handy/Tablet (Hoch-/Querformat, 6/9/12 Karten, verschiedene Schriftgrößen) steht noch aus. Die zentrale Projektverwaltung/Masterübersicht wurde nicht automatisch überschrieben; dieser Nachtrag ist für die Ablage bestimmt.
