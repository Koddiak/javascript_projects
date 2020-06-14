// Remove fade-out class.
$(function() {
    $("body").removeClass("fade-out");
});

// Contact form validation.
function validateForm() {
    var a = document.forms["c-form"]["first-name"].value;
    var b = document.forms["c-form"]["last-name"].value;
    var c = document.forms["c-form"]["email"].value;
    var d = document.forms["c-form"]["message"].value;
    if (a == "" || b == "" || c == "" || d == "") {
        alert("All fields must be filled out appropriately.");
        return false;
    }
}

// Pop-up form open and close functions.
function openForm() {
    document.getElementById("contact-form").style.display = "block";
}

function closeForm() {
    document.getElementById("contact-form").style.display = "none";
}

// Slideshow.
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls.
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("my-slides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex =1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}