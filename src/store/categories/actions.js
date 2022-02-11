import {api} from "boot/axios"
export function actionCategories({commit}) {
    return api.get('/product-category/').then(({data})=>{
        commit('SetCategories', data )
    })
}