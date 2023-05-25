//Type Writer effect script
// get the DOM elements
const typedTextSpan = document.querySelector(".typed-text");
const cursorSpan = document.querySelector(".cursor");

//define the variables 
const textArray = ["Welcome to my personal website.", "currently learning Sotfware Development.","future Web Developer."]; //array of strings
const typingDelay = 200;  //the delay before typing the next character  
const erasingDelay = 100; //the erasing delay 
const newTextDelay = 1500; // delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

//typing function
function type() {
  //type the next character if the last character of the current string was not already typed
  if (charIndex < textArray[textArrayIndex].length) {
    if (!cursorSpan.classList.contains("typing"))
      cursorSpan.classList.add("typing");
    //add the next character to the current text content of the typedTextSpan
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    //set time out method to call back the type function again after the delay
    setTimeout(type, typingDelay);
  }
  else {
    //remove typing class
    cursorSpan.classList.remove("typing");
    setTimeout(erase, newTextDelay);
  }
}
//erase function
function erase() {
  if (charIndex > 0) {
    if (!cursorSpan.classList.contains("typing"))
      // add typing class as soon the erase is done
      cursorSpan.classList.add("typing");
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  }
  else {
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    //reset array index to 0 if the array index is greater than the array of strings
    if (textArrayIndex >= textArray.length)
      textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

//add the event listner to the DOM content
document.addEventListener("DOMContentLoaded", function () { 
  //check the array to not be empty
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});