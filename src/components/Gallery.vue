<template>
  <div class="gallery wrapper">
    <div class="gallery__intro">
      this is my work:
    </div>
    <div
     ref="cardholder"
     class="gallery__cardholder">
      <div
       :style="{ marginLeft: neoMargin + 'px' }"
       class="gallery__cardholder__carousel">
        <Card
         v-for="(item, index) in items "
         :key="index"
         :item="item"
         >
       </Card>
      </div>
    </div>
    <div class="gallery__buttonholder">
      <button
       @click="previous"
       class="gallery__buttonholder__button" type="button" name="back"><img src="@/assets/back.svg" /></button>
      <button
       @click="next"
       class="gallery__buttonholder__button" type="button" name="next"><img src="@/assets/next.svg" /></button>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card'
export default {
  name: 'Gallery',
  components: {
    Card
  },
  data () {
    return {
      items: [
        { name: 'archviz', github: '//www.github.com', live: '//www.tasossiakotos.com', logo: 'as' },
        { name: 'tech startup', github: '//www.github.com', live: '//www.apta.tech', logo: 'apta' },
        { name: 'cv page', github: '//www.github.com', live: '//www.doramicha.me/', logo: 'dm' },
        { name: 'folio', github: '//www.github.com', live: '//www.doramicha.me/', logo: 'fo' }
      ],
      neoMargin: 0
    }
  },
  computed: {
    cardholderWidth () {
      return this.$refs.cardholder.getBoundingClientRect().width
    }
  },
  methods: {
    next () {
      if (this.neoMargin >= (this.items.length - 4) * -342) {
        this.neoMargin -= 342
      }
    },
    previous () {
      if (this.neoMargin <= -342) {
        this.neoMargin += 342
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .gallery {
    margin-top: $size-xlarge;
    &__intro {
      margin: $size-large $size-medium;
      font-weight: $bold-text;
    }
    &__cardholder {
      max-width: $max-width;
      overflow: hidden;
      &__carousel {
        height: 520px;
        display: flex;
        margin: 0;
        transition: all 1000ms ease;
      }
    }
    &__buttonholder {
      width: $max-width;
      margin: $size-medium 0;
      display: flex;
      justify-content: center;
      &__button {
        width: 40px;
        height: 40px;
        border: 1px solid $color-border-highlight;
        outline: none;
        @include shadow-out;
        margin: $size-small;
        padding: $size-small;
        &:hover {
          cursor: pointer;
        }
        &:active {
          @include shadow-in;
          border: none;
          outline: none;
        }
      }
    }
  }
</style>
