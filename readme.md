# P5 -> Watch 3D Objects

A p5.js sketch that displays all 3D models from the folder `assets/files`
in a grid on a WEBGL canvas. Models added to or removed from the folder
appear or disappear while the sketch is running.

## How to Use

1. Put `.obj` files into `assets/files` (a `teapot.obj` is included).
2. In a terminal, run the watcher script from the project folder:
   `bash watch.sh` (leave it running).
3. Start Live Server (click **Go Live** in the VS Code status bar).
4. Add or remove models in `assets/files`. Drag with the mouse to rotate
   the scene (`orbitControl()`).

## How it Works

A browser cannot list the contents of a folder, so `watch.sh` checks
`assets/files` every second and writes the file paths into
`assets/list.txt` whenever the contents change. The sketch reloads
`list.txt` every second with `loadStrings()`, loads new models with
`loadModel()` (normalized) and removes models no longer in the list.
Loaded models are drawn four per row.

## Libraries

- p5.js 1.10.0
- p5.sound 1.0.1 (included, not used)
