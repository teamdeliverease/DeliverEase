const auth = firebase.auth();

const login = (e) => {
  e.preventDefault();
  const email = getInputValue('email');
  const password = getInputValue('password');
  auth.signInWithEmailAndPassword(email, password).catch(function (error) {
    // Handle Errors here.
    alert('A login error occured.');
  });
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    return user;
  }
});

const getInputValue = (id) => document.getElementById(id).value;

document.getElementById('login-form').addEventListener('submit', login);
