<template>
  <div>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
// :white_check_mark: Define roleColors outside the component
const roleColors = {
  Developer: '#4e79a7',
  'HR Manager': '#f28e2b',
  'Head Designer': '#e15759',
  'Lead Developer': '#76b7b2',
  'CEO': '#59a14f',
  'QA': '#FF007F'
}
export default {
  name: 'PayrollBar',
  components: { Bar },
  props: {
    employees: Array
  },
  computed: {
    chartData() {
      const roleSalaries = this.employees.reduce((acc, emp) => {
        acc[emp.role] = (acc[emp.role] || 0) + emp.salary
        return acc
      }, {})
      const labels = Object.keys(roleSalaries)
      const data = Object.values(roleSalaries)
      // :white_check_mark: Assign matching colors per role
      const backgroundColor = labels.map(role => roleColors[role] || '#999999')
      return {
        labels,
        datasets: [{
          label: 'Total Salary (R)',
          data,
          backgroundColor
        }]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: 'Total Payroll by Role'
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: val => 'R ' + val.toLocaleString()
            }
          }
        }
      }
    }
  }
}
</script>






