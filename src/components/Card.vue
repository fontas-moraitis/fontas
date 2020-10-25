<template>
  <div :style="{ width: cardWidth - 48 + 'px'}" class="card">
     <div class="card__info">
       <div class="card__info__logo">
         {{ item.logo }}
       </div>
       <div class="card__info__text">
         <div class="card__info__text__title">{{ item.name }}</div>
         <div class="card__info__text__description">{{ item.description }}</div>
         <a class="card__info__text__link" :href="item.github" target="_blank" rel="noopener">source code <img src="@/assets/iconfinder-github.svg" width="14rem" /></a>
         <a class="card__info__text__link" :href="item.live" target="_blank" rel="noopener">visit live</a>
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
    },
    cardWidth: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .card {
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
        @include shadow-in;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
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
          white-space: nowrap;
        }
        &__description {
          margin: 16px 0;
          font-size: $xfine-text;
          color: #505050;
          text-transform: uppercase;
          line-height: 1.5;
          font-weight: 500;
          margin-bottom: 52px;
        }
        &__link {
          margin: 6px 0;
          font-size: $fine-text;
          border: .5px solid lightsalmon;
          // box-shadow: -2px -2px 6px 0 $color-shadow-light, 2px 2px 6px 0 $color-shadow-dark;
          padding: 8px;
          border-radius: 4px;
        }
        &__link:hover {
          cursor: pointer;
          color: salmon;
          @include shadow-in;
        }
      }
    }
  }
  @media only screen and (max-width: 600px) {
    .card {
      margin: $size-medium;
      height: 360px;
      @include shadow-out-mobile
      &__info {
        padding: 0;
        &__logo {
          width: $box-element;
          height: $box-element;
          font-size: $fine-text;
        }
        &__text {
          display: flex;
          align-items: center;
          &__title {
            writing-mode: vertical-lr;
            transform: rotate(-180deg);
            font-size: $mobile-text;
            height: 80%;
            white-space: nowrap;
            margin-bottom: 20px;
          }
          &__description {
            display: none;
          }
          &__link {
            writing-mode: vertical-lr;
            transform: rotate(-180deg);
            font-size: $mobile-text;
            color: salmon;
            border: none;
            box-shadow: none;
            text-decoration: underline;
            img {
              display: none;
            }
          }
        }
      }
    }
  }
</style>
