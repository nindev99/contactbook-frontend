<script>
export default {
  name: 'App',
  data() {
    return {
      message: 'Hello Vue!',
    }
  },
}
</script>

<template>
  <div id="app">
    <h1>{{ message }}</h1>
  </div>
</template>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
h1 {
  font-weight: normal;
  line-height: 1.5;
  font-size: 2em;
}
</style>
