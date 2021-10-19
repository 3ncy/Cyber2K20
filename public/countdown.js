var DateToFinish = new Date("dec 8, 2021 14:35:00").getTime();
DateToFinish.toLocaleString("en-US", {timeZone: "Europe/Prague"});

function Timer() {
    var CurrentDate = new Date().getTime();
    CurrentDate.toLocaleString("en-US", {timeZone: "Europe/Prague"});

    var TimeLeft = DateToFinish - CurrentDate;

    var d = Math.floor(TimeLeft / (1000 * 60 * 60 * 24));
    var h = Math.floor(TimeLeft / (1000 * 60 * 60));
    var m = Math.floor(TimeLeft / (1000 * 60));

    var days = d;
    var hours = h - d * 24;
    var minutes = m - h * 60;

    document.getElementById("countdown-days").innerHTML = days;
    document.getElementById("countdown-hours").innerHTML = hours;
    document.getElementById("countdown-minutes").innerHTML = minutes;
}

setInterval('Timer()', 3000);