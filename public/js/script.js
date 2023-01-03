const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// Request a login before the user can access the page, using a alert or modal
// Check if username is 'admin' and 'password' is '1234'
// If the user is logged in, show the page
// If the user is not logged in, show the login form

// Show the login form
function showLoginForm() {
  const loginForm = $('.login-form');
  loginForm.classList.add('show');
}

// Hide the login form
function hideLoginForm() {
  const loginForm = $('.login-form');
  loginForm.classList.remove('show');
}

// Show the page
function showPage() {
  const page = $('.main-page');
  page.classList.add('show');
}

// Hide the page
function hidePage() {
  const page = $('.main-page');
  page.classList.remove('show');
}

// Check if the user is logged in
function checkLogin() {
  const username = $('#username');
  const password = $('#password');
  if (username.value === 'admin' && password.value === '1234') {
    hideLoginForm();
    showPage();
    alert('You are logged in');

    // Save the login status in local storage
    localStorage.setItem('loginStatus', 'loggedIn');
  } else {
    alert('Wrong username or password');
  }
}

// Add event listeners
function addEventListeners() {
  const loginButton = $('.login-button');
  loginButton.addEventListener('click', checkLogin);
}

// Initialize the app
function init() {
  // Check if the user is logged in
  const loginStatus = localStorage.getItem('loginStatus');
  if (loginStatus === 'loggedIn') {
    hideLoginForm();
    showPage();
    return;
  } else {
    addEventListeners();
  }
}

init();

// Add sneaker form handler
const addSneaker = async (event) => {
  event.preventDefault();

  // Collect values from the form
  const name = $('#name').value || 'No name';
  const brand = $('#brand').value || 'No brand';
  const price = $('#price').value || 0;
  const isHot = $('#isHot').checked;
  const isOnSale = $('#isOnSale').checked;
  const isNew = $('#isNew').checked;
  const rating = $('#rating').value || 0;
  const color = $('#color').value || 'No color';

  // Create a sneaker object
  const sneaker = {
    name,
    brand,
    price,
    isHot,
    isOnSale,
    isNew,
    rating,
    color,
  };

  // Send the sneaker object to the server
  const response = await fetch('/api/sneakers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sneaker),
  });

  // Check if the sneaker was added successfully
  if (response.status === 201) {
    alert('Sneaker added successfully');
  }
};

// Add event listener
const addSneakerForm = $('#add-sneaker-form');
addSneakerForm.addEventListener('submit', addSneaker);
