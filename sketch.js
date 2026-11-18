let symmetry = 7; // Number of Reflections
let angle = 360 / symmetry;
let t = 0.015;


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  background("white");
  let jpgButton = createButton('Export JPG');
  jpgButton.mousePressed(function() {
    saveCanvas('myScope', 'jpg');
  })
}

function draw() {
  translate(width / 2, height / 2); // move the orgin to the center
  // If the cursor is within the limits of the canvas...
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    // Translate the current position and the previous position of the
    // cursor to the new coordinates set with the translate() function above.
    let lineStartX = mouseX - width / 2;
    let lineStartY = mouseY - height / 2;
    let lineEndX = pmouseX - width / 2;
    let lineEndY = pmouseY - height / 2;
    // And, if the mouse is pressed while in the canvas...
    if (mouseIsPressed === true) {
      // For every reflective section the canvas is split into, draw the cursor's
      // coordinates while pressed...
      for (let i = 0; i < symmetry; i++) {
        let hue = (frameCount * 0.5) % 360;
        let weight = map(noise(t + 20), 0, 1, 1, 6);
        rotate(angle);
        stroke(hue, 80, 95,20);
        strokeWeight(weight);
        line(lineStartX, lineStartY, lineEndX, lineEndY);

        // ... and reflect the line within the symmetry sections as well.
        push();
        scale(1, -1);
        line(lineStartX, lineStartY, lineEndX, lineEndY);
        pop();
      }
    }
  }
}