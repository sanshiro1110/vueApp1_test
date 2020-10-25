<template>
  <div class="totalPayment_container">
    <div class="monthTotal">
      <h3>
        今月の支出合計<br>
        {{ this.monthTotal }}円
      </h3>
    </div>
    <ul class="totalPayment">
      <li class="date">
        日付
      </li>
      <li class="dateTotal">
        支出
      </li>
    </ul>
    <hr>
    <ul>
      <li v-for="ary in arry" :key="ary.name">
        <ul class="totalPayment">
          <li class="date">{{ ary.fields.month.doubleValue }}月{{ ary.fields.date.doubleValue }}日</li>
          <li class="dateTotal">{{ ary.fields.payment.doubleValue }}円</li>
        </ul>
        <hr>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}

.totalPayment {
  width: 500px;
  margin: 10px auto;
  display: flex;
  justify-content: space-between;
}

.totalPayment li {
  width: 200px;
  text-align: center;
}

.monthTotal {
  margin-top: 30px;
}

</style>

<script>
import axios from '../axios-firestore';

export default {
  data() {
    return {
      arry: [],
      monthTotal: 0,
    }
  },
  computed: {
    // reverseArrys() {
    //   return this.arry.slice().reverse();
    // },
    // updateTotalPayment() {
    //   return this.monthTotal += this.reverseArrys[0].fields.payment.doubleValue;
    // }
  },
  created() {
    axios.get('/total')
    .then(response => {
      this.arry = response.data.documents;
      this.arry.forEach(ary => {
        this.monthTotal += ary.fields.payment.doubleValue;
      })
      // console.log(this.arry);
      // console.log(response);
    });
  }
}
</script>
