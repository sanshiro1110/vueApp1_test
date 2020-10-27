<template>
  <div class="totalPayment_container">
    <div class="monthTotal">
      <span class="prevMonth" @click="prevMonth">前の月</span>
      <h3>
        {{ this.inputData.month }}月の支出合計<br>
        {{ this.inputData.monthTotal }}円
      </h3>
      <span class="nextMonth" @click="nextMonth">次の月</span>
    </div>
    <div class="category">
      <h3>
        内訳
      </h3>
      <ul>
        <li>食費: {{ inputData.categoryPayments.food }}円</li>
        <li>日用品: {{ inputData.categoryPayments.daily }}円</li>
        <li>美容品: {{ inputData.categoryPayments.cosme }}円</li>
        <li>交際費: {{ inputData.categoryPayments.entertainment }}円</li>
        <li>交通費: {{ inputData.categoryPayments.transportation }}円</li>
        <li>その他: {{ inputData.categoryPayments.others }}円</li>
      </ul>
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
    <ul id="datePaymentLists">
      <li v-for="ary in arry" :key="ary.id">
        <ul class="totalPayment">
          <li class="date">{{ ary.month }}月{{ ary.date}}日</li>
          <li class="dateTotal">{{ ary.payment}}円</li>
        </ul>
        <hr>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.totalPayment_container {
  width: 700px;
  margin: 0 auto;
}

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
  position: relative;
}

.category ul{
  display: flex;
  justify-content: space-around;
  width: 700px;
  margin: 10px auto 20px;
}

.prevMonth {
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translate(50%, -50%);
}
.nextMonth {
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translate(-50%, -50%);
}

.prevMonth,
.nextMonth {
  cursor: pointer;
  background-color: #eee;
  border-radius: 10px;
  padding: 10px;
}
</style>

<script>
import * as firebase from 'firebase';
const today = new Date();


export default {
  data() {
    return {
      inputData: {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        date: today.getDate(),
        monthTotal: 0,
        categoryPayments: {
          food: 0,
          daily: 0,
          cosme: 0,
          entertainment: 0,
          transportation: 0,
          others: 0,
        },
      },
      arry: [],
    }
  },
    created() {
    let totalPayment = 0;
    let number = 0;
    const categoryPayments = {
      food: 0,
      daily: 0,
      cosme: 0,
      entertainment: 0,
      transportation: 0,
      others: 0,
    };
    const list = [];

    const db = firebase.firestore();
    db.collection('total')
    .where("month", "==", this.inputData.month)
    .orderBy("date", "desc")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(function(doc) {

        number ++;
        list.push({
          id: number,
          ...doc.data()
        });
        totalPayment += doc.data().payment;
        if(doc.data().category == "食費") {
          categoryPayments.food += doc.data().payment;
        } else if(doc.data().category == "日用品") {
          categoryPayments.daily += doc.data().payment;
        } else if(doc.data().category == "美容品") {
          categoryPayments.cosme += doc.data().payment;
        } else if(doc.data().category == "交際費") {
          categoryPayments.entertainment += doc.data().payment;
        } else if(doc.data().category == "交通費") {
          categoryPayments.transportation += doc.data().payment;
        } else if(doc.data().category == "その他") {
          categoryPayments.others += doc.data().payment;
        }
      });
      this.arry = list;
      this.inputData.monthTotal = totalPayment;
      this.inputData.categoryPayments = categoryPayments;

      this.$store.dispatch('getInputData', this.inputData);

      console.log(this.arry);
    });
  },
  methods: {
    prevMonth() {
      this.inputData.month --;
      if(this.inputData.month < 1) {
        this.inputData.year --;
        this.inputData.month = 12;
      }
      const db = firebase.firestore();
      const list = [];
      let totalPayment = 0;
      let number = 0;
      const categoryPayments = {
        food: 0,
        daily: 0,
        cosme: 0,
        entertainment: 0,
        transportation: 0,
        others: 0,
      };
      db.collection('total')
      .where("month", "==", this.inputData.month)
      .orderBy("date", "desc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
          number ++;
          list.push({
            id: number,
            ...doc.data()
          });
          totalPayment += doc.data().payment;
          if(doc.data().category == "食費") {
            categoryPayments.food += doc.data().payment;
          } else if(doc.data().category == "日用品") {
            categoryPayments.daily += doc.data().payment;
          } else if(doc.data().category == "美容品") {
            categoryPayments.cosme += doc.data().payment;
          } else if(doc.data().category == "交際費") {
            categoryPayments.entertainment += doc.data().payment;
          } else if(doc.data().category == "交通費") {
            categoryPayments.transportation += doc.data().payment;
          } else if(doc.data().category == "その他") {
            categoryPayments.others += doc.data().payment;
          }
        });
        this.arry = list;
        this.inputData.monthTotal = totalPayment;
        this.inputData.categoryPayments = categoryPayments;
        this.$store.dispatch('getInputData', this.inputData);
        console.log(this.arry);
      });
    },
    nextMonth() {
      this.inputData.month ++;
      if(this.inputData.month > 12) {
        this.inputData.year ++;
        this.inputData.month = 1;
      }
      const db = firebase.firestore();
      const list = [];
      let totalPayment = 0;
      let number = 0;
      const categoryPayments = {
        food: 0,
        daily: 0,
        cosme: 0,
        entertainment: 0,
        transportation: 0,
        others: 0,
      };

      db.collection('total')
      .where("month", "==", this.inputData.month)
      .orderBy("date", "desc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
          number ++;
          list.push({
            id: number,
            ...doc.data()
          });
          totalPayment += doc.data().payment;
          if(doc.data().category == "食費") {
            categoryPayments.food += doc.data().payment;
          } else if(doc.data().category == "日用品") {
            categoryPayments.daily += doc.data().payment;
          } else if(doc.data().category == "美容品") {
            categoryPayments.cosme += doc.data().payment;
          } else if(doc.data().category == "交際費") {
            categoryPayments.entertainment += doc.data().payment;
          } else if(doc.data().category == "交通費") {
            categoryPayments.transportation += doc.data().payment;
          } else if(doc.data().category == "その他") {
            categoryPayments.others += doc.data().payment;
          }
        });
        this.arry = list;
        this.inputData.monthTotal = totalPayment;
        this.inputData.categoryPayments = categoryPayments;
        this.$store.dispatch('getInputData', this.inputData);
        console.log(this.arry);
      });
    },
  },
}
</script>
