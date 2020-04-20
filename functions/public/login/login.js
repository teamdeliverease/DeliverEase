const auth = firebase.auth();

const validateLogin = async (e) => {
  e.preventDefault();
  const email = getInputValue('email');
  const password = getInputValue('password');
  await auth.signInWithEmailAndPassword(email, password).catch(function (error) {
    alert('A login error occured.');
    return;
  });

  login();
};

const login = async () => {
  try {
    const token = await auth.currentUser.getIdToken();

    const response = await fetch(`/map`, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      const errorMessage = await response.text();
      console.error(new Error(errorMessage));
      alert('Oops! Something went wrong :(');
    }
  } catch (err) {
    console.error(err);
  }
};

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     login();
//   }
// });

const getInputValue = (id) => document.getElementById(id).value;

document.getElementById('login-form').addEventListener('submit', validateLogin);
