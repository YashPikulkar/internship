<template>
  <q-page>
    <HeroSection />
    <Footer />
  </q-page>
</template>

<script>
import HeroSection from 'src/components/HeroSection.vue'
import Footer from 'src/components/Footer.vue'

export default {
  name: 'HomePage',
  components: {
    HeroSection,
    Footer
  }
}
</script>
