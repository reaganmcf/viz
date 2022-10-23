let mic;
let cnv;
let img 
let space = 0.1;
let start = 0;

const RADIUS = 100;
const DIAMETER = RADIUS * 2;

function setupMic() {
  mic = new p5.AudioIn();
  cnv.mousePressed(userStartAudio);
  mic.start();

  noiseDetail(2);
}

function setup() {
  cnv = createCanvas(750, 750);
  img = loadImage('./assets/foxr.png');
  frameRate(60)

  angleMode(DEGREES);
  setupMic();
}

function draw() {
  background(30);
  noStroke();

  translate(width / 2, height / 2);
  fill("#fe3b68")
  circle(0, 0, DIAMETER, DIAMETER); 
  noStroke();

  for (let i = 0; i < 360; i += space) {
    let xoff = map(cos(i), -1, 1, 0, 3)
    let yoff = map(sin(i), -1, 1, 0, 3)

    let lvl = mic.getLevel();

    let n = noise(xoff + start, yoff + start)

    let h = map(n, 0, 1, 0, 50)

    let lvl_noise = noise(lvl * 1.4); //map(lvl, 0, 1, -50, 50);
    h += map(lvl_noise, 0, 1, 0, 50);

    rotate(space)
    fill("#fe3b68")
    rect(RADIUS, 0, h, 10)
  }
  image(img, -100, -100, 200, 200);

  start += 0.01;
}
