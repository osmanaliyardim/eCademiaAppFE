let productDetailsDiv = document.getElementById("productDetails");

const queryString = window.location.search;
const id = queryString.replaceAll("?id=", "");
getCourseDetails(queryString);

/**
 * Gets courses by category id (type id)
 * @function
 * @param {number} typeId - Category id
 */
async function getCourseDetails(id) {
  spinner.style.display = "block";

  let response = await fetch('https://localhost:7223/api/v1/Courses/getCourseDetailsById' + id);
  let info = await response.json();
  let course = info.data;
  spinner.style.display = "none";

  function msToTime(duration) {
    var minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;

    return hours + ":" + minutes + "h";
  }
  course[0].duration = msToTime(course[0].duration);
  printCourse(course);
}

/**
 * Printing courses to screen
 * @function
 * @param {Array} courseArr - Printable course info from API
 */
function printCourse(course) {
  productDetailsDiv.innerHTML = "";
  let discountRate = Math.ceil(100 * (course[0].price - course[0].salePrice)/course[0].price);
  let courseCard = "";

  courseCard = `
                  <div class="card m-5">
                  <div class="row m-5">
                      <div class="col-12 col-md-6 col-lg-5">
                              <div class="text-center">
                                <img class="mt-3" alt="Loading.." width="70%" src="${course[0].imagePath}"/>
                              </div>
                      </div>
                      <div class="col-12 col-md-6 col-lg-7">
                          <div class="product rounded mb-1 p-2 ">
                              <!-- <div class="d-flex justify-content-between align-items-center">
                                  <a class="btn border border-primary text-primary rounded mb-1 py-1" href="./index.html"><img class="back-arrow" src="../assets/img/back-arrow.png"/>Back</a>
                              </div> -->
                              <h5 id="productName" class="text-uppercase">${course[0].name}</h5>
                              <div class="price flex-row align-items-center"> <span class="text-success"><strong>$${course[0].salePrice}</strong></span>
                                  <div>
                                      <small><del>$${course[0].price}</del></small><span class="text-danger"> - ${discountRate}% OFF</span>
                                  </div>
                              </div>
                          </div>

                          <p id="description" class="about mx-2">${course[0].description}</p> <br>
                          <img src="./img/star-solid.svg" class="mx-2 d-none d-md-inline" alt="Point" width="24px" height="24px"/>Rating:<span class="text-primary"> ${course[0].point}</span> <br>
                          <img src="./img/clock-regular.svg" class="mx-2 d-none d-md-inline" alt="Duration" width="24px" height="24px"/>Duration:<span class="text-primary"> ${course[0].duration}</span> <br>
                          <img src="./img/globe-solid.svg" class="mx-2 d-none d-md-inline" alt="Language" width="24px" height="24px"/>Language:<span class="text-primary"> ${course[0].language}</span> <br>
                          <img src="./img/user-graduate-solid.svg" class="mx-2 d-none d-md-inline" alt="NofEnrollments" width="24px" height="24px"/>Students:<span class="text-primary"> ${course[0].studentCount}</span> <br>
                          <img src="./img/chalkboard-teacher-solid.svg" class="mx-2 d-none d-md-inline" alt="Instructor" width="24px" height="24px"/>Instructor:<span class="text-primary"> ${course[0].instructor}</span> <br>
                          <div class="cart mt-4 align-items-center d-flex justify-content-between">
                              <a class="btn border border-dark rounded py-1 bg-warning text-uppercase font-weight-bold px-4" href="./index.html"><img class="back-arrow" src="./img/arrow-left-solid.svg" width="24px" height="24px" alt="Back"/>Back</a>
                              <button class="btn border border-dark rounded py-1 bg-warning text-uppercase font-weight-bold px-4"><img class="back-arrow" src="./img/thumbs-up-solid.svg" width="24px" height="24px" alt="Enroll"/> Enroll</button>
                          </div>
                      </div>
                  </div>
                </div>
              `;

  productDetailsDiv.innerHTML = courseCard;
}
