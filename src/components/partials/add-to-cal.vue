<template>
  <button @click='addToCal' class="btn btn-primary d-print-none" type="submit">Add to Calendar</button>
</template>

<script>
import Ics from '@/vendor/ics.modularized'
import moment from 'moment'

export default {
  name: 'add-to-cal',
  props: ['customer', 'job'],
  data() {
    return {
    }
  },
  computed: {
    location() {
      const a = this.job.address
      return `${a.address_1}, ${a.city}, ${a.state}, ${a.zip}`
    },
    subject() {
      return `Drone Flight for ${this.customer.name}`
    },
    description() {
      return 'Drone photography job.'
    },
    start_time() {
      return this.job.date.toDate()
    },
    end_time() {
      return moment(this.start_time).add(3, 'hours');
    }
  },

  methods: {
    formatDateForIcs(date) {
      const res = moment(date).format("M/D/YYYY hh:mm a")
      return res
    },
    addToCal() {
      const cal = Ics.ics();
      cal.addEvent(
        this.subject,
        this.description,
        this.location,
        this.formatDateForIcs(this.start_time),
        this.formatDateForIcs(this.start_time),
      )
      cal.download('Drone Job.ics');
    },
  }
}
</script>
