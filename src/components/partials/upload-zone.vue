<template>
  <div class="upload-zone" ref='dropzone'>
  </div>
</template>

<script>
  import firebase from 'firebase/app'
  import 'firebase/storage'

  export default {
    data() {
      return {
        files: [],
        uploadTask: null,
        storageRef: null,
      }
    },
    props: [ 'parentFolder' ],
    methods: {
      highlight() {
        this.$refs.dropzone.classList.add('highlighted')
      },
      unhighlight() {
        this.$refs.dropzone.classList.remove('highlighted')
      },
      upload(file) {
        console.log('trying to upload ')
        console.log(file);
        const path = this.parentFolder.split('/')
        path.push(file.name)
        const fullPath = path.join('/')
        this.uploadTask = this.storageRef.child(fullPath).put(file);
      },
      handleDrop(e) {
        console.log('DROPPPED');
        // console.log(e);
        let dt = e.dataTransfer
        this.files = dt.files
        this.handleFiles()
      },
      handleFiles() {
        ([...this.files]).forEach(this.upload)
      },
    },
    mounted() {
      const dropzone = this.$refs.dropzone
      this.storageRef = firebase.storage().ref();

      function preventDefaults (e) {
        e.preventDefault()
        e.stopPropagation()
      }

      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, preventDefaults, false)
      })

      ;['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, this.highlight, false)
      })
      ;['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, this.unhighlight, false)
      })

      ;['dragdrop', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, this.handleDrop, false)
      })
    }
  }
</script>

<style>
  .upload-zone {
    border: 2px dashed #ccc;
    font-family: sans-serif;
    margin: 100px auto;
    padding: 20px;
  }

  .highlighted {
    background-color: green;
  }
</style>
