<template>
  <div class="animations wrapper">
    <section class="animations__intro">
      I also enjoy creating animations
      <div class="nav_guide">these is some of my work</div>
      <div class="nav_guide--mobile">these is some of my work</div>
    </section>
  </div>
</template>

<script>
export default {
	name: 'Animations'
}
</script>

<style lang="scss" scoped>
  .animations {
    margin-top: $size-medium;
    min-height: 400px;
    &__intro {
      margin: $size-small $size-medium;
      font-size: $standar-text;
      font-weight: $xbold-text;
      text-transform: uppercase;
      text-align: end;
      .nav_guide {
        text-transform: lowercase;
        font-weight: $thin-text;
        font-size: $size-small;
        margin-top: 6px;
      }
      .nav_guide--mobile {
        display: none;
      }
    }
  }
</style>
