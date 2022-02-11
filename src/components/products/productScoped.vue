<template>
    <q-dialog v-model="visible" >
      <q-card v-if="visible" style="width:30vw; max-width:600px">
        <q-toolbar>
          <q-toolbar-title><div class="text-subtitle1 ">Producto a Agregar</div></q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section class="row full-width">
            <div class="text-h6 text-secondary text-bold">
                {{productData.name}}
            </div>
        </q-card-section>
        <q-card-section class="row full-width justify-center">
            <div class="col-1"></div>
            <div class="col-6">
                <q-img :ratio="1" :src="productData.photo" contain >
                </q-img>
            </div>
            <div class="col-4">
                <div class="row full-width">
                    <div class="col-12">
                        Codigo Producto: <span class="text-italic" >{{productData.code}}</span>
                    </div>
                </div>
                <div class="row full-width">
                    <div class="col-12 q-mt-md">
                        Precio: ${{productData.price}}
                    </div>
                </div>
                <div class="row full-width q-mt-md">
                    <div class="col-5 self-center"> Cantidad: </div>
                    <q-btn flat round class="col-3 text-center" @click.stop="quantitySelected = (quantitySelected - 1) >= 1 ? (quantitySelected - 1) : 1 , reachedMaxQuantitySelected = false " >-</q-btn>
                    <div class="col-1 text-center self-center">{{quantitySelected}}</div>
                    <q-btn flat round class="col-3 text-center" :class="checkStock ? '' : 'text-red'" @click.stop="addQuantitySelected">+
                        <q-tooltip v-if="reachedMaxQuantitySelected">
                            No hay mas unidades disponibles
                        </q-tooltip>
<!--                         <q-tooltip v-if="productData.stock == 0">
                            Sin Stock
                        </q-tooltip> -->
                    </q-btn>
                </div>
                <div class="row full-width">
                    <div class="col-12 q-mt-md">
                        Sub-total: ${{productData.price * quantitySelected}}
                    </div>
                </div>
            </div>
            <div class="col-1"></div>

        </q-card-section>

        <q-card-section  class="row full-width">
            <div class="col-1"></div>
            <div class="col-10">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam exercitationem aut, natus minima, porro labore.
            </div>
            <div class="col-1"></div>
        </q-card-section>
        <q-card-section  class="row full-width">
            <div class="col-1"></div>
            <div class="col-10">
                <div class="row full-width justify-between">
                    <q-btn no-caps class="col-6" @click="visible = false">Seguir Comprando</q-btn>
                    <q-btn no-caps class="col-6 text-white" color="primary" @click="addToCart"  >Agregar al Carro</q-btn>
                </div>
            </div>
            <div class="col-1"></div>
        </q-card-section>
      </q-card>
    </q-dialog>
</template>

<script>

//Vuex
import mapProducts from 'src/mixins/mapProducts'
import mapCategories from 'src/mixins/mapCategories'
import mapCart from 'src/mixins/mapCart'

export default {
    name:"productCard",
    data(){
        return {
            visible:false,
            productData: null,
            reachedMaxQuantitySelected: false,
            quantitySelected: 1
        }
    },
    mixins:[mapCategories, mapProducts, mapCart],
    methods:{
        init(productData, quantitySelected){
            this.productData = productData
            this.quantitySelected = quantitySelected
            this.visible = true
        },
        addToCart(){
            this.PushCartProduct({...this.productData, quantitySelected: this.quantitySelected})
            this.visible = false
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
}
</script>
