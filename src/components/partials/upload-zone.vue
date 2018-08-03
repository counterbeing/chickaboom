<template>
  <div class="upload-zone" ref='dropzone'>
    <p>upload files here</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        files: []
      }
    },
    methods: {
      highlight() {
        this.$refs.dropzone.classList.add('highlighted')
      },
      unhighlight() {
        this.$refs.dropzone.classList.remove('highlighted')
      },
      upload(file) {
        console.log('trying to upload ' + file)
      },
      handleDrop(e) {
        let dt = e.dataTransfer
        this.files = dt.files
        this.handleFiles()
      },
      handleFiles() {
        ([...this.files]).forEach(this.upload)
      },
    },
    mounted() {
      console.log('hello i mounted')
      const dropzone = this.$refs.dropzone
      ;['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, this.highlight, false)
      })
      ;['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, this.unhighlight, false)
      })
      dropzone.addEventListener('drop', this.handleDrop, false)
    }
  }
</script>

<style>
  .upload-zone {
    background-color: green;
  }

  .highlighted {
    background-color: red;
  }
</style>
