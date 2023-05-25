// Get all the necessary DOM elements
const input = document.getElementById('input_textarea');
const submit = document.getElementById('submit');
const result = document.getElementById('result_textarea');
const clear = document.getElementById('clear');
const errorMessage = document.getElementById('form-msg');

// Create function to handle the submit event on the form
const handleSubmit = (e) => {
  //prevent default form for submission
  e.preventDefault();

  //validate input function
  const validateInput = () => {
    let formValue = input.value.trim();
    if (formValue === '') {
      //set an error if the input is empty
      setError(input, 'Input field must not be empty!')
      return false;
    } else {
      //set succes if the input is not empty
      setSuccess(input);
    }
    //check if the input contains numbers 
    const regEx = /[0-9]/;
    if (regEx.test(formValue)) {
      //replace the , with space and splits the input to one or more space characters
      let str = formValue.replace(/,/g, " ").split(/\s+/);
      return str;
    } else {
      let str = formValue.replace(/,/g, " ").split(/\s+/);
      let arr = str.sort();
      return result.innerHTML = arr;
    }
  };

  //check if the input is validate
  if (validateInput()) {
    let data = validateInput();
    //display the result
    result.innerHTML = data.sort(compareNumbers);
  }
}

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

//function to compare numbers, substract b form a
function compareNumbers(a, b) {
  return a - b;
}

//add event listnere
submit.addEventListener('click', (e) => handleSubmit(e));
clear.addEventListener('click', function () {
  input.value = "";
}, false);
