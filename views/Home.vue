<template>
  <div>
    <div class="container">
      <!-- <nav></nav> -->

      <h3>日付</h3>
      <p>
        <span class="changeButton" @click="prevDay">&lt;</span>
        {{ watchData.year }}年{{ watchData.month }}月{{ watchData.day }}日
        <span class="changeButton" @click="nextDay">&gt;</span>
      </p>
      <hr>

      <h3>カテゴリー</h3>
      <select id="category" v-model="watchData.category">
        <option v-for="category in categories" :key="category">{{ category }}</option>
      </select>
      <hr>

      <h3>支出</h3>
      <input type="number" id="expense" v-model="watchData.expense">
      <span>円</span>
      <hr>

      <h3>日記</h3>
      <textarea name="diary" id="" cols="50" rows="10"></textarea>
    </div>
    <div class="buttonArea">
      <button @click="dataRequest">記録する</button>
    </div>
  </div>
</template>

<script>
const today = new Date();

export default {
  data() {
    return {
      watchData: {
        year: today.getFullYear(),
        month: today.getMonth() + 1,
        day: today.getDate(),
        category: "食費",
        expense: 0,
      },
      categories: ["食費", "日用品", "美容品", "交際費", "交通費", "その他"],
    }
  },
  watch: {
    watchData: {
      handler() {
        localStorage.setItem('watchData', JSON.stringify(this.watchData));
      },
      deep: true
    }
  },
  //最初はいらないエラーになる！
  mounted() {
    this.watchData = JSON.parse(localStorage.getItem('watchData'));
  },
  methods: {
    prevDay() {
      this.watchData.day --;
      if(this.watchData.month == 3 || this.watchData.month == 5 || this.watchData.month == 7 || this.watchData.month == 10 || this.watchData.month == 12) {
        if(this.watchData.day < 1) {
          this.watchData.month --;
          this.watchData.day = 30;
        }
      } else {
        if(this.watchData.day < 1) {
          this.watchData.month --;
          this.watchData.day = 31;
        }
      }
      if(this.watchData.month < 1) {
        this.watchData.month = 12;
        this.watchData.year --;
      }
    },
    nextDay() {
      this.watchData.day ++;
      if(this.watchData.month == 2 || this.watchData.month == 4 || this.watchData.month == 6 || this.watchData.month == 9 || this.watchData.month == 11) {
        if(this.watchData.day > 30) {
          this.watchData.month ++;
          this.watchData.day = 1;
        }
      } else {
        if(this.watchData.day > 31) {
          this.watchData.month ++;
          this.watchData.day = 1;
        }
      }
      if(this.watchData.month > 12) {
        this.watchData.month = 1;
        this.watchData.year ++;
      }
    },
    dataRequest() {
      alert('保存されました')
    }
  }
}
</script>
<style scoped>
  .changeButton {
    cursor: pointer;
    display: inline-block;
    border: 1px solid #2c3e50;
    padding: 2px;
  }

  .buttonArea {
    margin-top: 20px;
  }
</style>
