import {api} from "boot/axios"
export function actionCategories({commit}) {
    return api.get('/product-category/').then(({data})=>{
        //Sort data in case API returns categories not sorted by order attribute.
        let sortedData = data.sort(function (a, b) {
            return a.order - b.order;
        });
        commit('SetCategories', sortedData )
    })
}