<template>
  <main class="gallery wrapper">
    <section class="gallery__intro">
      <span>This is some of my work</span>
      <div class="nav_guide">links on the cards for live apps and github repos</div>
      <div class="nav_guide--mobile">scroll left or right</div>
    </section>

    <section
     ref="cardholder"
     class="gallery__cardholder"
    >
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
        />
      </div>
    </section>
    <section class="gallery__btn-holder">
      <button
        aria-label="button previous"
        class="gallery__btn-holder__btn"
        type="button"
        name="previous card"
        title="previous card"
        @click="previous"
      >
        <img class="gallery__btn-holder__btn__img" src="@/assets/icons/arrow-left.svg" alt="previous card" />
      </button>
      <button
        aria-label="button next"
        class="gallery__btn-holder__btn"
        type="button"
        name="next card"
        title="next card"
        @click="next"
      >
          <img class="gallery__btn-holder__btn__img" src="@/assets/icons/arrow-right.svg" alt="next card" />
      </button>
    </section>
  </main>
</template>

<script>
import projects from '@/data/projects'
// Sounds
import { playSound } from '@/utils/playSound.js'
import clickSound from '@/assets/sounds/drop_003.ogg'
// Components
import Card from '@/components/Card'

/**
* @property {Number} VISIBLE_CARD_NUMBER -- determines the number of cards displayed in view
* @property {Array} projects -- array of objects to populate card structure:
* {
    name: name of project,
    description: description of project,
    github: link to github page,
    live: link to website,
    logo: number or logo for card
}
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
    this.$options.items = projects
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
        playSound(clickSound)
		},
		previous () {
			this.calcMargin <= (-this.cardWidth)
				? this.calcMargin += this.cardWidth
				: this.calcMargin = (-this.cardWidth) * (this.$options.items.length - (VISIBLE_CARD_NUMBER)) || (-this.cardWidth)
        playSound(clickSound)
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
        margin-top: $size-xxsmall;
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
        height: $gallery-height;
        display: flex;
        margin: 0;
        transition: all 1000ms ease;
      }
    }
    &__btn-holder {
      max-width: $max-width;
      margin: $size-small 0 $size-medium 0;
      display: flex;
      justify-content: center;
      &__btn {
        @include shadow-out;
        width: $box-element;
        height: $box-element;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid $color-border-highlight;
        outline: none;
        border-radius: 8px;
        margin: $size-small;
        &__img {
          width: $icon-button-size;
          height: $icon-button-size;
        }
        &:hover {
          cursor: pointer;
        }
        &:focus-visible {
          border: 1px solid $color-shadow-dark;
        }
        &:active {
          @include shadow-in;
          border: none;
          outline: none;
          cursor: pointer;
          img {
            transform: scale(0.8);
          }
        }
      }
    }
  }

  @media only screen and (max-width: $mobile-breaking-point) {
    .gallery {
      margin-top: $size-medium;
      &__cardholder {
        overflow-x: scroll;
        height: $gallery-height-mobile;
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
        margin-top: $size-xxsmall;
        }
        .nav_guide {
          display: none;
        }
      }
      &__btn-holder {
        display: none;
      }
    }
  }
</style>
