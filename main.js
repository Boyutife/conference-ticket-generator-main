const InputAvatar = document.getElementById('input-avatar');
const previewAvatar = document.getElementById('preview-avatar');
const avatarBtn = document.getElementById('avatar-btns');
const avatarText = document.querySelector('.avatar-text');

// Input values for avatar
let fullNameValue = '';
let emailValue = '';
let githubUsernameValue = '';
let avatarValue = null;

// Condition to check if input fields are empty

function checkInputFields() {
  let fullName = document.getElementById('full-name');
  let email = document.getElementById('email');
  let githubUsername = document.getElementById('github-username');

  if (InputAvatar.value === '') {
    let wrapper = document.querySelector('.wrapper');
    let error = document.createElement('p');
    error.className = 'input-error';
    error.textContent = 'please upload a valid image.';
    error.style.color = 'red';
    wrapper.appendChild(error);
    return false;
  }

  if (fullName.value.trim() === ' ' || fullName.value.trim().length < 6) {
    let wrapper = document.querySelector('.name-wrapper');
    let error = document.createElement('p');
    error.className = 'input-error';
    error.style.color = 'red';
    error.textContent = 'please enter a valid name with atleast 6 characters.';
    wrapper.appendChild(error);
    return false;
  }

  if (email === ' ' || !email.value.includes('@')) {
    let wrapper = document.querySelector('.email-wrapper');
    let error = document.createElement('p');
    error.className = 'input-error';
    error.textContent = 'please enter a valid email address.';
    error.style.color = 'red';
    wrapper.appendChild(error);
    return false;
  }

  if (
    githubUsername.value.trim() === ' ' ||
    githubUsername.value.trim().length < 6
  ) {
    let wrapper = document.querySelector('.github-wrapper');
    let error = document.createElement('p');
    error.className = 'input-error';
    error.textContent = 'please enter a valid github username with @.';
    error.style.color = 'red';
    wrapper.appendChild(error);
    return false;
  }

  fullNameValue = fullName.value.trim();
  emailValue = email.value.trim();
  githubUsernameValue = githubUsername.value.trim();
  avatarValue = InputAvatar.value;
  return true;
}

//  Input file for avatar
InputAvatar.addEventListener('change', (e) => {
  let error = document.querySelector('.avatar-info');
  const file = e.target.files[0];
  if (file.size <= 512000) {
    avatarText.style.display = 'none';
    previewAvatar.src = URL.createObjectURL(file);
    avatarBtn.style.display = 'flex';
  } else {
    error.style.color = 'red';
  }
});

function removeAvatar() {
  previewAvatar.src = './assets/images/icon-upload.svg';
  avatarBtn.style.display = 'none';
  avatarText.style.display = 'block';
  InputAvatar.value = '';
}

function changeAvatar() {
  InputAvatar.click();
}

// Generate ticket button

const generateTicketBtn = document.querySelector('.generate-ticket-btn');

generateTicketBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const isValid = checkInputFields();
  if (isValid) {
    let wrapper = document.querySelector('.form-wrapper');
    let ticketWrapper = document.querySelector('.ticket-card');
    wrapper.classList.add('hidden');
    ticketWrapper.style.display = 'flex';
  }
  const username = document.querySelector('.ticket-card-username');
  const githubUsername = document.querySelector('.ticket-github-username');
  const headerText = document.querySelector('header h1');
  const subHeaderText = document.querySelector('header h2');
  const ticketAvatar = document.querySelector('.ticket-avatar');
  ticketAvatar.src = URL.createObjectURL(InputAvatar.files[0]);
  username.innerText = fullNameValue;
  githubUsername.innerText = githubUsernameValue;
  // headerText.innerText = `Congrats, ${fullNameValue}! Your ticket is ready!`;
  headerText.innerHTML = `<h1>Congrats, <span class="ticket-page-name">${fullNameValue}!</span> Your ticket is ready!</h1>`;

  // subHeaderText.innerText = `Weve emailed your ticket to  ${emailValue} and will send updates in the run up to the event.`;
  subHeaderText.innerHTML = `<h2>We've emailed your ticket to <span class="ticket-page-email">${emailValue}</span> and will send updates in the run up to the event.</h2>`;

  const currentDate = new Date();
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  let formattedDate = currentDate.toLocaleDateString('en-US', options);
  const eventMonth = document.querySelector('.event-month');
  const eventDay = document.querySelector('.event-day');
  const eventYear = document.querySelector('.event-year');

  eventDay.innerText = formattedDate.split(' ')[1];
  eventMonth.innerText = formattedDate.split(' ')[0];
  eventYear.innerText = formattedDate.split(' ')[2];
});
