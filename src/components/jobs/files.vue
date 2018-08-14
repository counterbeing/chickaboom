<template>
  <div class="row">
    <div class="col-md-6">

      <h3>Source Files</h3>
      <ul class='files-list'>
        <li v-for="file in sourceFiles" v-bind:key='file.md5Hash + file.updated'>
          <file :file='file' :job='job'/>
        </li>
      </ul>
      <upload-zone type="sourceFile" :subject="job"/>
    </div>


    <div class="col-md-6">
      <h3>Delivered Files</h3>
      <ul class='files-list'>
        <li v-for="file in deliveredFiles" v-bind:key='file.md5Hash + file.updated'>
          <file :file='file' :job='job'/>
        </li>
      </ul>
      <upload-zone type="deliveredFile" :subject="job"/>
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
