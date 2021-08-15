'use strict';
let attemptEl = document.getElementById('attempts');
let container = document.getElementById('image-container');
let leftImg = document.getElementById('leftImg');
let centerImg = document.getElementById('centerImg');
let rightImg = document.getElementById('rightImg');
let result = document.getElementById('results');
let productImages = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
let maxAttempts = 25;
let attempt = 1;
let imgNameAraay = [];

function PrImage(imgName) {
  this.gName = imgName.split('.')[0];
  this.gImg = `./img/${imgName}`;
  this.votes = 0;
  this.views = 0;
  imgNameAraay.push(this);
}

// let goat1 = new GoatImage('cruisin-goat.jpg');
// let goat2 = new GoatImage('float-your-goat.jpg');

for (let i = 0; i < productImages.length; i++) {
  new PrImage(productImages[i]);
}

console.log(imgNameAraay);
function randomImage() {
  return Math.floor(Math.random() * imgNameAraay.length);//0-1
  //0.6 0.04
  // 0-goats.length
}
let leftIndex;
let centerIndex;
let rightIndex;
function renderImg() {
  leftIndex = randomImage();//0
  centerIndex = randomImage();
  rightIndex = randomImage();//5

  while (leftIndex === centerIndex || leftIndex=== rightIndex || centerIndex ===rightIndex) {
    leftIndex = randomImage();
  }
  leftImg.setAttribute('src',`./img/${imgNameAraay[leftIndex].gImg}`);
  centerImg.setAttribute('src', imgNameAraay[centerIndex].gImg);
  rightImg.setAttribute('src', imgNameAraay[rightIndex].gImg);
  imgNameAraay[leftIndex].views++;
  imgNameAraay[centerIndex].views++;
  imgNameAraay[rightIndex].views++;
}
renderImg();

leftImg.addEventListener('click', clickHandler);
centerImg.addEventListener('click', clickHandler);
rightImg.addEventListener('click', clickHandler);

function clickHandler(event) {
    
  if (attempt < maxAttempts) {
    let clickedImage = event.target.id;
     if (clickedImage === 'leftImg') {
      imgNameAraay[leftIndex].votes++;
    } else if (clickedImage === 'centerImg') {
      imgNameAraay[centerIndex].votes++;
    } else if (clickedImage === 'rightImg') {
      imgNameAraay[rightIndex].votes++;
    }
    renderImg();
    console.log(imgNameAraay);
    attempt++;
  } else {

    let button = document.getElementById('display-button');
    button.addEventListener('click', display);
    // result
    function display() {

      for (let i = 0; i < imgNameAraay.length; i++) {
        let liEl = document.createElement('li');
        result.appendChild(liEl);
     liEl.textContent = `${imgNameAraay[i].gName} has ${imgNameAraay[i].votes} votes and  ${imgNameAraay[i].views} views.`;
      }
      leftImg.removeEventListener('click', clickHandler);
      centerImg.removeEventListener('click', clickHandler);
      rightImg.removeEventListener('click', clickHandler);
    
    }

}
}
