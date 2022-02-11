
import {api} from 'boot/axios'
export function actionProducts({commit}) {
    return api.get('/product/').then(({data})=>{
        commit('SetProducts', data )
    })
}