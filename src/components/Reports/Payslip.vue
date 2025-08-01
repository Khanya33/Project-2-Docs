<template>
  <div class="payslip-container text-sm text-gray-900">
    <h2 class="text-xl font-bold mb-2">Employee Payslip</h2>
    <p><strong>Name:</strong> {{ entry.employeeName }}</p>
    <p><strong>Month:</strong> {{ entry.month }}</p>
    <p><strong>Paid On:</strong> {{ formatDate(entry.paidOn) }}</p>

    <hr class="my-3" />

    <table class="w-full">
      <tbody>
        <tr>
          <td>Base Salary:</td>
          <td class="text-right">{{ formatCurrency(entry.baseSalary) }}</td>
        </tr>
        <tr>
          <td>Bonuses:</td>
          <td class="text-right">{{ formatCurrency(entry.bonuses) }}</td>
        </tr>
        <tr>
          <td>Deductions:</td>
          <td class="text-right">{{ formatCurrency(entry.deductions) }}</td>
        </tr>
        <tr class="font-bold border-t">
          <td>Final Salary:</td>
          <td class="text-right">{{ formatCurrency(entry.finalSalary) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Payslip',
  props: {
    entry: Object
  },
  methods: {
    formatCurrency(val) {
      if (val == null) return 'N/A';
      return new Intl.NumberFormat('en-ZA', {
        style: 'currency',
        currency: 'ZAR'
      }).format(val);
    },
    formatDate(dateStr) {
      if (!dateStr) return '–';
      return new Date(dateStr).toLocaleDateString('en-ZA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }
};
</script>

<style>
.payslip-container {
  width: 100%;
  padding: 1rem;
  font-family: 'Arial', sans-serif;
  background: white;
  color: #000;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

table td {
  padding: 0.4rem 0;
}

table tr.border-t td {
  border-top: 1px solid #ccc;
}

.text-right {
  text-align: right;
}

.font-bold {
  font-weight: bold;
}
</style>
