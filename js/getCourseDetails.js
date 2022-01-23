let productDetailsDiv = document.getElementById("productDetails");

const queryString = window.location.search;
const id = queryString.replaceAll("?id=", "");
getCourseDetails(id);

/**
 * Gets courses by category id (type id)
 * @function
 * @param {number} typeId - Category id
 */
async function getCourseDetails(id) {
  spinner.style.display = "block";

  let response = await fetch('https://localhost:7223/api/v1/Courses/getCourseDetailsById'+queryString);
  let info = await response.json();
  let course = info.data;
  spinner.style.display = "none";
  printCourse(course);
}

/**
 * Printing courses to screen
 * @function
 * @param {Array} courseArr - Printable course info from API
 */
function printCourse(course) {
  productDetailsDiv.innerHTML = "";
  let courseCard = "";

  courseCard = `
                  <div class="card m-5">
                  <div class="row m-5">
                      <div class="col">
                          <div class="images p-3">
                              <div class="text-center p-4"> <img id="main-image" alt="Loading" width="250" src="${course[0].imagePath}"/> </div>
                          </div>
                      </div>
                      <div class="col">
                          <div class="product rounded mb-3 p-2 ">
                              <!-- <div class="d-flex justify-content-between align-items-center">
                                  <a class="btn border border-primary text-primary rounded mb-1 py-1" href="./index.html"><img class="back-arrow" src="../assets/img/back-arrow.png"/>Back</a>
                              </div> -->
                              <h5 id="productName" class="text-uppercase">${course[0].name}</h5>
                              <div class="price flex-row align-items-center"> <span class="text-success"><strong>$${course[0].salePrice}</strong></span>
                                  <div>
                                      <small><del>$${course[0].price}</del></small><span class="text-danger"> - 40% OFF</span>
                                  </div>
                              </div>
                          </div>

                          <p id="description" class="about">${course[0].description}</p>
                          <span>Rating: <svg class="rating-star" xmlns="http://www.w3.org/2000/svg" width="20"
                                  height="20" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                                  <path
                                      d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                              </svg><i id="star"></i></span>

                          <div class="cart mt-4 align-items-center d-flex justify-content-between">
                              <a class="btn border border-primary text-primary rounded py-1" href="./index.html"><img
                                      class="back-arrow" src="../assets/img/back-arrow.png" />Back</a>
                              <button class="btn btn-warning text-uppercase font-weight-bold text-white px-4">Enroll to Course</button>
                          </div>
                      </div>
                  </div>
                </div>
              `;

  productDetailsDiv.innerHTML = courseCard;
}
