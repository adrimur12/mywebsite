//Form validation Script
// Get all the necessary DOM elements
const form = document.getElementById('form');
const username = document.getElementById('fullName');
const email = document.getElementById('email');
const message = document.getElementById('message');
//const submitButton = document.querySelector('.submit')
const successMessage = document.getElementById('form-submitted-msg');

//setError function if is an empty string, which receive an html element and error message as parameter
const setError = (element, message) => {
  //get parent element
  const inputControl = element.parentElement;
  //save the reference for the error display
  const errorDisplay = inputControl.querySelector('.error');

  //set the inner text of our error display to be the message
  errorDisplay.innerText = message;
  //add the error class to our input
  inputControl.classList.add('error');
};

//setSucess function if the field is not empty
const setSuccess = element => {
  //get parent element
  const inputControl = element.parentElement;
  //save the reference
  const errorDisplay = inputControl.querySelector('.error');

  //clear the text in the error display with an empty string
  errorDisplay.innerText = '';
  //remove the error class
  inputControl.classList.remove('error');
};

//return true if the user provided a valid email address
const isValidEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Create function to handle the submit event on the form
const handleSubmit = (e) => {
  //prevent default form for submission
  e.preventDefault();

  //validate inputs function, to validate inputs
  const validateInputs = () => {
    //get value of all the inputs fields, used trim to remove all the white spaces that the string have
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    //check whether is an empty string or has value
    if (usernameValue === '') {
      //set an error if is an empty string
      setError(username, 'Username is required');
      return false;
    } else {
      //set success if the username is given
      setSuccess(username);
    }

    // if the email input is empty , set the error
    if (emailValue === '') {
      setError(email, 'Email is required');
      return false;
      //check if is the valid email, if is not set an error
    } else if (!isValidEmail(emailValue)) {
      setError(email, 'Provide a valid email address');
      return false;
    } else {
      setSuccess(email);
    }

    //check if the message input is empty, if it is set an error
    if (messageValue === '') {
      setError(message, 'Message is required');
      return false;
    } else {
      setSuccess(message);
    }
    return true;
  };

    if (validateInputs()) {
      //invoke the data function to get the form submission
      data();
      //display the message if all the inputs are valid
      successMessage.style.display = 'block';
      //reset the form 
      form.reset();

      setTimeout(() => {
        successMessage.style.display = 'none';
      }, 3000)
    }
}

//add event listnere to the form on the submit event
form.addEventListener('submit', (e) => handleSubmit(e));

//Firebase Object
const firebaseConfig = {
  apiKey: "AIzaSyAeOl9jpIfBegWNUBgaoHo71I34u3qWOc8",
  authDomain: "cloud-form-35994.firebaseapp.com",
  projectId: "cloud-form-35994",
  storageBucket: "cloud-form-35994.appspot.com",
  messagingSenderId: "845134013506",
  appId: "1:845134013506:web:82f0ca5181fbfd5ea6b9db"
};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);
let firestore = firebase.firestore();

//Variable to access database collection
const db = firestore.collection("formData");

//get form submission data
const data = () => {

  let fullNameInput = username.value;
  let emailInput = email.value;
  let messageInput = message.value;

//Save Form Data To Firebase
  db.doc()
  .set({
    fullName: fullNameInput,
    email: emailInput,
    message: messageInput,
  })
  .then(() => { })
  .catch((error) => {
    console.log(error);
  });
};

//adjust text area for message on contact form
const textarea = document.querySelector('textarea')
//add a keyup listener for the text area
textarea.addEventListener('keyup', () => {
  textarea.style.height = `${textarea.scrollHeight}px`;
})

//Enable tooltips
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

//Carousel script
let multipleCardCarousel = document.querySelector(
  "#carouselExampleControls"
);

//get default Bootstrap carousel for smaller screens, check if the window size is at least 768px and execute the code,if not, add the slide class
if (window.matchMedia("(min-width: 768px)").matches) {
  //get the entire width of the carousel
  let carouselWidth = $(".carousel-inner")[0].scrollWidth;

  //get the width of a single card in the carousel
  let cardWidth = $(".carousel-item").width();

  //store the current scroll position
  let scrollPosition = 0;

  //next button is clicked, reach the 7th card
  $("#carouselExampleControls .carousel-control-next").on("click", function () {
    if (scrollPosition < carouselWidth - cardWidth * 4) {
      scrollPosition += cardWidth;
      $("#carouselExampleControls .carousel-inner").animate(
        { scrollLeft: scrollPosition },
        600
      );
    }
  });
  //previous button is clicked, reach the 1st card
  $("#carouselExampleControls .carousel-control-prev").on("click", function () {
    if (scrollPosition > 0) {
      scrollPosition -= cardWidth;
      $("#carouselExampleControls .carousel-inner").animate(
        { scrollLeft: scrollPosition },
        600
      );
    }
  });
} else {
  $(multipleCardCarousel).addClass("slide");
}