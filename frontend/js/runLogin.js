var Gosignin_btn = document.getElementById("GoSignin_btn");
var signin_btn = document.getElementById("signin_btn");
var login_btn = document.getElementById("login_btn");
var back_btn = document.getElementById("back_btn");
var inputCode = document.getElementById("inputCode");
var checkCode_btn = document.getElementById("checkCode_btn");

function checkValidation(name, pass, email) {
  if (!name || !pass || !email) {
    alert("Please fill in all fields.");
    return false;
  }
  return true;
}

function goSignin() {
  document.getElementById("box_login").style.display = "none";
  document.getElementById("box_signin").style.display = "flex";
}
function goLogin() {
  document.getElementById("box_signin").style.display = "none";
  document.getElementById("box_login").style.display = "flex";
}
function showCheckCode() {
  document.getElementById("box_signin").style.display = "none";
  document.getElementById("box_checkCode").style.display = "flex";
}
function hideCheckCode() {
  document.getElementById("box_checkCode").style.display = "none";
}
// login -> alread have account
// check name / check pass
async function login() {
  const username = document.getElementById("name");
  const password = document.getElementById("pass");
  if (!checkValidation(username.value, password.value, "ok")) {
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
      withCredentials: true, //BẮT BUỘC để cookie gửi về client
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

  if (!checkValidation(username, password, email)) {
    username.value = "";
    password.value = "";
    email.value = "";
    return;
  }

  try {
    const checkCode = await new Promise((resolve, reject) => {
      $.ajax({
        url: "/controller/sendVerificationCode",
        method: "POST",
        dataType: "json",
        data: {
          email: email.value,
        },
        success: function (data) {
          resolve(data.checkCode); // Trả mã xác nhận
        },
        error: function (error) {
          console.error(error.message);
          reject(error);
        },
      });
    });

    showCheckCode(); // Hiện ô nhập code

    // Đợi người dùng nhập đúng mã
    await new Promise((resolve, reject) => {
      document
        .getElementById("checkCode_btn")
        .addEventListener("click", function handler() {
          const inputCode = document.getElementById("inputCode").value;
          if (inputCode === checkCode) {
            alert("Mã xác nhận đúng!");
            hideCheckCode();
            document
              .getElementById("checkCode_btn")
              .removeEventListener("click", handler); // Xoá listener để tránh gọi nhiều lần
            resolve();
          } else {
            alert("Mã xác nhận sai. Vui lòng thử lại.");
          }
        });
    });

    // Gửi yêu cầu tạo tài khoản sau khi mã đúng
    $.ajax({
      url: "/acc/signin",
      method: "POST",
      dataType: "json",
      data: {
        username: username.value,
        password: password.value,
        email: email.value,
      },
      success: function (data) {
        alert(data.message);
        window.location.href = "/acc"; // Chuyển hướng sau khi đăng ký
      },
      error: function (error) {
        console.error(error.message);
        alert("Account is existed. Please try again.");
        username.value = "";
        password.value = "";
        email.value = "";
      },
    });
  } catch (err) {
    alert("Có lỗi xảy ra khi gửi mã xác nhận.");
  }
}

back_btn.addEventListener("click", goLogin);
login_btn.addEventListener("click", login);
Gosignin_btn.addEventListener("click", goSignin);
signin_btn.addEventListener("click", signin);
