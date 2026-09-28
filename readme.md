# P5.js: Watch 3D Objects

[Deutsch](README_DE.md)

Displays all 3D models from the folder `assets/files` in a grid on a WEBGL
canvas. Models added to or removed from the folder appear or disappear
while the sketch is running. Useful for installations where new objects
are dropped into a folder, e.g. from a scanner or another program.

## Installation

Requirements: macOS or Linux (the watcher is a bash script; on Windows use
Git Bash or WSL) and a current browser.

1. Put `.obj` files into `assets/files` (a `teapot.obj` is included).
2. In a terminal, run the watcher script from the project folder:
   `bash watch.sh` (leave it running).
3. Open the folder in Visual Studio Code and start Live Server (click
   **Go Live** in the status bar).
4. Add or remove models in `assets/files`. Drag with the mouse to rotate
   the scene.

A browser cannot list the contents of a folder. That is why `watch.sh`
writes the file list into `assets/list.txt`, which the sketch then reads.

Libraries (in `libraries/`): p5.js 1.10.0, p5.sound 1.0.1 (included, not
used).

## Coding Help

- **`watch.sh`**: checks `assets/files` every second and rewrites
  `assets/list.txt` with the file paths whenever the contents change.
  `WATCH_DIR` and `OUTPUT_FILE` at the top set the folders.
- **`sketch.js` → `watcher()`**: loads `list.txt` with `loadStrings()`,
  loads new models with `loadModel(file, true)` (normalized to a common
  size) and removes models that are no longer in the list. Then it calls
  itself again after 1000 ms. Started once in `preload()`.
- **`models`**: object with one entry per file path, holding `status`
  (`loading` / `ok`) and the `shape`.
- **`setup()`**: creates a 600 × 600 WEBGL canvas and sets `angleMode`
  to degrees.
- **`draw()`**: enables `orbitControl()` and `lights()` and draws every
  loaded model in a grid, `itemsPerLine` (4) per row. The `translate()`
  offsets set the grid position, `rotateZ(180)` / `rotateY(180)` turn the
  models upright – adjust these for your own files.
