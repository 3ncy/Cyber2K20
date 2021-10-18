/*const cookieAccept = document.getElementById("cookie-accept");

const time = new Date;

let once = false;

var timeLoadedSeconds;
var timeLoadedMinutes;
var timeLoaded;

var timeClickedSeconds;
var timeClickedMinutes;
var timeClicked;

function timeLoad() {
    timeLoadedSeconds = time.getSeconds();
    timeLoadedMinutes = time.getMinutes() * 60;
    timeLoaded = timeLoadedSeconds + timeLoadedMinutes;
    once = true;
}

function timeLoadOnce() {
    if(!once) timeLoad();
}
            

cookieAccept.addEventListener("click", (e) => {
    e.preventDefault();

    timeClickedSeconds = time.getSeconds();
    timeClickedMinutes = time.getMinutes() * 60;
    timeClicked = timeClickedSeconds + timeClickedMinutes;

    var finalTime;

    finalTime = timeClicked - timeLoaded;

    document.getElementById("cookie-text-id").innerHTML = finalTime + 's';
});*/