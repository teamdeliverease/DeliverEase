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

    const response = await fetch(`/login`, {
      method: 'POST',
      redirect: 'follow',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      window.location.href = response.url;
    } else {
      const errorMessage = await response.text();
      console.error(new Error(errorMessage));
      alert('Oops! Something went wrong :(');
    }
  } catch (err) {
    console.error(err);
  }
};

auth.onAuthStateChanged(async (user) => {
  if (user) {
    window.location.href = 'map.html';
  } else {
    console.log('no user found');
  }
});

const getInputValue = (id) => document.getElementById(id).value;

document.getElementById('login-form').addEventListener('submit', validateLogin);
