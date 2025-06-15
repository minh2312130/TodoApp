var Gosignin_btn = document.getElementById("GoSignin_btn");
var signin_btn = document.getElementById("signin_btn");
var login_btn = document.getElementById("login_btn");

function checkValidation(name, pass) {
  if (!name.value || !pass.value) {
    alert("Please fill in all fields.");
    return false;
  }
  return true;
}

// login -> alread have account
// check name / check pass
async function login() {
  const username = document.getElementById("name");
  const password = document.getElementById("pass");
  if (!checkValidation(username, password)) {
    username.value = "";
    password.value = "";
    return;
  }
  console.log("press");
  $.ajax({
    url: "/login",
    method: "POST",
    dataType: "json",
    data: {
      username: username.value,
      password: password.value,
    },
    success: function (data) {
      console.log('ok');
      window.location.href = "/trangchu"; // Redirect to the main page
    },
    error: function (error) {
      console.error("Error fetching account:", error);
      alert("Login failed. Please check your username and password.");
      username.value = "";
      password.value = "";
    },
  });
}

async function signin() {
  const username = document.getElementById("nameSign");
  const password = document.getElementById("passSign");
  const email = document.getElementById("emailSign");
  console.log(username.value);
  console.log(password.value);
  console.log(email.value);

  if (!checkValidation(username, password)) {
    username.value = "";
    password.value = "";
    email.value = "";
    return;
  }
  $.ajax({
    url: "/signin",
    method: "POST",
    dataType:'json',
    data:{
      username: username.value,
      password: password.value,
      email: email.value,
    },
    success: function (data) {
      alert("Account created successfully!");
      window.location.href = "/"; // Redirect to the main page
    },
    error: function (error) {
      console.error("Error creating account:", error);
      alert("Sign up failed. Please try again.");
      username.value = "";
      password.value = "";
      email.value = "";
    },
  });
}

function goSignin() {
  document.getElementById("box_login").style.display = "none";
  document.getElementById("box_signin").style.display = "flex";
}

login_btn.addEventListener("click", login);
Gosignin_btn.addEventListener("click", goSignin);
signin_btn.addEventListener("click", signin);
