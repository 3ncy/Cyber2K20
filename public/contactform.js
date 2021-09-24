const username = document.getElementById("username");
const email = document.getElementById("email");
const message = document.getElementById("message");
const form = document.getElementById("form");
const button = document.getElementById("submitbutton");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    validations();
});

function validations() {
    const emailValue = email.value.trim();
    const usernameValue = username.value.trim();
    const messageValue = message.value.trim();
    const buttonValue = button.value.trim();
    var usernameBool = false;
    var emailBool = false;
    var messageBool = false;

    if(usernameValue === "" || usernameValue == null) {
		setErrorFor(username, "IGN cannot be blank");
	} else {
		setSuccessFor(username);
        usernameBool = true;
	}
	
	if(emailValue === "" || emailValue == null) {
		setErrorFor(email, "Email cannot be blank");
	} else if (!validateEmail(emailValue)) {
		setErrorFor(email, "Email is invalid");
	} else {
		setSuccessFor(email);
        emailBool = true;
	}

    if(messageValue === "" || messageValue == null) {
        setErrorFor(message, "Message cannot be blank");
    } else {
        setSuccessFor(message);
        messageBool = true;
    }

    if(usernameBool == true && emailBool == true && messageBool == true) {
        validateButton(button);
        
    } else {
        nothingButton(button);
    }
}

function setSuccessFor(input) {
    const formControl = input.parentElement;

    formControl.classList.remove('error');
    formControl.classList.add('success');

    const success = formControl.querySelector('small');
    success.textContent = ' ';
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;

    formControl.classList.remove('success');
    formControl.classList.add('error');

    const error = formControl.querySelector('small');
    error.textContent = message;
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
}

function nothingButton(input) {
    const formControl = input.parentElement;

    formControl.classList.remove('sbutton');
    formControl.classList.add('ebutton');
}

function validateButton(input) {
    const formControl = input.parentElement;

    formControl.classList.remove('ebutton');
    formControl.classList.add('sbutton');
}