<template>
  <div>
    <div class="modal">
    </div>
    <table class="calendar">
      <thead>
        <tr>
          <th class="prev" id="prev" @click="prevMonth">&laquo;</th>
          <th class="title" id="title" colspan="5"></th>
          <th class="next" id="next" @click="nextMonth">&raquo;</th>
        </tr>
        <tr>
          <td>Sun</td>
          <td>Mon</td>
          <td>Tue</td>
          <td>Wed</td>
          <td>Thu</td>
          <td>Fri</td>
          <td>Sat</td>
        </tr>
      </thead>

      <tbody>
      </tbody>

      <tfoot>
        <tr>
          <td id="today" colspan="7">Today</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<style scoped>
table {
  border: 1px solid #000;
  border-collapse: collapse;
}

thead {
  font-weight: bold;
  background-color: #eee;
}

.prev,
.next {
  cursor: pointer;
  user-select: none;
}

thead tr th,
thead tr td {
  padding: 10px;
}

tfoot {
  background-color: #fff;
  font-weight: bold;
  text-align: center;
}

tfoot tr td {
  padding: 10px 0;
  cursor: pointer;
}

.calendar {
  width: 500px;
  margin: 0 auto;
}
</style>

<script>
export default {
  computed: {
    yearGet() {
      return this.$store.state.inputData.year;
    },
    monthGet() {
      return this.$store.state.inputData.month;
    },
    dateGet() {
      return this.$store.state.inputData.date;
    },
    listGet() {
      return this.$store.state.inputData.list;
    }
  },
  mounted() {
    this.$store.commit('createCalendar');
    this.$store.commit('renderCalendarPayment');
  },
  methods: {
    prevMonth() {
      this.$store.dispatch('prevMonth');
    },
    nextMonth() {
      this.$store.dispatch('nextMonth');
    }
  },
}
</script>
