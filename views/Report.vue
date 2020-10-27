<template>
  <div id="app">
    <div class="monthTotal">
      <h3>
        {{ monthGet }}月の支出合計<br>
        {{ monthTotalGet }}円
      </h3>
    </div>
    <div class="chart">
      <pie-chart
        :data="[
          ['食費', foodPaymentGet],
          ['日用品', dailyPaymentGet],
          ['美容品', cosmePaymentGet],
          ['交際費', entertainmentPaymentGet],
          ['交通費', transportationPaymentGet],
          ['その他', othersPaymentGet]
        ]"
        :colors='["#ffc7af","#ffabce","#d0b0ff","#ffffaa","#8eb8ff","#aeffbd",]'
        ></pie-chart>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
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
    monthTotalGet() {
      return this.$store.state.inputData.monthTotal;
    },
    foodPaymentGet() {
      return this.$store.state.inputData.categoryPayments.food;
    },
    dailyPaymentGet() {
      return this.$store.state.inputData.categoryPayments.daily;
    },
    cosmePaymentGet() {
      return this.$store.state.inputData.categoryPayments.cosme;
    },
    entertainmentPaymentGet() {
      return this.$store.state.inputData.categoryPayments.entertainment;
    },
    transportationPaymentGet() {
      return this.$store.state.inputData.categoryPayments.transportation;
    },
    othersPaymentGet() {
      return this.$store.state.inputData.categoryPayments.others;
    },
  }
}
</script>
