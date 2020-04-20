const auth = firebase.auth();

/**
 * @param {string} name The cookie name.
 * @return {?string} The corresponding cookie value to lookup.
 */
function getCookie(name) {
  var v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return v ? v[2] : null;
}

const validateLogin = async (e) => {
  e.preventDefault();
  const email = getInputValue('email');
  const password = getInputValue('password');
  const user = await auth.signInWithEmailAndPassword(email, password).catch((error) => {
    alert('A login error occured.');
    return;
  });

  const token = await user.user.getIdToken();

  document.cookie = `__session=${token};max-age=3600`;
};

const login = async (user) => {
  try {
    const token = await user.getIdToken();

    // Session login endpoint is queried and the session cookie is set.
    // CSRF token should be sent along with request.
    // const csrfToken = getCookie('csrfToken');

    const response = await axios.post('/sessionLogin', {
      idToken: token,
    });

    console.log(response);

    if (response.status !== 200) {
      const errorMessage = await response.text();
      console.error(new Error(errorMessage));
      alert('Oops! Something went wrong :(');
    }
  } catch (err) {
    console.error(err);
  }
};

const getInputValue = (id) => document.getElementById(id).value;

document.getElementById('login-form').addEventListener('submit', validateLogin);
