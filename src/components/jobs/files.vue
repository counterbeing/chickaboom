<template>
  <div class="row">
    <div class="col-md-12">

      <h3>Source Files</h3>
      <upload-zone type="sourceFile" :subject="job">
        <table class='table table-bordered'>
          <thead>
            <td>Actions</td>
            <td>Name</td>
            <td>Size</td>
            <td>Updated At</td>
          </thead>
          <template v-for="file in sourceFiles">
            <file :file='file' :job='job' v-bind:key='file.md5Hash + file.updated'/>
          </template>
        </table>
      </upload-zone>
    </div>


    <div class="col-md-12">
      <h3>Delivered Files</h3>
      <upload-zone type="deliveredFile" :subject="job">
        <table class='table table-bordered'>
          <thead>
            <td>Actions</td>
            <td>Name</td>
            <td>Size</td>
            <td>Updated At</td>
          </thead>
          <template v-for="file in deliveredFiles">
            <file :file='file' :job='job' v-bind:key='file.md5Hash + file.updated'/>
          </template>
        </table>
      </upload-zone>
    </div>
  </div>
</template>


<script>
  import UploadZone from '@/components/partials/upload-zone'
  import File from '@/components/partials/file'
  import { mapGetters } from 'vuex'

   export default {
     components: { UploadZone, File },
     computed: {
       ...mapGetters(['jobById', 'customers']),
       job() { return this.jobById(this.$route.params.id) },
       deliveredFiles() {
        if(!this.job) return []
        return this.job.deliveredFiles || []
      },
       sourceFiles() {
        if(!this.job) return []
        return this.job.sourceFiles || []
       }
     },
     methods: { }
   }
</script>

<style>
  .files-list {
    padding-left: 0;
    list-style: none;
  }
</style>
