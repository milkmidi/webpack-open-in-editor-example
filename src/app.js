import Vue from 'vue';
import App from '@/components/App.vue';


if (process.env.NODE_ENV === 'development') {
  const DebugComponent = require('@/components/DebugComponent').default;
  Vue.component(DebugComponent.name, DebugComponent);
}

new Vue({
  render: (h) => h(App),
}).$mount('#app');
