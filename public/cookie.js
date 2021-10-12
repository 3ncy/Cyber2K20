const getUserLocation;

if (navigator.geolocation) {

    getUserLocation = navigator.geolocation.getCurrentPosition();

} else {
    getUserLocation = "couldnt get users location";
}

fetch('/userdata/location', { method: 'POST', headers: { 'Content-Type': 'application/json'}, 
body: JSON.stringify({ userLocation: getUserLocation})});

const cookieAccept = document.getElementById("cookie-accept");

cookieAccept.addEventListener("click", (e) => {
    e.preventDefault();

    document.getElementById("hide-cookie").style.visibility = "hidden";

});