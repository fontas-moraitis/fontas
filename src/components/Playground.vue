<template>
    <section class="playground wrapper">
      <h3 class="playground__heading">Playground</h3>
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
  width: 100%;
  max-width: $max-width;
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: center;
  &__heading {
    width: 100%;
    text-align: left;
    font-size: $standar-text;
    font-weight: $xbold-text;
    text-transform: uppercase;
    margin-bottom: $size-large;
  }
}

@media screen and (max-width: 768px) {
  .playground {
    display: none;
  }
}
</style>
