<template>
    <header class="header wrapper" @mousemove="getMousePosition">
      <div ref="ball" class="ball" />
      <h1 class="header__title">HELLO.</h1>
      <div class="header__intro">
        <p class="header__intro__text">
            I am a frontend developer with a background in digital and architectural design.
            I enjoy building websites and exploring new technologies.
        </p>
      </div>
    </header>
</template>

<script>
/**
* @property {number} SPEED -- used in ball animation as multiplier for movement delay.
* @property {number} LOWER_BORDER -- indicates where the ball stops, differs on desktop and mobile.
*/

const SPEED = 0.08
let LOWER_BORDER = 400

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  // if user is on a mobile device reduse the space the ball can move in.
  LOWER_BORDER = 200
}

export default {
	name: 'Header',
	data: () => ({
		mouseX: 0,
		mouseY: 0,
		ballX: 0,
		ballY: 0
	}),
	mounted () {
		this.animateBall()
	},
	methods: {
		getMousePosition () {
			this.mouseX = event.pageX
			this.mouseY = event.pageY
		},
		animateBall () {
			let distX = this.mouseX - this.ballX
			let distY = this.mouseY - this.ballY

			this.ballX = this.ballX + (distX * SPEED)
			this.ballY = this.ballY + (distY * SPEED)

      // Check the ball's Y position to avoid getting below header
			if (this.$refs.ball && this.ballY < LOWER_BORDER) {
				this.$refs.ball.style.left = `${this.ballX}px`
				this.$refs.ball.style.top = `${this.ballY}px`
			}

			requestAnimationFrame(this.animateBall)
		}
	}
}
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    flex-direction: column;
    margin-top: $size-small;
    cursor: default;
    &__title {
      font-size: $graphic-text;
      font-weight: $xxbold-text;
      margin-bottom: $size-large;
    }
    &__intro {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      &__text {
        width: 40%;
        padding: $size-medium;
        font-family: 'Slabo 27px', serif;
        font-size: $standar-text;
        line-height: 1.4;
      }
    }

    .ball {
      width: 30vmin;
      height: 30vmin;
      border-radius: 50%;

      position: absolute;
      top: 0;
      left: 0;
      transform: translate(-50%, -50%);
      background: $color-text-dark;

      mix-blend-mode: difference;
    }
  }

  @media only screen and (max-width: $mobile-breaking-point) {
    .header {
      padding: $size-small;
      &__title {
        font-size: $large-text;
        font-weight: $medium-text;
        margin-bottom: $size-medium;
      }
      &__intro__text {
        width: 100%;
        font-size: $fine-text;
        padding: 0;
      }
    }
  }
</style>
