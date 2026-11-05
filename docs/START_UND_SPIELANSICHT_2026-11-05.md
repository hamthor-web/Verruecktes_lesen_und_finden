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

## Nachprüfung und Korrektur, 05.11.2026
Ein aktueller Handy-Screenshot zeigte trotz des vorherigen CSS-Updates weiterhin zwei Spalten. Deshalb wurde die Hochformat-Regel verstärkt und zusätzlich direkt in `index.html` aufgenommen (bis 1200 CSS-Pixel sowie dynamische Handy-Erkennung in `app.js`). Die Startseite soll jetzt Einführung und Beispielbilder oberhalb der Spielauswahl anzeigen.

Für die Navigation wurde der Browser-/PWA-Verlauf in `app.js` um interne Ansichten ergänzt. Browser- oder Android-Zurück führt aus Spielansichten zur vorherigen App-Ansicht; zusätzlich ist ein deutliches Wischen nach rechts im Inhalt als Zurückgeste vorgesehen. Einschränkung: Vom Android-Betriebssystem reservierte Randgesten lassen sich in einer PWA nicht zuverlässig übersteuern. Auf der Startseite gibt es keinen vorherigen internen Bildschirm.

`sw.js` erhielt eine neue Version und lädt App-JavaScript sowie CSS bei bestehender Netzverbindung bevorzugt frisch, mit Offline-Rückfall auf den Cache. Die Spielaufgaben, Bilder, Belohnungen und Speicherstände sind unverändert. Ein neuer Gerätetest der Hochformatumstellung und Gestennavigation ist noch erforderlich.

## Ergänzung: Startschrift und wieder funktionsfähiger Spielstart – 05.11.2026
Auf Nutzerwunsch steht nun auch auf der Startseite neben „So möchtest du spielen“ eine eigene Schriftgrößensteuerung mit A−, Prozentanzeige und A+. Die Einstellung wird unabhängig von der Aufgabenschrift im Gerät gespeichert. Betroffen sind `index.html`, `style.css` und `app.js`.

Der zuvor als wirkungslos gemeldete „Los geht's“-Button wurde mit einer gesicherten Startfunktion und sichtbarer Fehlermeldung versehen. Im isolierten JavaScript-Funktionstest wurden Originalmodule geladen und ein Klick simuliert; die erste Runde mit sechs Bildkarten wurde erfolgreich erstellt. Ein realer Browser-/Gerätetest ist weiterhin erforderlich, insbesondere für zuvor zwischengespeicherte Versionen.

`sw.js`: Offline-Version auf `2026-11-05-setup-font-start-repair-1` erhöht. Die ursprünglichen Spielinhalte und gespeicherten Fortschritte bleiben unangetastet.

## 05.11.2026 – Spielstart auf dem Gerät weiterhin nicht ausführbar (noch nicht abschließend bestätigt)
Nach Rückmeldung, dass der Startknopf weiterhin nicht reagiert, wurde die bisherige syntaktische bzw. simulierte Prüfung ausdrücklich als unzureichend eingeordnet. Zur Ausschaltung alter zwischengespeicherter App-Dateien werden die JS/CSS-Dateien zusätzlich mit eindeutigen neuen Dateinamen ausgeliefert: `app-release-20261105-b.js` und `style-release-20261105-b.css`. Die Startseite bindet diese Dateien direkt ein. Die neue Service-Worker-Version `2026-11-05-start-release-b-2` nimmt sie in den Offline-Cache auf.

Frühe JavaScript- und Ladefehler sowie Fälle, in denen kein Start-Handler registriert wurde oder der Klick nicht zur Spielansicht führt, werden jetzt sichtbar auf der Startseite angezeigt. Alle vorhandenen Bilder, Inhalte und gespeicherten Spielstände bleiben erhalten.

**Status: Quellen aktualisiert, praktische Prüfung auf dem betroffenen Gerät weiterhin offen.** Ursache kann ohne Fehleranzeige aus der echten Laufzeitumgebung nicht als endgültig geklärt gelten.

## 05.11.2026 – Ursache des scheinbar nicht funktionierenden Spielstarts gefunden

Die Nutzerin stellte fest, dass die Spielansicht tatsächlich geöffnet wurde, während die Einführung darüber weiter sichtbar blieb. Ursache war die nachträglich eingefügte Porträt-Regel `.setup{display:grid!important}`, die das standardmäßige `[hidden]{display:none!important}` wegen Kaskaden-/Spezifitätskonflikten überstimmte. Damit blieb der Startbereich trotz `hidden` sichtbar.

Technische Korrektur:
- `#setup[hidden], #play[hidden], #gallery[hidden], #finish[hidden]` mit explizitem `display:none!important` in Start-HTML und neuer CSS-Datei.
- Start, Spiel, Galerie und Ergebnis werden als getrennte Ansichten behandelt. Während Spiel und Galerie werden Kopfbereich und Fußzeile ausgeblendet.
- `← Zur Auswahl` ist als eigener, erreichbarer Button in der Spielfläche eingebaut.
- Galerie erhält bildschirmfüllendes Layout mit vertikal mittiger Bildauswahl; die bereits vorhandene Vollbild-Bildbetrachtung bleibt erhalten.
- Neue veröffentlichte Assets `app-release-20261105-c.js`, `style-release-20261105-c.css` und neue SW-Version `2026-11-05-screens-exclusive-c-1`.

Die Bilder und Spielmechanik bleiben unverändert, Spielstände bleiben erhalten. Quellverweise und JavaScript-Syntax im Repo geprüft; reale Geräteabnahme noch offen.
