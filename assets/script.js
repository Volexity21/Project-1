var DropDowntrigger = document.querySelector(".button");
var dropDownShow = document.querySelector(".dropdown");
var filterBtn = document.querySelector(".filter-btn");
var submitBtn = document.querySelector(".submit-btn");
var backBtn = document.querySelector(".back-btn");
var tagOptions = document.querySelectorAll(".filter-option");
var tempFilterTxt = document.querySelector(".temp-filter");
var Sad = ["happiness", "cry", "loss", "death", "doing"];
var life = ["living", "doinig", "use", "making"];
var friendship = ["family", "love", "hostility", "other", "friend"];
var love = [
  "valentine's day",
  "love",
  "making love",
  "partnership",
  "gauge",
  "romantic",
  "cute",
];
var funny = ["life", "people", "man", "funny", "want", "thing"];
var common = [];
// Want to dynamically add filter boxes based on how many filters we decide to use
// Dowm the road wishlist item
var numOfFilter = 3;

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "2ffa236209msh40cdcf1eec77dd3p199fb7jsncccb2f0b5456",
    "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
  },
};

var DropFunction = function (event) {
  event.preventDefault();
  
  dropDownShow.classList.add("is-active");
};

if (submitBtn != null) {
  submitBtn.addEventListener("click", function () {
    // grab chosen tag in var
    // clear tagopt1
    // var tagopt1 = 'funny'
    generateAdjustment();
    displayBlaster();
    displayProgressBar();
    quote();
    // document.location.href = "./result.html";
  });
}

if (backBtn != null) {
  backBtn.addEventListener("click", function () {
    console.log("clicking");
    document.location.href = "./index.html";
  });
}

for (i of tagOptions) {
  i.addEventListener("click", function () {
    var chosenTag = this.textContent.trim();
    tempFilterTxt.textContent = chosenTag;
    dropDownShow.classList.remove("is-active");
  });
}

DropDowntrigger.addEventListener("click", DropFunction);

// Function to return commonElements
function getCommon(tagsL, input, funny) {
  tagsL.sort(); // Sort both the arrays
  funny.sort(); // Array to contain common elements
  var i = 0,
    j = 0; // i points to arr1 and j to arr2
  // Break if one of them runs out
  while (i < tagsL.length && j < funny.length) {
    if (tagsL[i] == funny[j]) {
      // If both are same, add it to result
      common.push(tagsL[i]);
      i++;
      j++;
    } else if (tagsL[i] < funny[j]) {
      // Increment the smaller value so that
      i++; // it could be matched with the larger
    } // element
    else {
      j++;
    }
  }
  console.log(common.length);
  if (common.length < 3) {
    common.length = 0;
    console.log(tagsL);
    console.log(common.length);
    setTimeout(quote, 1400);
  } else {
    input = input.replace(/[^\w\s.&-]+/g, "");
    console.log(input);
    console.log(common);
    // yodaTranslate(input);
    console.log("yes I am three");
  }
}

var yodaTranslate = function (input) {
  var yoda =
    "https://api.funtranslations.com/translate/yoda.json?text=" + input + ".";
  fetch(yoda)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          console.log(data.contents.translated);
          var YodaQuote = data.contents.translated;
          //setlocal storage (will need to change to YodaQuote wehen ready for testing)
          localStorage.setItem(input);
          console.log(localStorage);
          //go to result.html
          window.location.assign("./result.html");
          //get local storage (will need to change to YodaQuote wehen ready for testing)
          localStorage.getItem(input);
          //append local storage to quote box
          var quoteBox = document.querySelectorAll("#pg2-quote-container").children();
          quoteBox.textContent(input);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to API");
    });
};

var displayProgressBar = function() {
  var barPlacement = document.querySelector('.progress-bar');
  var progressBar = document.createElement('progress');
  progressBar.setAttribute('class', 'progress is-small custom-progress is-danger');
  barPlacement.appendChild(progressBar);
};

var displayBlaster = function() {
  var barPlacement = document.querySelector('.progress-bar');
  var blaster = document.createElement('img');
  blaster.setAttribute('id', 'blaster-rifle');
  blaster.setAttribute('src', './assets/images/han-solo2.png');

  barPlacement.appendChild(blaster);
}

var generateAdjustment = function() {
  submitBtn.textContent = 'Yoda-fying!';
}

// function filterbychr(input, author) {
//   checker = /^T/;
//   checker.test(author);
//   result = checker.test(author);
//   console.log(result);
//   if (result === false) {
//     setTimeout(quote, 1000);
//   } else {
//     input = input.replace(/[^\w\s.&-]+/g, "");
//     console.log(input);
//     yodaTranslate(input);
//   }
// }

var quote = function () {
  fetch("https://quotes15.p.rapidapi.com/quotes/random/", options)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          var tags = data.tags;
          var input = data.content;
          filterbychr(input, funny, tags);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to connect to API");
    });
};

// Want to dynamically add filter boxes based on how many filters we decide to use
// Dowm the road wishlist item

var DropFunction = function (event) {
  event.preventDefault();

  dropDownShow.classList.add("is-active");
  console.log("click");
};


DropDowntrigger.addEventListener("click", DropFunction);
