export function GetCartProductsTotalPrice (state) {
    let totalPrice = 0
    if(state.cartProducts){
        for(const [i,productListed] of state.cartProducts.entries()){
            totalPrice += productListed.partialPrice
        }
    }
    return totalPrice
}