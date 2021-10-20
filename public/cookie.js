const cookieAccept = document.getElementById("cookie-accept");

var TimeLoaded = new Date();

var runOnlyOnce = (function() {
    var executed = false;
    return function() {
        if (!executed) {
            executed = true;
            TimeLoaded = new Date().getTime();
        }
    };
})();

runOnlyOnce();

cookieAccept.addEventListener("click", (e) => {
    e.preventDefault();

    var TimeClicked = new Date().getTime();

    var TimeToClick2 = (TimeClicked - TimeLoaded) / 1000;

    var TimeToClick = TimeToClick2 + "s";

    fetch('/api/cookie', { method: 'POST', headers: { 'Content-Type': 'application/json'}, 
    body: JSON.stringify({ timeClicked: TimeToClick})});

    document.getElementById("hide-cookie").style.visibility = "hidden";
});