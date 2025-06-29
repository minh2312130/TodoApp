const add_btn = document.getElementById("add");
const seeEvent_btn = document.getElementById("seeEvent");
const seeEventBox = document.getElementById("seeEventBox");
const seeEventDetail = document.getElementById("seeEventDetail");
const personal_btn = document.getElementById("person_btn");
var eventArr;

function addEvent() {
  var time = document.getElementById("date");
  var deadline = new Date(time.value);
  if (isNaN(deadline.getTime())) {
    alert("Please enter a valid date and time.");
    return;
  }
  var name = document.getElementById("name");
  var describe = document.getElementById("describe");

  $.ajax({
    url: "/event/addEvent",
    method: "POST",
    dataType: "json",
    xhrFields: {
      withCredentials: true,
    },
    data: {
      name: name.value,
      deadline: deadline,
      describe: describe.value,
      option: "",
    },
    success: function (data) {
      alert(data.message);
      name.value = "";
      describe.value = "";
    },
    error: function (error) {
      console.error(error);
      alert(
        error.responseJSON.message || "Failed to add event. Please try again."
      );
      name.value = "";
      describe.value = "";
      
    },
  });
}

function seeEvent() {
  $.ajax({
    url: "/event/getEvent",
    method: "GET",
    dataType: "json",
    xhrFields: {
      withCredentials: true,
    },
    success: function (data) {
      eventArr = data.events;
      seeEventBox.innerHTML = ""; // xóa cũ trước khi in mới
      var cnt = 0;
      eventArr.forEach((element) => {
        const deadline = new Date(element.deadline);
        const deadlineStr = deadline.toLocaleString("vi-VN", {
          timeZone: "Asia/Ho_Chi_Minh",
        });
        var color = "#b45309";
        if (cnt % 2 == 0) color = "purple";

        seeEventBox.innerHTML += `
  <div class="email_btn" data-index="${cnt}" style="
    height: 100px;
    background-color: ${color};
    margin-bottom: 10px;
    padding: 7px;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between">
    <div style="display: flex; flex-direction: column; color: white; justify-content: center; align-items: start;">
  <h3 style="font-size:20px; text-align : ">Name: ${element.name}</h3>
  <h3>Date : ${deadlineStr}</h3>
    </div>
  
  </div>`;
        cnt++;
      });
    },
    error: function (error) {
      console.error(error);

    },
  });
}

add_btn.addEventListener("click", addEvent);
seeEvent_btn.addEventListener("click", seeEvent);
personal_btn.addEventListener("click", function () {
  window.location.href = "/personal"; 
});

document.addEventListener("click", function (nut) {
  if (nut.target.classList.contains("email_btn")) {
    const index = nut.target.dataset.index;
    var e = eventArr[index];

    seeEventDetail.innerHTML = `
  <div style="display: flex; flex-direction: column; width: 100%; height: 100%;  border: 1px solid rgb(0, 0, 0);padding :5px">
  <div style="display: flex;flex-direction: row;justify-content: space-between">
      <h2 style="font-size:30px" >Name: ${e.name}</h2>
      <button class="delete_btn" data-index="${index}" style="height:50px; width:70px; align-self:center" >Delete</button>
  </div>
      <p style="font-size:30px">Deadline: ${new Date(e.deadline).toLocaleString(
        "vi-VN",
        {
          timeZone: "Asia/Ho_Chi_Minh",
        }
      )}</p>
      <p style="font-size:30px" >Description: ${e.describe}</p>
    </div>
    <div>
    </div>
      `;
  }
});


document.addEventListener("click", function (nut) {
  if (nut.target.classList.contains("delete_btn")) {
    const index = nut.target.dataset.index;
    var e = eventArr[index];
    $.ajax({
      url: "/event/deleteEvent",
      method: "DELETE",
      dataType: "json",
      xhrFields: {
        withCredentials: true,
      },
      data: {
        creatAt: e.creatAt,
        name: e.name,
      },
      success: function (data) {
        //alert(data.message);
        seeEvent();
        seeEventDetail.innerHTML = "";
      },
      error: function (error) {
        console.error(error);
        
        alert(
          error.responseJSON.message || "Failed to delete event. Please try again."
        );
        
      },
    });
  }
});
