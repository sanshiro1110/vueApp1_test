<template>
  <div id="app">
    <div class="filter"></div>
    <CreateCalendar></CreateCalendar>
    <TotalPayment></TotalPayment>
  </div>
</template>

<style scoped>
#app {
  height: 100%;
}

/* .filter {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #888;
  z-index: 100;
  opacity: 0.5;
  background-size: cover;
} */
</style>

<script>
import CreateCalendar from './CreateCalendar';
import TotalPayment from './TotalPayment';

export default {
  components: {
    CreateCalendar,
    TotalPayment,
  },
  mounted() {
    const tds = document.querySelectorAll('tbody tr td');
    tds.forEach(td => {
      td.addEventListener('click', () => {
        this.$store.dispatch('changeSavedData', parseInt(td.firstElementChild.textContent));
        const modal = document.querySelector('.modal');
        modal.classList.add('visible');
      });
    });
  }
}


</script>
