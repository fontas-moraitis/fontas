<template>
  <div class="home">
    <Header />
    <Gallery />
    <Animations />
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Gallery from '@/components/Gallery'
import Animations from '@/components/Animations'
import Footer from '@/components/Footer'

export default {
  name: 'home',
  components: {
    Header,
    Gallery,
    Animations,
    Footer
  }
}
</script>
