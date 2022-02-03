// Creating Vue app and setting its configuration
var app = new Vue({
  el: '#loginForm',
  data: function () {
    return {
      email: "",
      emailBlured: false,
      valid: false,
      submitted: false,
      password: "",
      passwordBlured: false,
    }
  },

  methods: {

    validate: function () {
      this.emailBlured = true;
      this.passwordBlured = true;
      if (this.validEmail(this.email) && this.validPassword(this.password)) {
        this.valid = true;
      }
    },

    validEmail: function (email) {
      const regex = /(.+)@(.+){2,}\.(.+){2,}/;
      if (regex.test(email.toLowerCase())) {
        return true;
      }
    },

    validPassword: function (password) {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!.+%*?&])[A-Za-z\d@$!+%*?&]{8,15}$/;
      if (regex.test(password)) {
        return true;
      }
    }

  }
});

let logButton = document.getElementById("logButton");
let alertBox = document.getElementById("alertBox");
let alertInfo = document.getElementById("alertInfo");
// To send registration
logButton.addEventListener('click', async (e) => {
  // Take variables from user's screen
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  // Make user's data JSON/array format
  const data = {
    email: email,
    password: password
  };
  await fetch("https://localhost:7223/api/v1/Auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (res) => {
    let info = await res.json();
    if (res.ok) {
      // if response is successfull
      let token = info.data.token;
      let tokenExpire = new Date(info.data.expiration);
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("tokenExpire", tokenExpire);
      window.localStorage.setItem("email", email);
      window.location.href = "./index.html";
    }
    else{
      // if response is not successfull
      e.preventDefault();
      alertInfo.innerHTML = info.message;
      alertBox.classList.remove("d-none");

      setTimeout(function () {
        alertBox.classList.add("d-none");
      }, 3000);
    }
  });
});
