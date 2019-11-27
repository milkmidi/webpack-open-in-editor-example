<script>
export default {
  name: 'Rockroll🤘',
};
</script>

<template lang="pug">
.rockroll
  if DEV_MODE
    DebugComponent(path="components/Rockroll.vue")
  h1 Rockroll 🤘
</template>
