# Erfolg, Überblendung und Fragenplanung – 04.11.2026

## Bestätigte Vorgaben

Heike hat die überarbeitete Überblendung der Demo V5 visuell bestätigt: zuerst altes Bild betrachten, dann neues langsam darüber. Davor erscheint ein wechselnder Erfolgstext. Auf alle elf Belohnungen übertragen. Bei Pfau und Baum wird das jeweils neue Detail langsam über den bestehenden Aufbau eingeblendet; bestehende Teile bleiben sichtbar. Die anderen neun Bildfolgen verwenden eine gemeinsame Zeichenfläche für altes und neues Bild. Nach Abschluss wartet die Anzeige unbegrenzt auf bewusstes Weiterklicken.

Motivauswahl auf ausdrücklichen Wunsch entfernt. Alle Motive werden gemischt. Zehn Aufgaben pro Runde. Ein Zielbild darf innerhalb der Runde nur einmal gesucht werden. Zusätzlich werden dieselben Suchbedingungen nicht mit einer anderen Formulierung wiederholt. Bereits gelöste Bilder dürfen als Ablenkungsbilder auftauchen. Schwierigkeitsstufen bleiben ein positives Merkmal, zwei positive Merkmale oder zwei positive Merkmale plus Ausschluss.

## Ursprünglicher Wiederholungsfehler

`used` enthielt nur konkrete Frage-IDs, die auch das Zielbild und die gewählte Merkmalskombination enthalten. Eine neue ID konnte deshalb dasselbe Bild oder dieselbe Suchbedingung erneut abfragen. Die früheren Demonstrationen hatten außerdem die ersten beiden Hundevarianten gezielt vorgegeben; diese Sondersteuerung ist nicht übernommen.

`QuestionEngine.planRound()` plant vor Beginn eine Runde mit eindeutigen Zielbildern und Suchbedingungsschlüsseln. Eine Zuordnung zwischen Zielbild und Suchbedingung verhindert Sackgassen bei der Auswahl. `makeRound()` unterstützt zusätzlich verwendete Zielbilder und Suchschlüssel und setzt erschöpfte Listen nicht still zurück. Die Oberfläche benutzt ausschließlich gemischte Motive. Interne Motivfilter bleiben für Datenprüfungen verfügbar.

## Bilder und Texte

VG-01-05 und VG-01-06 haben jeweils eine schwarze und eine gelbe Nase. Bestehende Bilddateien bleiben erhalten; neue Bildpfade statt Überschreiben. Daten, Kartenplan und generierte Fragen sind angepasst, einschließlich Ausschlusstext. Braune Schwanzfarbe bleibt unverändert.

## Technische Prüfung und Grenzen

- Ursprünglicher Fragen-Test: 1080 Grundaufgaben, 7560 Formulierungen, 1890 Auslagen bestanden.
- Neuer Runden-Test: 756 vollständige Runden bestanden; eindeutige Zielbilder und Suchbedingungen, drei Stufen, drei Kartenzahlen, gemischte und interne Motivfilter geprüft.
- Elf echte Belohnungscontroller mit insgesamt 110 Treffern in einer simulierten DOM-/Zeitschrittumgebung geprüft: manuelles Weiter, alle zehn Stufen, Doppeltipps, bereits gelöste Aufgaben, Abbruch, Galeriedaten und tatsächliche Zwischenwerte der Überlagerung. Die gespeicherten Galeriedaten enthalten Bilder statt leerer Zeichenflächen.
- JavaScript-Syntax sämtlicher eingebetteter Module der Gesamtvorschau geprüft.

Dies ersetzt keine vollständige gerenderte Prüfung aller elf Geschichten auf Handy und Tablet. Heikes visuelle Bestätigung gilt bisher für die Raketenprobe und die eingebaute Demo V5. Die übrigen Geschichten stehen in der Gesamtvorschau zur Sichtprüfung bereit. Ältere vereinfachte Tests für Belohnungen sind keine Nachweise für diesen Stand.
