//Form validation Script
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
//return true if the user provided a valid phone number
const isValidPhoneNumber = phone => {
  const re = /^[0-9\-]+$/;
  return re.test(phone);
}

//validate inputs function
const validateInputs = () => {

  //validate inputs function
  let submitForm;

  //Initially set submitForm to true. 
  submitForm = true;

  //Retrieve variables to be validated and sanitized
  let fullName = new String(document.ContactForm.fullName.value);
  let email = new String(document.ContactForm.email.value);
  let phone = new String(document.ContactForm.phone.value);
  let message = new String(document.ContactForm.message.value);

  //check whether is an empty string or has value
  if (fullName.length < 1) {
      //set an error if is an empty string
      setError(document.ContactForm.fullName, 'Full name is required');
      submitForm = false;
  } else {
      //set success if the username is given
      setSuccess(document.ContactForm.fullName);
  }

  if (email.length < 1) {
      setError(document.ContactForm.email, 'Email is required');
      submitForm = false;
      //check if is the valid email, if is not set an error
  } else if (!isValidEmail(email)) {
      setError(document.ContactForm.email, 'Provide a valid email address');
      submitForm = false;
  } else {
      setSuccess(document.ContactForm.email);
  }

  if (phone.length < 1) {
      setError(document.ContactForm.phone, 'Phone number is required');
      submitForm = false;
      //check if is the valid phone number, if is not set an error
  } else if (phone.length !== 10) {
      setError(document.ContactForm.phone, 'Phone number must be 10 Digits');
  } else if (!isValidPhoneNumber(phone)) {
      setError(document.ContactForm.phone, 'Provide a valid phone number');
  } else {
      setSuccess(document.ContactForm.phone);
  }
  //check if the message input is empty, if it is set an error
  if (message.length < 1) {
      setError(document.ContactForm.message, 'Message is required');
      submitForm = false;
  } else {
      setSuccess(document.ContactForm.message);
  }

  if (submitForm == false) {
      //The form cannot be submitted
      return false;
  } else {
      //SANITIZE user inputs by allowing only [a-z 0-9 _ - . @] 
      fullName = fullName.replace(/[^a-z0-9\s\-]/gim, "");
      fullName = fullName.trim();
      email = email.replace(/[^a-z0-9_@.-]/gim, "");
      email = email.trim();
      phone = phone.replace(/[^a-z0-9_@.-]/gim, "");
      phone = phone.trim();
      message = message.replace(/[^a-z0-9_@.-]/gim, "");
      message = message.trim();
      
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
        //Save Form Data To Firebase
        db.doc()
            .set({
            fullName: fullName,
            email: email,
            phone: phone,
            message: message
        })
            .then(() => { })
            .catch((error) => {
            console.log(error);
        });

        const successMessage = document.getElementById('form-submitted-msg');
        //display the message if all the inputs are valid
       successMessage.style.display = 'block';
       //reset the form 
       form.reset();
           
       setTimeout(() => {
           successMessage.style.display = 'none';
       }, 3000)
    }
}
// Create function to handle the submit event on the form
const handleSubmit = (e) => {
  //prevent default form for submission
  e.preventDefault();

  validateInputs();    
}

//add event listnere to the form on the submit event
form.addEventListener('submit', (e) => handleSubmit(e));

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