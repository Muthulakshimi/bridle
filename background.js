chrome.runtime.onInstalled.addListener(function() {
    chrome.action.onClicked.addListener(function(tab) {
      chrome.permissions.request({ permissions: ["geolocation"] }, function(granted) {
        if (granted) {
          chrome.tabs.executeScript(tab.id, { file: "content.js" });
        } else {
          console.log("Geolocation permission denied.");
        }
      });
    });
  });
  