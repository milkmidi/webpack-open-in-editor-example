import Vue from 'vue';
import App from '@/components/App.vue';


if (process.env.NODE_ENV === 'development') {
  const DebugComponent = require('@/components/DebugComponent').default;
  Vue.component(DebugComponent.name, DebugComponent);
}
Vue.config.productionTip = false;

console.log('hi app.js');
new Vue({
  render: (h) => h(App),
}).$mount('#app');
