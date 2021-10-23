var userResolution;
var userProbabilityLocation;

window.onload = function () {
    var loadTime = (window.performance.timing.domContentLoadedEventEnd- window.performance.timing.navigationStart) / 1000 + "s";

    const realWidth = window.screen.width * window.devicePixelRatio;
    const realHeight = window.screen.height * window.devicePixelRatio;

    userResolution = realWidth + "x" + realHeight;

    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          userProbabilityLocation = "user does not have location enabled";
        }
    }
      
    function showPosition(position) {
      userProbabilityLocation = position.coords.latitude + " " + position.coords.longitude;
      fetch('/api/getData', { method: 'POST', headers: { 'Content-Type': 'application/json'}, 
      body: JSON.stringify({ userLocation: userProbabilityLocation, userLoadTime: loadTime, userResolutionScreen: userResolution})});
    }

    showPosition(getLocation());
}