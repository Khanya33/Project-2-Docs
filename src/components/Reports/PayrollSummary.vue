<template>
  <div class="p-4 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4">Payroll Summary</h2>

    <input
      type="text"
      v-model="searchTerm"
      placeholder="Search by name or month..."
      class="mb-4 w-full border px-3 py-2 rounded"
    />

    <div v-if="filteredPayrollList.length">
      <table class="min-w-full text-left border">
        <thead>
          <tr class="bg-gray-100">
            <th class="px-4 py-2">Employee</th>
            <th class="px-4 py-2">Month</th>
            <th class="px-4 py-2 text-right">Base Salary</th>
            <th class="px-4 py-2 text-right">Bonuses</th>
            <th class="px-4 py-2 text-right">Deductions</th>
            <th class="px-4 py-2 text-right">Final Salary</th>
            <th class="px-4 py-2">Paid On</th>
            <th class="px-4 py-2">Payslip</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in filteredPayrollList" :key="p.id" class="border-t hover:bg-gray-50">
            <td class="px-4 py-2">{{ p.employeeName }}</td>
            <td class="px-4 py-2">{{ p.month }}</td>
            <td class="px-4 py-2 text-right">{{ formatCurrency(p.baseSalary) }}</td>
            <td class="px-4 py-2 text-right">{{ formatCurrency(p.bonuses) }}</td>
            <td class="px-4 py-2 text-right">{{ formatCurrency(p.deductions) }}</td>
            <td class="px-4 py-2 text-right font-semibold">{{ formatCurrency(p.finalSalary) }}</td>
            <td class="px-4 py-2">{{ formatDate(p.paidOn) }}</td>
            <td class="px-4 py-2">
              <button @click="viewPayslip(p)" class="btn btn-primary btn-sm mr-2">View</button>
              <button @click="downloadPayslip(p)" class="btn btn-outline-secondary btn-sm">Download</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="text-center py-8 text-gray-500">
      <p>No payroll records found.</p>
    </div>

    <!-- Modal for viewing payslip -->
    <div v-if="showPayslipModal" class="modal-backdrop" @click.self="showPayslipModal = false">
      <div class="modal-content bg-white p-6 rounded shadow-lg max-w-xl mx-auto overflow-auto">
        <button class="btn-close float-right" @click="showPayslipModal = false">✖</button>
        <Payslip :entry="selectedPayslip" />
      </div>
    </div>
  </div>
</template>

<script>
import { createApp, nextTick } from 'vue';
import Payslip from '@/components/Reports/Payslip.vue';
import html2pdf from 'html2pdf.js';

export default {
  props: {
    payrollList: {
      type: Array,
      default: () => []
    }
  },
  components: { Payslip },
  data() {
    return {
      searchTerm: '',
      showPayslipModal: false,
      selectedPayslip: null
    };
  },
  computed: {
    filteredPayrollList() {
      const search = this.searchTerm.toLowerCase();
      return this.payrollList.filter(p =>
        p.employeeName.toLowerCase().includes(search) ||
        p.month.toLowerCase().includes(search)
      );
    }
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
        month: 'short',
        day: 'numeric'
      });
    },
    viewPayslip(p) {
      this.selectedPayslip = p;
      this.showPayslipModal = true;
    },
    async downloadPayslip(p) {
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.left = '-9999px';
      container.style.top = '0';
      container.style.width = '210mm'; // A4 width to help html2pdf render well
      container.style.background = 'white'; // Important for visibility in PDF
      document.body.appendChild(container);

      const app = createApp(Payslip, { entry: p });
      app.mount(container);

      // Wait Vue rendering
      await nextTick();
      await nextTick();

      // Small delay for styles/fonts to settle
      await new Promise(resolve => setTimeout(resolve, 150));

      await html2pdf()
        .from(container)
        .set({
          margin: 10, // mm
          filename: `Payslip-${p.employeeName}-${p.month}.pdf`,
          html2canvas: { scale: 2, dpi: 300, letterRendering: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        })
        .save();

      app.unmount();
      document.body.removeChild(container);
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  max-height: 90vh;
  overflow-y: auto;
  width: 90%;
  max-width: 700px;
  position: relative;
}
.btn-close {
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  float: right;
}
</style>
