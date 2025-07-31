<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';

Chart.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default {
  props: ['data'],
  mounted() {
    new Chart(this.$refs.canvas, {
      type: 'line',
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
            position: 'top',
          },
        },
      },
    });
  },
};
</script>
