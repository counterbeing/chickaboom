<template>
  <button @click='addToCal' class="btn btn-primary d-print-none" type="submit">Add to Calendar</button>
</template>

<script>
import Ics from '@/vendor/ics.modularized'

export default {
  name: 'add-to-cal',
  props: ['customer', 'job'],
  data() {
    return {
    }
  },
  computed: {
    location() {
      return '1462 Hampshire St. San Francisco, CA, United States'
    },
    subject() {
      return 'FLY DRONE'
    },
    description() {
      return 'just out droning around!'
    }
  },

  methods: {
    addToCal() {
      const cal = Ics.ics();
      cal.addEvent(
        this.subject,
        this.description,
        this.location,
        '6/2/2018 3:30 pm',
        '6/2/2018 6:00 pm'
      )
      cal.download('Drone Job.ics');
    },
  }
}
</script>
