const username = document.getElementById("username");
const email = document.getElementById("email");
const message = document.getElementById("message");
const form = document.getElementById("form");
const button = document.getElementById("submitbutton");
const button_text = document.getElementById("button_text");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if(validations()) {
        const emailValue = email.value.trim();
        const usernameValue = username.value.trim();
        const messageValue = message.value.trim();

        fetch('/api/form/post', { method: 'POST', headers: { 'Content-Type': 'application/json'}, 
        body: JSON.stringify({ email: emailValue, username: usernameValue, message: messageValue})})

        .then(response => {
            return response.json();
        })
        
        .then((body) => {
            if(body.success) {
                validateButton(button);
                setTimeout(() => {
                    resetForm();
                }, 15000);
            } else {
                nothingButton(button, 'There was an error while sending your request');
            }
        });
    };
});

function validations() {
    const emailValue = email.value.trim();
    const usernameValue = username.value.trim();
    const messageValue = message.value.trim();
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

    if(usernameBool && emailBool && messageBool) {
        validateButton(button);
        return true;
        
    } else {
        nothingButton(button);
        return false;
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

function nothingButton(input, message = 'Invalid input') {
    const formControl = input.parentElement;
    button_text.innerHTML = message;

    button_text.classList.remove('ebutton_text');
    button_text.classList.add('sbutton_text');

    formControl.classList.remove('sbutton');
    formControl.classList.add('ebutton');
}

function validateButton(input, message = "Successfully sent") {
    const formControl = input.parentElement;

    button_text.innerHTML = message;

    button_text.classList.remove('sbutton_text');
    button_text.classList.add('ebutton_text');

    formControl.classList.remove('ebutton');
    formControl.classList.add('sbutton');
}

function resetForm() {
    const usernameParent = username.parentElement;
    const emailParent = email.parentElement;
    const messageParent = message.parentElement;
    const buttonParent = button.parentElement;
    const buttonTextParent = button_text.parentElement;

    usernameParent.classList.remove('success');
    emailParent.classList.remove('success');
    messageParent.classList.remove('success');
    buttonParent.classList.remove('sbutton');
    buttonTextParent.classList.remove('sbutton_text');

    username.value = '';
    email.value = '';
    message.value = '';
    button_text.value = '';
};