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

let regButton = document.getElementById("regButton");
// To send registration
regButton.addEventListener('click', async (e) => {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  const data = {
    email: email,
    password: password
  };
  await fetch("https://localhost:7223/api/v1/Auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (res) => {
    if (res.ok) {
      let info = await res.json();
      let token = info.data.token;
      let tokenExpire = new Date(info.data.expiration);
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("tokenExpire", tokenExpire);
      window.location.href = "./index.html";
    }
  });
});
