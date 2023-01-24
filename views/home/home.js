//starting  animation
const W = window.innerWidth;
const H = window.innerHeight;

function updateAnimationTiming() {
  const animationDuration = 5 + Math.random() * 5; // [5 - 10)
  const animationDelay = 5 + Math.random() * 10; // [5 - 15)

  window.requestAnimationFrame(() => {
    document.documentElement.style.setProperty(
      "--animationDuration",
      animationDuration + "s"
    );
    document.documentElement.style.setProperty(
      "--animationDelay",
      animationDelay + "s"
    );
  });

  const timeout = (animationDuration + animationDelay) * 1000 - 100;

  setTimeout(updateAnimationTiming, timeout);
}

updateAnimationTiming();

document.addEventListener("mousemove", (e) => {
  window.requestAnimationFrame(() => {
    const X = e.clientX;
    const Y = e.clientY;

    document.documentElement.style.setProperty("--cursorX", X + "px");
    document.documentElement.style.setProperty("--cursorY", Y + "px");

    const X2 = X - ((12 * W) / 100) * (X / W - 0.5);
    const Y2 = Y - ((12 * W) / 100) * (Y / H - 0.5);

    document.documentElement.style.setProperty("--cursorX2", X2 + "px");
    document.documentElement.style.setProperty("--cursorY2", Y2 + "px");
  });
});

// For Continue button loading ------
document.getElementById("continue-btn").style.display = "none";

function showStuff() {
  document.getElementById("continue-btn").style.display = "inline";
}
// setTimeout(showStuff, 5000);
$(window).on("load", function () {
  $(".continue-button").delay(1000).fadeIn();
});
// $("#continue-btn").click(() => {
//   this.fadeOut(2000);
// });

//FOR AUDIO

const button = document.querySelector("#music-button");
const icon = document.querySelector("#music-button > i");
const audio = document.querySelector("audio");

button.addEventListener("click", () => {
  if (audio.paused) {
    audio.volume = 0.2;
    audio.play();
    icon.classList.remove("fa-volume-up");
    icon.classList.add("fa-volume-mute");
  } else {
    audio.pause();
    icon.classList.remove("fa-volume-mute");
    icon.classList.add("fa-volume-up");
  }
  button.classList.add("fade");
});

$("#continue-btn").on("click", musicPlay);
function musicPlay() {
  document.getElementById("audio").play();
  document.removeEventListener("click", musicPlay);
}

//FOR TAKING CARE OF ENTRANCE AND STUFF

$(document).ready(function () {
  $("#continue-btn").on("click", function () {
    if ($("#bg-video-div").css("display") !== "none") {
      $("#bg-video-div").fadeOut();
      $("#buttonHide").fadeIn();
      $("#music-button").fadeOut();
    } else {
      $("#bg-video-div").fadeIn(4000);
      $("#buttonHide").fadeOut();
      $("#music-button").delay(10).fadeIn(10);
      if ($("#video").css("display") === "none") {
        $("#video").fadeIn();
        $("#navbarId").delay(10000).fadeIn(1000);
        $("#about-monument").delay(6000).fadeIn(800);
        $("#bell-container").delay(6000).fadeIn(800);
        $("#first-heading").delay(10000).fadeIn(800);
        $("#buttonHideAfter").delay(11000).fadeIn(1100);
      }
    }
  });
});
var playPause = document.getElementById("continue-btn-after");
var video = document.getElementById("video");
var playOnce = true;
video.addEventListener("timeupdate", function () {
  if (video.currentTime >= 11.5 && playOnce === true) {
    video.pause();
    playOnce = false;
  }
});

playPause.addEventListener("click", function () {
  let forFirstHeading = true;
  if (video.paused === true && forFirstHeading === true) {
    video.play();
    $("#buttonHideAfter").fadeOut(500);
    $("#first-heading").removeClass("display-b").addClass("display-n fadeOut");
    forFirstHeading = false;
  }
  var toActivateSecondHeading = true;
  if (toActivateSecondHeading === true) {
    $("#second-heading").delay(10000).fadeIn(1000);
    // $("#buttonHideAfter").delay(12000).fadeIn(1500);
    setTimeout(function () {
      video.pause();
    }, 10000);
    var forSecondHeading = true;
    playPause.addEventListener("click", function () {
      if (video.paused === true && forSecondHeading === true) {
        video.play();
        $("#buttonHideAfter").fadeOut(5000);
        $("#second-heading")
          .removeClass("display-b")
          .addClass("display-n fadeOut");
        forSecondHeading = false;
      }
    });
  }
});

// $("#second-heading").addClass("display-n");

//====================TRANSITIONS FOR THE TEXT AND NAVBAR AND STUFF===================

// setTimeout(function () {
//   $("#second-heading").removeClass("display-n").addClass("display-b fadeIn");
// }, 36000);
// // $("#buttonHideAfter").delay(1000).fadeIn(1000);
// setTimeout(function () {
//   $("#second-heading").addClass("fadeOut");
// }, 46000);

// ---------Responsive-navbar-active-animation-----------
function test() {
  var tabsNewAnim = $("#navbarSupportedContent");
  var selectorNewAnim = $("#navbarSupportedContent").find("li").length;
  var activeItemNewAnim = tabsNewAnim.find(".active");
  var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
  var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
  var itemPosNewAnimTop = activeItemNewAnim.position();
  var itemPosNewAnimLeft = activeItemNewAnim.position();
  $(".hori-selector").css({
    top: itemPosNewAnimTop.top + "px",
    left: itemPosNewAnimLeft.left + "px",
    height: activeWidthNewAnimHeight + "px",
    width: activeWidthNewAnimWidth + "px",
  });
  $("#navbarSupportedContent").on("click", "li", function (e) {
    $("#navbarSupportedContent ul li").removeClass("active");
    $(this).addClass("active");
    var activeWidthNewAnimHeight = $(this).innerHeight();
    var activeWidthNewAnimWidth = $(this).innerWidth();
    var itemPosNewAnimTop = $(this).position();
    var itemPosNewAnimLeft = $(this).position();
    $(".hori-selector").css({
      top: itemPosNewAnimTop.top + "px",
      left: itemPosNewAnimLeft.left + "px",
      height: activeWidthNewAnimHeight + "px",
      width: activeWidthNewAnimWidth + "px",
    });
  });
}
$(document).ready(function () {
  setTimeout(function () {
    test();
  });
});
$(window).on("resize", function () {
  setTimeout(function () {
    test();
  }, 500);
});
$(".navbar-toggler").click(function () {
  $(".navbar-collapse").slideToggle(300);
  setTimeout(function () {
    test();
  });
});

// --------------add active class-on another-page move----------
jQuery(document).ready(function ($) {
  // Get current path and find target link
  var path = window.location.pathname.split("/").pop();

  // Account for home page with empty path
  if (path == "") {
    path = "index.html";
  }

  var target = $('#navbarSupportedContent ul li a[href="' + path + '"]');
  // Add active class to target link
  target.parent().addClass("active");
});
// Tab-Pane change function
// function tabChange() {
//   var tabs = $('.navbar-nav > li');
//   var active = tabs.filter('.active');
//   var next = active.next('li').length? active.next('li').find('a') : tabs.filter(':first-child').find('a');
//   next.tab('show');
// }
// $(function(){
//   $('.navbar-nav a').click(function(e) {
//       e.preventDefault();
//       // clearInterval(tabCycle);
//       $(this).tab('show')
//       // tabCycle = setInterval(tabChange, 5000);
//   });
// });

//Continue Button JS
$.fn.boom = function (e) {
  var colors = [
    "#ffb3f6",
    "#7aa0ff",
    "#333",
    // '#FFD100',
    // '#FF9300',
    // '#FF7FA4'
  ];
  var shapes = [
    '<polygon class="star" points="21,0,28.053423027509677,11.29179606750063,40.97218684219823,14.510643118126104,32.412678195541844,24.70820393249937,33.34349029814194,37.989356881873896,21,33,8.656509701858067,37.989356881873896,9.587321804458158,24.70820393249937,1.0278131578017735,14.510643118126108,13.94657697249032,11.291796067500632"></polygon>',
    // '<path class="circle" d="m 20 1 a 1 1 0 0 0 0 25 a 1 1 0 0 0 0 -25"></path>',
    '<polygon class="other-star" points="18,0,22.242640687119284,13.757359312880714,36,18,22.242640687119284,22.242640687119284,18.000000000000004,36,13.757359312880716,22.242640687119284,0,18.000000000000004,13.757359312880714,13.757359312880716"></polygon>',
    '<polygon class="diamond" points="18,0,27.192388155425117,8.80761184457488,36,18,27.19238815542512,27.192388155425117,18.000000000000004,36,8.807611844574883,27.19238815542512,0,18.000000000000004,8.80761184457488,8.807611844574884"></polygon>',
  ];

  var btn = $(this);
  var group = [];
  var num = Math.floor(Math.random() * 50) + 30;

  for (i = 0; i < num; i++) {
    var randBG = Math.floor(Math.random() * colors.length);
    var getShape = Math.floor(Math.random() * shapes.length);
    var c = Math.floor(Math.random() * 10) + 5;
    var scale = Math.floor(Math.random() * (8 - 4 + 1)) + 4;
    var x = Math.floor(Math.random() * (150 + 100)) - 100;
    var y = Math.floor(Math.random() * (150 + 100)) - 100;
    var sec = Math.floor(Math.random() * 1700) + 1000;
    var cir = $('<div class="cir"></div>');
    var shape = $('<svg class="shape">' + shapes[getShape] + "</svg>");

    shape.css({
      top: e.pageY - btn.offset().top + 20,
      left: e.pageX - btn.offset().left + 40,
      transform: "scale(0." + scale + ")",
      transition: sec + "ms",
      fill: colors[randBG],
    });

    btn.siblings(".btn-particles").append(shape);

    group.push({ shape: shape, x: x, y: y });
  }

  for (var a = 0; a < group.length; a++) {
    var shape = group[a].shape;
    var x = group[a].x,
      y = group[a].y;
    shape.css({
      left: x + 50,
      top: y + 15,
      transform: "scale(0)",
    });
  }

  setTimeout(function () {
    for (var b = 0; b < group.length; b++) {
      var shape = group[b].shape;
      shape.remove();
    }
    group = [];
  }, 2000);
};

$(function () {
  $(document).on("click", ".btn", function (e) {
    $(this).boom(e);
  });
});
