<template>
  <div id="app">
    <div class="monthTotal">
      <h3>
        今月の支出合計<br>
        {{ monthTotal }}円
      </h3>
    </div>
    <div class="chart">
      <pie-chart
        :data="[
          ['食費', this.categoryPayments.food],
          ['日用品', this.categoryPayments.daily],
          ['美容品', this.categoryPayments.cosme],
          ['交際費', this.categoryPayments.entertainment],
          ['交通費', this.categoryPayments.transportation],
          ['その他', this.categoryPayments.others]
        ]"
        :colors='["#ffc7af","#ffabce","#d0b0ff","#ffffaa","#8eb8ff","#aeffbd",]'
        ></pie-chart>
    </div>
  </div>
</template>

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
    });
  },
}
</script>
