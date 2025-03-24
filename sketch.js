let button1, button2, button3;
let sprite1Sheet, sprite2Sheet;
let sprite1Images = [];
let sprite2Images = [];
let currentSprite1Frame = 0;
let currentSprite2Frame = 0;
let sprite1FrameCount = 5;
let sprite2FrameCount = 2;
let sprite1FrameWidth = 490 / 5;
let sprite1FrameHeight = 66;
let sprite2FrameWidth = 221 / 2;
let sprite2FrameHeight = 48;
let displaySprite1 = false;
let displaySprite2 = false;
let sprite1FrameInterval = 200; // 每幀的間隔時間（毫秒）
let sprite2FrameInterval = 500; // 每幀的間隔時間（毫秒）
let lastSprite1FrameTime = 0;
let lastSprite2FrameTime = 0;
let iframe;

function preload() {
  sprite1Sheet = loadImage('02.png', () => {}, () => {
    console.error('Failed to load 02.png');
  });
  sprite2Sheet = loadImage('03.png', () => {}, () => {
    console.error('Failed to load 03.png');
  });
}

function setup() {
  createCanvas(900, 600);

  // 手動切割 sprite1Sheet
  for (let i = 0; i < sprite1FrameCount; i++) {
    let x = i * sprite1FrameWidth;
    sprite1Images[i] = sprite1Sheet.get(x, 0, sprite1FrameWidth, sprite1FrameHeight);
  }

  // 手動切割 sprite2Sheet
  for (let i = 0; i < sprite2FrameCount; i++) {
    let x = i * sprite2FrameWidth;
    sprite2Images[i] = sprite2Sheet.get(x, 0, sprite2FrameWidth, sprite2FrameHeight);
  }

  button1 = createButton('自我介紹');
  button1.position(250, 50);
  button1.size(100, 50);
  button1.style('font-size', '20px');
  button1.mouseOver(() => displaySprite1 = true);
  button1.mouseOut(() => displaySprite1 = false);
  button1.mousePressed(() => showIframe('https://www.et.tku.edu.tw/'));

  button2 = createButton('作品簡介');
  button2.position(360, 50);
  button2.size(100, 50);
  button2.style('font-size', '20px');
  button2.mouseOver(() => displaySprite2 = true);
  button2.mouseOut(() => displaySprite2 = false);
  button2.mousePressed(() => showIframe('https://jieyu08090520.github.io/413730994/'));
  
  button3 = createButton('筆記說明');
  button3.position(470, 50);
  button3.size(100, 50);
  button3.style('font-size', '20px');
  button3.mouseOver(() => displaySprite2 = true);
  button3.mouseOut(() => displaySprite2 = false);
}

function draw() {
  background(255);
  let currentTime = millis();

  if (displaySprite1) {
    if (currentTime - lastSprite1FrameTime > sprite1FrameInterval) {
      currentSprite1Frame = (currentSprite1Frame + 1) % sprite1FrameCount;
      lastSprite1FrameTime = currentTime;
    }
    displayAnimation(sprite1Images, currentSprite1Frame, sprite1FrameCount, 50, 50, sprite1FrameWidth, sprite1FrameHeight);
  }

  if (displaySprite2) {
    if (currentTime - lastSprite2FrameTime > sprite2FrameInterval) {
      currentSprite2Frame = (currentSprite2Frame + 1) % sprite2FrameCount;
      lastSprite2FrameTime = currentTime;
    }
    displayAnimation(sprite2Images, currentSprite2Frame, sprite2FrameCount, 50, 50, sprite2FrameWidth, sprite2FrameHeight);
  }
}

function displayAnimation(images, currentFrame, frameCount, x, y, frameWidth, frameHeight) {
  image(images[currentFrame], x, y, frameWidth, frameHeight);
}

function showIframe(url) {
  if (iframe) {
    iframe.remove();
  }
  iframe = createElement('iframe');
  iframe.attribute('src', url);
  iframe.style('position', 'absolute');
  iframe.style('left', '10%');
  iframe.style('top', '20%');
  iframe.style('width', '80%');
  iframe.style('height', '60%');
  iframe.style('border', 'none');
}
