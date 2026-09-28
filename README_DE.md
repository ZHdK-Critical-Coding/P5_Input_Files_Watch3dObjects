# P5.js: Watch 3D Objects

[English](readme.md)

Zeigt alle 3D-Modelle aus dem Ordner `assets/files` in einem Raster auf
einer WEBGL-Zeichenfläche an. Modelle, die dem Ordner hinzugefügt oder
daraus entfernt werden, erscheinen oder verschwinden, während der Sketch
läuft. Nützlich für Installationen, bei denen neue Objekte in einem Ordner
landen, z. B. von einem Scanner oder einem anderen Programm.

## Installation

Voraussetzungen: macOS oder Linux (der Watcher ist ein Bash-Skript; unter
Windows Git Bash oder WSL verwenden) und ein aktueller Browser.

`.obj`-Dateien in `assets/files` legen (ein `teapot.obj` ist dabei).

Bibliotheken (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (eingebunden,
nicht verwendet).

## Ausführen

1. In einem Terminal im Projektordner das Watcher-Skript starten:
   `bash watch.sh` (laufen lassen).
2. Den Ordner in Visual Studio Code öffnen und Live Server starten (in der
   Statusleiste auf **Go Live** klicken).
3. Modelle in `assets/files` hinzufügen oder entfernen. Mit der Maus ziehen,
   um die Szene zu drehen.

Ein Browser kann den Inhalt eines Ordners nicht auflisten. Deshalb schreibt
`watch.sh` die Dateiliste in `assets/list.txt`, die der Sketch dann liest.

## Coding-Hilfe

- **`watch.sh`**: prüft `assets/files` jede Sekunde und schreibt
  `assets/list.txt` mit den Dateipfaden neu, sobald sich der Inhalt ändert.
  `WATCH_DIR` und `OUTPUT_FILE` oben legen die Ordner fest.
- **`sketch.js` → `watcher()`**: lädt `list.txt` mit `loadStrings()`, lädt
  neue Modelle mit `loadModel(file, true)` (auf eine gemeinsame Grösse
  normalisiert) und entfernt Modelle, die nicht mehr in der Liste stehen.
  Danach ruft es sich nach 1000 ms selbst wieder auf. Wird einmal in
  `preload()` gestartet.
- **`models`**: Objekt mit einem Eintrag pro Dateipfad, mit `status`
  (`loading` / `ok`) und `shape`.
- **`setup()`**: erstellt eine WEBGL-Zeichenfläche von 600 × 600 Pixeln und
  stellt `angleMode` auf Grad.
- **`draw()`**: aktiviert `orbitControl()` und `lights()` und zeichnet alle
  geladenen Modelle in einem Raster, `itemsPerLine` (4) pro Zeile. `offset`
  wird aus `itemsPerLine` berechnet, damit das Raster auf der
  Zeichenfläche zentriert ist; `translate()` legt die Rasterposition jedes
  Modells fest, `rotateZ(180)` /
  `rotateY(180)` stellen die Modelle aufrecht – für eigene Dateien anpassen.
