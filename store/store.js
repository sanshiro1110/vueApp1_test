import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import * as firebase from 'firebase';


Vue.use(Vuex);

const today = new Date();

export default new Vuex.Store({
  state: {
    inputData: {
      year: today.getFullYear(),
      month: today.getMonth(),
      date: today.getDate(),
      monthTotal: 0,
      number: 0,
      list: [],
      categoryPayments: {
        food: 0,
        daily: 0,
        cosme: 0,
        entertainment: 0,
        transportation: 0,
        others: 0
      }
    },
  },
  mutations: {
    getInputData(state, newData) {
      state.inputData = newData;
      console.log('3番目');
    },
    prevMonth(state) {
      state.inputData.month -= 1;
      if(state.inputData.month < 1) {
        state.inputData.month = 12;
        state.inputData.year -= 1;
      }
      console.log('1番目');
    },
    nextMonth(state) {
      state.inputData.month += 1;
      if(state.inputData.month > 12) {
        state.inputData.month = 1;
        state.inputData.year += 1;
      }
      console.log('1番目');
    },
    createCalendar(state) {
      let year = state.inputData.year;
      let month = state.inputData.month - 1;
      function createCalendar() {
        const today = new Date();
        function getCalendarHead() {
          const dates = [];
          const d = new Date(year, month, 0).getDate();
          const n = new Date(year, month, 1).getDay();
          for(let i = 0; i < n; i ++) {
            dates.unshift({
              date: d - i,
              isToday: false,
              isDisable: true,
            });

          }
          return dates;
        }

        function getCalendarBody() {
          const dates = [];
          const lastDate = new Date(year, month + 1, 0).getDate();
          for(let i = 1; i <= lastDate; i ++) {
            dates.push({
              date: i,
              isToday: false,
              isDisable: false,
            });
          }
          if(year === today.getFullYear() && month === today.getMonth()) {
            dates[today.getDate() - 1].isToday = true;
          }
          return dates;
        }

        function getCalendarTail() {
          const dates = [];
          const lastDay = new Date(year, month + 1, 0).getDay();
          for(let i = 1; i < 7 - lastDay; i ++) {
            dates.push({
              date: i,
              isToday: false,
              isDisable: true,

            });
          }
          return dates;
        }
        //prev,nextクリック時カレンダー削除
        function clearCalendar() {
          const tbody = document.querySelector('tbody');
          while(tbody.firstChild) {
            tbody.removeChild(tbody.firstChild);
          }
        }
        //title作成
        function renderTitle() {
          const title = document.querySelector('#title');
          title.textContent = `${year}/${String(month + 1).padStart(2, '0')}`;
        }
        //weeks作成
        function renderWeeks() {
          const dates = [
            ...getCalendarHead(),
            ...getCalendarBody(),
            ...getCalendarTail(),
          ]
          const weeks = [];
          const weeksCount = dates.length / 7;
          for(let i = 0; i < weeksCount; i ++) {
            weeks.push(dates.splice(0, 7));
          }

          weeks.forEach(week => {
            const tr = document.createElement('tr');
            week.forEach(date => {
              const td = document.createElement('td');
              td.classList.add('td');
              td.textContent = date.date;
              td.style.textAlign = 'center';
              if(date.isToday) {
                td.classList.add('today');
              }
              if(date.isDisable){
                td.classList.add('disabled');
              }
              const div = document.createElement('div');
              div.style.color = "#ff9966";
              div.style.fontSize = "12px";
              div.style.marginTop = "20px";
              div.style.textAlign = "right";
              if(!date.isDisable) {
                div.classList.add(date.date);
              }
              td.appendChild(div);
              tr.appendChild(td);
            });
            document.querySelector('tbody').appendChild(tr);
          });
        }

        function calendarBodyStyle() {
          const sundayList = document.querySelectorAll('tbody tr td:first-child');
          const saturdayList = document.querySelectorAll('tbody tr td:last-child');
          for(let i = 0; i < sundayList.length; i ++) {
            sundayList[i].style.color = "red";
            saturdayList[i].style.color = "blue";
          }
          const calendarList = document.querySelectorAll('tbody tr td');
          calendarList.forEach(td => {
            if(td.classList.contains('today')) {
              td.style.fontWeight = 'bold';
              td.style.backgroundColor = '#eee';
            }
            if(td.classList.contains('disabled')) {
              td.style.opacity = '0.5';
            }
            td.style.border = "1px solid black";
            td.style.width = "calc(500px / 7)";
            td.style.height = "50px";
            td.style.textAlign = "left";
            td.style.padding = "0px 5px 5px 5px";
          })
        }

        clearCalendar();
        renderTitle();
        renderWeeks();
        calendarBodyStyle();
      }
      createCalendar();
      console.log('2番目');
    },
    renderCalendarPayment(state) {
      const arry = state.inputData.list;
      const divArry = document.querySelectorAll('.td div');
      divArry.forEach(div => {
        let total = 0;
        arry.forEach(ary => {
          if(ary.date == div.className) {
            total+= ary.payment;
          }
        });
        if(total === 0) {
          div.textContent = "";
        } else{
          div.textContent = total;
        }
      });
      console.log('4番目');
    }
  },
  actions: {
    getInputData(context) {
      const newData = {
        year: context.state.inputData.year,
        month: context.state.inputData.month,
        date: context.state.inputData.date,
        monthTotal: 0,
        number: 0,
        list: [],
        categoryPayments: {
          food: 0,
          daily: 0,
          cosme: 0,
          entertainment: 0,
          transportation: 0,
          others: 0,
        }
      }

      const db = firebase.firestore();
      db.collection('total')
      .where("month", "==", context.state.inputData.month)
      .orderBy("date", "desc")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(function(doc) {
          newData.number ++;
          newData.list.push({
            id: newData.number,
            ...doc.data()
          });
          newData.monthTotal += doc.data().payment;
          if(doc.data().category == "食費") {
            newData.categoryPayments.food += doc.data().payment;
          } else if(doc.data().category == "日用品") {
            newData.categoryPayments.daily += doc.data().payment;
          } else if(doc.data().category == "美容品") {
            newData.categoryPayments.cosme += doc.data().payment;
          } else if(doc.data().category == "交際費") {
            newData.categoryPayments.entertainment += doc.data().payment;
          } else if(doc.data().category == "交通費") {
            newData.categoryPayments.transportation += doc.data().payment;
          } else if(doc.data().category == "その他") {
            newData.categoryPayments.others += doc.data().payment;
          }
        });
        context.commit('getInputData', newData);
      });
    },
    prevMonth(context, number) {
      async function hoge() {
        context.commit('prevMonth', number);
        context.dispatch('createCalendar');
        await context.dispatch('getInputData');
      }
      hoge();
      context.dispatch('renderCalendarPayment');
    },
    async nextMonth(context, number) {
      context.commit('nextMonth', number);
      context.dispatch('createCalendar');
      await context.dispatch('getInputData');
      context.dispatch('renderCalendarPayment');
    },
    createCalendar(context) {
      context.commit('createCalendar');
    },
    renderCalendarPayment(context) {
      context.commit('renderCalendarPayment');
    },
  },
  plugins: [createPersistedState({storage: window.localStorage})],
});

