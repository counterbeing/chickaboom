<template>
  <div class="progress-container footer" v-if='uploadsActive'>
    <div class="progress small">
      <div
      class="progress-bar"
      role="progressbar"
      :style="style"
      :aria-valuenow="progress"
      aria-valuemin="0"
      aria-valuemax="100">
      </div>
  </div>
  <div class='number-text'>{{uploadsRunningCount}} of {{uploadsCount}} files remaining</div>
</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['uploadStatus', 'uploadsActive', 'uploadsCount', 'uploadsRunningCount']),
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
  .progress-container {
    border-top: 1px solid #CCC;
    width: 100%;
    left: 0;
  }
  .progress.small {
    height: 4px;
    border-radius: 0;
  }
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 60px; /* Set the fixed height of the footer here */
    line-height: 60px; /* Vertically center the text there */
    background-color: #f5f5f5;
  }
  .number-text {
    font-size: .7rem;
    text-align: center;
  }
</style>
