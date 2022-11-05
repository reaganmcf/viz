let mic;
let cnv;
let img 
let space = 0.1;
let start = 0;

let spaceSlider;
let micCoeffSlider;
let noiseDetailSlider;

let RADIUS;
let DIAMETER;
let IMG_SIZE;

function setupMic() {
  mic = new p5.AudioIn();
  cnv.mousePressed(userStartAudio);
  mic.start();
}

function setupSliders() {
  // Spacin
  spaceSlider = createSlider(0.1, 5, 0.1, 0.1);
  spaceSlider.position(10, 20);
  spaceSlider.style('width', '100px');

  spaceSliderLabel = createSpan();
  spaceSliderLabel.position(120, 20);
  spaceSliderLabel.html('Spacing')
  spaceSliderLabel.style('width', '50px');
  spaceSliderLabel.style('color', 'white')

  // Mic coeff
  micCoeffSlider = createSlider(1, 40, 1, 0.25);
  micCoeffSlider.position(10, 40);
  micCoeffSlider.style('width', '100px');

  micCoeffSliderLabel = createSpan();
  micCoeffSliderLabel.position(120, 40);
  micCoeffSliderLabel.html('Mic Coefficient')
  micCoeffSliderLabel.style('width', '200px');
  micCoeffSliderLabel.style('color', 'white')

  // Noise detail
  noiseDetailSlider = createSlider(0.1, 4, 2, 0.25);
  noiseDetailSlider.position(10, 60);
  noiseDetailSlider.style('width', '100px');

  noiseDetailSliderLabel = createSpan();
  noiseDetailSliderLabel.position(120, 60);
  noiseDetailSliderLabel.html('Noise Detail')
  noiseDetailSliderLabel.style('width', '200px');
  noiseDetailSliderLabel.style('color', 'white')
}

function setup() {
  RADIUS = windowWidth / 8;
  DIAMETER =  RADIUS * 2;
  IMG_SIZE = RADIUS * 1.75;

  cnv = createCanvas(windowWidth, windowHeight);
  img = loadImage('./assets/foxr.png');
  frameRate(60);

  setupSliders();

  angleMode(DEGREES);
  setupMic();
}

function draw() {
  space = spaceSlider.value();
  micCoeff = micCoeffSlider.value();
  noiseDetailValue = noiseDetailSlider.value();
  noiseDetail(noiseDetailValue);

  background("#1e1e2e");
  noStroke();

  translate(width / 2, height / 2);

  fill("#fe3b68")
  circle(0, 0, DIAMETER, DIAMETER); 

  image(img, -(IMG_SIZE / 2), -(IMG_SIZE / 2), IMG_SIZE, IMG_SIZE);

  for (let i = 0; i < 360; i += space) {
    let xoff = map(cos(i), -1, 1, 0, 3)
    let yoff = map(sin(i), -1, 1, 0, 3)

    let n = noise(xoff + start, yoff + start)

    let h = map(n, 0, 1, 0, 50)

    let lvl_noise = noise(mic.getLevel() * micCoeff); 
    h += map(lvl_noise, 0, 1, 0, 50);

    rotate(space)
    fill("#fe3b68")
    rect(RADIUS, 0, h, 5)
  }


  start += 0.01;
}
