<template>
  <form @submit.prevent="submitForm" class="card p-4 shadow-sm mb-4">
    <div class="mb-3">
      <label class="form-label">Employee Name</label>
      <input v-model="form.employeeName" type="text" class="form-control" required />
    </div>
    <div class="mb-3">
      <label class="form-label">Reviewer</label>
      <input v-model="form.reviewer" type="text" class="form-control" required />
    </div>
    <div class="mb-3">
      <label class="form-label">Date</label>
      <input v-model="form.date" type="date" class="form-control" required />
    </div>
    <div class="mb-3">
      <label class="form-label">Rating</label>
      <select v-model="form.rating" class="form-select" required>
        <option disabled value="">Select a rating</option>
        <option v-for="n in 5" :key="n" :value="n">{{ n }} :star:</option>
      </select>
    </div>
    <div class="mb-3">
      <label class="form-label">Comments</label>
      <textarea v-model="form.comments" rows="3" class="form-control" />
    </div>
    <div class="mb-3">
      <label class="form-label">Strengths</label>
      <input v-model="form.strengthsInput" type="text" class="form-control" />
    </div>
    <div class="mb-3">
      <label class="form-label">Areas for Improvement</label>
      <input v-model="form.improvementsInput" type="text" class="form-control" />
    </div>
    <button type="submit" class="btn btn-primary">Submit Review</button>
  </form>
</template>
<script>
export default {
  name: 'ReviewForm',
  data() {
    return {
      form: {
        employeeName: '',
        reviewer: '',
        date: '',
        rating: '',
        comments: '',
        strengthsInput: '',
        improvementsInput: ''
      }
    }
  },
  methods: {
    submitForm() {
      const review = {
        employeeName: this.form.employeeName,
        reviewer: this.form.reviewer,
        date: this.form.date,
        rating: Number(this.form.rating),
        comments: this.form.comments,
        strengths: this.form.strengthsInput.split(',').map(s => s.trim()),
        improvementAreas: this.form.improvementsInput.split(',').map(i => i.trim())
      }
      this.$emit('submit', review)
      // Reset form
      this.form = {
        employeeName: '',
        reviewer: '',
        date: '',
        rating: '',
        comments: '',
        strengthsInput: '',
        improvementsInput: ''
      }
    }
  }
}
</script>