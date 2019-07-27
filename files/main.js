var slideIndex = 1;
$(document).ready(function(){
  $(document).click(function(event) {
    if(!$(event.target).closest("#opportunities-menu")) {
      var margin = parseInt($(".body").css("margin-top"));
      if($("#opportunities-menu").css("display") == "block"){
        $("#opportunities-menu").css("display", "none");
        margin -= $("#opportunities-menu").outerHeight();
      }
    }
  });
  $(window).scroll(function() {
    updateNavigation();
    var height = $("[class$='header-section']").height();
    if($(this).scrollTop() >= height){
      $("#navbar").css("position", "fixed");
      $('a[href="#donate"]').css({"position": "fixed", "top": "67vh"});
      $(".body").css("margin-top", "100px");
    }
    else {
      $("#navbar").css("position", "relative");
      $('a[href="#donate"]').css({"position": "absolute", "top": "167vh"});
      $(".body").css("margin-top", "0px");
    }
    if($("#opportunities-menu").css("display") == "block"){
      var margin = parseInt($(".body").css("margin-top"));
      margin += $("#opportunities-menu").outerHeight();
      $(".body").css("margin-top", margin+"px");
    }

    if ($(window).scrollTop() >= $("#cd-vertical-nav").height() + 50) {
      if ($(window).scrollTop() <= ($(".oppPage").height() - 50)) {
        $("#cd-vertical-nav").css("position", "fixed");
        $("#cd-vertical-nav").css("top", "25%");
        $("#cd-vertical-nav").css("bottom", "unset");
      } else {
          $("#cd-vertical-nav").css("position", "absolute");
          $("#cd-vertical-nav").css("bottom", "2%");
          $("#cd-vertical-nav").css("top", "unset");
      }
    } else {
      $("#cd-vertical-nav").css("position", "absolute");
      $("#cd-vertical-nav").css("top", "1%");
      $("#cd-vertical-nav").css("bottom", "unset");
    }
  });
  $('a[href^="#"]').click(function(event) {
    var target = $(this.getAttribute('href'));
    event.preventDefault();
    $('html, body').animate({scrollTop: target.offset().top - 100}, 800);
  });
  $("#menu-button").click(function(){
    if($("#menu-button > i").hasClass("fa-search")) {
      $("#filter-button").css("display", "none");
      toggleMenu("fa-search", "fa-times");
    }
    else {
      $("#filter-button").css("display", "block");
      toggleMenu("fa-times", "fa-search");
    }
  });

  $("#opportunities-dropdown").click(function(){
    var margin = parseInt($(".body").css("margin-top"));
    if($("#opportunities-menu").css("display") == "none"){
      $("#opportunities-menu").css("display", "block");
      margin += $("#opportunities-menu").outerHeight();
    }
    else {
      $("#opportunities-menu").css("display", "none");
      margin -= $("#opportunities-menu").outerHeight();
    }
    $(".body").css("margin-top", margin+"px");
    $("#filter-menu").css("margin-top", margin+"px");
  });/*
  $("#opportunities > .container > button").click(function(){
    $("#opportunities form").css("display", "block");
    $('html,body').animate({scrollTop: $("#opportunityForm").offset().top-100}, 'slow');
  });
  $("#opportunities form .fa-times").click(function(){
    $("#opportunities form").css("display", "none");
    $('html,body').animate({scrollTop: $("#addYourOwn").offset().top-250}, 'slow');
  });
  $("#opportunities form button").click(function(){
    $("#opportunities form").css("display", "none");
    $('html,body').animate({scrollTop: $("#addYourOwn").offset().top-250}, 'slow');
  });
  $("#opportunities form span").click(function(){
    $("#opportunities form").css("display", "none");
    $('html,body').animate({scrollTop: $("#addYourOwn").offset().top-250}, 'slow');
  });
  $("#filter-button").click(function(){
    $("#filter-menu").css("display", "block");
    $("#filter-button").css("display", "none");
  });
  $("#filter-menu > .fa-times").click(function(){
    $("#filter-menu").css("display", "none");
    $("#filter-button").css("display", "block");
  });
  $("#filter-menu :button").click(function(){
    if (!$(this).hasClass("interestBTN") && !$(this).hasClass("criteriaBox")) {
      $("#filter-menu").css("display", "none");
      $("#filter-button").css("display", "block");
    }
  });
  $("#filter-menu input").click(function(){
	setTimeout(function(){
	  document.body.scrollTop = document.documentElement.scrollTop = 0;
	}, 50);
});*/
  $(".body > button").click(function(){
    $("#filter-menu").css("display", "block");
  });
  $(".opportunity .info h3").click(function(){
	expandable($(this));
  });
  $(".opportunity-alt .info h3").click(function(){
	expandable($(this));
  });
  /*$("#slide-left").click(function(){
    slider(-1);
  });
  $("#slide-right").click(function(){
    slider(1);
  });*/
  document.addEventListener('keydown', function(event) {
	if (event.keyCode == 37) {
	  slider(-1);
	} else if (event.keyCode == 39) {
	  slider(1);
	}
  });
  /*$(".loginNav").click(function() {
    $("#loginModal").css("display", "block");
    $("#msMobileDiag").css("display", "none");
  });
  $(".emailListBTN").click(function() {
    if ($("#emailListInput").val() != "") {
      var message = "You can create a scholarship on Peerlift <a href=\"peerlift.org/onboardingsimple.html\">here</a>";
      var altMessage = "You can create a scholarship on Peerlift here: peerlift.org/onboardingsimple.html";
      var subject = "Create a Scholarship on Peerlift";
      $.ajax({
        type: 'POST',
        url: 'sendEmail.php',
        data: {email: $("#emailListInput").val(), message: message, altMessage: altMessage, subject: subject},
        success: function(response) {
          console.log(response);
        }
      });
      $.ajax({
        type: 'POST',
        url: 'php/addEmail.php',
        data: {email: $("#emailListInput").val()},
        success: function(response) {
          console.log(response);
          $("#emailModal").css("display", "block");
        }
      });
    }
  });
  /*$(".greenProceed").click(function() {
    if ($("#redesignEmailInput").val() != "") {
      var message = "You can create a scholarship on Peerlift <a href=\"peerlift.org/onboardingsimple.html\">here</a>";
      var altMessage = "You can create a scholarship on Peerlift here: peerlift.org/onboardingsimple.html";
      var subject = "Create a Scholarship on Peerlift";
      $.ajax({
        type: 'POST',
        url: 'sendEmail.php',
        data: {email: $("#emailListInput").val(), message: message, altMessage: altMessage, subject: subject},
        success: function(response) {
          console.log(response);
        }
      });
      $.ajax({
        type: 'POST',
        url: 'php/addEmail.php',
        data: {email: $("#emailListInput").val()},
        success: function(response) {
          console.log(response);
          $("#emailModal").css("display", "block");
        }
      });
    }
  });*/
  $('#msBars').on('click', () => {
    $('#msMobileDiag').toggle();
  });
});
function toggleMenu(current, desired) {
  $("#menu-button > i").removeClass(current);
  $("#menu-button > i").addClass(desired);
  $("#navbar > .container > nav"). toggleClass("display-menu");
  $("#opportunity-navbar > .container > nav"). toggleClass("display-menu");
};
function slider(value) {
  $("#mission > div:nth-child(" + (2 + slideIndex) + ")").css("display", "none");
  slideIndex += value;
  if(slideIndex == 0) slideIndex = 4;
  else if(slideIndex == 5) slideIndex = 1;
  $("#mission > div:nth-child(" + (2 + slideIndex) + ")").css("display", "block");
}
function expandable(selected) {
  selected.css("display", "none");
  selected.siblings("h3").css("display", "block");
  selected.siblings("p").toggleClass("see-more");
}

function slideBack(position) {
    if (position >= 0) {
        if (position >= parseFloat(width)) {
            if (uid == "none") {
                $(".body").css("filter", 'contrast(40%)');
                $(".loginPrompt").css("display", "block");
            } else {
                $(".body").css("filter", 'contrast(40%)');
                $(".saved").css("display", "block");
                previous = 0;
            }
            position = parseFloat(width);
        }
        setTimeout(function () {
             $element.css({
                left: (position) + 'px',
                cursor: 'pointer',
                position: 'relative'
            });
            if (position > 0) {
                if (position - 5 > 0) {
                    slideBack(position - 5);
                } else {
                    slideBack(position -1);
                }
            } else {
                previous = 0;
            }
        }, 1);
    }
}

function move(e) {
    if (uid != "") {
        try {
            var touch = e.touches[0];
            var x = touch.pageX;
            var distance = x - current.touches[0].pageX;
        } catch (err) {
            var x = e.pageX;
            var distance = x - current.pageX;
        }
        if ((distance >= 50) && distance <= parseFloat(width)){
            $element.css({
                left: (distance) + 'px',
                cursor: 'pointer',
                position: 'relative'
            });
        }
        previous = parseInt(distance);
    }
}

function updateNavigation() {
    var contentSections = $('.cd-section'),
		navigationItems = $('#cd-vertical-nav a');
    contentSections.each(function(){
        $this = $(this);
        var activeSection = $('#cd-vertical-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
        if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
            navigationItems.eq(activeSection).addClass('is-selected');
        }else {
            navigationItems.eq(activeSection).removeClass('is-selected');
        }
    });
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
/*
function checkOnboarding() {
  if ($(window).width() < 1024) {
    $("#emailModal").css("display", "block");
    $("#msMobileDiag").css("display", "none");
  } else {
    window.open("https://microscholarships.typeform.com/to/qjnzQ3");
  }
}*/

$(document).ready(function(){
  $(".emptyOpp, #watchlist h3").click(function(){
      if($("#menu-button").css("display") != "none") {
        $("#menu-button").click();
      } else {
          var margin = parseInt($(".body").css("margin-top"));
          if($("#opportunities-menu").css("display") == "none"){
            $("#opportunities-menu").css("display", "block");
            margin += $("#opportunities-menu").outerHeight();
          }
          else {
            $("#opportunities-menu").css("display", "none");
            margin -= $("#opportunities-menu").outerHeight();
          }
          $(".body").css("margin-top", margin+"px");
          $("#filter-menu").css("margin-top", margin+"px");
      }
  });
});

$(document).ready(function () {
  $(".oppDescription #readMore").click(function () {
    if ($("#description").css("display") == "none") {
      $("#description").css("display", "block");
      $("#readMore h3").text("Read Less");
    } else {
      $("#description").css("display", "none");
      $("#readMore h3").text("Read More");
    }
    $(".oppDescription i").toggleClass("fa-chevron-down");
    $(".oppDescription i").toggleClass("fa-chevron-up");
  });
  $(".header").click(function () {
    if ($(this).next("div").css("display") == "none") {
      $(this).next("div").css("display", "block");
    } else {
      $(this).next("div").css("display", "none");
    }
    $(this).find("i").toggleClass("fa-chevron-down");
    $(this).find("i").toggleClass("fa-chevron-up");
  });
  $(".close").click(function() {
    $(this).parents("div.modal").css("display", "none");
  });
  $(".signInClose").click(function() {
    $(this).parents("div.modal").css("display", "none");
  });
});

var show = function(a){
  $("#box-".concat(a)).addClass("active").siblings().removeClass("active")};

var showBios = function(a){
  if ($("#bio-".concat(a)).hasClass('display')) {
    $("#bio-".concat(a)).removeClass('display');
  } else {
    $("#bio-".concat(a)).addClass("display").siblings().removeClass("display");
  }
};

function changeCaret(){
  if ($("#opportunities-menu").css("display") == "none") {
    $("#caret").removeClass("fa-caret-down");
    $("#caret").addClass("fa-caret-up");
  } else {
    $("#caret").removeClass("fa-caret-up");
    $("#caret").addClass("fa-caret-down");
  }
}
