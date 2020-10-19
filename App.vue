<template>
  <div id="app">
    <router-link to="./" class="navLink">入力</router-link>
    <router-link to="./calendar" class="navLink">カレンダー</router-link>
    <router-link to="./report" class="navLink">レポート</router-link>
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
  margin-right: 5px;
  text-decoration: none;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #ccc;
  color: #000;
  display: inline-block;
  margin-bottom: 10px;
}
</style>
