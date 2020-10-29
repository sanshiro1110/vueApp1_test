<template>
  <div id="app">
    <div class="routerLink">
      <router-link to="./" class="navLink">入力</router-link>
      <router-link to="./calendar" class="navLink">カレンダー</router-link>
      <router-link to="./report" class="navLink">レポート</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

.container {
  width: 500px;
  margin: 0 auto;
  border: solid 1px #2c3e50;
}

.navLink {
  padding: 5px;
  margin-right: 10px;
  text-decoration: none;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #ccc;
  color: #000;
  display: inline-block;
  margin-bottom: 10px;
}

*, *::after, *::before {
  box-sizing: border-box;
  font-size: 15px;
}

body {
  font-family: 'Courier New', monospace;
  font-size: 14px;
}

.routerLink {
  margin-bottom: 30px;
}
</style>

<script>
export default {
  created() {
    this.$store.dispatch('getInputData');
  }
}
</script>
