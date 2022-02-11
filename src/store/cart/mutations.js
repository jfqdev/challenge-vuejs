export function SetProducts(state,products) {
    state.cartProducts = products
}

export function PushCartProduct(state,product) {
    let alreadyInList = false
    let index = null
    if(state.cartProducts){
        for(const [i,productListed] of state.cartProducts.entries()){
            if(productListed.id == product.id){
                index = i            
                alreadyInList = true
                break
            }
        }
    }
    if(!alreadyInList){
        product.partialPrice = product.quantitySelected * product.price
        state.cartProducts.push(product)
        
    } else{
        state.cartProducts[index].quantitySelected = state.cartProducts[index].quantitySelected + product.quantitySelected
        state.cartProducts[index].partialPrice = state.cartProducts[index].quantitySelected * state.cartProducts[index].price
    }
}

export function DeleteProduct(state,product) {
    let cartProductWithoutDeletedProduct = state.cartProducts.filter((registeredProduct)=>{
        return (product.id != registeredProduct.id)
    })
    state.cartProducts = cartProductWithoutDeletedProduct
}

export function ChangeQuantitySelected(state,product) {
    let indexOfProductToModify
    state.cartProducts.filter((registeredProduct,index)=>{
        if((registeredProduct.id == product.id)){
            indexOfProductToModify = index
        }
    })
    state.cartProducts[indexOfProductToModify].quantitySelected = product.quantitySelected
    state.cartProducts[indexOfProductToModify].partialPrice = state.cartProducts[indexOfProductToModify].quantitySelected * state.cartProducts[indexOfProductToModify].price
}