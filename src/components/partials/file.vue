<template>
  <tr class="">
    <td>
      <font-awesome-icon icon="minus-circle" class='delete' @click='deleteFile'/>
    </td>
    <td>
      <a :href='url'>{{ file.name }}</a>
    </td>
    <td>
      {{ filesize }}
    </td>
    <td>
      {{ file.updated | short_datetime }}
    </td>
  </tr>
</template>

<script>
  import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
  import firebase from 'firebase/app'
  import 'firebase/storage'
  import { mapActions } from 'vuex'
  import filesize from 'filesize'

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
        }).catch(() => {
          // eslint-disable-next-line no-console
          console.error('Failed attempting to remove the file');
        })
      }
    },
    computed: {
      filesize() {
        return filesize(this.file.size)
      }
    },
    mounted() {
      this.storageRef = firebase.storage().ref();
      this.fileRef = this.storageRef.child(this.file.fullPath)
      this.fileRef.getDownloadURL().then((url) => {
        this.url =  url
      }).catch((e) => {
        if(e.code === 'storage/object-not-found'){
          const conf = {job: this.job, file: this.file}
          this.removeJobFileReference(conf)
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
