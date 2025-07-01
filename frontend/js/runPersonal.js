var tittle = document.getElementById("tittle");
const goback_btn = document.getElementById("goback_btn");
const modify_btn = document.getElementById("modify_btn");
const removeAcc_btn = document.getElementById("removeAcc_btn");
tittle.innerHTML = "User: ";

function checkAcc() {
  $.ajax({
    url: "/acc/getAcc",
    method: "GET",
    dataType: "json",
    xhrFields: {
      withCredentials: true,
    },
    success: function (data) {
      tittle.innerHTML = "User: " + data.Acc.username;
    },
    error: function (error) {
      console.error(error);
    }
  });
}

function showCheckCode() {
  document.getElementById("box_Acc").style.display = "none";
  document.getElementById("box_checkCode").style.display = "flex";
}
function hideCheckCode() {
  document.getElementById("box_checkCode").style.display = "none";
  document.getElementById("box_Acc").style.display = "flex";
}

checkAcc();

function GoBack() {
  window.location.href = "/Trangchu";
}

async function Modify() {
  var email = document.getElementById("email");
  var password = document.getElementById("pass");
  if (!email.value && !password.value) {
    return;
  }
  
  if(email.value) {
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

    } catch (err) {
      alert("Có lỗi xảy ra khi gửi mã xác nhận.");
    }
  }

  $.ajax({
    url: "/acc/update",
    method: "PUT",
    dataType: "json",
    data: {
      password: password.value,
      email: email.value,
    },
    xhrFields: {
      withCredentials: true,
    },
    success: function (data) {
      alert(data.message);
      email.value = "";
      password.value = "";
    },
    error: function (error) {
      console.error(error);
    },
  });
}

function Remove() {
  const isConfirmed = confirm("Are you want to remove this account");
  if (!isConfirmed) return;
  $.ajax({
    url: "/acc/delete",
    method: "DELETE",
    dataType: "json",
    xhrFields: {
      withCredentials: true,
    },
    success: function (data) {
      alert("Delete Account successfully");
    },
    error: function (error) {
      console.error(error.message);
      return;
    },
  });
  $.ajax({
    url: "/event/deleteAllEvent",
    method: "DELETE",
    dataType: "json",
    xhrFields: {
      withCredentials: true,
    },
    success: function (data) {
    },
    error: function (error) {
      console.error(error.message);
      return;
    }
  });
  window.location.href = "/acc";
}

goback_btn.addEventListener("click", GoBack);
modify_btn.addEventListener("click", Modify);
removeAcc_btn.addEventListener("click", Remove);
