<template>
  <footer class="footer wrapper">
    <div class="footer__container">
      <a
        class="footer__container__link"
        href="https://github.com/fontas-moraitis"
        target="_blank" rel="noopener"
      >
        <img width="20" height="20" src="@/assets/iconfinder-github.svg" alt="github-icon">
      </a>
      <a
        class="footer__container__link"
        href="https://dribbble.com/fontas"
        target="_blank" rel="noopener"
      >
        <img width="20" height="20" src="@/assets/dribbble.svg" alt="dribbble-icon">
      </a>
      <a
        class="footer__container__link"
        href="https://www.linkedin.com/in/fontas-moraitis-34338819b/"
        target="_blank" rel="noopener"
      >
        <img width="20" height="20" src="@/assets/iconfinder-linkedin.svg" alt="linkedin-icon">
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
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        background: linear-gradient(145deg, #ffffff, #d7d6d6);
        box-shadow: 2px 2px 6px $color-shadow-dark, -2px -2px 6px $color-shadow-light;
        &:active {
          background: #efeeee;
          box-shadow: inset 4px 4px 10px$color-shadow-dark, inset -4px -4px 10px$color-shadow-light;
        }
      }
    }
  }
  @media only screen and (max-width: 600px) {
    .footer {
      &__container {
        max-width: $small-width;
      }
    }
  }
</style>
