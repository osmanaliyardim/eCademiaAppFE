// Creating Vue app and setting its configuration
var app = new Vue({
  el: '#saveForm',
  data: function () {
    return {
      courseName: "",
      courseNameBlured: false,
      valid: false,
      submitted: false,
      courseDescription: "",
      courseDescriptionBlured: false,
      price: "",
      priceBlured: false,
      salePrice: "",
      salePriceBlured: false,
      duration: "",
      durationBlured: false,
      language: "",
      languageBlured: false
    }
  },

  methods: {

    validate: function () {
      this.courseNameBlured = true;
      this.courseDescriptionBlured = true;
      this.priceBlured = true;
      this.salePriceBlured = true;
      this.durationBlured = true;
      this.languageBlured = true;
      if (this.validCourseName(this.courseName) && this.validCourseDescription(this.courseDescription) && this.validPrice(this.price)
        && this.validSalePrice(this.salePrice) && this.validDuration(this.duration) && this.validLanguage(this.language)) {
        this.valid = true;
      }
    },

    validCourseName: function (courseName) {
      const regex = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
      if (regex.test(courseName)) {
        return true;
      }
    },

    validCourseDescription: function (courseDescription) {
      const regex = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
      if (regex.test(courseDescription)) {
        return true;
      }
    },

    validPrice: function (price) {
      const regex = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
      if (!regex.test(price.toLowerCase())) {
        return true;
      }
    },

    validSalePrice: function (salePrice) {
      const regex = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
      if (!regex.test(salePrice)) {
        return true;
      }
    },

    validDuration: function (duration) {
      const regex = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
      if (!regex.test(duration.toLowerCase())) {
        return true;
      }
    },

    validLanguage: function (language) {
      const regex = /^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i;
      if (regex.test(language.toLowerCase())) {
        return true;
      }
    },
  }
});

let saveButton = document.getElementById("saveButton");
let alertBox = document.getElementById("alertBox");
let alertInfo = document.getElementById("alertInfo");

// To send registration
saveButton.addEventListener('click', async (e) => {
  // Take variables from user's screen
  let courseName = document.getElementById("courseName").value;
  let courseDescription = document.getElementById("courseDescription").value;
  let price = document.getElementById("price").value;
  let salePrice = document.getElementById("salePrice").value;
  let duration = document.getElementById("duration").value;
  let language = document.getElementById("language").value;
  // Make user's data JSON/array format
  const data = {
    name: courseName,
    description: courseDescription,
    price: price,
    salePrice: salePrice,
    duration: duration,
    language: language
  };
  await fetch("https://localhost:7223/api/v1/Courses/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(async (res) => {
    e.preventDefault();
    let info = await res.json();
    if (res.ok) {
      // if response is successfull
      alertInfo.innerHTML = info.message;
      alertBox.classList.remove("d-none");
      courseName, courseDescription, price, salePrice, duration, language = "";
      setTimeout(function () {
        alertBox.classList.add("d-none");
      }, 3000);
    }
    else {
      // if response is not successfull
      alertInfo.innerHTML = info.Message || info.message;
      alertBox.classList.remove("d-none");

      setTimeout(function () {
        alertBox.classList.add("d-none");
      }, 3000);
    }
  });
});
