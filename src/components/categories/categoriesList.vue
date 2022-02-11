<template>
    <div class="q-ml-md q-mt-md">
        <q-card-section>
            <q-toolbar>
                <q-toolbar-title class="cursor-pointer">
                    Categorias
                </q-toolbar-title>
                <q-btn v-if="selectedCategory" dense flat round icon="filter_list_off" @click="SetSelectedCategory(null), cleanActive()">
                </q-btn>
            </q-toolbar>
        </q-card-section>
        <q-list  separator>
            <q-item  v-for="(category,index) in categories" :key="category.id" clickable :active="active[index]" @click="setActiveCategory(category,index)">
                <q-item-section>{{category.name}}</q-item-section>
                <q-item-section avatar>
                    <q-icon size="20px" color="primary" name="fas fa-arrow-right" />
                </q-item-section>            
            </q-item>
        </q-list>
    </div>
</template>

<script>
import mapCategories from 'src/mixins/mapCategories'
import mapProducts from 'src/mixins/mapProducts'

export default {
    name: "categoriesList",
    mixins:[mapCategories, mapProducts],
    data(){
        return {
            data: "data",
            active: [],
        }
    },
    mounted(){
        this.active = new Array(this.categories.length).fill(false)
    },
    methods:{
        setActiveCategory(category,index){
            this.active = new Array(this.categories.length).fill(false)
            this.active[index] = true
            this.SetSelectedCategory(category)
        },
        cleanActive(){
            this.active = new Array(this.categories.length).fill(false)
        }
    },
}
</script>


