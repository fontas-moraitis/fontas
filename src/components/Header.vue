<template>
    <div class="header wrapper">
      <h1>welcome</h1>
      <div class="header__intro">
        <p>
        I am a frontend developer with a background in design,
        I am working with HTML, CSS and JS and recently i started
        experimenting with VUE and used to create some of my websites.
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
    h1 {
      font-size: $graphic-text;
      font-weight: 600;
      margin-bottom: $size-medium;
      text-align: center;
      margin-top: $size-small;
    }
    &__intro {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      p {
        width: 300px;
        text-align: left;
        font-size: $fine-text;
      }
    }
  }
</style>
