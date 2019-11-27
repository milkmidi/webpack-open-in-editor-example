<script>
export default {
  name: 'Helloworld',
};
</script>

<template lang="pug">
.hello-world
  if DEV_MODE
    DebugComponent(path="components/Helloworld.vue")
  h1 hello world
</template>
