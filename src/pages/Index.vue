<template>
    <q-page class="q-pa-sm q-pt-none q-mt-md">
        <div class="row">
            <div class="col-2 q-mr-md">
                <categories-list></categories-list>
            </div>
            <div class="col-1"></div>
            <div class="col-8">
                <div class="column">
                    <div class="row q-mt-md">
                        <q-card-section>
                            <div class="text-h5">
                                {{selectedCategory && selectedCategory.name || "Todos los Productos"}}
                            </div>
                            <div v-if="productFilteredList.length == 0" class="text-h7 col-12 self-center q-mt-xl"> No hay productos en la categoría seleccionada</div>
                        </q-card-section>
                    </div>
                    <div class="row justify-center q-mt-md" style="min-height:500px">
                        <div v-for="(product) in productFilteredList.slice((ElementosPorPagina * current) - ElementosPorPagina , (ElementosPorPagina * current))" :key="product.id" class="col-lg-3 col-md-3 col-sm-5 col-xs-12 ">
                            <product-card :productData="product"></product-card>
                        </div>
                    </div>
                    <div class="row" style="height:5vh" ></div>
                    <div class="row justify-center" style="postion:absolute;bottom:10px">
                        <q-pagination
                            v-model="current"
                            color="secondary"
                            size="15px"
                            :max="CalcularTotalPaginas"
                            :max-pages="4"
                            :boundary-numbers="true"
                            :boundary-links="productFilteredList.length > 4 ? true : false"
                            :min="1"
                            @click="logInConsole"
                            rounded
                        >
                        </q-pagination>
                    </div>
                </div>
            </div>
        </div>
    </q-page>
</template>

<script>

//Components
import CategoriesList from "src/components/categories/categoriesList.vue"
import productCard from "src/components/products/productCard.vue"

//Vuex Modules
import mapProducts from 'src/mixins/mapProducts'
import mapCategories from 'src/mixins/mapCategories'

export default {
    name: 'PageIndex',
    mixins:[mapProducts,mapCategories],
    data(){
        return {
            ElementosPorPagina: 4,
            TotalPaginas: 1,
            current:1,
        }
    },
    methods:{
        logInConsole(){

        }       
    },
    computed:{
        productFilteredList() {
            if(this.selectedCategory){
                //By Category
                let productsBySelectedCategory = this.products.filter((product)=>{

                    //In case escalates to more than one category per product. Compares the selected category against all categories associated with it.
                    // let matchId = null
                    // for (let category of product.category){
                    //     if(category.id === this.selectedCategory.id){
                    //         matchId= true
                    //     }
                    // }
                    // return matchId
                    return product.category.id == this.selectedCategory.id
                })
                
                return productsBySelectedCategory
            }else{
                return this.products
            }
        },
        CalcularTotalPaginas(){
            //this.productFilteredList = this.products
            let resto = this.productFilteredList.length % this.ElementosPorPagina
            let totalPaginas;
            if(resto){
                // this.TotalPaginas = (this.productFilteredList.length - resto) / this.ElementosPorPagina + 1
                totalPaginas = (this.productFilteredList.length - resto) / this.ElementosPorPagina + 1
            }else{
                // this.TotalPaginas = this.productFilteredList.length / this.ElementosPorPagina
                totalPaginas = this.productFilteredList.length / this.ElementosPorPagina
                            
            }
            return totalPaginas
        }
    },
    components:{
        productCard,
        CategoriesList
    }
}
</script>
