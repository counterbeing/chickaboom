<template>
  <div>
    <h3>Videos</h3>
    <hr>
    <div v-for='(video, index) in videos' :key='index' class='video'>
      <div class='video-check'>
        <font-awesome-layers class="fa-lg fa-2x">
          <font-awesome-icon icon="circle" />
          <font-awesome-icon icon="check" transform="shrink-6" class='todo-icon' />
        </font-awesome-layers>
      </div>
      <div class='todo-body'>
        <font-awesome-layers class="fa-lg vertical-middle">
          <font-awesome-icon icon="circle" />
          <strong class="fa-stack-1x num">{{ index + 1 }}</strong>
        </font-awesome-layers>
        &nbsp;<strong>{{video.duration}}min {{video.format}} @{{video.frame_rate}}FPS</strong>
        <p>{{video.notes}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
export default {
  components: { FontAwesomeIcon, FontAwesomeLayers },
  props: ['videos']
}
</script>

<style>

.video div {
  /* border: 1px solid red; */
  /* display: inline-block; */
}
.video-check {
  padding: 1em;
  display: table-cell;
  vertical-align: middle;
}

.todo-body {
  display: table-cell;
  vertical-align: middle;
}
.num{
  color: white;
  padding-top: 2px;
  font-size: 11px;
}
.vertical-middle {
  vertical-align: middle;
}
</style>
