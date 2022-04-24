let submitBtn = document.querySelector('.sendForm_button')
let firstName = document.querySelector('#first')
let lastName = document.querySelector('#last')
let email = document.querySelector('#email')
let message = document.querySelector('#message')
    // Event Listeners 

document.querySelector('form').addEventListener('change', isFormValid);
document.querySelector('form').addEventListener('submit', submitForm);
firstName.addEventListener('input', isFirstNameValid);
lastName.addEventListener('input', isLastNameValid);
email.addEventListener('input', isEmailValid);
message.addEventListener('input', isMessageValid);

function displayModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "block";
}

// Disable submit form button
function disableSubmitBtn() {
    submitBtn.disabled = true;
    submitBtn.style.cursor = 'not-allowed';
    submitBtn.style.opacity = '0.5';
}

// Enable submit form button
function enableSubmitBtn() {
    submitBtn.disabled = false;
    submitBtn.style.cursor = 'pointer';
    submitBtn.style.opacity = '1';
}

// Show data error
function showError(el) {
    el.setAttribute('data-error-visible', true);
}

// Hide data error
function hideError(el) {
    el.setAttribute('data-error-visible', false)
}


// Firstname validation 
function isFirstNameValid() {
    let parent = firstName.closest('div');
    showError(parent);
    if (firstName.value.length <= 2) {
        return false;
    }

    if (firstName.value.length >= 15) {
        return false;
    }

    // Match any number in a string
    if (!/^([^0-9]*)$/.test(firstName.value)) {
        return false;
    }

    hideError(parent);
    return true;
}

// Lastname validation
function isLastNameValid() {
    let parent = lastName.closest('div');
    showError(parent);

    if (lastName.value.length <= 2) {
        return false
    }

    // Match any number in a string
    if (!/^([^0-9]*)$/.test(lastName.value)) {
        return false;
    }

    hideError(parent);
    return true;
}

// Email validation 
function isEmailValid() {
    let parent = email.closest('div');
    showError(parent);
    // Regex to match email only
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
        return false;
    }
    hideError(parent);
    return true;

}



function isMessageValid() {
    let parent = message.closest('div');
    showError(parent);

    if (message.value.length <= 30) {
        return false
    }

    hideError(parent);
    return true;
}


// Form validation 
function isFormValid() {

    if (isFirstNameValid() &&
        isLastNameValid() &&
        isEmailValid() &&
        isMessageValid())
    // isBirthdateValid() &&
    // isGameNumValid() &&
    // isLocationValid() &&
    {
        enableSubmitBtn();
        return true;
    }
    disableSubmitBtn();
    return false;

}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

function submitForm() {
    console.log(
        'Name:', firstName.value,
        '\nLastname:', lastName.value,
        '\nEmail:', email.value,
        '\nMessage:', message.value)
    return false
}
disableSubmitBtn();