<template>
  <div class="card shadow-sm mb-3">
    <div class="card-body">
      <h5 class="card-title">{{ review.employee_name }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">
        Reviewed by {{ review.reviewer_name }} on {{ review.review_date }}
      </h6>
      <div class="mb-2">Rating: {{ review.rating }} :star:</div>
      <p class="card-text">{{ review.comments }}</p>
      <div>
        <strong>Strengths:</strong>
        <p>{{ review.strengths }}</p>
      </div>
      <div>
        <strong>Needs Improvement:</strong>
        <p>{{ review.areas_for_improvement }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReviewCard',
  props: {
    review: Object
  }
}
</script>

<style scoped>
.card {
  width: 300px;
  margin: 20px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
</style>
