var Gosignin_btn = document.getElementById("GoSignin_btn");
var signin_btn = document.getElementById("signin_btn");
var login_btn = document.getElementById("login_btn");
var back_btn = document.getElementById("back_btn");

function checkValidation(name, pass,email) {
  if (!name || !pass || !email) {
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
  if (!checkValidation(username.value, password.value,"ok")) {
    username.value = "";
    password.value = "";
    return;
  }
  $.ajax({
    url: "/acc/login",
    method: "POST",
    dataType: "json",
    data: {
      username: username.value,
      password: password.value,
    },
    xhrFields: {
      withCredentials: true //BẮT BUỘC để cookie gửi về client
    },
    success: function (data) {
      alert(data.message);
      window.location.href = data.Goto;
    },
    error: function (error) {
      console.error(error.message);
      alert(error.responseJSON.message || "Login failed. Please try again.");
      username.value = "";
      password.value = "";
    },
  });
}

async function signin() {
  const username = document.getElementById("nameSign");
  const password = document.getElementById("passSign");
  const email = document.getElementById("emailSign");

  if (!checkValidation(username, password,email)) {
    username.value = "";
    password.value = "";
    email.value = "";
    return;
  }
  $.ajax({
    url: "/acc/signin",
    method: "POST",
    dataType:'json',
    data:{
      username: username.value,
      password: password.value,
      email: email.value,
    },
    success: function (data) {
      alert(data.message);
      window.location.href = "/acc"; // Redirect to the main page
    },
    error: function (error) {
      console.error(error.message);
      alert("Account is existed. Please try again.");
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
function goLogin() {
  document.getElementById("box_signin").style.display = "none";
  document.getElementById("box_login").style.display = "flex";
}

back_btn.addEventListener("click", goLogin);
login_btn.addEventListener("click", login);
Gosignin_btn.addEventListener("click", goSignin);
signin_btn.addEventListener("click", signin);
