(function(){
  const signupForm = document.getElementById('signup-form');
  const loginForm = document.getElementById('login-form');
  const showSignup = document.getElementById('show-signup');
  const showLogin = document.getElementById('show-login');
  const formTitle = document.getElementById('form-title');
  const signupMessage = document.getElementById('signup-message');
  const loginMessage = document.getElementById('login-message');
  const welcome = document.getElementById('welcome');
  const welcomeUser = document.getElementById('welcome-user');
  const logoutBtn = document.getElementById('logout');

  const USERS_KEY = 'demo_users_v1';
  const SESSION_KEY = 'demo_session_v1';

  function readUsers(){
    try{ return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }catch(e){return []}
  }
  function writeUsers(users){ localStorage.setItem(USERS_KEY, JSON.stringify(users)); }
  function setSession(user){ localStorage.setItem(SESSION_KEY, JSON.stringify(user)); }
  function clearSession(){ localStorage.removeItem(SESSION_KEY); }
  function getSession(){ try{return JSON.parse(localStorage.getItem(SESSION_KEY));}catch(e){return null} }

  function showForm(which){
    if(which==='signup'){
      signupForm.classList.remove('hidden');
      loginForm.classList.add('hidden');
      showSignup.classList.add('active');
      showLogin.classList.remove('active');
      formTitle.textContent = 'Sign Up';
    } else {
      signupForm.classList.add('hidden');
      loginForm.classList.remove('hidden');
      showSignup.classList.remove('active');
      showLogin.classList.add('active');
      formTitle.textContent = 'Log In';
    }
  }

  showSignup.addEventListener('click', ()=> showForm('signup'));
  showLogin.addEventListener('click', ()=> showForm('login'));

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    signupMessage.textContent = '';
    const username = document.getElementById('signup-username').value.trim();
    const email = document.getElementById('signup-email').value.trim().toLowerCase();
    const password = document.getElementById('signup-password').value;

    if(username.length < 3){ signupMessage.textContent = 'Username too short'; return; }
    if(password.length < 6){ signupMessage.textContent = 'Password must be 6+ characters'; return; }

    const users = readUsers();
    if(users.some(u => u.username.toLowerCase() === username.toLowerCase())){ signupMessage.textContent = 'Username already taken'; return; }
    if(users.some(u => u.email === email)){ signupMessage.textContent = 'Email already registered'; return; }

    const user = {id:Date.now(), username, email, password};
    users.push(user);
    writeUsers(users);
    setSession({id:user.id, username:user.username});
    showWelcome(user.username);
  });

  loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    loginMessage.textContent = '';
    const identifier = document.getElementById('login-identifier').value.trim().toLowerCase();
    const password = document.getElementById('login-password').value;

    const users = readUsers();
    const user = users.find(u => u.username.toLowerCase() === identifier || u.email === identifier);
    if(!user || user.password !== password){ loginMessage.textContent = 'Invalid credentials'; return; }
    setSession({id:user.id, username:user.username});
    showWelcome(user.username);
  });

  logoutBtn.addEventListener('click', ()=>{
    clearSession();
    welcome.classList.add('hidden');
    document.querySelector('.card').classList.remove('logged-in');
    showForm('login');
  });

  function showWelcome(username){
    welcomeUser.textContent = username;
    signupForm.classList.add('hidden');
    loginForm.classList.add('hidden');
    document.getElementById('form-title').textContent = 'Welcome';
    welcome.classList.remove('hidden');
  }

  // On load: restore session if present
  const session = getSession();
  if(session && session.username){ showWelcome(session.username); } else { showForm('signup'); }
})();
