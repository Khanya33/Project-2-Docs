<template>
  <div class="card shadow-sm h-100">
    <div class="card-body" ref="payslipContent">
      <h5 class="card-title">{{ employee.name }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ employee.role }}</h6>
      <ul class="list-group list-group-flush my-3">
        <li class="list-group-item d-flex justify-content-between">
          <span>Gross Salary:</span>
          <span>R {{ employee.salary.toLocaleString() }}</span>
        </li>
        <li
          class="list-group-item d-flex justify-content-between"
          v-for="(amount, type) in employee.payslip"
          :key="type"
        >
          <span>{{ formatLabel(type) }}:</span>
          <span>R {{ amount.toLocaleString() }}</span>
        </li>
        <li class="list-group-item d-flex justify-content-between fw-bold">
          <span>Net Salary:</span>
          <span class="text-success">R {{ netSalary.toLocaleString() }}</span>
        </li>
      </ul>
            <button
        class="btn btn-success w-100 mt-2"
        @click="downloadPayslip"
      >
        Download Payslip
      </button>
      <button
        v-if="showButton"
        class="btn btn-outline-primary w-100"
        @click="$emit('view-payslip')"
      >
        View Payslip
      </button>
    </div>
  </div>
</template>

<script>
import html2pdf from 'html2pdf.js'
export default {
  name: 'PayslipCard',
  props: {
    employee: {
      type: Object,
      required: true
    },
    showButton: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    netSalary() {
      const { salary, payslip } = this.employee;
      const totalDeductions = payslip.uif + payslip.medicalAid + payslip.tax;
      return salary - totalDeductions;
    }
  },
  methods: {
    formatLabel(key) {
      return key
        .replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase());
    },
    downloadPayslip() {
      const element = this.$refs.payslipContent
      html2pdf().from(element).save(`${this.employee.name}-Payslip.pdf`);
    }
  }
}
</script>
    
<style scoped>
.card {
  min-height: 100%;
}
</style>
