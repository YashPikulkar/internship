<template>
    <q-form @submit.prevent="handleNext" @validation-error="onInvalid" ref="formRef" class="q-gutter-md" style="width: 100%;">
      <div class="text-subtitle1 text-primary">Step 1: Personal Information</div>
  
      <q-markup-table flat bordered class="rounded-borders q-mt-md">
        <tbody>
          <tr>
            <td>Full Name</td>
            <td>
              <q-input
                filled
                v-model.trim="modelValue.firstName"
                :rules="[isRequired, isAlphaOnly, maxLength(15)]"
                label="Full Name"
              />
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              <q-input
                filled
                v-model.trim="modelValue.email"
                label="Email Address"
                :rules="[isRequired, isValidEmailFormat, isAllowedEmailDomain]"
              />
            </td>
          </tr>
          <tr>
            <td>Phone Number</td>
            <td>
              <q-input
                filled
                v-model.trim="modelValue.phone"
                label="Phone"
                :rules="[isRequired, isPhoneValid]"
              />
            </td>
          </tr>
          <tr>
            <td>Password</td>
            <td>
              <q-input
                filled
                :type="showPassword ? 'text' : 'password'"
                v-model.trim="modelValue.password"
                label="Password"
                :rules="[isRequired, isStrongPassword]"
              >
                <template #append>
                  <q-icon
                    :name="showPassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showPassword = !showPassword"
                  />
                </template>
              </q-input>
            </td>
          </tr>
          <tr>
            <td>Re-type Password</td>
            <td>
              <q-input
                filled
                :type="showRetypePassword ? 'text' : 'password'"
                v-model.trim="modelValue.retypePassword"
                label="Confirm Password"
                :rules="[isRequired, isPasswordMatch]"
              >
                <template #append>
                  <q-icon
                    :name="showRetypePassword ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="showRetypePassword = !showRetypePassword"
                  />
                </template>
              </q-input>
            </td>
          </tr>
        </tbody>
      </q-markup-table>
  
      <!-- Navigation Buttons -->
      <div class="row justify-end q-mt-md">
        <q-btn color="primary" label="Next" type="submit" />
      </div>
    </q-form>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const emit = defineEmits(['next'])
  const modelValue = defineModel()
  
  const showPassword = ref(false)
  const showRetypePassword = ref(false)
  
  const formRef = ref(null)
  
  function handleNext() {
    emit('next')
  }
  
  function onInvalid() {
    // Optional: Show a message or shake animation
    console.warn('Form has validation errors')
  }
  
  // Validation rules
  const isRequired = val => !!val || 'This field is required'
  const isAlphaOnly = val => /^[a-zA-Z\s]+$/.test(val) || 'Only letters allowed'
  const maxLength = max => val => !val || val.length <= max || `Max ${max} characters`
  const isPhoneValid = val => /^\+?\d{10,15}$/.test(val) || 'Invalid phone number'
  const isStrongPassword = val =>
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/.test(val) ||
    'Password must include uppercase, lowercase, number, and special character'
  const isPasswordMatch = val =>
    val === modelValue.value.password || 'Passwords do not match'
  const isValidEmailFormat = val =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Enter a valid email'
  const isAllowedEmailDomain = val =>
    val.endsWith('@example.com') || 'Only @example.com domain is allowed'
  </script>