# Verrückt gesucht! – Lesen und Bilder finden

120 Bildkarten in 20 Motivgruppen. Drei Schwierigkeitsstufen: ein Merkmal, zwei Merkmale, zwei Merkmale plus Ausschluss. 1080 Grundaufgaben mit sieben Formulierungen je Aufgabe. Sechs, neun oder zwölf Bilder in der Auslage.

## Spielen

`index.html` ohne Build-Schritt über einen lokalen Webserver öffnen. Zehn Aufgaben mit gemischten Motiven pro Runde. Es gibt keine Motivauswahl. Jedes Zielbild wird nur einmal gesucht; auch dieselben Suchbedingungen werden nicht bloß anders formuliert erneut abgefragt. Bilder dürfen weiterhin als Ablenkung auftauchen. Eine falsche Antwort verbraucht weder eine Aufgabe noch einen Belohnungsschritt.

## Belohnungen

Elf Geschichten: Pfau, Baum, Knurpsel, Rakete, Blumenwiese, Wundereiche, Kinderzimmer, Marsmission, Baumhaus, Unterwasserwelt und Matschwiese. Zufällig oder manuell auswählen. Nach einem Treffer erscheint zuerst ein wechselnder Erfolgstext. Danach bleibt die vorherige Bildstufe zwei Sekunden stehen; die neue wird drei Sekunden darüber eingeblendet. Beim ersten Bild ohne Ausgangsbild entfällt die Betrachtung einer Vorgängerstufe. Pfau und Baum ergänzen ein Detail nach derselben Betrachtungs- und Einblendzeit. Neue Schuhe blenden vorhandene Zehen erst nach ihrer Einblendung aus. Kein automatisches Weitergehen.

Abgeschlossene Geschichten bleiben lokal in „Meine Bilder“ gespeichert. Alle zehn Zwischenstufen bleiben erhalten. Die Galerie verändert weder den Spielfortschritt noch die Geschichteauswahl.

## Dateien und Prüfung

`data.js`, `card-plan.json` und `questions.json` enthalten Karten und Fragen. `engine.js` erzeugt und plant eindeutige Runden. `app.js` steuert das Spiel. `reward-motion.js` enthält Erfolgstexte und gemeinsame Einblendung. `tree.js`/`pfau.js` steuern zusammengesetzte Motive; die neun Bildfolgen erben von `knurpsel.js`.

Ausführen:

```sh
node test_engine.cjs
node test_unique_rounds.cjs
node test_all_rewards.cjs
```

Letzter Prüfstand: 1890 einzelne Auslagen, 756 vollständige Runden und 110 Belohnungsschritte über alle elf Controller bestanden. Die Controllerprüfung simuliert DOM und Zeit; sie ist kein vollständiger gerenderter Browser-/Gerätetest. Weitere Details in [docs/ERFOLG_UND_FRAGEN_2026-11-04.md](docs/ERFOLG_UND_FRAGEN_2026-11-04.md).

Die Mädchenkarten sind weiterhin als Entwürfe dokumentiert. Es gibt keine Service-Worker-/Installationsfunktion. Für ein vollständig lokales Spiel müssen alle Repository-Assets vorhanden sein.
