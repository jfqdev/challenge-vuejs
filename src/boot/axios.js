import Vue from 'vue'
import axios from 'axios'

const api = axios.create({ baseURL: 'http://sva.talana.com:8000/api/' })
Vue.prototype.$api = api

export { axios, api }

