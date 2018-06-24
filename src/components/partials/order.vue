<template>
  <table class="table table-hover">
    <thead class="thead-light">
      <tr>
        <td>Item</td>
        <td>Rate</td>
        <td>Duration</td>
        <td>Price</td>
      </tr>
    </thead>
    <tbody>
      <tr v-if='videos'>
        <td>Videos Captured</td>
        <td>{{settings.company.flight.hourly_rate | currency}} / hr</td>
        <td>{{ video_duration }} min</td>
        <td>{{ video_price | currency }}</td>
      </tr>

      <tr v-if='order.travel_fee'>
        <td>Travel Fee</td>
        <td>{{settings.company.travel.hourly_rate | currency}} / hr + {{settings.company.travel.cost_per_mile | currency}} / mi</td>
        <td>{{ job.order.travel_duration | currency('')}} hours</td>
        <td>{{ job.order.travel_fee | currency }}</td>
      </tr>

      <tr v-if='total'>
        <td><strong>Totals</strong></td>
        <td></td>
        <td></td>
        <td>
          <strong>
            {{ total | currency }}
          </strong>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Settings from '@/config/default-settings'

export default {
  props: ['job'],
  computed: {
    settings() { return Settings },
    total() {
        return this.job.order.travel_fee + this.video_price
    },
    videos() {
      if(!this.job.videos || this.job.videos.length == 0) return null
      return true
    },
    video_duration() {
      return this.job.videos.reduce((acc, el) => acc + parseFloat(el.duration), 0)
    },
    video_price() {
      return (this.video_duration / 60) * this.settings.company.flight.hourly_rate
    },
    order() {
      return this.job.order || null
    },
  }
}
</script>
