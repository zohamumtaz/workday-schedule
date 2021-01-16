//GIVEN I am using a daily planner to create a schedule
//WHEN I open the planner
//THEN the current day is displayed at the top of the calendar
//WHEN I scroll down
//THEN I am presented with time blocks for standard business hours
//WHEN I view the time blocks for that day
//THEN each time block is color-coded to indicate whether it is in the past, present, or future
//WHEN I click into a time block
//THEN I can enter an event
//WHEN I click the save button for that time block
//THEN the text for that event is saved in local storage
//WHEN I refresh the page
//THEN the saved events persist



// workday time mention
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let workDay = {"8 AM": "","9 AM": "","10 AM": "","11 AM": "","12 PM": "","1 PM": "","2 PM": "","3 PM": "","4 PM": "","5 PM": "",};

$(document).ready(function(){if(!localStorage.getItem('workDay')) {
    updateCalendarTasks(workDay);} else {
    updateCalendarTasks(JSON.parse(localStorage.getItem('workDay')));}})
//date format
$('#date-today h6').text(moment().format('dddd') + ", " + moment().format('MMMM Do YYYY, h:mm:ss a'));
//select criteria in term of past ,future and present 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let counter = 1;
for(const property in workDay) {
  let textEntry = "#text-entry" + counter;
  $(textEntry).text(workDay[property]);
  let timeId = "#time" + counter;
  let presentHour = moment().hour();
  let timeString = $(timeId).text();
  let timeNumber = hourNumberFromHourString(timeString);  
  if(timeNumber < presentHour) {
    $(textEntry).addClass("past-hour");} else if (timeNumber > presentHour) {
    $(textEntry).addClass("future-hour");} else {
    $(textEntry).addClass("present-hour");}
  counter ++;}
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//button function  to generate save schedule
$("button").click(function() {
  value = $(this).siblings("textarea").val();
  hourString = $(this).siblings("div").text();
  
  saveSchedule(hourString, value);
});
//switching time  (1 hour)

function hourNumberFromHourString(hourString) {switch(hourString) {
   case "8 AM": return 8;case "9 AM": return 9;case "10 AM": return 10;case "11 AM": return 11;case "12 PM": return 12;case "1 PM": return 13;case "2 PM": return 14;case "3 PM": return 15;case "4 PM": return 16;case "5 PM": return 17;
}
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//function local correct dataset
function loadCorrectDataset() {
  result = localStorage.getItem('workDay')
  return (result ? result : workDay);}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//function intial local storage
function initializeLocalStorage() {
  localStorage.setItem('workDay', JSON.stringify(workDay));};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
  //function save to local storage
function saveToLocalStorage(dayObj) {
  localStorage.setItem('workDay', JSON.stringify(dayObj));}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //function saveschedule 
function saveSchedule(hourString, val) {
  if(!localStorage.getItem('workDay')) {
    initializeLocalStorage();}
 
  let workHours = JSON.parse(localStorage.getItem('workDay'));
  workHours[hourString] = val
saveToLocalStorage(workHours);
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//function update calender 
function updateCalendarTasks(dayObject) {$(".calendar-row").each(function(index) {
    let res = $(this).children("div");
    $(this).children("textarea").text(dayObject[res.text()]);
  })}
