import {
    mapState,
    mapMutations,
    mapGetters,
    mapActions
  } from 'vuex';


  export default {
    methods: {
      ...mapMutations('categories', [
          'SetCategories',
      ]),
      ...mapActions('categories',[
        'actionCategories',
      ])
    },
    computed: {
      ...mapState('categories', [
        'categories'
      ])
    }
  };