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
let views = [];
let votes = [];
let pNames = [];

function PrImage(imgName) {
  this.pName = imgName.split('.')[0];
  this.pImg = `img/${imgName}`;
  this.votes = 0;
  this.views = 0;
  imgNameAraay.push(this);
  pNames.push(this.pName)
}

function saveToLocalStorage() {
  let data = JSON.stringify( imgNameAraay);
  localStorage.setItem('product', data);
}
function readFromLocalStorage() {
  let stringObj = localStorage.getItem('product');
  let normalObj = JSON.parse(stringObj);

  if (normalObj) {
      products = normalObj;
      renderImg();
  }
}
readFromLocalStorage();





for (let i = 0; i < productImages.length; i++) {
  new PrImage(productImages[i]);
}

// console.log(imgNameAraay);
function randomImage() {
  return Math.floor(Math.random() * imgNameAraay.length);//0-1
}

let leftIndex;
let centerIndex;
let rightIndex;
let imagesPerRound = [];



function renderImg() {
  leftIndex = randomImage();//0
  centerIndex = randomImage();
  rightIndex = randomImage();//5

  while (leftIndex === centerIndex || leftIndex=== rightIndex || centerIndex ===rightIndex || imagesPerRound.includes(leftIndex) ||
  imagesPerRound.includes(centerIndex) || imagesPerRound.includes(rightIndex)) {
    leftIndex = randomImage();
    centerIndex = randomImage();
  rightIndex = randomImage();//5
  }

  imagesPerRound = [];
  imagesPerRound[0]=leftIndex;
  imagesPerRound[1]=centerIndex;
  imagesPerRound[2]=rightIndex;


  leftImg.setAttribute('src', imgNameAraay[leftIndex].pImg);
  centerImg.setAttribute('src', imgNameAraay[centerIndex].pImg);
  rightImg.setAttribute('src', imgNameAraay[rightIndex].pImg);

  imgNameAraay[leftIndex].views++;
  imgNameAraay[centerIndex].views++;
  imgNameAraay[rightIndex].views++;
}
renderImg();

leftImg.addEventListener('click', clickHandler);
centerImg.addEventListener('click', clickHandler);
rightImg.addEventListener('click', clickHandler);

function clickHandler(event) {

  if (attempt <= maxAttempts) {
    let clickedImage = event.target.id;
    if (clickedImage === 'leftImg') {
      imgNameAraay[leftIndex].votes++;
    } else if (clickedImage === 'centerImg') {
      imgNameAraay[centerIndex].votes++;
    } else if (clickedImage === 'rightImg') {
      imgNameAraay[rightIndex].votes++;
    }
    renderImg();
    // console.log(imgNameAraay);
    attempt++;
  
 } else {

    let button = document.getElementById('display-button').onclick = function() {display()};
     let arrImg =[];
    
    function display() {

     
      for (let i = 0; i < imgNameAraay.length; i++) {
        let liEl = document.createElement('li');
        result.appendChild(liEl);
     liEl.textContent = `${imgNameAraay[i].pName} has ${imgNameAraay[i].votes} votes and  ${imgNameAraay[i].views} views.`;
     votes.push(imgNameAraay[i].votes);
     views.push(imgNameAraay[i].views);
     arrImg.push(imgNameAraay[i].pName);


     document.getElementById('display-button').style.display = 'none';
      }
      saveToLocalStorage();
      leftImg.removeEventListener('click', clickHandler);
      centerImg.removeEventListener('click', clickHandler);
      rightImg.removeEventListener('click', clickHandler);
      chartRender();  
    }
  }
}

// console.log(votes,views);                                                                  

function chartRender() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: pNames,
          datasets: [{
              label: '# of Votes',
              data: votes,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1
          }, {
              label: '# of views',
              data: views,
              backgroundColor: [
                  'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                  'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}