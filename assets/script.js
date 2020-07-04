/* Global variable declarations 
-------------------------------------------------------------------- */

// Get the text saved in local storage or create the base array of objects to be used to store events
var events = JSON.parse(window.localStorage.getItem("events")) || [
  { timeblockTextId: "textarea9AM", eventInfo: "" },
  { timeblockTextId: "textarea10AM", eventInfo: "" },
  { timeblockTextId: "textarea11AM", eventInfo: "" },
  { timeblockTextId: "textarea12PM", eventInfo: "" },
  { timeblockTextId: "textarea1PM", eventInfo: "" },
  { timeblockTextId: "textarea2PM", eventInfo: "" },
  { timeblockTextId: "textarea3PM", eventInfo: "" },
  { timeblockTextId: "textarea4PM", eventInfo: "" },
  { timeblockTextId: "textarea5PM", eventInfo: "" },
];

// Get the current time
var currentTime = moment().format("k");

// Add date under page header
var currentDayP = $("#currentDay");
currentDayP.text(moment().format("dddd, MMMM Do"));

// Load saved events upon page load
function loadEvents() {
  events.forEach(eventText);

  function eventText(text) {
    $("#" + text.timeblockTextId).text(text.eventInfo);
  }
}

loadEvents();

// Determine if the timeblock is in past/present/future and style the element accordingly
function addBackgroundColors() {
  var possibleTimes = [
    { textareaEl: $("#textarea9AM"), militaryVal: 9 },
    { textareaEl: $("#textarea10AM"), militaryVal: 10 },
    { textareaEl: $("#textarea11AM"), militaryVal: 11 },
    { textareaEl: $("#textarea12PM"), militaryVal: 12 },
    { textareaEl: $("#textarea1PM"), militaryVal: 13 },
    { textareaEl: $("#textarea2PM"), militaryVal: 14 },
    { textareaEl: $("#textarea3PM"), militaryVal: 15 },
    { textareaEl: $("#textarea4PM"), militaryVal: 16 },
    { textareaEl: $("#textarea5PM"), militaryVal: 17 },
  ];

  // Loop through array of objects of possible times and set the background color accordingly
  for (var i = 0; i < possibleTimes.length; i++) {
    if (currentTime == possibleTimes[i].militaryVal) {
      possibleTimes[i].textareaEl.addClass("present");
    } else if (currentTime > possibleTimes[i].militaryVal) {
      possibleTimes[i].textareaEl.addClass("past");
    } else {
      possibleTimes[i].textareaEl.addClass("future");
    }
  }
}

addBackgroundColors();

// Event listener triggered when user cllicks on save button
$(".saveBtn").click(function () {
  // Set hour selected based on button clicked
  var selectedTimeblockVal = $(this).attr("data-hour");

  // Get an array of all the textarea elements in the document
  var allTextFields = $("textarea").get();

  // Loop through all the textarea elements and check if the data-hour value equals that of selected hour.
  for (var i = 0; i < allTextFields.length; i++) {
    // Identify the hour of the current textarea element being checked
    var textblockHourVal = allTextFields[i].dataset.hour;

    // Find the textarea element hour that equals the clicked button hour
    // Identify the id of the textarea that is being modified
    if (selectedTimeblockVal == textblockHourVal) {
      var textFieldId = allTextFields[i].attributes[0].nodeValue;
    }
  }

  // Loop through each object in the events array to set the text that is inputted into specific textarea elements
  events.forEach(eventText);

  function eventText(text) {
    if (text.timeblockTextId == textFieldId) {
      text.eventInfo = $("#" + textFieldId).val();
    }
  }

  // Commit the changes to local storage
  window.localStorage.setItem("events", JSON.stringify(events));
});
