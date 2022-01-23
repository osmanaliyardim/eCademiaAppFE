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
let navItems= document.querySelectorAll(".nav-item");
document.addEventListener("DOMContentLoaded", function() {
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
