import Vue from 'vue'
import VModal from 'vue-js-modal/dist/index.nocss.js'
import 'vue-js-modal/dist/styles.css'

Vue.use(VModal)
export default function(_, inject) {
    inject('modal', VModal)
  }