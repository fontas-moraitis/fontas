<template>
    <section class="playground wrapper">
      <div class="playground__heading">
        <h3 class="playground__heading__title">Playground</h3>
        <span class="playground__heading__subtitle">components in neomorphic style</span>
      </div>
      <AppCalendar/>
    </section>
</template>

<script>
// Components
import AppCalendar from './Calendar/AppCalendar'

export default {
  name: 'Playground',
  components: { AppCalendar }
}
</script>

<style lang="scss" scoped>
.playground {
  @include flex-column-center;
  width: 100%;
  max-width: $max-width;
  padding: 10px;
  &__heading {
    width: 100%;
    text-align: left;
    text-transform: uppercase;
    margin-bottom: $size-large;
    &__title {
      font-size: $standar-text;
      font-weight: $xbold-text;
      margin-bottom: 6px;
    }
    &__subtitle {
      text-transform: lowercase;
      font-weight: $thin-text;
      font-size: $size-small;
      margin-top: $size-xxsmall;
    }
  }
}

@media screen and (max-width: $mobile-breaking-point) {
  .playground {
    display: none;
  }
}
</style>
