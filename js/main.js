const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
  modal.classList.toggle("is-open");
}

// day 1
const buttonAuth = document.querySelector('.button-auth'),
      modalAuth = document.querySelector('.modal-auth'),
      closeAuth = document.querySelector('.close-auth'),
      logInForm = document.querySelector('#logInForm'),
      loginInput = document.querySelector('#login'),
      passwordInput = document.querySelector('#password'),
      userName = document.querySelector('.user-name'),
      buttonOut = document.querySelector('.button-out');

let login = JSON.parse(localStorage.getItem('login')) || null;

const toogleModalAuth = () => {
  modalAuth.classList.toggle('is-open');
}

const authorized = () => {
  console.log('authorize');

  userName.textContent = login;

  buttonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display = 'block';

  const logOut = () => {
    login = null;
    localStorage.removeItem('login');
    buttonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display = '';
    buttonOut.removeEventListener('click', logOut)
    checkAuth();
  }

  buttonOut.addEventListener('click', logOut)
}

const notAuthorized = () => {
  console.log('not authorized');

  const logIn = e => {
    e.preventDefault()

    if(!loginInput.value.trim() || !passwordInput.value.trim()){
      loginInput.style.borderColor = 'red';
      passwordInput.style.borderColor = 'red';
    } else {
      login = loginInput.value;
      localStorage.setItem('login', JSON.stringify(login))
      toogleModalAuth();

      buttonAuth.removeEventListener('click', toogleModalAuth);
      closeAuth.removeEventListener('click', toogleModalAuth);
      logInForm.removeEventListener('submit', logIn)
      logInForm.reset();
      checkAuth();
    }
  }

  buttonAuth.addEventListener('click', toogleModalAuth);
  closeAuth.addEventListener('click', toogleModalAuth);
  logInForm.addEventListener('submit', logIn)
}

function checkAuth(){
  if(login){
    authorized()
  } else {
    notAuthorized();
  }
}

checkAuth();
