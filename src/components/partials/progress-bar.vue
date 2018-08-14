<template>
  <div class="">
    <div class="progress small" v-if='uploadsActive'>
      <div
        class="progress-bar"
        role="progressbar"
        :style="style"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100">
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters(['uploadStatus', 'uploadsActive']),
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
