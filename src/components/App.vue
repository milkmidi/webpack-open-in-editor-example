<script>
import Helloworld from './Helloworld.vue';

export default {
  name: 'App',
  components: {
    Helloworld,
  },
};
</script>

<template lang="pug">
#app
  .container
    Helloworld
</template>
