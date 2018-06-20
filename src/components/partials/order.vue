<template>
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <td>Item</td>
        <td>Rate</td>
        <td>Duration</td>
        <td>Price</td>
      </tr>
    </thead>
    <tbody>
      <tr v-if='videos'>
        <td>Videos Captured</td>
        <td>$100.00 / hr</td>
        <td>{{ video_duration }}</td>
        <td>{{ video_price | currency }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ['job'],
  computed: {
    videos() {
      if(!this.job.videos || this.job.videos.length == 0) return null
      return true
    },
    video_duration() {
      return this.job.videos.reduce((acc, el) => acc + parseFloat(el.duration), 0)
    },
    video_price() {
      return (this.video_duration / 60) * 100
    }
  }
}
</script>
