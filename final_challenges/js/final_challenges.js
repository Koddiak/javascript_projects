// Remove fade-out class.
$(function() {
    $("body").removeClass("fade-out");
});

// Phone number form validation.
function validateForm() {
    var a = document.forms["c-form"]["first-name"].value;
    var b = document.forms["c-form"]["last-name"].value;
    var c = document.forms["c-form"]["email"].value;
    var d = document.forms["c-form"]["phone-number"].value;
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

// Automatic slide show functions.
$("#slideshow > div:gt(0)").hide();

setInterval(function() {
    $("#slideshow > div:first")
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo("#slideshow");
}, 3000);