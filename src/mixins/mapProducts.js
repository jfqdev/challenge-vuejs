import {
    mapState,
    mapMutations,
    mapGetters,
    mapActions
  } from 'vuex';


  export default {
    methods: {
      ...mapMutations('products', [
          'SetProducts',
      ]),
      ...mapActions('products',[
        'actionProducts',
      ])
    },
    computed: {
      ...mapState('products', [
        'products',
      ])
    }
  };