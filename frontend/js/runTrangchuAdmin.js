var UserArr;
const userBox = document.getElementById("userBox");
const userDetailBox = document.getElementById("userDetailBox");
const exit_btn = document.getElementById("exit_btn");


function seeUser() {
  $.ajax({
    type: "GET",
    url: "/acc/getAllAcc",
    dataType: "json",
    xhrFields: {
      withCredentials: true, // Đảm bảo cookie được gửi cùng với yêu cầu
    },
    success: function (data) {
      UserArr = data.Acc;
      console.log("User data fetched successfully:");
      console.log(UserArr);
      userBox.innerHTML = ""; // xóa cũ trước khi in mới
      var cnt = 0;
      UserArr.forEach((element) => {
        var color = "#b45309";
        if (cnt % 2 == 0) color = "#8b5cf6";

        userBox.innerHTML += `
    <div class="user_btn" data-index="${cnt}" style="
    width: 95%;
    height: 100px;
    background-color: ${color};
    margin-bottom: 10px;
    padding: 7px;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between">
        <div style="display: flex; flex-direction: column; color: white; justify-content: center; align-items: center;">
            <h3 style="font-size:30px; text-align : ">Name: ${element.username}</h3>
        </div>
  
    </div>`;
        cnt++;
      });
    },
    error: function (error) {
      console.error("Error fetching user data:", error);
    },
  });
}

document.addEventListener("DOMContentLoaded", function () {
  seeUser();
});

document.addEventListener("click", function (nut) {
  if (nut.target.classList.contains("user_btn")) {
    const index = nut.target.dataset.index;
    var u = UserArr[index];
    userDetailBox.innerHTML = `
    <div style="display: flex; flex-direction: column; width: 100%; height: 100%;  border: 1px solid rgb(0, 0, 0)">
    <div style="display: flex;flex-direction: row;justify-content: space-between">
        <p style="font-size:30px" ><strong>Name:</strong> ${u.username}</p>
        <button class="delete_btn" data-index="${index}" style="height:50px; width:70px; align-self:center" >Delete</button>
    </div>
        <p style="font-size:30px" ><strong>Password:</strong> ${u.password}</p>
        <p style="font-size:30px" ><strong>Email:</strong> ${u.email}</p>
        <p style="font-size:30px" ><strong>Total events:</strong> ${u.totalEvent}</p>
        <p style="font-size:30px"><strong>CreatAt:</strong> ${new Date(
          u.createdAt
        ).toLocaleString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
        })}</p>
      </div>
        `;
  }
});

document.addEventListener("click", function (nut) {
  if (nut.target.classList.contains("delete_btn")) {
    const index = nut.target.dataset.index;
    var u = UserArr[index];
    if (confirm("Are you sure you want to see details of " + u.username + "?") == false ) {return;}
    $.ajax({
      url: "/acc/admin/delete",
      method: "DELETE",
      dataType: "json",
      xhrFields: {
        withCredentials: true,
      },
      data: {
        username: u.username,
      },
      success: function (data) {
        //alert(data.message);
        seeUser();
       userDetailBox.innerHTML = "";
      },
      error: function (error) {
        console.error(error);
        alert(
          error.responseJSON.message ||
            "Failed to delete event. Please try again."
        );
      },
    });
  }
});


exit_btn.addEventListener("click", function () {
    window.location.href = "/acc";
});