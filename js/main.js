//const Vue = window.vue;

Vue.createApp({ // Creating Vue app and setting its configuration
  data() {
      return {
          products: ['Emakina.TR', 'Emakina.BE', 'Emakina,US', 'Emakina.AS', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE',
           'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE',
           'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE',
           'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE',
           'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE', 'Emakina.BE']
      };
  },
  methods: {
      getProducts(){
          this.products;
      }
  }
}).mount('#products');

//app.mount('#products');
