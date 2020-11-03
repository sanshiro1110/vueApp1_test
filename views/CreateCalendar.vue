<template>
  <div>
    <div class="modal">
      <div class="modal-date">
        <h3>
          {{ monthGet }}月{{ dateGet }}日: 500円
          <span>(食費: 500円)</span>
        </h3>
      </div>
      <div class="modal-changePaymentData">
        <h3>支出額の変更</h3>
        <font-awesome-icon class="modal-close" @click="modalClose" :icon="['fas', 'times-circle']"/>
        <input type="number">円
        <br>
        <button>決定</button>
        <br>
        <button class="data-delete">この項目を削除</button>
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
  position: relative;
  z-index: 10;
}


.modal {
  transition: all .3s ease;
  transform: scale(0) translateX(-50%);
  opacity: 0;
  position: absolute;
  top: 150px;
  left: 50%;
  z-index: 20;
  width: 600px;
  border: 2px solid #777;
  border-radius: 5px;
  box-shadow: 3px 3px 2px #777;
  background-color: #fff;
}

.modal.visible {
  transform: scale(1) translateX(-50%);
  opacity: 1;
}

.modal-changePaymentData button {
  margin-top: 20px;
}

.data-delete {
  margin-bottom: 20px;
}

.modal-close {
  font-size: 25px;
  color: #777;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
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
    dateListGet() {
      return this.$store.state.dateList;
    }
  },
  mounted() {
    this.$store.dispatch('createCalendar');
    this.$store.dispatch('getInputData');
  },
  methods: {
    prevMonth() {
      this.$store.dispatch('prevMonth');
    },
    nextMonth() {
      this.$store.dispatch('nextMonth');
    },
    modalClose() {
      const modal = document.querySelector('.modal');
      modal.classList.remove('visible');
    }
  },
}
</script>
