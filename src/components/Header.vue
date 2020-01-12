<template>
    <div class="header wrapper">
      <h1>HELLO.</h1>
      <div class="header__intro">
        <p>
        I am a frontend developer with a background in digital and architectural design.
        </p>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
  .header {
    display: flex;
    flex-direction: column;
    margin-top: $size-small;
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
