<template>
  <div class="upload-zone" ref='dropzone'>
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
      ...mapActions(['addDeliveredFile']),
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
        this.uploadTask.then((snapshot) => {
          this.addDeliveredFile({job: this.subject, file: snapshot.metadata })
        })
        this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // eslint-disable-next-line no-console
          console.log('Upload is ' + progress + '% done')
        }, function(error) {
          // eslint-disable-next-line no-console
          console.log(error)
          switch (error.code) {
            case 'storage/unauthorized':
            break;
            case 'storage/canceled':
            break;
            case 'storage/unknown':
            break;
          }
        }, function() {})
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
    border: 2px dashed #ccc;
    font-family: sans-serif;
    margin: 100px auto;
    padding: 20px;
  }

  .highlighted {
    background-color: green;
  }
</style>
