let symmetry = 7; // Number of Reflections
let angle = 360 / symmetry;
let t = 0.015;
let lastX, lastY;
let drawing = false;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight);
  cnv.style("touch-action", "none"); // stops scroll/zoom while drawing
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100, 100);
  background("white");

  let jpgButton = createButton("Export JPG");
  jpgButton.position(12, 12);
  jpgButton.style("padding", "12px 16px");
  jpgButton.style("font-size", "16px");
  jpgButton.mousePressed(() => saveCanvas("myScope", "jpg"));

  let clearButton = createButton("Clear");
  clearButton.position(130, 12);
  clearButton.style("padding", "12px 16px");
  clearButton.style("font-size", "16px");
  clearButton.mousePressed(() => background("white"));
}

function draw() {
  if (!drawing) return;

  translate(width / 2, height / 2);

  let x = mouseX - width / 2;
  let y = mouseY - height / 2;
  let px = lastX - width / 2;
  let py = lastY - height / 2;

  t += 0.01;
  let hue = (frameCount * 0.5) % 360;
  let weight = map(noise(t + 20), 0, 1, 1, 6);
  stroke(hue, 80, 95, 20);
  strokeWeight(weight);

  for (let i = 0; i < symmetry; i++) {
    rotate(angle);
    line(x, y, px, py);

    push();
    scale(1, -1);
    line(x, y, px, py);
    pop();
  }

  lastX = mouseX;
  lastY = mouseY;
}

function isButton(e) {
  return e && e.target && e.target.tagName === "BUTTON";
}

function mousePressed(e) {
  if (isButton(e)) return;
  drawing = true;
  lastX = mouseX;
  lastY = mouseY;
}

function mouseReleased() {
  drawing = false;
}

function touchStarted(e) {
  if (isButton(e)) return true; // let buttons work on phones
  drawing = true;
  lastX = mouseX;
  lastY = mouseY;
  return false;
}

function touchMoved(e) {
  if (isButton(e)) return true;
  return false;
}

function touchEnded(e) {
  drawing = false;
  if (isButton(e)) return true;
  return false;
}

function windowResized() {
  let old = get();
  let oldW = width, oldH = height;
  resizeCanvas(windowWidth, windowHeight);
  background("white");
  image(old, (width - oldW) / 2, (height - oldH) / 2, oldW, oldH);
}