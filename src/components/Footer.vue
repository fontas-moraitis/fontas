<template>
  <div class="footer wrapper">
    <div class="footer__container">
      <a href="https://github.com/fontas-moraitis"><img src="@/assets/iconfinder-github.svg" alt="github icon"></a>
      <a href="#"><img src="@/assets/iconfinder-instagram.svg" alt="instagram icon"></a>
      <a href="#"><img src="@/assets/iconfinder-linkedin.svg" alt="linkedin icon"></a>
    </div>
  </div>
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
      max-width: $medium-width;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      img {
        width: 20px;
        height: 20px;
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
