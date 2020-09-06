<template>
    <header @mousemove="getMousePosition" class="header wrapper">
      <div ref="ball" class="ball"></div>
      <h1>HELLO.</h1>
      <div class="header__intro">
        <p>
          I am a frontend developer with a background in digital and architectural design.
          I enjoy building websites and exploring new technologies.
        </p>
      </div>
    </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      mouseX: 0,
      mouseY: 0,
      ballX: 0,
      ballY: 0,
      speed: 0.08
    }
  },
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

      this.ballX = this.ballX + (distX * this.speed)
      this.ballY = this.ballY + (distY * this.speed)

      if (this.$refs.ball && this.ballY < 400) {
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
    h1 {
      font-size: $graphic-text;
      font-weight: 800;
      margin-bottom: $size-large;
    }
    &__intro {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      p {
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

  @media only screen and (max-width: 600px) {
    .header {
      padding: $size-small;
      h1 {
        font-size: $large-text;
        font-weight: 500;
        margin-bottom: $size-medium;
      }
      p {
        width: 100%;
        font-size: $fine-text;
        padding: 0;
      }
    }
  }
</style>
