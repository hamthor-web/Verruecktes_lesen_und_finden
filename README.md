# Verrückt gesucht! – Lesen und Bilder finden

Spielversion 2026-10-11: vollständiger Lese- und Suchspielprototyp mit 120 Bildkarten in 20 Motivgruppen, drei Schwierigkeitsstufen sowie Pfau und Baum als Fortschrittsanzeige.

## Spielen

`index.html` ist der Einstieg. Alle Bilder liegen im Unterordner `assets/`; die Dateien benötigen keinen Build-Schritt und keine Bibliotheken. Für einen lokalen Webserver im Repository `python3 -m http.server 8000` starten und `http://localhost:8000` öffnen. Das Spiel benötigt keine KI und keine Online-Abfragen während der Runde. Diese Fassung richtet keine App-Installation oder Service-Worker-Zwischenspeicherung ein.

## Ablauf

6, 8, 10 oder 12 Karten; zehn Aufgaben pro Runde. Für jede Aufgabe wird eine neue passende Kartenauslage zusammengestellt. Einfach: ein Merkmal. Mittel: zwei Merkmale. Schwer: zwei Merkmale und der Ausschluss einer dritten Eigenschaft. Die Frage hat genau eine passende Antwort; alle abgefragten Merkmale sind für die Auswahl notwendig. 1080 Grundaufgaben mit 7560 unterschiedlichen Formulierungen.

Eine richtige Antwort ergänzt genau ein Detail am Pfau oder Baum. Fehler ergänzen keines. Bereits verdiente Teile bleiben sichtbar und fliegen nicht erneut ein. Nach jeder richtigen Antwort bleibt die Figur groß, bis sie oder Weiter angetippt wird. Erst danach kann die nächste Aufgabe gewählt werden. Nach Aufgabe zehn führt das Antippen zum Rundenabschluss.

Der Pfau verwendet sieben von acht Federplätzen, zwei Schmuckplätze und einen Schuhplatz pro Runde. Kopf: Krone, Zipfelmütze oder Kopfschleife. Gesicht: Brille oder schielende Augen. Hals: rote Schleife. Füße: Regenbogenstiefel, gelbe Stiefel, Rollschuhe, Stiefel mit Spritzern oder rote Schuhe. Die Beine bleiben erhalten; nur der untere Zehen-/Krallenbereich wird bei Schuhen ausgeblendet. Geometrie und Rundenplanung sind fest. Die 13 zusätzlich vorhandenen Federbilder bleiben Entwicklerbestand und werden noch nicht im Spiel eingesetzt.

## Dateien

- `data.js`, `card-plan.json`: Bildkarten und verbindliche Motivmerkmale; die Mädchen bleiben Entwurf.
- `engine.js`, `questions.json`: Fragenmatrix und Auslagenerzeugung.
- `app.js`: Spielablauf.
- `pfau-art.js`, `pfau.js`, `tree-art.js`, `tree.js`: Bilder, Positionen und Belohnungen.
- `assets/`: unveränderte optimierte Bilddaten aus der freigegebenen Spielversion, als einzelne Dateien statt eingebettet.
- `docs/PFAU_SPIELVERSION.md`: aktueller Pfau-Stand.
- `docs/PFAU_SLOTS.md`: historische Referenz des früheren Bestands.

## Prüfung

`node test_engine.cjs` prüft 1080 Fragen, 7560 Formulierungen und 2520 Kartenauslagen.
`node test_tree.cjs` prüft 1000 Baumpläne, 1000 Pfaupläne und 24 vollständige simulierte Spielrunden einschließlich Fehlversuchen, Doppelklicks, Variantenwahl, erhaltenen Beinen, dauerhaften Teilen und Abschlussanzeige. Bilddateien und lokale Bildverweise sind zusätzlich geprüft. Kein automatisierter Browser-/Gerätetest verfügbar.
