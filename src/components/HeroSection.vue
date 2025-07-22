<template>
  <div ref="hero" class="hero-wrapper">
    <!-- Hero Title -->
    <div ref="titleEl" class="hero-title">
      <span class="prefix">w<span class="dot"></span><span class="dot"></span>:</span>
      <span class="main-text">Find what's <span class="highlighted">next</span></span>
    </div>

    <!-- Animated Floating Tags for Fullscreen -->
    <div v-if="isFullscreen" ref="tagContainer" class="tag-container">
      <div
        v-for="(tag, index) in tags"
        :key="index"
        class="tag"
        :class="{ hovered: hoveredTagIndexes.includes(index) }"
        :style="tag.style"
        :data-index="index"
        @mouseenter="handleMouseEnter(index)"
        @mouseleave="handleMouseLeave(index)"
      >
        {{ tag.text }}
      </div>
    </div>

    <!-- Static Tags for Small Screens -->
    <div v-else class="static-tag-section">
      <div class="static-tags">
        <div
          v-for="(tag, index) in tags.slice(0, 10)"
          :key="index"
          class="static-tag"
        >
          {{ tag.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, onUnmounted } from 'vue'
import gsap from 'gsap'

const hero = ref(null)
const tagContainer = ref(null)
const isFullscreen = ref(window.innerWidth >= 1280)
const isHovering = ref(false)
let tweens = []

// Track when the pointer is inside the hero
const onMouseEnter = () => { isHovering.value = true }
const onMouseLeave = () => { isHovering.value = false }

const updateScreenSize = () => {
  const prev = isFullscreen.value
  isFullscreen.value = window.innerWidth >= 1280
  if (!prev && isFullscreen.value) {
    nextTick(runEntranceAnimation)
  }
}

onMounted(() => {
  window.addEventListener('resize', updateScreenSize)
  hero.value.addEventListener('mouseenter', onMouseEnter)
  hero.value.addEventListener('mouseleave', onMouseLeave)
  // Always listen for mousemove; moveTags itself will do nothing if not hovering
  hero.value.addEventListener('mousemove', moveTags)

  if (isFullscreen.value) {
    runEntranceAnimation()
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenSize)
  hero.value?.removeEventListener('mouseenter', onMouseEnter)
  hero.value?.removeEventListener('mouseleave', onMouseLeave)
  hero.value?.removeEventListener('mousemove', moveTags)
})

function runEntranceAnimation() {
  const tagEls = tagContainer.value.querySelectorAll('.tag')
  tweens = []

  tagEls.forEach(el => {
    const fromX = (Math.random() - 0.5) * window.innerWidth * 2
    const fromY = (Math.random() - 0.5) * window.innerHeight * 2
    el.dataset.factor = (0.5 + Math.random() * 0.8).toFixed(2)

    gsap.fromTo(el,
      { x: fromX, y: fromY, opacity: 0 },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
        delay: Math.random() * 0.3,
        onComplete() {
          el._baseY = 0
          gsap.to(el, {
            y: '+=18',
            duration: 1 + Math.random() * 0.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: Math.random() * 0.7,
            onUpdate() {
              el._baseY = gsap.getProperty(el, 'y')
            }
          })

          tweens.push({
            el,
            tweenX: gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power2.out' }),
            tweenY: gsap.quickTo(el, 'y', { duration: 0.65, ease: 'power2.out' }),
            tweenO: gsap.quickTo(el, 'opacity', { duration: 0.4, ease: 'sine.out' })
          })
        }
      }
    )
  })
}

function moveTags(e) {
  // If pointer is outside hero, do nothing (tags stay where they are)
  if (!isHovering.value) return

  const rect = hero.value.getBoundingClientRect()
  const relX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
  const relY = ((e.clientY - rect.top) / rect.height - 0.5) * 2

  tweens.forEach(({ el, tweenX, tweenY, tweenO }) => {
    const factor = parseFloat(el.dataset.factor)
    const maxOff = 240
    const offX = -relX * maxOff * factor
    const offY = -relY * maxOff * factor
    const baseY = el._baseY || 0

    tweenX(offX)
    tweenY(baseY + offY)

    // Fade out near edges
    const newX = el.getBoundingClientRect().left + offX
    const newY = el.getBoundingClientRect().top + offY
    const m = 60
    const fX = Math.min(1, Math.max(0, (rect.right - newX) / m, (newX - rect.left) / m))
    const fY = Math.min(1, Math.max(0, (rect.bottom - newY) / m, (newY - rect.top) / m))
    tweenO(Math.min(fX, fY))
  })
}

const tags = [
  { text: 'Vue JS Developers', style: { top: '44%', left: '7%' } },
  { text: 'Cyber Security', style: { top: '36%', left: '22%' } },
  { text: 'iOS Developers', style: { top: '65%', left: '12%' } },
  { text: 'Robotics', style: { top: '72%', left: '20%' } },
  { text: 'Boston', style: { top: '80%', left: '29%' } },
  { text: 'Blockchain Developers', style: { top: '74%', left: '38%' } },
  { text: 'San Francisco', style: { top: '72%', left: '60%' } },
  { text: 'React Developers', style: { top: '58%', left: '68%' } },
  { text: 'Artificial Intelligence', style: { top: '64%', left: '72%' } },
  { text: 'Los Angeles', style: { top: '52%', left: '85%' } },
  { text: 'SaaS', style: { top: '26%', left: '78%' } },
  { text: 'New York', style: { top: '18%', left: '72%' } },
  { text: 'Databases', style: { top: '18%', left: '60%' } },
  { text: 'Mental Health', style: { top: '20%', left: '42%' } },
  { text: 'Seattle', style: { top: '70%', left: '85%' } },
  { text: 'Hardware', style: { top: '82%', left: '92%' } },
  { text: 'Cloud Computing', style: { top: '22%', left: '10%' } },
  { text: 'Edge AI', style: { top: '30%', left: '88%' } },
  { text: 'UX Designers', style: { top: '48%', left: '18%' } },
  { text: 'Data Scientists', style: { top: '54%', left: '50%' } },
  { text: 'DevOps Engineers', style: { top: '40%', left: '40%' } },
  { text: 'Toronto', style: { top: '66%', left: '74%' } },
  { text: 'London', style: { top: '58%', left: '8%' } },
  { text: 'Kubernetes', style: { top: '76%', left: '48%' } },
  { text: 'UI Engineers', style: { top: '32%', left: '60%' } },
  { text: 'Berlin', style: { top: '46%', left: '92%' } }
]

const hoveredTagIndexes = ref([])

function handleMouseEnter(index) {
  tags[index].__hoverTimer = setTimeout(() => {
    if (!hoveredTagIndexes.value.includes(index)) {
      hoveredTagIndexes.value.push(index)
    }
  }, 200)
}

function handleMouseLeave(index) {
  clearTimeout(tags[index].__hoverTimer)
  hoveredTagIndexes.value = hoveredTagIndexes.value.filter(i => i !== index)
}
</script>

<style scoped>
.hero-wrapper {
  width: 100%;
  min-height: 80vh;
  position: relative;
  background-color: #f9f9f9;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 120px;
}

.hero-title {
  font-size: 56px;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
  margin-bottom: 30px;
  z-index: 3;
  position: relative;
}

.prefix {
  font-weight: 700;
  color: #000;
  position: relative;
}

.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  background: red;
  border-radius: 50%;
  margin-left: 2px;
}

.main-text {
  color: #111;
}

.highlighted {
  border: 2px dashed red;
  border-radius: 12px;
  padding: 2px 8px;
  margin-left: 6px;
}

.tag-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

.tag {
  position: absolute;
  padding: 12px 18px;
  background-color: #fff;
  border: 1px solid #dcdcdc;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.85);
  opacity: 0;
  transition: background 0.2s ease, color 0.2s ease;
  pointer-events: auto;
}

.tag.hovered {
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
  color: white;
}

.static-tag-section {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 20px;
  z-index: 2;
}

.static-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  max-width: 90%;
  margin: 0 auto;
}

.static-tag {
  padding: 10px 16px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #111;
  white-space: nowrap;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.04);
}
</style>
