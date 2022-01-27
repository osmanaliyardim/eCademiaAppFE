// Creating Vue app and setting its configuration
var app = new Vue({
  el: '#registerForm',
  data: function () {
    return {
      email: "",
      emailBlured: false,
      valid: false,
      submitted: false,
      password: "",
      passwordBlured: false,
      confirmPassword: "",
      confirmPasswordBlured: false,
      firstName: "",
      firstNameBlured: false,
      lastName: "",
      lastNameBlured: false
    }
  },

  methods: {

    validate: function () {
      this.emailBlured = true;
      this.passwordBlured = true;
      this.confirmPasswordBlured = true;
      this.firstNameBlured = true;
      this.lastNameBlured = true;
      if (this.validEmail(this.email) && this.validPassword(this.password) && this.confirmPasswords(this.password, this.confirmPassword)
        && this.validFirstName(this.firstName) && this.validLastName(this.lastName)) {
        this.valid = true;
      }
    },

    validFirstName: function (firstName) {
      const regex = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
      if (regex.test(firstName)) {
        return true;
      }
    },

    validLastName: function (lastName) {
      const regex = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
      if (regex.test(lastName)) {
        return true;
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
    },

    confirmPasswords: function (password, confirmPassword) {
      if (password === confirmPassword) {
        return true;
      }
    },
  }
});

let regButton = document.getElementById("regButton");
let alertBox = document.getElementById("alertBox");
let alertInfo = document.getElementById("alertInfo");

// To send registration
regButton.addEventListener('click', async (e) => {
  // Take variables from user's screen
  let firstName = document.getElementById("firstName").value;
  let lastName = document.getElementById("lastName").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  // Make user's data JSON/array format
  const data = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    repassword: confirmPassword
  };
  await fetch("https://localhost:7223/api/v1/Auth/register", {
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
