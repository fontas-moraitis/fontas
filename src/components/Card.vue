<template>
  <div class="card">
     <div class="card__info">
       <div class="card__info__logo">
         {{ item.logo }}
       </div>
       <div class="card__info__text">
         <div class="card__info__text__title">{{ item.name }}</div>
         <a class="card__info__text__link" :href="item.github" target="_blank">visit in github</a>
         <a class="card__info__text__link" :href="item.live" target="_blank">visit live</a>
       </div>
     </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
    width: 294px;
    height: 480px;
    flex-shrink: 0;
    flex-grow: 0;
    @include shadow-out;
    padding: $size-small;
    margin: $size-medium;
    &__info {
      display: flex;
      height: 100%;
      width: 100%;
      display: flex;
      padding: $size-medium;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      color: #515151;
      &__logo {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        @include shadow-in;
        background-position: center center;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Fredericka the Great', cursive;
        font-size: $large-text;
      }
      &__text {
        text-align: center;
        width: 100%;
        display: flex;
        flex-direction: column;
        &__title {
          font-weight: $bold-text;
          margin-bottom: $size-small;
          text-transform: uppercase;
        }
        &__link {
          margin: 6px 0;
          font-size: $fine-text;
        }
        &__link:hover {
          cursor: pointer;
          font-weight: $bold-text;
        }
      }
    }
  }
</style>
