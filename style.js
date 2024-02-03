var lightBlue = "#89adf5";
var groundColor = "#000000";
var wide = window.innerWidth;
var length = window.innerHeight;
var groundX = 0;
var groundY = 540;
let treeArr = [];
let gravity = 9.81;
let img1;
let words = "Welcome to Alex Martin's website!"

function setup() {
  createCanvas(wide, length);
  img1 = loadImage("images/spring_tree.png");
  img2 = loadImage("images/me.jpg")
  tree = new Tree(0,50, img1);
  shedding = new SheddingTree();
}

function draw() {
  noStroke();
  background(lightBlue);
  tree.drawImage();
  image(img2, 2*wide/3, length/2, 300, 400)
  fill(groundColor);
  rect(groundX, groundY, wide, length);
  let randint = random(0,1);
  let randomX = random(0,wide/2);
  if (randint < 0.01){
    shedding.createFlowers(randomX);
  }
  shedding.drawFlowersLoop();
  shedding.cleanup();
  fill(groundColor);
  textSize(50);
  text("Alex Martin", wide/3, 100);
}

class Tree{
  constructor (xVal, yVal, img){
    this.x = xVal;
    this.y = yVal;
    this.image = img;
  }
  drawImage(){
  image(this.image, this.x, this.y);
  }
}

class SheddingTree{
  constructor(){
    let treeArr = [];
  }
  cleanup(){
    for (let i = 0; i < treeArr.length; i++){
      if (treeArr[i].y >= groundY){
        treeArr.splice(i,1);
      }
    }
  }
  drawFlowersLoop(){
  for (let i = 0; i < treeArr.length; i++){
      treeArr[i].drawflower();
      treeArr[i].fall();
    }
  }
  createFlowers(xVal){
  let flower = new Flower(xVal, 70);
    treeArr.push(flower);
  }
}

class Flower {
  constructor(xValue, yValue){//create flowers
    this.x = xValue;
    this.y = yValue;
    this.size = random(0,12)
    this.color = "#ffb6c1";
    this.angle = random(TWO_PI); // Random initial angle for swaying
    this.amplitude = random(5, 20); // Random amplitude for swaying
    this.speed = random(1, 3); // Random falling speed
  }
  drawflower(){
    fill(this.color);
    ellipse(this.x, this.y, 8, this.size);
  }
  fall(){//set flowers to fall
    //TODO:use my game making skills ot make a more natural fall
    this.x += cos(this.angle) * this.amplitude;
    this.angle += 0.05; // Adjust the speed of swaying

    // Simulate falling motion
    this.y += this.speed/3;
  }
}
//figure out if i can do a time based thing
