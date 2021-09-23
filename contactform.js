const username = document.getElementById("username");
const email = document.getElementById("email");
const message = document.getElementById("message");
const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    validations();
});

function validations() {
    const emailValue = email.value.trim();
    const usernameValue = username.value.trim();
    const messageValue = message.value.trim();

    if(usernameValue === "" || usernameValue == null) {
		setErrorFor(username, "IGN cannot be blank");
	} else {
		setSuccessFor(username);
	}
	
	if(emailValue === "" || emailValue == null) {
		setErrorFor(email, "Email cannot be blank");
	} else if (!validateEmail(emailValue)) {
		setErrorFor(email, "Email is invalid");
	} else {
		setSuccessFor(email);
	}

    if(messageValue === "" || messageValue == null) {
        setErrorFor(message, "Message cannot be blank");
    } else {
        setSuccessFor(message);
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