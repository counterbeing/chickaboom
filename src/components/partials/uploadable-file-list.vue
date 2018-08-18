<template>
  <upload-zone :type="type" :subject="job">
    <table class='table table-bordered'>
      <thead>
        <td>Actions</td>
        <td @click='sort("name")' >Name</td>
        <td @click='sort("size")'>Size</td>
        <td @click='sort("updated")'>Updated At</td>
        <td @click='sort("kind")'>Kind</td>
      </thead>
      <template v-for="file in sourceFiles">
        <file :file='file' :job='job' v-bind:key='file.md5Hash + file.updated'/>
      </template>
    </table>
  </upload-zone>
</template>

<script>
import UploadZone from '@/components/partials/upload-zone'
import File from '@/components/partials/file'
import Vue from 'vue'
export default {
  data(){
    return {
      sorting: {
        column: 'name',
        order: 'asc'
      }
    }
  },
  props: ['job','type'],
  components: {UploadZone, File},
  computed: {
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

<style scoped>
</style>
