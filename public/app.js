var jsonString = localStorage.getItem('beers');
var savedBeers = JSON.parse(jsonString);



var makeRequest = function (url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', callback);
    request.send();
}

var requestComplete = function () {
    if(this.status !== 200)
      return;
    var jsonString = this.responseText;
    var beers = JSON.parse(jsonString);
    populateSelect(beers);
    var jsonString = JSON.stringify(beers);
    localStorage.setItem('beers', jsonString);
}


var populateSelect = function (beers) {
    var beerSelect = document.getElementById('beer-names');
    beers.forEach(function (beer) {
      var option = document.createElement('option');
      option.innerText = beer.name;
      beerSelect.appendChild(option);
    })
}

var handleSelected = function () {
    // console.log(savedBeers);
    findBeer(this.value, savedBeers);
}

var findBeer = function (beerName, savedBeers) {
    savedBeers.forEach(function (beer) {
      if(beerName === beer.name){
        displayBeer(beer);
      }
    })
}

var displayBeer = function (beer) {
    var ul = document.getElementById('beer-info');
    ingredientsSetup(beer.ingredients);
    ul.innerText = '';
    var liName = document.createElement('li');
    liName.innerText = "Name: " + beer.name;
    var liImage = document.createElement('li');
    var img = document.createElement('img');
    img.width = 100;
    img.src = beer.image_url;
    liImage.appendChild(img);
    ul.appendChild(liName);
    ul.appendChild(liImage);
    var jsonString = JSON.stringify(beer);
    localStorage.setItem('beer', jsonString);


}

ingredientsSetup = function (ingredients) {
  console.log(ingredients);
    var ingredientsP = document.getElementById('ingredients');
    ingredientsP.innerText = ' ';
    var ingredientsHeader = document.getElementById('ingredients-header');
    var maltUL = document.getElementById('malt');
    var hopsUL = document.getElementById('hops');
    var yeastUL = document.getElementById('yeast');
    ingredientsHeader.innerText = 'Ingredients';
    maltUL.innerText = 'Malt';
    hopsUL.innerText = 'Hops';
    yeastUL.innerText = 'Yeast';
    ingredients.malt.forEach(function (malt) {
        displayIngredientsList(malt.name, maltUL);
    })
    ingredients.hops.forEach(function (hops) {
       displayIngredientsList(hops.name, hopsUL);
    })
    displayIngredientsList(ingredients.yeast, yeastUL);
}

displayIngredientsList = function (ingredient, ul) {
    var li = document.createElement('li')
    li.innerText = ingredient;
    ul.appendChild(li);

}

var app = function(){
  console.log('sup!')
    var url = 'https://api.punkapi.com/v2/beers';
    makeRequest(url, requestComplete);
    var select = document.getElementById('beer-names');
    select.addEventListener('change', handleSelected);
    var jsonString = localStorage.getItem('beer');
    var savedBeer = JSON.parse(jsonString);
    if(!savedBeer) return
    displayBeer(savedBeer);
  }

document.addEventListener('DOMContentLoaded', app);
