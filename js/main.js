// Creating Vue app and setting its configuration
Vue.createApp({
  data() {
    return {
      productsAll: null,
      dateNow: ""
    }
  },
  async created() {
    const responseAllCourses = await fetch(`https://localhost:7223/api/v1/Courses/getCoursesByTypeId?typeId=1&pageNumber=1`);
    const infoAllCourses = await responseAllCourses.json();
    this.productsAll = infoAllCourses.data;
    this.productsAll.forEach(p => p.creationDate = new Date(p.creationDate));

    setInterval(this.getNow, 100);
  },
  methods: {
    getNow: function () {
      const today = new Date();
      const date = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + today.getDate();
      const dateTime = date;
      this.dateNow = new Date(dateTime);
    }
  }
}).mount('#products');

let loginBtn = document.getElementById("loginBtn");
let logoutBtn = document.getElementById("logoutBtn");
let registerBtn = document.getElementById("registerBtn");
let miniCart = document.getElementById('miniCart');
let cartCount = document.getElementById('cartItemCount');
let cartAlert = document.getElementById('successAlert');
let categoriesBtn = document.getElementById("categories");
/*
* That is the listener for getting courses by category id
*/
categoriesBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const anchor = event.target.closest("a");
  const id = anchor.dataset.id;
  await getCoursesByTypeId(id, 1);
});

let ScrollDebounce = true;
let pNumber = 2;
/**
 *  Lazy loading for courses by scroll position
 */
document.addEventListener("scroll", (event) => {
  event.preventDefault();
  let activeNavItem = document.querySelector("#categories").querySelector('.activeItem').querySelector('.nav-link');
  let aLink = activeNavItem.closest("a");
  let tId = aLink.dataset.id;
  if (ScrollDebounce) {
    ScrollDebounce = false;
    setTimeout(async function () {
      if (
        window.innerHeight + window.pageYOffset + 20 >=
        document.body.offsetHeight
      ) {
        const responseAllCourses = await fetch(`https://localhost:7223/api/v1/Courses/getCoursesByTypeId?typeId=${tId}&pageNumber=${pNumber}`);
        const infoAllCourses = await responseAllCourses.json();
        courses = infoAllCourses.data;
        printCoursesForPagination(courses);
        courses.forEach(c => c.creationDate = new Date(c.creationDate));
        setInterval(this.getNow, 100);
        pNumber++;
      }
      ScrollDebounce = true;
    }, 250);
  }
});

//Listener for logout operation
logoutBtn.addEventListener('click', () => {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("tokenExpire");
  window.localStorage.removeItem("cart");
  window.localStorage.removeItem("prices");
  checkIsLoggedIn();
});

/**
 * Printing courses to screen with pagination
 * @function
 * @param {Array} courseArr - Printable courses data from API
 */
function printCoursesForPagination(courseArr) {
  let courseCard = "";
  let coursesDiv = document.getElementById("courses");

  courseArr.forEach((course) => {
    courseCard += `
                      <div class="card m-2" style="width: 17rem;">
                        <img src="/tile.png" class="card-img-top p-3" alt="Course">
                        <div class="card-body">
                          <h5 class="card-title" style="display:inline-block;">${course.name}</h5>
                          <span class="badge bg-success" style="float:right;">
                            $${course.salePrice}
                          </span>
                          <p class="card-text">${course.description}</p>
                          <button class="btn btn-warning buyBtn" data-name="course.Name" data-price="course.SalePrice">Enroll</button>
                          <a href="./courseDetails.html?id=${course.id}" id="${course.id}" class="btn btn-primary" style="float:right;">See Details</a>
                        </div>
                      </div>
                    `;
  });

  coursesDiv.innerHTML += courseCard;
}

// To make category links active/inactive
let navItems = document.querySelectorAll(".nav-item");
document.addEventListener("DOMContentLoaded", function () {
  navItems.forEach((item) => {
    item.addEventListener('click', (event) => {
      event.preventDefault();
      let activeNavItem = document.querySelector("#categories").querySelector('.activeItem');
      activeNavItem.classList.remove("activeItem");
      let li = event.target.closest("li");
      li.classList.add("activeItem");
    });
  })
});

// Add all cart/buy button click event
async function addItemsToCart() {
  let cart = window.localStorage.getItem("cart");
  let prices = window.localStorage.getItem("prices");
  let cartArr = [];
  let priceArr = [];
  if (cart !== null) {
    let parsedArr = JSON.parse(cart);
    cartArr = cartArr.concat(parsedArr);
    let parsedPriceArr = JSON.parse(prices);
    priceArr = priceArr.concat(parsedPriceArr);

    let totalPrice = priceArr.reduce((previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue));
    miniCart.innerHTML = '';
    miniCart.innerHTML = cartArr.map((item) => `<li><a class='dropdown-item' href='#'>${item}</a></li>`).join('');

    let divider = document.createElement('li');
    divider.classList.add('dropdown-divider');

    let total = document.createElement('li');
    total.classList.add('bg-warning');
    total.classList.add('dropdown-item');
    total.append('TOTAL: ' + totalPrice + ' $');

    miniCart.appendChild(divider);
    miniCart.appendChild(total);

    cartCount.innerHTML = cartArr.length;
  }
}

// Add all cart/buy button click event
async function addItemsToCartAndNotify() {
  setTimeout(() => {
    let buyBtn = document.getElementsByClassName("buyBtn");
    for (let i = 0; i < buyBtn.length; i++) {
      buyBtn[i].addEventListener('click', (event) => {
        event.preventDefault();
        event.stopPropagation();
        let name = buyBtn[i].getAttribute('data-name');
        let price = buyBtn[i].getAttribute('data-price');
        let cart = window.localStorage.getItem("cart");
        let prices = window.localStorage.getItem("prices");
        let cartArr = [];
        let priceArr = [];
        cartArr.push(name);
        priceArr.push(price);
        if (cart !== null) {
          let parsedArr = JSON.parse(cart);
          cartArr = cartArr.concat(parsedArr);
          let parsedPriceArr = JSON.parse(prices);
          priceArr = priceArr.concat(parsedPriceArr);
        }
        window.localStorage.setItem("cart", JSON.stringify(cartArr));
        window.localStorage.setItem("prices", JSON.stringify(priceArr));

        let totalPrice = priceArr.reduce((previousValue, currentValue) => parseInt(previousValue) + parseInt(currentValue));
        function createList(items) {
          miniCart.innerHTML = '';
          miniCart.innerHTML = items.map((item) => `<li><a class='dropdown-item' href='#'>${item}</a></li>`).join('');

          let divider = document.createElement('li');
          divider.classList.add('dropdown-divider');

          let total = document.createElement('li');
          total.classList.add('bg-warning');
          total.classList.add('dropdown-item');
          total.append('TOTAL: ' + totalPrice + ' $');

          miniCart.appendChild(divider);
          miniCart.appendChild(total);

          cartCount.innerHTML = cartArr.length;

          cartAlert.classList.remove('d-none');
          setTimeout(() => {
            cartAlert.classList.add('d-none');
          }, 3000);
        }

        createList(cartArr);
      });
    }
  }, 3000);
}

// Check if user's token is expired
async function checkIfTokenExpired() {
  if (window.localStorage.getItem("tokenExpire") !== null) {
    const today = new Date();
    //Sun Jan 23 2022 21:58:36 GMT+0300 (GMT+03:00)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri","Sat"];
    const comparingString = dayNames[today.getDay()] + ' ' + monthNames[today.getMonth()] + ' ' + today.getDate() + ' ' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds() + ' GMT+0300 (GMT+03:00)';
    const comparingDate = new Date(comparingString);
    const expDate = new Date(window.localStorage.getItem("tokenExpire"));

    if (comparingDate > expDate) {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("tokenExpire");
      window.localStorage.removeItem("cart");
      window.localStorage.removeItem("prices");
    }
  }
}

// Check if user logged in or not
async function checkIsLoggedIn() {
  if (window.localStorage.getItem("token") === null) {
    logoutBtn.classList.add("d-none");
    loginBtn.classList.remove("d-none");
    registerBtn.classList.remove("d-none");
  }
  else{
    logoutBtn.classList.remove("d-none");
    logoutBtn.classList.add("mx-3");
    loginBtn.classList.add("d-none");
    registerBtn.classList.add("d-none");
  }
}

window.onload = async function () {
  // Check if user logged in or not / add or remove cart
  await checkIfTokenExpired();
  await checkIsLoggedIn();
  await addItemsToCart();
  await addItemsToCartAndNotify();
};
