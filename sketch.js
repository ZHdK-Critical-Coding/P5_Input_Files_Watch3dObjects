// ===============================
// 3D Model Viewer with Live Watcher
// ===============================

// Object to store loaded models and their status
let models = {};

// Number of models to display per line in the canvas grid
let itemsPerLine = 4;

// ===============================
// Watcher function: monitors list.txt and loads/unloads models
// ===============================
function watcher() {
  // Load list of model filenames from text file
  loadStrings('./assets/list.txt', (files) => {
    
    // ------------------------------
    // Add new files
    // ------------------------------
    files.forEach((file) => {
      // If file is not already loaded and is valid
      if (!models[file] && file) {
        models[file] = {
          status: 'loading',          // mark as loading
          shape: loadModel(file, true, () => {
            // Callback when model finishes loading
            models[file].status = 'ok';
            console.log('loaded', file); // log loaded file
          })
        };
      }
    });

    // ------------------------------
    // Remove deleted files from models object
    // ------------------------------
    const deleteFiles = Object.keys(models).filter((existingFile) => {
      return !files.includes(existingFile);
    });

    deleteFiles.forEach((deleteFile) => {
      delete(models[deleteFile]); // remove deleted model
    });

    // ------------------------------
    // Repeat watcher every 1 second
    // ------------------------------
    setTimeout(() => { watcher(); }, 1000);
  });
}

// ===============================
// p5.js preload function
// ===============================
function preload() {
  // Start watching the list and loading models before setup
  watcher();
}

// ===============================
// p5.js setup function
// ===============================
function setup() {
  createCanvas(600, 600, WEBGL); // create 3D canvas
  angleMode(DEGREES);            // use degrees for rotations
}

// ===============================
// p5.js draw function
// ===============================
function draw() {
  background(50);    // dark gray background
  orbitControl();    // enable mouse drag to rotate the scene
  lights();          // add default lighting

  let count = 0;              // counter to position models
  let size = width / itemsPerLine; // calculate size spacing per item

  // Iterate over all loaded models
  for (let key of Object.keys(models)) {
    // Only draw models that are fully loaded
    if (models[key].status === 'ok') {
      push(); // save transformation state

        // Calculate grid position for the model
        translate(
          (size * -1) + size * (count % itemsPerLine),       // X position
          (size * -1.5) + size * Math.floor(count / itemsPerLine) // Y position
        );

        // Rotate model for better viewing
        rotateZ(180);
        rotateY(180);

        // Render the 3D model
        model(models[key].shape);

      pop(); // restore transformation state

      count++; // increment position counter
    } 
  }
}