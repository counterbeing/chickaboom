<template>
  <div class="row">
    <div class="col-md-6">
      <h3>Source Files</h3>
    </div>

    <div class="col-md-6">
      <h3>Delivered Files</h3>
      <upload-zone :parentFolder="jobId"/>
    </div>
  </div>
</template>


<script>
  import UploadZone from '@/components/partials/upload-zone'
  import { mapGetters } from 'vuex'

   export default {
     components: { UploadZone },
     computed: {
       ...mapGetters(['jobById', 'customers']),
       job() { return this.jobById(this.$route.params.id) },
       jobId() { return this.$route.params.id }

     },
     methods: { }
   }
</script>
