<template>
	<section :style="{ width: cardWidth - 48 + 'px'}" class="card">
    <div class="card__logo">
      {{ item.logo }}
    </div>
    <div class="card__text">
      <span class="card__text__title">
        {{ item.name }}
      </span>
      <span class="card__text__description">
        {{ item.description }}
      </span>
    </div>
    <div class="card__buttons">
      <a class="card__buttons__link" :href="item.github" target="_blank" rel="noopener">
        <span>source code</span>
        <img width="14rem" class="card__buttons__link__img" src="@/assets/icons/iconfinder-github.svg" alt="github icon"/>
      </a>
      <a class="card__buttons__link" :href="item.live" target="_blank" rel="noopener">
        visit live
      </a>
    </div>
	</section>
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
  @include shadow-out;
  @include flex-column-center;
  height: $card-total-height;
  justify-content: space-between;
  color: $color-text-grey;
  flex-shrink: 0;
  flex-grow: 0;
  padding: $size-medium;
  margin: $size-medium;
  border-radius: $size-xsmall;
  &__logo {
    @include shadow-in;
    width: $card-logo-container-size;
    height: $card-logo-container-size;
    border-radius: 50%;
    display: grid;
    place-content: center;
    font-size: $large-text;
  }
  &__text {
    @include flex-column-center;
    &__title {
      font-weight: $bold-text;
      margin-bottom: $size-small;
      text-transform: uppercase;
      white-space: nowrap;
    }
    &__description {
      max-width: 80%;
      text-align: center;
      font-family: 'Slabo 27px', serif;
      font-size: $fine-text;
      color: $color-text-grey-light;
      line-height: 1.5;
      font-weight: 500;
    }
  }
  &__buttons {
    @include flex-column-center;
    &__link {
      @include flex-center-center;
      width: 100%;
      height: $card-button-height;
      padding: $card-button-padding;
      margin-bottom: 2px;
      white-space: nowrap;
      font-size: $fine-text;
      border-radius: 4px;
      color: $color-highlight;
      &:focus-visible, &:hover {
        @include shadow-in;
        cursor: pointer;
        color: $color-text-grey-light;
        border: none;
      }
      &__img {
        margin-left: $size-xxsmall;
      }
    }
  }
}

@media (max-width: 600px) {
  .card {
    @include shadow-out-mobile;
    display: flex;
    margin: $size-medium;
    height: $card-total-height-mobile;
    padding: $size-xsmall;
    &__logo {
      width: $box-element;
      height: $box-element;
      font-size: $fine-text;
      flex-shrink: 0;
    }
    &__text {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: $size-small;
      &__title {
        margin: 0;
        writing-mode: vertical-lr;
        transform: rotate(-180deg);
        font-size: $mobile-text;
        white-space: nowrap;
      }
      &__description {
        display: none;
      }
    }
    &__buttons {
      &__link {
        width: auto;
        height: auto;
        writing-mode: vertical-lr;
        transform: rotate(-180deg);
        font-size: $mobile-text;
        color: $color-highlight;
        border: none;
        box-shadow: none;
        text-decoration: underline;
        &__img {
          display: none;
        }
      }
    }
  }
}
</style>
