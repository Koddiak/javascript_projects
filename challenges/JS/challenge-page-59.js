function bigImg(x) {
    x.style.height = String(x.naturalHeight * 2) + "px";
    x.style.width = String(x.naturalWidth * 2) + "px";
}

function normalImg(x) {
    x.style.height = String(x.naturalHeight) + "px";
    x.style.width = String(x.naturalWidth) + "px";
}