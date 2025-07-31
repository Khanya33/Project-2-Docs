<template>
  <div>
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>
<script>
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, ArcElement)
export default {
  name: 'RolePieChart',
  components: { Pie },
  props: {
    employees: Array
  },
  computed: {
    chartData() {
      const roleCounts = this.employees.reduce((acc, emp) => {
        acc[emp.role] = (acc[emp.role] || 0) + 1
        return acc
      }, {})
      return {
        labels: Object.keys(roleCounts),
        datasets: [{
          data: Object.values(roleCounts),
          backgroundColor: [
            '#4e79a7', '#f28e2b', '#e15759',
            '#76b7b2', '#59a14f', '#edc949'
          ]
        }]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Employees by Role'
          }
        }
      }
    }
  }
}
</script>