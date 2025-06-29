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

checkAcc();

function GoBack() {
  window.location.href = "/Trangchu";
}

function Modify() {
  var email = document.getElementById("email");
  var password = document.getElementById("pass");
  if (!email.value && !password.value) {
    return;
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
