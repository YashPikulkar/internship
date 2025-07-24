<template>
    <q-page class="q-pa-none row full-height">
      <!-- LEFT: Step Form -->
      <div class="col-12 col-md-7 flex flex-center bg-white q-pa-md">
        <component
          :is="steps[currentStep].component"
          v-model="formData"
          @next="nextStep"
          @prev="prevStep"
          @submit="handleSubmit"
        />
      </div>
  
      <!-- RIGHT: Step Tracker -->
      <div class="col-12 col-md-5 bg-grey-1 flex flex-center">
        <div class="q-pa-lg text-center" style="width: 100%;">
          <div class="text-h5 text-primary">Registration Progress</div>
          <q-timeline layout="dense" color="primary" class="q-mt-lg">
            <q-timeline-entry
              v-for="(step, index) in steps"
              :key="index"
              :title="step.title"
              :subtitle="step.subtitle"
              :icon="index < currentStep ? 'check' : step.icon"
              :color="index < currentStep ? 'green' : (index === currentStep ? 'primary' : 'grey')"
            />
          </q-timeline>
        </div>
      </div>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  // Import step components
import StepOne from 'src/components/Register/StepOne.vue'
import StepTwo from 'src/components/Register/StepTwo.vue'
import StepThree from 'src/components/Register/StepThree.vue'
import StepFour from 'src/components/Register/StepFour.vue'
  
  const router = useRouter()
  
  const currentStep = ref(0)
  
  const steps = [
    {
      title: 'Step 1',
      subtitle: 'Personal Info',
      icon: 'person',
      component: StepOne
    },
    {
      title: 'Step 2',
      subtitle: 'Verification',
      icon: 'verified_user',
      component: StepTwo
    },
    {
      title: 'Step 3',
      subtitle: 'Job Selection',
      icon: 'work',
      component: StepThree
    },
    {
      title: 'Step 4',
      subtitle: 'Confirm Details',
      icon: 'check_circle',
      component: StepFour
    }
  ]
  
  const formData = ref({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    retypePassword: '',
    otp: '',
    role: ''
  })
  
  function nextStep() {
    if (currentStep.value < steps.length - 1) {
      currentStep.value++
    }
  }
  
  function prevStep() {
    if (currentStep.value > 0) {
      currentStep.value--
    }
  }
  
  function handleSubmit() {
    console.log('✅ Final Submitted Data:', formData.value)
    router.push({ name: 'dashboard' }) // Replace with real dashboard path
  }
  </script>