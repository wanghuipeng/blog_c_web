import { ConnectableObservable } from "rx";

function resizeHeight() {
    var height = getViewPortHeight();

    var aside = document.getElementsByClassName("middle");
    console.log('----', aside)
    var width = document.documentElement.clientWidth || document.body.clientwidth;

    aside.style.height = height - 40 + "px";

    function getViewPortHeight() {
        return document.documentElement.clientHeight || document.body.clientHeight;
    }
}
window.onresize = resizeHeight
window.onload = resizeHeight