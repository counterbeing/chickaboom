<template>
  <div class="upload-zone" ref='dropzone'>
    <slot></slot>
  </div>
</template>

<script>
  import firebase from 'firebase/app'
  import 'firebase/storage'
  import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        files: null,
        uploadTask: null,
        storageRef: null,
      }
    },
    props: [ 'type', 'subject' ],
    methods: {
      ...mapActions(['addDeliveredFile', 'storeUploadSnapshot']),
      highlight() {
        this.$refs.dropzone.classList.add('highlighted')
      },
      unhighlight() {
        this.$refs.dropzone.classList.remove('highlighted')
      },
      upload(file) {
        const path = this.uploadFolder.split('/')
        path.push(file.name)
        const fullPath = path.join('/')
        this.uploadTask = this.storageRef.child(fullPath).put(file)
        this.storeUploadSnapshot(this.uploadTask)
        this.uploadTask.then((snapshot) => {
          this.addDeliveredFile({
            job: this.subject,
            file: snapshot.metadata,
            type: this.type
          })
        })

      },
      handleDrop(e) {
        let dt = e.dataTransfer
        this.handleFiles(dt.files)
      },
      handleFiles(files) {
        ([...files]).forEach(this.upload)
      },
    },
    computed: {
      uploadFolder() {
        switch(this.type) {
          case 'deliveredFile':
            return `jobs/${this.subject.id}/delivered`
          case 'sourceFile':
            return `jobs/${this.subject.id}/source`
        }
      }
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
    padding: 20px;
  }

  .highlighted {
      background-color: rgba(153, 153, 153, 0.27) ;
  }
</style>
