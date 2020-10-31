<template>
  <div>
    <div class="modal">
      <div class="modal-container">
        <div class="modal-date">
          <h3>
            {{ monthGet }}月{{ dateGet }}日: 500円
            <span>(食費: 500円)</span>
          </h3>
        </div>
        <div class="modal-changePaymentData">
          <p>支出額の変更</p>
          <input type="number">円
          <br>
          <button>決定</button>
          <br>
          <button>削除</button>
        </div>
      </div>
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
    },

  },
  mounted() {
    this.$store.dispatch('createCalendar');
    this.$store.dispatch('getInputData');

    const tds = document.querySelectorAll('tbody tr td');
    tds.forEach(td => {
      td.addEventListener('click', () => {
        this.$store.dispatch('changeSavedData', parseInt(td.firstElementChild.textContent));
      });
    });
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
