let productsDiv = document.getElementById("products");
let spinner = document.getElementById("spinner");

/**
 * Gets courses by category id (type id)
 * @function
 * @param {number} typeId - Category id
 */
async function getCoursesByTypeId(typeId, pageNumber) {
  spinner.style.display = "block";
  let response = await fetch(`https://localhost:7223/api/v1/Courses/getCoursesByTypeId?typeId=${typeId}&pageNumber=${pageNumber}`);
  let courses = await response.json();
  let courseArr = courses.data;
  spinner.style.display = "none";
  printCourses(courseArr);
}

/**
 * Printing courses to screen
 * @function
 * @param {Array} courseArr - Printable courses info from API
 */
function printCourses(courseArr) {
  productsDiv.innerHTML = "";
  let courseCard = "";

  productsDiv.innerHTML = `<div class="container mt-5 mb-3">
                            <div class="row" id="courses">
                            </div>
                          </div>`;

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

  coursesDiv.innerHTML = courseCard;
}
