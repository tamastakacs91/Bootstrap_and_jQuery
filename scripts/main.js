const testim = document.getElementById('testim');
const testimLeftArrow = document.getElementById('left-arrow');
const testimRightArrow = document.getElementById('right-arrow');
const testimSpeed = 4500;
let currentSlide = 0;
let currentActive = 0;
let testimTimer;
let touchStartPos;
let touchEndPos;
let touchPosDiff;
const ignoreTouch = 30;
let testimData;
const testimDots = Array.prototype.slice.call(document.getElementById('testim-dots').children);
let testimContent;

$(window).scroll(function scrollClass() {
  $('nav').toggleClass('scrolled', $(this).scrollTop() > 1);
});

const testimonials = {
  getJSONData() {
    $.getJSON('http://46.101.237.11/json/users.json', (data) => {
      testimData = data.sort(() => 0.5 - Math.random()).slice(0, 5);
      this.createTestimDivs();
      this.addActiveClasstoFirstDiv();
      this.getTestimContent();
    });
  },
  createTestimDivs() {
    let testimDiv = '';
    for (let i = 0; i < testimData.length; i += 1) {
      // <img src="${testimData[i].picture}"
      testimDiv += `<div>
                        <div class="img">
                            <img src = "https://picsum.photos/id/${this.getRandomNumbetBetween1And1000()}/200/200"
                            alt="${testimData[i].name.first} ${testimData[i].name.last}">
                        </div>
                        <h4 class="h4">${testimData[i].name.first} ${testimData[i].name.last}
                        </h4>
                        <p>${testimData[i].greeting}</p>
                    </div>`;
    }
    // onsole.log(testimDiv);
    $('#testim-content').append(testimDiv);
  },
  addActiveClasstoFirstDiv() {
    $('#testim-content div').eq(0).addClass('active');
  },
  getTestimContent() {
    testimContent = Array.prototype.slice.call(document.getElementById('testim-content').children);
  },
  getRandomNumbetBetween1And1000() {
    return Math.floor(Math.random() * (1000) + 1);
  },
};


$(document).ready(() => {
  testimonials.getJSONData();
});


window.onload = function () {
  // Testim Script
  function playSlide(slide) {
    for (let k = 0; k < testimDots.length; k++) {
      testimContent[k].classList.remove('active');
      testimContent[k].classList.remove('inactive');
      testimDots[k].classList.remove('active');
    }


    if (slide < 0) {
      slide = currentSlide = testimContent.length - 1;
    }

    if (slide > testimContent.length - 1) {
      slide = currentSlide = 0;
    }

    if (currentActive != currentSlide) {
      testimContent[currentActive].classList.add('inactive');
    }
    testimContent[slide].classList.add('active');
    testimDots[slide].classList.add('active');

    currentActive = currentSlide;

    clearTimeout(testimTimer);
    testimTimer = setTimeout(() => {
      playSlide(currentSlide += 1);
    }, testimSpeed);
  }

  testimLeftArrow.addEventListener('click', () => {
    playSlide(currentSlide -= 1);
  });

  testimRightArrow.addEventListener('click', () => {
    playSlide(currentSlide += 1);
  });

  for (let l = 0; l < testimDots.length; l++) {
    testimDots[l].addEventListener('click', function () {
      playSlide(currentSlide = testimDots.indexOf(this));
    });
  }

  playSlide(currentSlide);

  // keyboard shortcuts
  document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
      case 37:
        testimLeftArrow.click();
        break;

      case 39:
        testimRightArrow.click();
        break;

      case 39:
        testimRightArrow.click();
        break;

      default:
        break;
    }
  });

  testim.addEventListener('touchstart', (e) => {
    touchStartPos = e.changedTouches[0].clientX;
  });

  testim.addEventListener('touchend', (e) => {
    touchEndPos = e.changedTouches[0].clientX;

    touchPosDiff = touchStartPos - touchEndPos;

    console.log(touchPosDiff);
    console.log(touchStartPos);
    console.log(touchEndPos);


    if (touchPosDiff > 0 + ignoreTouch) {
      testimLeftArrow.click();
    } else if (touchPosDiff < 0 - ignoreTouch) {
      testimRightArrow.click();
    } else {

    }
  });
};
