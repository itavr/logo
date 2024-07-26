let font;
let input = 'Avalon';
let wiggle = 0.5;
let fontSize = 100;

function preload() {
  // טען פונט מותאם אישית. החלף את הנתיב בהתאם לפונט שלך
  font = loadFont('Rosnoc.otf');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  textFont(font);
  textSize(fontSize);
  textAlign(CENTER, CENTER);

  // הגדרת תאורה כללית
  ambientLight(60);
}

function draw() {
  clear(); // רקע שקוף

  // הגדרת נקודת תאורה
  pointLight(255, 255, 255, mouseX - width / 2, mouseY - height / 2, 250);

  let time = millis() / 1000;

  for (let i = 0; i < input.length; i++) {
    let char = input.charAt(i);
    let x = map(i, 0, input.length - 1, -200, 200);
    let y = sin(time + i * 0.5) * 20 * wiggle;
    let z = cos(time + i * 0.5) * 50 * wiggle;
    
    push();
    translate(x, y, z);
    fill(255);
    noStroke();
    draw3DText(char);
    pop();
  }
}

function draw3DText(char) {
  let points = font.textToPoints(char, 0, 0, fontSize, {
    sampleFactor: 1.2,
    simplifyThreshold: 0
  });

  let depth = 1; // עומק האותיות
  for (let j = 0; j < depth; j++) {
    let z = map(j, 0, depth, -15, 5);
    beginShape();
    for (let pt of points) {
      vertex(pt.x, pt.y, z);
    }
    endShape(CLOSE);
  }

  // הוספת תבליט לאותיות
  for (let pt of points) {
    beginShape();
    vertex(pt.x, pt.y, -5);
    vertex(pt.x, pt.y, 5);
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
