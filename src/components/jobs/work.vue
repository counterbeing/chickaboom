<template>
    <div class="row">
      <div class='sub-section col-lg-6' v-if='job.videos'>
        <videos :videos='job.videos'/>
      </div>

      <div class='sub-section col-lg-6' v-if='job.photos'>
        <photos :photos='job.photos'/>
      </div>
    </div>
</template>


<script>
  import Videos from '@/components/partials/videos'
  import Photos from '@/components/partials/photos'
  import { mapGetters } from 'vuex'

   export default {
     components: { Videos, Photos },
     computed: {
       ...mapGetters(['jobById', 'customers']),
       job() { return this.jobById(this.$route.params.id) },

     },
     methods: { }
   }
</script>
