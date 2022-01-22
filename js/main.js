Vue.createApp({ // Creating Vue app and setting its configuration
  data() {
    return {
      productsAll: null,
      dateNow: ""
    }
  },
  async created() {
    const responseAllCourses = await fetch("https://localhost:7223/api/v1/Courses/getAll");
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
  await getCourses(id);
});
