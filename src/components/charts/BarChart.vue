<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default {
  props: ['data'],
  mounted() {
    new Chart(this.$refs.canvas, {
      type: 'bar',
      data: this.data,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  },
};
</script>
