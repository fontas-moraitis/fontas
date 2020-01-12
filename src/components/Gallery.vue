<template>
  <div class="gallery wrapper">
    <div class="gallery__intro">
      this is my work:
    </div>
    <div
     ref="cardholder"
     class="gallery__cardholder">
      <div
       :style="{ marginLeft: calcMargin + 'px' }"
       class="gallery__cardholder__carousel">
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
        { name: 'archviz', github: 'https://github.com/fontas-moraitis/tasos-siakotos', live: '//www.tasossiakotos.com', logo: '01' },
        { name: 'tech startup', github: 'https://github.com/fontas-moraitis/apta', live: '//www.apta.tech', logo: '02' },
        { name: 'cv page', github: 'https://github.com/fontas-moraitis/doracv', live: '//www.doramicha.me/', logo: '03' },
        { name: 'personal page', github: 'https://github.com/fontas-moraitis/fontas', live: '//www.fontas.me/', logo: '04' }
      ],
      calcMargin: 0,
      cardHolderWidth: 0
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
    }
  }
}
</script>

<style lang="scss" scoped>
  .gallery {
    margin-top: $size-xxlarge;
    &__intro {
      margin: $size-small $size-medium;
      font-size: $standar-text;
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
      &__intro {
        margin: 0 0 $size-small 0;
        font-size: $fine-text;
        padding: $size-small;
      }
      &__cardholder {
        &__carousel {
          height: 360px;
        }
      }
    }
  }
</style>
