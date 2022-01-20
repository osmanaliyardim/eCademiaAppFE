Vue.createApp({ // Creating Vue app and setting its configuration
  data() {
    return {
      products: null,
      dateNow: ""
    }
  },
  async created() {
    const response = await fetch("https://localhost:7223/api/v1/Courses/getAll");
    const info = await response.json();
    this.products = info.data;
    this.products.forEach(p => p.creationDate = new Date(p.creationDate));
    setInterval(this.getNow, 100);
  },
  methods: {
    getNow: function() {
        const today = new Date();
        const date = today.getFullYear() + '-' + ("0" + (today.getMonth() + 1)).slice(-2) + '-' + today.getDate();
        const dateTime = date;
        this.dateNow = new Date(dateTime);
    }
}
}).mount('#products');
