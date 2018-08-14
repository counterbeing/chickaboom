<template>
  <div class="">
    {{ file.name }}
    <font-awesome-icon icon="minus-circle" class='delete' @click='deleteFile'/>
  </div>
</template>

<script>
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import firebase from 'firebase/app'
  import 'firebase/storage'
  import { mapActions } from 'vuex'

  export default {
    props: ['file', 'job'],
    components: { FontAwesomeIcon },
    data () {
      return {
        storageRef: null,
        fileRef: null,
        url: null,
      }
    },
    methods: {
      ...mapActions(['removeJobFileReference']),
      deleteFile() {
        this.fileRef.delete().then(() => {
          this.removeJobFileReference({job: this.job, file: this.file})
        }).catch((e) => {
          if(e.code === 'storage/object-not-found') console.log(YEP);
        })
      }
    },
    computed: {
    },
    mounted() {
      this.storageRef = firebase.storage().ref();
      this.fileRef = this.storageRef.child(this.file.fullPath)
      this.fileRef.getDownloadURL().then((url) => {
        this.url =  url
      }).catch((e) => {
        if(e.code === 'storage/object-not-found'){
          this.removeJobFileReference({job: this.job, file: this.file})
        }
      })
    }
  }

</script>

<style media="screen">
  .delete:hover {
    color: red;
  }
</style>
