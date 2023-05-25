/*This script displays a greeting message to the user based upon the current time */

const today = new Date(); // crate a new date object
const hoursNow = today.getHours(); // find the current hour
const minNow = today.getMinutes(); // find the crrent minutes
const timeNow = hoursNow + ":" + minNow;

let greeting;

//diplay the approriate greeting based on the current time
if (timeNow > '18:00' && timeNow < '23:59') {
  greeting = "Good evening!";
} else if (timeNow > '12:00' && timeNow < '17:59') {
  greeting = "Good afternoon!";
} else if (timeNow > '05:00' && timeNow < '11:59') {
  greeting = "Good morning!";
} else {
  greeting = "Welcome!";
}
//display the greeting and type writer message
let i = 0;
const text = greeting + "\n Hi there!";
//get the element on the page to display the message
const iDs = document.getElementById("msg");

const speed = 50;

function typeWriter() {
  if (i < text.length) {
    iDs.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
//invoke the function
typeWriter();