<template>
  <div class="gallery wrapper">
    <div class="gallery__intro">
      here is some of my work
    </div>
    <div
     ref="cardholder"
     class="gallery__cardholder">
      <div
       :style="{ marginLeft: calcMargin + 'px' }"
       class="gallery__cardholder__carousel"
       @mousedown="mouseDown($event)"
       @mouseleave="mouseLeave($event)"
       @mouseup="mouseUp($event)"
       @mousemove.prevent="mouseMove($event)"
       >
        <Card
         v-for="(item, index) in items"
         :key="index"
         :item="item"
         :cardWidth="cardWidth"
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

const VISIBLE_CARD_NUMBER = 3

export default {
  name: 'Gallery',
  components: {
    Card
  },
  data () {
    return {
      items: [
        { name: '3D visualisation', description: `an 3D visualisation portfolio page build with html5, css3 & Javascript`, github: 'https://github.com/fontas-moraitis/arcviz-folio', live: '//www.tasossiakotos.com', logo: '01' },
        { name: 'tech startup', description: `the website for a technology start-up created with vue.js and scss`, github: 'https://github.com/fontas-moraitis/apta', live: '//www.apta.tech', logo: '02' },
        { name: 'online cv-page', description: `the web version of a CV page with short bio, made with vue.js and scss`, github: 'https://github.com/fontas-moraitis/doracv', live: '//www.doramicha.me/', logo: '03' },
        { name: 'personal page', description: `link to the code of this webpage from the github repository`, github: 'https://github.com/fontas-moraitis/fontas', live: '//www.fontas.me/', logo: '04' }
      ],
      calcMargin: 0,
      cardHolderWidth: 0,
      isDown: false,
      startX: null,
      scrollLeft: null
    }
  },
  computed: {
    cardWidth () {
      return this.cardHolderWidth / VISIBLE_CARD_NUMBER
    }
  },
  mounted () {
    this.cardHolderWidth = this.$refs.cardholder.offsetWidth
    window.addEventListener('resize', this.resizeHandler)
  },
  methods: {
    next () {
      if (this.calcMargin >= 0) {
        this.calcMargin -= this.cardWidth
      } else {
        this.calcMargin = 0
      }
    },
    previous () {
      if (this.calcMargin <= (-this.cardWidth)) {
        this.calcMargin += this.cardWidth
      } else {
        this.calcMargin = -(this.cardWidth)
      }
    },
    resizeHandler () {
      this.cardHolderWidth = this.$refs.cardholder.offsetWidth
    },
    mouseDown ($event) {
      this.isDown = true
      this.startX = $event.pageX - this.$refs.cardholder.offsetLeft
      this.scrollLeft = this.$refs.cardholder.scrollLeft
    },
    mouseLeave () {
      this.isDown = false
    },
    mouseUp () {
      this.isDown = false
    },
    mouseMove ($event) {
      if (!this.isDown) return
      const x = $event.pageX - this.$refs.cardholder.offsetLeft
      const walk = (x - this.startX) * 2
      this.$refs.cardholder.scrollLeft = this.scrollLeft - walk
    }
  }
}
</script>

<style lang="scss" scoped>
  .gallery {
    margin-top: $size-xlarge;
    &__intro {
      margin: $size-small $size-medium;
      font-size: $standar-text;
      font-weight: $xbold-text;
      text-transform: uppercase;
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
      max-width: $max-width;
      margin: $size-medium 0;
      display: flex;
      justify-content: center;
      &__button {
        width: $box-element;
        height: $box-element;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid $color-border-highlight;
        outline: none;
        @include shadow-out;
        margin: $size-small;
        & img {
          width: 20px;
          height: 20px;
        }
        &:hover {
          cursor: pointer;
        }
        &:active {
          @include shadow-in;
          border: none;
          outline: none;
          cursor: pointer;
          & img {
            width: 14px;
            height: 14px;
          }
        }
      }
    }
  }
  @media only screen and (max-width: 600px) {
    .gallery {
      margin-top: $size-medium;
      &__cardholder {
        overflow-x: scroll;
      }
      &__intro {
        margin: 0 0 $size-small 0;
        font-size: $xfine-text;
        padding: $size-small;
        font-weight: $regular-text;
      }
      &__cardholder {
        &__carousel {
          height: 360px;
        }
      }
      &__buttonholder {
        display: none;
      }
    }
  }
</style>
