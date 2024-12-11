import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
var auth = AsgardeoAuth.AsgardeoSPAClient.getInstance();
  
auth.initialize({
    signInRedirectURL: "http://localhost:5173",
    signOutRedirectURL: "http://localhost:5173",
    clientID: "T31mUBLs3ZikxL6ryULxupVt16Aa",
    baseUrl: "https://api.asgardeo.io/t/javascript",
    scope: [ "openid","profile" ]
});

(async () => {
  let user = undefined;
 
 
  // If there are auth search params i.e code, session_state, automatically trigger login.
  // Else, try to see if there's a session.
  if (AsgardeoAuth.SPAUtils.hasAuthSearchParamsInURL()) {
      user = await auth.signIn({ callOnlyOnRedirect: true });
  } else {
      user = await auth.trySignInSilently();
  }
 
 
  // Update the UI accordingly.
  if (user) {
      document.getElementById("authenticated-view").style.display = "block";
      document.getElementById("unauthenticated-view").style.display = "none";
      document.getElementById("username").innerHTML = user.username;
  } else {
      document.getElementById("authenticated-view").style.display = "none";
      document.getElementById("unauthenticated-view").style.display = "block";
  }
 })();
 

document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
   <div id="authenticated-view" style="display: none">
      <ul>
          <li id="username"></li>
      </ul>
      <button id="logoutButton">Log Out</button>
    </div>
    <!-- Un-Authenticated View --->
    <div id="unauthenticated-view" style="display: none">
      <button id="loginButton">Log In</button>
    </div>
  </div>
`
document.getElementById("loginButton").addEventListener("click", async () => {
  auth.signIn();
});

document.getElementById("logoutButton").addEventListener("click", async () => {
  auth.signOut();
});
