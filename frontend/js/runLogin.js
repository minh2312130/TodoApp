var Gosignin_btn = document.getElementById("Gosignin_btn");
var signin_btn = document.getElementById("signin_btn");
var login_btn = document.getElementById("login_btn");


function checkValidation(name, pass) {
    if (name === "" || pass === "") {
        alert("Please fill in all fields.");
        return false;
    }

    return true;
}

// login -> alread have account

// check name / check pass
async function login() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    if( !checkValidation(username, password)) {
        username.value = "";
        password.value = "";
        return;
    }
    $.ajax({
        url: '/getAccount',
        method:'GET',
        dataType: 'json',
        data: {
            username: username.value
        },
        succsess: function(data) {
            if (data.password != password.value) {
                alert("Incorrect password. Please try again.");
                username.value = "";
                password.value = "";
                return;
            }
            window.location.href = "/trangchu"; // Redirect to the main page
        },
        error: function(error) {
            console.error("Error fetching account:", error);
            alert("Login failed. Please check your username and password.");
            username.value = "";
            password.value = "";
        }
    });

}

async function signin(){
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    if( !checkValidation(username, password)) {
        username.value = "";
        password.value = "";
        return;
    }



}


function goSignin() {
    document.getElementById("box_login").style.display = "none";
    document.getElementById("box_signin").style.display = "flex";
}

login_btn.addEventListener("click", login);
Gosignin_btn.addEventListener("click", goSignin);