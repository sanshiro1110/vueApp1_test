<template>
  <div id="app">
    <table>
      <thead>
        <tr>
          <th class="prev" id="prev">&laquo;</th>
          <th class="title" id="title" colspan="5"></th>
          <th class="next" id="next">&raquo;</th>
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
  background-color: #eee;
  border: 2px solid #eee;
}

thead {
  font-weight: bold;
}

.prev,
.next {
  cursor: pointer;
}

thead tr th,
thead tr td {
  padding: 10px;
}

.disabled {
  opacity: .5;
}

.today {
  font-weight: bold;
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
</style>

<script>
export default {
  mounted() {
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

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
          td.textContent = date.date;
          td.style.textAlign = 'center';
          td.style.padding = '10px';
          if(date.isToday) {
            td.classList.add('today');
          }
          if(date.isDisable){
            td.classList.add('disabled');
          }
          tr.appendChild(td);
        });
        document.querySelector('tbody').appendChild(tr);
        const td1 = document.querySelector('tbody tr td:nth-child(1)');
        td1.style.color = "red";
      });
    }

    function createCalendar() {
      clearCalendar();
      renderTitle();
      renderWeeks();
    }

    document.querySelector('#prev').addEventListener('click', function() {
      month --;
      if(month < 0) {
        month = 11;
        year --;
      }
      createCalendar();
    });
    document.querySelector('#next').addEventListener('click', function() {
      month ++;
      if(month > 11) {
        month = 0;
        year ++;
      }
      createCalendar();
    });
    document.querySelector('#today').addEventListener('click', function() {
      year = today.getFullYear();
      month = today.getMonth();
      createCalendar();
    });

    createCalendar();
  }
}


</script>
