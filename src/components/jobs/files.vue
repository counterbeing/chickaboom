<template>
  <div class="row">
    <div class="col-md-6">
      <h3>Source Files</h3>
    </div>

    <div class="col-md-6">
      <h3>Delivered Files</h3>
      <upload-zone/>
    </div>
  </div>
</template>


<script>
  import UploadZone from '@/components/partials/upload-zone'
  import Videos from '@/components/partials/videos'
  import Photos from '@/components/partials/photos'
  import { mapGetters } from 'vuex'

   export default {
     components: { Videos, Photos, UploadZone },
     computed: {
       ...mapGetters(['jobById', 'customers']),
       job() { return this.jobById(this.$route.params.id) },

     },
     methods: { }
   }
</script>
