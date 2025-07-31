<template>
  <div class="container mt-4">
    <h2 class="mb-4">Performance Reviews</h2>

    <!-- Review form -->
    <ReviewForm @submit="handleNewReview" />

    <div v-if="loading">Loading reviews...</div>
    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-else class="review-container mt-4">
      <ReviewCard
        v-for="review in reviews"
        :key="review.id || review.tempId"
        :review="review"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ReviewCard from '@/components/Reviews/ReviewCard.vue'
import ReviewForm from '@/components/Reviews/ReviewForm.vue'

export default {
  name: 'Performance',
  components: { ReviewCard, ReviewForm },
  data() {
    return {
      reviews: [],
      loading: true,
      error: null,
      tempIdCounter: 0 // for temporary keys on new reviews not saved yet
    }
  },
  mounted() {
    axios.get('http://localhost:3000/api/performance-reviews')
      .then(res => {
        // Normalize strengths and improvementAreas for all reviews
        this.reviews = res.data.map(review => ({
          ...review,
          strengths: this.parseToArray(review.strengths),
          improvementAreas: this.parseToArray(review.areas_for_improvement)
        }))
      })
      .catch(err => {
        console.error(err)
        this.error = 'Failed to load performance reviews'
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
    // Helper to parse strings or arrays into array of trimmed strings
    parseToArray(field) {
      if (Array.isArray(field)) return field
      if (typeof field === 'string' && field.trim().length > 0) {
        return field.split(',').map(s => s.trim())
      }
      return []
    },

    async handleNewReview(newReview) {
      // Normalize strengths and improvementAreas arrays
      newReview.strengths = this.parseToArray(newReview.strengths)
      newReview.improvementAreas = this.parseToArray(newReview.improvementAreas)

      // Add a temporary ID so Vue can track this item in the list until backend responds
      newReview.tempId = `temp-${this.tempIdCounter++}`
      
      // Optimistically add to UI with tempId (optional, you can skip if you want)
      this.reviews.push(newReview)

      try {
        // POST new review to backend API
        const response = await axios.post('http://localhost:3000/api/performance-reviews', newReview)

        // Replace the temporary review with the one returned from backend (which includes id)
        this.reviews = this.reviews.map(r => (r.tempId === newReview.tempId ? response.data : r))
      } catch (error) {
        console.error('Failed to save review:', error)
        alert('Error saving review. Please try again.')
        // Remove the optimistic review since save failed
        this.reviews = this.reviews.filter(r => r.tempId !== newReview.tempId)
      }
    }
  }
}
</script>

<style scoped>
.review-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}
</style>
