navigator.geolocation.getCurrentPosition(
    function(position) {
      var latitude = position.coords.latitude.toFixed(6);
      var longitude = position.coords.longitude.toFixed(6);
      chrome.runtime.sendMessage({ latitude: latitude, longitude: longitude });
    },
    function(error) {
      console.log("Error retrieving location: " + error.message);
    }
  );
  