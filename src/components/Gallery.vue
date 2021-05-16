<template>
  <main class="gallery wrapper">
    <section class="gallery__intro">
      <span>This is some of my work</span>
      <div class="nav_guide">navigate with left and right arrows</div>
      <div class="nav_guide--mobile">scroll left or right</div>
    </section>

    <section
     ref="cardholder"
     class="gallery__cardholder">
      <div
        :style="{ marginLeft: calcMargin + 'px' }"
        class="gallery__cardholder__carousel"
        @mousedown="mouseDown($event)"
        @mouseleave="mouseLeave()"
        @mouseup="mouseLeave()"
        @mousemove.prevent="mouseMove($event)"
      >
        <Card
          v-for="(item, index) in $options.items"
          :key="index"
          :item="item"
          :cardWidth="cardWidth"
        >
       </Card>
      </div>
    </section>
    <section class="gallery__buttonholder">
      <button
        aria-label="button previous"
        class="gallery__buttonholder__button"
        type="button"
        name="back"
        @click="previous"
      >
        <img src="@/assets/icons/arrow-left.svg" alt="arrow pointing back" />
      </button>
      <button
        aria-label="button next"
        class="gallery__buttonholder__button"
        type="button"
        name="next"
        @click="next"
      >
          <img src="@/assets/icons/arrow-right.svg" alt="arrow pointing forward" />
      </button>
    </section>
  </main>
</template>

<script>
// Componets
import Card from '@/components/Card'

/**
*@property {number} VISIBLE_CARD_NUMBER -- determines the number of cards displayed in view
*/

const VISIBLE_CARD_NUMBER = 3

export default {
	name: 'Gallery',
	components: { Card },
	data: () => ({
		calcMargin: 0,
		cardHolderWidth: 0,
		isDown: false,
		startX: null,
		scrollLeft: null
	}),
	computed: {
		cardWidth () {
			return Math.ceil(this.cardHolderWidth / VISIBLE_CARD_NUMBER)
		}
	},
	created () {
		this.$options.items = [
			{
				name: 'cupculator',
				description: `a PWA for calculating cooking mats, REACT, Netlify Serverless funtions`,
				github: 'https://github.com/fontas-moraitis',
				live: '//www.cupculator.com',
				logo: 'new'
			},
			{
				name: 'gallery eshop',
				description: `a gallery and shop mock-up for an artist in Athens, content is handled via Storyblok, VUE & VUEx`,
				github: 'https://github.com/fontas-moraitis/Gallery-eshop',
				live: '//www.stavrosperakis.com',
				logo: '01'
			},
			{
				name: 'tech startup',
				description: `website for a technology start-up in the Hague, including a style guide, VUE & VUEx`,
				github: 'https://github.com/fontas-moraitis/apta',
				live: '//www.apta.tech',
				logo: '02'
			},
			{
				name: 'personal page',
				description: `link to the github repo of this page`,
				github: 'https://github.com/fontas-moraitis/fontas',
				live: '//www.fontas.me/',
				logo: '03'
			}
		]
	},
	mounted () {
		this.cardHolderWidth = this.$refs.cardholder.offsetWidth
		window.addEventListener('resize', this.resizeHandler)
		document.addEventListener('keydown', event => this.keyboardNavigation(event))
	},
	beforeDestroy () {
		document.removeEventListener('keydown', event => this.keyboardNavigation(event))
	},
	methods: {
		next () {
			this.calcMargin >= (-this.cardWidth) * (this.$options.items.length - (VISIBLE_CARD_NUMBER + 1))
				? this.calcMargin -= this.cardWidth
				: this.calcMargin = 0
		},
		previous () {
			this.calcMargin <= (-this.cardWidth)
				? this.calcMargin += this.cardWidth
				: this.calcMargin = (-this.cardWidth) * (this.$options.items.length - (VISIBLE_CARD_NUMBER)) || (-this.cardWidth)
		},
		resizeHandler () {
			this.cardHolderWidth = this.$refs.cardholder?.offsetWidth
		},
		mouseDown (event) {
			this.isDown = true
			this.startX = event.pageX - this.$refs.cardholder.offsetLeft
			this.scrollLeft = this.$refs.cardholder.scrollLeft
		},
		mouseLeave () {
			this.isDown = false
		},
		mouseMove (event) {
			if (!this.isDown) {
				const x = event.pageX - this.$refs.cardholder.offsetLeft
				const walk = (x - this.startX) * 2
				this.$refs.cardholder.scrollLeft = this.scrollLeft - walk
			}
		},
		keyboardNavigation (event) {
			switch (event.keyCode) {
			case 39:
				this.next()
				break
			case 37:
				this.previous()
				break
			default:
				break
			}
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
      .nav_guide {
        text-transform: lowercase;
        font-weight: $thin-text;
        font-size: $size-small;
        margin-top: 6px;
      }
      .nav_guide--mobile {
        display: none;
      }
    }
    &__cardholder {
      max-width: $max-width;
      overflow: hidden;
      &::-webkit-scrollbar {
        width: 0px;
      }
      &__carousel {
        height: 520px;
        display: flex;
        margin: 0;
        transition: all 1000ms ease;
        .card {
          border-radius: 10px;
        }
      }
    }
    &__buttonholder {
      max-width: $max-width;
      margin: $size-small 0 $size-medium 0;
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
        border-radius: 8px;
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
        height: 400px;
      }
      &__intro {
        margin: 0 0 $size-small 0;
        font-size: $xfine-text;
        padding: $size-small;
        font-weight: $regular-text;
        .nav_guide--mobile {
        display: block;
        text-transform: lowercase;
        font-weight: $thin-text;
        font-size: $size-xsmall;
        margin-top: 6px;
        }
        .nav_guide {
          display: none;
        }
      }
      &__cardholder {
        &__carousel {
          height: 380px;
        }
      }
      &__buttonholder {
        display: none;
      }
    }
  }
</style>
