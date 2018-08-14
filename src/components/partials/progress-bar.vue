<template>
  <div class="progress small">
    <div class="progress-bar" role="progressbar" :style="style" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['uploadStatus']),
      progress() {
        if(this.uploadStatus == undefined) return 0
        return this.uploadStatus.percent
      },
      style() {
        return `width: ${this.progress}%`
      }
    }
  }
</script>

<style>
  .progress.small {
    height: 4px;
    border-radius: 0;
  }
</style>
