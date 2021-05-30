// form
const form = document.querySelector("#sign-up");

// all inputs
const name = document.querySelector("#name");
const subject = document.querySelector("#subject");
const email = document.querySelector("#email");
const message = document.querySelector("#message");


// error messages
const nameError = document.querySelector("#name-error");
const subjectError = document.querySelector("#subject-error");
const emailError = document.querySelector("#email-error");
const messageError = document.querySelector("#message-error");


// Form success
const success = document.querySelector(".success");

// Making the name input required
name.setAttribute("required", "");
const formValidation=(formEvent)=>{
    // making sure the form wont submit without validating it
    formEvent.preventDefault();
    
    // Validate name, making sure the name has 2 or more characters
    let givenName = name.value.trim();
    nameError.innerHTML = "";
    if(givenName.length < 2){
        nameError.innerHTML += "A real name is required.";
    }
    // looking for a digit in the name, to make sure to make sure there are no digits 
    if(/\d/.test(givenName)){
        nameError.innerHTML += "Please enter a valid name";
    }

    // Validate subject - min length 10 characters
    let givenSubject = subject.value.trim();
    subjectError.innerHTML = "";
    if(givenSubject.length < 10){
        subjectError.innerHTML += "You must have at least 10 characters";
    }

    // Validate email - must have a value and be formatted like an email address
    let givenEmail = email.value.trim();
    emailError.innerHTML = "";
    let emailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!emailFormat.test(givenEmail)){
        emailError.innerHTML += "Not a valid email";
    }

    // Validate message - should be at least 25 characters
    let givenMessage = message.value.trim();
    messageError.innerHTML = "";
    if(givenMessage.length < 25){
        messageError.innerHTML += "Please tell us a bit more about you problem";
    }

    // Level 2 - add a message above the form indicating the form passed validation.
    if(nameError.innerHTML === "" && subjectError.innerHTML === "" && emailError.innerHTML === "" && messageError.innerHTML === ""){
        success.innerHTML += "Form Submitted!";
    }

};

form.addEventListener("submit", formValidation);