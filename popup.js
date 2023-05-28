document.addEventListener("DOMContentLoaded", function() {
    var locationElement = document.getElementById("location");
    var getLocationBtn = document.getElementById("getLocationBtn");
    var themeSwitcher = document.getElementById("themeSwitcher");
    var countElement = document.getElementById("count");
    var count = parseInt(localStorage.getItem("count")) || 0;
  
    getLocationBtn.addEventListener("click", function() {
      locationElement.textContent = "Wework Galaxy, Shanthala Nagar, Ashok Nagar, Bengaluru, Karnataka 560001";
      count++;
      countElement.textContent = "Count: " + count;
      localStorage.setItem("count", count);
    });
  
    themeSwitcher.addEventListener("change", function() {
      var selectedTheme = themeSwitcher.value;
      applyTheme(selectedTheme);
    });
  
    // Schedule alarms to trigger three times a day
    scheduleAlarms();
  });
  
  function scheduleAlarms() {
    // Get the current time
    var now = new Date();
    var currentHour = now.getHours();
  
    // Define the three times you want the popup to appear (in 24-hour format)
    var times = [10, 14, 18];
  
    // Calculate the delay in milliseconds until the next occurrence of each time
    var delays = times.map(function(time) {
      var targetTime = new Date();
      targetTime.setHours(time, 0, 0, 0);
      if (targetTime <= now) {
        targetTime.setDate(targetTime.getDate() + 1);
      }
      return targetTime - now;
    });
  
    // Schedule the alarms
    delays.forEach(function(delay, index) {
      var alarmName = "popupAlarm" + index;
      chrome.alarms.create(alarmName, { delayInMinutes: delay / (60 * 1000) });
    });
  
    // Add an event listener to handle the alarm trigger
    chrome.alarms.onAlarm.addListener(function(alarm) {
      if (alarm.name.includes("popupAlarm")) {
        openPopup();
      }
    });
  }
  
  function openPopup() {
    // Open the popup
    chrome.windows.create({
      url: "popup.html",
      type: "popup",
      width: 800, // Update the width value as desired
      height: 600, // Update the height value as desired
      left: Math.round(screen.availWidth / 2 - 400),
      top: Math.round(screen.availHeight / 2 - 300)
    });
  }
  
  function applyTheme(theme) {
    var popupContainer = document.getElementById("popupContainer");
    var locationElement = document.getElementById("location");
    var getLocationBtn = document.getElementById("getLocationBtn");
  
    // Remove existing theme classes
    popupContainer.classList.remove("theme-light", "theme-dark", "theme-colorful");
  
    // Apply selected theme
    if (theme === "light") {
      popupContainer.classList.add("theme-light");
      locationElement.style.color = "#333333";
      getLocationBtn.style.backgroundColor = "#4CAF50";
    } else if (theme === "dark") {
      popupContainer.classList.add("theme-dark");
      locationElement.style.color = "#000000";
      getLocationBtn.style.backgroundColor = "#333333";
    } else if (theme === "colorful") {
      popupContainer.classList.add("theme-colorful");
      locationElement.style.color = "#000000";
      getLocationBtn.style.backgroundColor = getRandomColor();
    }
  }
  
  function getRandomColor() {
    var colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF8A80", "#66BB6A", "#FFC107"];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  