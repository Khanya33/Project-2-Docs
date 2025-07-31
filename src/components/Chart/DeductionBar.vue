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
export default {
  name: 'DeductionBar',
  components: { Bar },
  props: {
    employees: Array
  },
  computed: {
    chartData() {
      const labels = this.employees.map(emp => emp.name)
      const tax = this.employees.map(emp => emp.payslip.tax)
      const uif = this.employees.map(emp => emp.payslip.uif)
      const med = this.employees.map(emp => emp.payslip.medicalAid)
      const netPay = this.employees.map(emp =>
        emp.salary - emp.payslip.tax - emp.payslip.uif - emp.payslip.medicalAid
      )
      return {
        labels,
        datasets: [
          {
            label: 'Net Pay',
            data: netPay,
            backgroundColor: '#4e79a7'
          },
          {
            label: 'Tax',
            data: tax,
            backgroundColor: '#f28e2b'
          },
          {
            label: 'UIF',
            data: uif,
            backgroundColor: '#e15759'
          },
          {
            label: 'Medical Aid',
            data: med,
            backgroundColor: '#76b7b2'
          }
        ]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Salary Breakdown per Employee'
          },
          tooltip: {
            mode: 'index',
            intersect: false
          }
        },
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true,
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