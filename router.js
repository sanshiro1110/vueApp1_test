import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Calendar from './views/Calendar.vue';
import Report from './views/Report.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {path: "/", component: Home},
    {path: "/calendar", component: Calendar},
    {path: "/report", component: Report},
  ]
});
