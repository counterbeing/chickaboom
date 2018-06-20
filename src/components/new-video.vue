<template>
  <div class="">
    <div class="row">
      <div class="col-md-4 mb-3">
        <label for="format">Format</label>
        <v-select
        v-model='format_select'
        :options="formats" id="format"
        />
        <div class="invalid-feedback">
          Please select a format.
        </div>
      </div>

      <div class="col-md-4 mb-3">
        <label for="fps">Frames Per Second</label>
        <v-select v-model='fps_select' :options="fps_options" id="fps"></v-select>
        <div class="invalid-feedback">
          Please select a frame rate.
        </div>
      </div>

      <div class="col-md-4 mb-3">
        <label for="fps">Duration</label>
        <input v-model='video.duration' class="form-control" id="duration"/>
        <div class="invalid-feedback">
          Please enter a duration.
        </div>
      </div>

      <div class="col-md-12 mb-3">
        <label for="format">Notes</label>
        <textarea
        class="form-control"
        v-model="video.notes"
        placeholder="Describe the shot here"
        />
      </div>
    </div>
      <hr>
  </div>
</template>

<script>
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import formats from '@/data/formats'

  export default {
    components: { VueGoogleAutocomplete },
    props: ['value'],
    name: 'new-video',
    data() {
      return {
        format_select: null,
        fps_select: null,
        video: {
          duration: 0,
          notes: null,
        },
      }
    },
    mounted() {
      this.video.format = this.value.format
      this.video.frame_rate = this.value.frame_rate
    },
    methods: {
      updateParent(){
        this.$emit("change", this.video)
      },
      // _.debounce(function (e) {
      //   this.filterKey = e.target.value;
      // }, 500)
    },
    computed: {
      fps_options() {
        if(!this.format_select) return []
        return formats[this.format_select.value].frame_rates.map((r) => {
          return { label: r.toString(), value: r.toString() }
        })
      },
      formats() {
        return Object.keys(formats).map((format) => {
          const chosen = formats[format]
          return {
            label: `${format} (${chosen.dimensions.width} x ${chosen.dimensions.height}px)`,
            value: format
          }
        })
      },
    },

    watch: {
      fps_select() {
        if(this.fps_select === null) return this.video.frame_rate = null
        this.video.frame_rate = this.fps_select.value
        this.updateParent()
      },
      format_select() {
        if(this.format_select === null) return this.video.format = null
        this.video.format = this.format_select.value
        this.updateParent()
      },
      video: {
        handler(){
          this.updateParent()
        },
        deep: true
      }
    },
  }
</script>
