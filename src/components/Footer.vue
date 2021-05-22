<template>
  <footer class="footer wrapper">
    <div class="footer__container">
      <a
        class="footer__container__link"
        href="https://github.com/fontas-moraitis"
        target="_blank" rel="noopener"
      >
        <img class="footer__container__link__img" src="@/assets/icons/iconfinder-github.svg" alt="github-icon">
      </a>
      <a
        class="footer__container__link"
        href="https://dribbble.com/fontas"
        target="_blank" rel="noopener"
      >
        <img class="footer__container__link__img" src="@/assets/icons/dribbble.svg" alt="dribbble-icon">
      </a>
      <a
        class="footer__container__link"
        href="https://www.linkedin.com/in/fontas-moraitis-34338819b/"
        target="_blank" rel="noopener"
      >
        <img class="footer__container__link__img" src="@/assets/icons/iconfinder-linkedin.svg" alt="linkedin-icon">
      </a>
    </div>
  </footer>
</template>

<script>
export default {
	name: 'Footer'
}
</script>

<style lang="scss" scoped>
  .footer {
    margin-top: $size-large;
    &__container {
      max-width: $large-width;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      &__link {
        @include flex-center-center;
        @include shadow-button;
        width: $box-element;
        height: $box-element;
        border-radius: 10px;
        background: linear-gradient(145deg, #ffffff, #d7d6d6);
        &__img {
          width: $icon-button-size;
          height: $icon-button-size;
        }
        &:focus-visible {
          border: 1px solid $color-shadow-dark;
        }
        &:active {
          @include shadow-in;
          background: #efeeee;
          img {
            transform: scale(0.8);
          }
        }
      }
    }
  }
  @media only screen and (max-width: $mobile-breaking-point) {
    .footer {
      &__container {
        max-width: $small-width;
      }
    }
  }
</style>
