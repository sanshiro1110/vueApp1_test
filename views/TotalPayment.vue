<template>
  <div class="totalPayment_container">
    <div class="monthTotal">
      <span class="prevMonth" @click="prevMonth">前の月</span>
      <h3>
        {{ this.month }}月の支出合計<br>
        {{ this.monthTotal }}円
      </h3>
      <span class="nextMonth" @click="nextMonth">次の月</span>
    </div>
    <div class="category">
      <h3>
        内訳
      </h3>
      <ul>
        <li>食費: {{ categoryPayments.food }}円</li>
        <li>日用品: {{ categoryPayments.daily }}円</li>
        <li>美容品: {{ categoryPayments.cosme }}円</li>
        <li>交際費: {{ categoryPayments.entertainment }}円</li>
        <li>交通費: {{ categoryPayments.transportation }}円</li>
        <li>その他: {{ categoryPayments.others }}円</li>
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
    <ul>
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
      month: today.getMonth() + 1,
      categoryPayments: {
        food: 0,
        daily: 0,
        cosme: 0,
        entertainment: 0,
        transportation: 0,
        others: 0,
      },
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
    .where("month", "==", this.month)
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
      this.monthTotal = totalPayment;
      this.categoryPayments = categoryPayments;
      console.log(this.arry);
    });
  },
  methods: {
    prevMonth() {
      this.month --;
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
      .where("month", "==", this.month)
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
        this.monthTotal = totalPayment;
        this.categoryPayments = categoryPayments;
        console.log(this.arry);
      });
    },
    nextMonth() {
      this.month ++;
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
      .where("month", "==", this.month)
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
        this.monthTotal = totalPayment;
        this.categoryPayments = categoryPayments;
        console.log(this.arry);
      });
    },
  }
}
</script>
