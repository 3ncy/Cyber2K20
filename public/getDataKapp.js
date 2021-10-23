var userResolution;
var userProbabilityLocation;

window.onload = function () {
    var loadTime = (window.performance.timing.domContentLoadedEventEnd- window.performance.timing.navigationStart) / 1000 + "s";
    console.log('Page load time is '+ loadTime);

    const realWidth = window.screen.width * window.devicePixelRatio;
    const realHeight = window.screen.height * window.devicePixelRatio;
    console.log(realWidth + "x" + realHeight);

    function getLocation() {
        if (navigator.geolocation) {
          userProbabilityLocation = navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          console.log("Your browser does not suppost Geo Location");
          userProbabilityLocation = "user does not have location enabled";
        }
    }
      
    function showPosition(position) {
      console.log(position.coords.latitude + " " + position.coords.longitude);
    }

    showPosition(getLocation());

    fetch('/api/getData', { method: 'POST', headers: { 'Content-Type': 'application/json'}, 
    body: JSON.stringify({ userLocation: userProbabilityLocation, userLoadTime: loadTime, userResolutionScreen: userResolution})});
}