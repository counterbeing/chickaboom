<template>
  <table v-if='total' class="table table-hover">
    <thead class="thead-light">
      <tr>
        <td>Item</td>
        <td>Rate</td>
        <td>Quantity</td>
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

      <tr v-if='photos'>
        <td>Photos Captured</td>
        <td>{{photo_rate | currency}}</td>
        <td>{{ photo_quantity }}</td>
        <td>{{ photo_price | currency }}</td>
      </tr>

      <tr v-if='total'>
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
        return this.job.order.travel_fee +
          this.video_price +
          this.photo_price
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
    photo_rate() {
      const tpp = this.settings.company.flight.time_per_photo
      const hr = this.settings.company.flight.hourly_rate
      const price_per_minute = hr / 60
      return price_per_minute * tpp
    },
    photos() {
      if(!this.job.photos || this.job.photos.length == 0) return null
      return true
    },
    photo_quantity() {
      return this.job.photos.reduce((acc, el) => acc + parseFloat(el.quantity), 0)
    },
    photo_price() {
      return (this.video_duration / 60) * this.settings.company.flight.hourly_rate
    },
    order() {
      return this.job.order || null
    },
  }
}
</script>
