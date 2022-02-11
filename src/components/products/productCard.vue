<template>
    <q-card class="q-mt-md cardHoverEffects" :class="hoverCard? 'shadow-3':''" style="width:240px" @mouseover="hoverIn" @mouseout="hoverOut">
        <q-img :ratio="1" :src="productData.photo" contain >
<!--             <q-chip v-if="data.chip" :class="data.chip_class" :color="data.chip_color" :label="data.chip"></q-chip> -->
            <div class="absolute-bottom-left q-pa-none  text-caption text-h7 bg-grey-5 opacityClass" style="bg-red">
                {{productData.stock > 0 ? "Disponible" : "No Disponible"}}
            </div>
        </q-img>

        <div class="row q-pa-none q-ma-none">
            <q-card-section class="q-mt-none q-pt-sm col-12 ">
                <div class="text-h7">
                {{ productData.name}}
                </div>
            </q-card-section>
            <q-card-section class="q-mt-none q-pt-none col-12 ">
                <div class="text-h7">
                $ {{ productData.price}}
                </div>
            </q-card-section>
            <q-card-section class="q-mt-none q-pt-none col-12">
                <div class="row ">
                    <div class="col-8 self-center">
                        <div class="row justify-center">
                            <q-btn flat round class="col-4 text-center" @click.stop="removeQuantitySelected" >-</q-btn>
                            <div class="col-4 text-center self-center">{{quantitySelected}}</div>
                            <q-btn flat round class="col-4 text-center" :class="checkStock ? '' : 'text-red'" @click.stop="addQuantitySelected">+
                                <q-tooltip v-if="reachedMaxQuantitySelected">
                                    No hay mas unidades disponibles
                                </q-tooltip>
                                <q-tooltip v-if="productData.stock == 0">
                                    Sin Stock
                                </q-tooltip>
                            </q-btn>
                        </div>
                    </div>
                    <div class="col-4 items-end text-right">
                        <q-btn flat round :icon="checkStock? 'add_shopping_cart': 'remove_shopping_cart' " contain @click.stop="goToProductScoped"> 
                            <q-tooltip v-if="productData.stock == 0">
                                Sin Stock
                            </q-tooltip>
                        </q-btn>
                    </div>
                </div>
            </q-card-section>

        </div>
        <product-scoped ref="productScoped" auto-close maximized >
            Hola
        </product-scoped>
    </q-card>
    
</template>

<script>

//Vuex
import mapProducts from 'src/mixins/mapProducts'
import mapCategories from 'src/mixins/mapCategories'

//Components
import productScoped from 'src/components/products/productScoped.vue'
import mapCart from 'src/mixins/mapCart'

export default {
    name:"productCard",
    data(){
        return {
            hoverCard: false,
            quantitySelected: this.productData.stock > 0 ? 1 : 0,
            reachedMaxQuantitySelected: false
        }
    },
    props:['productData'],
    mixins:[mapCategories, mapProducts, mapCart],
    methods:{
        hoverIn(){
            this.hoverCard= true
        },
        hoverOut(){
            this.hoverCard= false
        },
        goToProductScoped(e){
            if(!this.checkStock){
                return
            }
            this.openProductScoped()
        },
        removeQuantitySelected(){
            if(this.quantitySelected <= 1){
                return
            }else{
                this.quantitySelected -= 1
                this.reachedMaxQuantitySelected = false
            }
        },
        addQuantitySelected(){
            if(!this.checkStock){
                return
            }else{
                if (this.productData.stock == this.quantitySelected){
                    this.reachedMaxQuantitySelected = true
                    return
                }
                this.quantitySelected += 1
            }

        },
        openProductScoped(){
            if(!this.checkStockContrastingQuantities()){
                this.showNotif()
                return
            }
            let quantitySelectedScoped = this.quantitySelected
            this.quantitySelected = 1            
            this.$refs.productScoped.init(this.productData, quantitySelectedScoped)            
        },
        checkStockContrastingQuantities(){
            //Before pushing cart, need to check if element exist in cart. In that case, must check if quantity to add plus quantity already added <= stock.
            let alreadyInList = false
            let quantitySelectedInCart
            let index = null
            if(this.cartProducts){
                for(const [i,productListed] of this.cartProducts.entries()){
                    if(productListed.id == this.productData.id){
                        index = i            
                        alreadyInList = true
                        quantitySelectedInCart = productListed.quantitySelected
                        break
                    }
                }
            }
            if(alreadyInList){
                return ((quantitySelectedInCart + this.quantitySelected) <= this.productData.stock)            
            }else {
                return true
            }
        },
        showNotif () {
            this.$q.notify({
                message: 'El Producto ya se encuentra en el carrito. La cantidad que intenta agregar supera el stock disponible.',
                color: 'red'
        })
    }

    },
    computed:{
        checkStock(){
            if(this.productData.stock == 0){
                return false
            }else{
                return this.productData.stock >= this.quantitySelected
            }
        }
    },
    components:{
        productScoped
    }
}
</script>

<style lang="scss" scoped>

.cardHoverEffects:hover {
  color: rgb(116, 116, 116);
}

</style>