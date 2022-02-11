<template>
    <q-dialog :value="value" @input="$emit('input', $event) " :position="'right'" style="position: absolute; bottom:10px">
            <div style="height:100%;width:700px">
                <q-card class="bg-grey-1 justify-end " style="height:100%">
                    <q-card-section class="text-center text-h6 text-primary bg-grey-2" style="box-shadow: 0px 8px 8px 0px rgba(0,0,0,0.05)">
                        Resumen de la compra
                    </q-card-section>
                    <q-scroll-area style="height:70%">
                        <div v-for="(product,index) in cartProducts" :key="index" class="q-pa-none q-ma-none">
                            <q-card-section horizontal class="q-pa-none text-center">
                                <q-card-section class="col-6 text-left">
                                    <div class="text-caption text-bold text-secondary">{{product.name}}</div>
                                    <div class="text-caption"> Precio : ${{product.price}}</div>
                                </q-card-section>
                                <q-card-section class="col-3 text-center q-pl-none q-pr-none self-center">
                                    <div class="row full-width q-pl-sm q-pr-sm q-mt-sm">
                                        <div class="col-12 divBorder shadow-1" ref="quantityButon">
                                            <div class="row rowInherit ">
                                                <q-btn  outlined size="4px" class="col-3 text-center btnBorder" icon="remove" @click="removeOneToQuantitySelected(product)" > </q-btn>                                
                                                <div class="col-6 text-center q-mt-xs text-weight-light" > {{product.quantitySelected}} </div>
                                                <q-btn  outlined size="4px" class="col-3 text-center btnBorder" icon="add" @click="addOneToQuantitySelected(product)" >  </q-btn>                                
                                            </div>
                                        </div>
                                    </div>                                    
                                </q-card-section>
                                <q-card-section class="col-3 flex flex-center">
                                    <q-btn icon="delete" flat round color="secondary" @click="DeleteProduct(product)" />
                                    <div class="text-caption q-mb-xs">$ {{product.partialPrice}}</div>
                                </q-card-section>
                            </q-card-section>
                            <q-separator/>
                        </div>
                    </q-scroll-area>
                    <q-card-actions >                        
                        <div class="text-h6 text-center" style="position: absolute; bottom:10px; width:96%">
                            <q-separator color="secondary" class="q-mb-sm "/>
                            <div class="q-mb-md text-primary">
                                Sub-total : <span class="text-black-10">${{GetCartProductsTotalPrice()}}</span>
                            </div>
                            <q-separator color="secondary" class="q-mb-xs"/>
                        </div>
                    </q-card-actions>
                </q-card>
            </div> 
    </q-dialog>
</template>

<script>

//Store Modules
import mapCart from 'src/mixins/mapCart'
import mapProducts from 'src/mixins/mapProducts'

export default {
    name: 'cartDrawer',
    mixins:[mapCart,mapProducts],
    methods:{
        removeOneToQuantitySelected(product){
            if(product.quantitySelected > 1 ){
                this.ChangeQuantitySelected({...product, quantitySelected: product.quantitySelected - 1})
            }
        },
        addOneToQuantitySelected(product){
            if(product.stock > product.quantitySelected){
                console.log(this.cartProducts)
                this.ChangeQuantitySelected({...product, quantitySelected: product.quantitySelected + 1})
                console.log(this.cartProducts)
            }
        }
    },
    props:{
        value:Boolean
    },

}
</script>


<style lang="scss" scoped>

.divBorder{

    height: 30px;
    border-radius: 10px;
}

.btnBorder {
    /* border: 1px solid $primary; */
    height: 97%;
    border-radius: 10px;
}

.rowInherit {
    height: 100%;
}



</style>