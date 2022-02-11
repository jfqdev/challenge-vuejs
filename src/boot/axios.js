import Vue from 'vue'
import axios from 'axios'

const baseURL = ()=>{
    return 'http://sva.talana.com:8000/api'
}
const api = axios.create({ baseURL: baseURL() })
Vue.prototype.$api = api


export { axios, api, baseURL }

