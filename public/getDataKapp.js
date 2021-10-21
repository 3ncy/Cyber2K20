var userResolution;

window.onload = function () {
    var loadTime = (window.performance.timing.domContentLoadedEventEnd- window.performance.timing.navigationStart) / 1000 + "s";
    console.log('Page load time is '+ loadTime);

    const realWidth = window.screen.width * window.devicePixelRatio;
    const realHeight = window.screen.height * window.devicePixelRatio;
    console.log(realWidth + "x" + realHeight);

    window.navigator.geolocation.getCurrentPosition(console.log, console.log);

    function getLocation() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        } else {
          console.log("Your browser does not suppost Geo Location");
        }
      }
      
      function showPosition(position) {
        console.log(position.coords.latitude + " " + position.coords.longitude);
      }

      showPosition(getLocation());
}