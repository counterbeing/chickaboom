<template>
  <div class="row">
    <div class="col-md-12">
      <h3>Source Files</h3>
      <uploadable-file-list type='sourceFile' :job='job'></uploadable-file-list>
    </div>

    <div class="col-md-12">
      <h3>Delivered Files</h3>
      <uploadable-file-list type='deliveredFile' :job='job'></uploadable-file-list>
    </div>
  </div>
</template>


<script>
  import UploadZone from '@/components/partials/upload-zone'
  import File from '@/components/partials/file'
  import UploadableFileList from '@/components/partials/uploadable-file-list'
  import Vue from 'vue'
  import { mapGetters } from 'vuex'

   export default {
     name: 'files',
     data(){
      return {
        sorting: {
          column: 'name',
          order: 'asc'
        }
      }
     },
     components: { UploadZone, File, UploadableFileList },
     computed: {
       ...mapGetters(['jobById', 'customers']),
       job() { return this.jobById(this.$route.params.id) },
       deliveredFiles() {
        if(!this.job) return []
        return this.job.deliveredFiles || []
      },
       sourceFiles() {
        if(!this.job) return []
        return this.job.sourceFiles.slice().sort((a,b) => {
          let modifier = 1
          if(this.sorting.order === 'desc') modifier = -1
          if(a[this.sorting.column] < b[this.sorting.column]) return -1 * modifier
          if(a[this.sorting.column] > b[this.sorting.column]) return 1 * modifier
          return 0
        }) || []
       }
     },
     methods: {
       sort(column) {
         if(this.sorting.column === column) this.flipOrder()
         Vue.set(this.sorting, 'column', column)
       },
       flipOrder() {
         const order  = this.sorting.order === 'asc' ? 'desc' : 'asc'
         Vue.set(this.sorting, 'order', order)
       }
    }
   }
</script>

<style>
  .files-list {
    padding-left: 0;
    list-style: none;
  }
</style>
