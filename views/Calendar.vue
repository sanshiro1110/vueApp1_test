<template>
  <div id="app">
    <table>
      <thead>
        <tr>
          <th>&lt;</th>
          <th colspan="5">2020年11月10日</th>
          <th>&gt;</th>
        </tr>
        <tr>
          <th>日</th>
          <th>月</th>
          <th>火</th>
          <th>水</th>
          <th>木</th>
          <th>金</th>
          <th>土</th>
        </tr>
      </thead>
      <tbody></tbody>
      <tfoot>
        <tr>
          <td colspan="7">today</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth();

function getCalendarBody() {
  const dates = [];
  const lastDay = new Date(year, month + 1, 0).getDate();

  for(let i = 0; i < lastDay; i ++) {
    dates.push({
      date: i + 1,
      isToday: false,
      disable: false,
    })
  }
  return dates;
}

function getCalendarHead() {
  const dates = [];
  const d = new Date(year, month, 0).getDate();
  const n = new Date(year, month, 1).getDay();
  for(let i = 0; i < n; i ++) {
    dates.unshift({
      date: d-i,
      isToday: false,
      disable: true,
    })
  }
  return dates;
}

function getCalendarFoot() {
  const dates = [];
  const lastDay = new Date(year, month + 1, 0).getDay();
  for(let i = 1; i < 7 - lastDay; i ++) {
    dates.push({
      date: i,
      isToday: false,
      disable: true
    })
  }
  return dates;
}

function createCalendar() {
  const dates = [...getCalendarHead(), ...getCalendarBody(), ...getCalendarFoot()];
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
      tr.appendChild(td);
    });
    document.querySelector('tbody').appendChild(tr);
  });
}

createCalendar();

export default {

}
</script>
