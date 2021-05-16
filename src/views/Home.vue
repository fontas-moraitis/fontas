<template>
  <div>
    <Header />
    <Gallery />
    <Playground />
    <Footer />
  </div>
</template>

<script>
// Components
import Header from '@/components/Header'
import Gallery from '@/components/Gallery'
import Footer from '@/components/Footer'
import Playground from '@/components/Playground'

export default {
	name: 'home',
	components: { Header, Gallery, Playground, Footer }
}
</script>
