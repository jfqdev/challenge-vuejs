import {
    mapState,
    mapMutations,
    mapGetters,
    mapActions
  } from 'vuex';


  export default {
    methods: {
      ...mapGetters('cart', [
        'GetCartProductsTotalPrice'
      ]),
      ...mapMutations('cart', [
          'SetProducts',
          'PushCartProduct',
          'DeleteProduct',
          'ChangeQuantitySelected'

      ]),
    },
    computed: {
      ...mapState('cart', [
        'cartProducts',
      ])
    }
  };