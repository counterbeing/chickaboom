<template>
  <div class="">
    <div class="row">
      <div class="col-md-4 mb-3">
        <label for="format">Format</label>
        <v-select
        v-model='aspect_ratio_select'
        :options="aspect_ratios" id="format"
        />
        <div class="invalid-feedback">
          Please select a format.
        </div>
      </div>

      <div class="col-md-4 mb-3">
        <label for="fps">Quantity</label>
        <input v-model='photo.quantity' class="form-control" id="quantity"/>
        <div class="invalid-feedback">
          Please enter a quantity.
        </div>
      </div>


      <div class="col-md-12 mb-3">
        <label for="format">Notes</label>
        <textarea
        class="form-control"
        v-model="photo.notes"
        placeholder="Describe the shot here"
        />
      </div>
    </div>
      <hr>
  </div>
</template>

<script>
  import VueGoogleAutocomplete from 'vue-google-autocomplete'
  import aspectRatios from '@/data/aspect-ratios'

  export default {
    components: { VueGoogleAutocomplete },
    props: ['value'],
    data() {
      return {
        aspect_ratio_select: null,
        photo: {
          aspect_ratio: null,
          notes: null,
          quantity: 0,
        }
      }
    },
    mounted() {
      this.photo.aspect_ratio = this.value.aspect_ratio
      this.photo.quantity = this.value.quantity
    },
    methods: {
      updateParent(){
        this.$emit("change", this.photo)
      },
    },
    computed: {
      aspect_ratio_options() {
        if(!this.photo.aspect_ratio) return []
        return aspectRatios[this.aspect_ratio.value].frame_rates.map((r) => {
          return { label: r.toString(), value: r.toString() }
        })
      },
      aspect_ratios() {
        return Object.keys(aspectRatios).map((format) => {
          const chosen = aspectRatios[format]
          return {
            label: `${format} (${chosen.dimensions.width} x ${chosen.dimensions.height}px)`,
            value: format
          }
        })
      },
    },

    watch: {
      aspect_ratio_select() {
        if(this.aspect_ratio_select === null) return this.photo.aspect_ratio = null
        this.photo.aspect_ratio = this.aspect_ratio_select.value
        this.updateParent()
      },
      photo: {
        handler(){ this.updateParent() },
        deep: true
      }
    },
  }
</script>
