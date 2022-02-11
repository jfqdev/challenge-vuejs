
<template>
  <q-layout view="hHh lpr fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
        </q-toolbar-title>
         <q-btn dense flat round icon="shopping_cart" @click="openCartDrawer">
            <q-badge v-if="cartProducts.length > 0" color="red" text-color="white" floating>
              {{cartProducts.length}}
            </q-badge>
         </q-btn>
      </q-toolbar>
    </q-header>

    <!-- Cart -->
    <cart-drawer v-model="openCart"></cart-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-secondary text-white">
      <q-toolbar>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>

//Components
import CategoriesList from "src/components/categories/categoriesList.vue"


//Vuex Modules
import mapProducts from 'src/mixins/mapProducts'
import mapCategories from 'src/mixins/mapCategories'
import CartDrawer from 'src/components/cart/cartDrawer.vue'
import mapCart from 'src/mixins/mapCart'

export default {
    name: 'MainLayout',
    mixins:[mapProducts,mapCategories, mapCart],
    data () {
        return {
            openCart: false,
        }
    },
    components:{
        CategoriesList,
        CartDrawer
    },
    methods:{
      openCartDrawer(){
        this.openCart = !this.openCart
      }
    },
    async beforeMount(){
        //Prefetch Products and Categories
        await this.actionProducts()
        await this.actionCategories()
    }
}
</script>

