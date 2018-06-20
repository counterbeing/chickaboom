<template>
  <div>
    <h3>Videos</h3>
    <div v-for='(video, index) in videos' :key='index'>
      <h2>{{index + 1}}. {{video.duration}}min {{video.format}} @{{video.frame_rate}}FPS </h2>
      <p>{{video.notes}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['videos']
}
</script>
