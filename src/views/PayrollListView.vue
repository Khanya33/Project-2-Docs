<template>
  <div>
    <div v-if="isLoading" class="text-gray-600 p-4">Loading payroll data...</div>
    <div v-else-if="error" class="text-red-600 p-4">{{ error }}</div>
    <PayrollSummary v-else :payrollList="payrollList" />
  </div>
</template>

<script>
import axios from 'axios';
import PayrollSummary from '@/components/Reports/PayrollSummary.vue';

export default {
  name: 'PayrollListView',
  components: { PayrollSummary },
  data() {
    return {
      payrollList: [],
      isLoading: true,
      error: null
    };
  },
  mounted() {
    axios.get('/api/payroll')
      .then(res => {
        console.log('✅ Payroll data received:', res.data);
        this.payrollList = res.data;
      })
      .catch(err => {
        console.error('❌ Error fetching payroll:', err);
        this.error = 'Failed to load payroll records.';
      })
      .finally(() => {
        this.isLoading = false;
      });
  }
};
</script>
