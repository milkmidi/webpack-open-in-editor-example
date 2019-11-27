<script>
import Helloworld from './Helloworld.vue';
import Rockroll from '@/components/Rockroll.vue';

export default {
  name: 'App',
  components: {
    Helloworld,
    Rockroll,
  },
};
</script>

<template lang="pug">
#app
  .container
    Helloworld
    Rockroll
</template>
