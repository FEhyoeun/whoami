<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
* {
  font-family: "Jua", sans-serif;
  color: #180B3D;
  text-align: center;
  margin: 0px;
  padding: 0px;
  line-height: 200%;
  word-break: keep-all;
}

body {
  height: 100vh;
  background: linear-gradient(100deg, #FBFFE2, #FFEBCC);
}

ul {
  list-style: none;
  padding: 0px;
  margin: 0px;
}

</style>
