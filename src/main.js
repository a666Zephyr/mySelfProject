import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import elementUi from 'element-ui'
import {
  Button,
  Select,
  Container,
  Header,
  Aside,
  Main,
  Row,
  Input,
  TableColumn,
  Table,
  Option,
  Radio,
  InputNumber,
  Form,
  FormItem,
  Upload,
  Col,
  submenu,
  menu,
  menuItemGroup,
  menuItem,
  table,
  tableColumn,
  Message,
  MessageBox,
  Popover,
  Switch,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  DatePicker,
  TimePicker,
  Card,
} from 'element-ui'

Vue.use(Button)
Vue.use(Select)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Row)
Vue.use(Input)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Option)
Vue.use(Radio)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Upload)


Vue.use(Card)

// Vue.component(Button.name, Button)
Vue.component(Col.name, Col)
Vue.component(submenu.name, submenu)
Vue.component(menu.name, menu)
Vue.component(menuItemGroup.name, menuItemGroup)
Vue.component(menuItem.name, menuItem)
Vue.component(tableColumn.name, tableColumn)
Vue.component(table.name, table)
Vue.component(Popover.name, Popover)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Option.name, Option)
Vue.component(Switch.name, Switch)
Vue.component(CheckboxGroup.name, CheckboxGroup)
Vue.component(Checkbox.name, Checkbox)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(Radio.name, Radio)
Vue.component(Popover.name, Popover)
Vue.component(Input.name, Input)
Vue.component(DatePicker.name, DatePicker)
Vue.component(TimePicker.name, TimePicker)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox

// 引入 Echarts（暂时还没用上
/* import echarts from 'echarts'
Vue.prototype.$echarts = echarts */

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

