
<template>
  <q-layout view="hHh lpr fFf">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left">
        <categories-list></categories-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
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

export default {
    name: 'MainLayout',
    mixins:[mapProducts,mapCategories],
    data () {
        return {
            leftDrawerOpen: true,
        }
    },
    components:{
        CategoriesList
    },
    async mounted(){
        //Prefetch Products and Categories
        await this.actionProducts()
        await this.actionCategories()
    }
}
</script>

