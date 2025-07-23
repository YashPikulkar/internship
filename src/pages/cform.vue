<template>
  <q-form @submit.prevent="handleSubmit" class="q-gutter-md">

    <!-- COMPANY INFO -->
    <q-markup-table flat bordered class="rounded-borders">
      <thead>
        <tr>
          <th colspan="2" class="text-left text-primary text-h6">Company Information</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Company Name</td><td><q-input filled v-model.trim="company.name" :rules="[isRequired, maxLength(100)]" /></td></tr>
        <tr><td>Company Type</td><td><q-select filled v-model="company.type" :options="companyTypes" :rules="[isRequired]" /></td></tr>
        <tr><td>Industry</td><td><q-select filled v-model="company.industry" :options="industryOptions" :rules="[isRequired]" /></td></tr>
        <tr><td>Company Size</td><td><q-select filled v-model="company.size" :options="companySizes" :rules="[isRequired]" /></td></tr>
        <tr><td>Founded Year</td><td><q-select filled v-model="company.year" :options="foundedYears" :rules="[isRequired]" /></td></tr>
        <tr><td>Website</td><td><q-input filled v-model.trim="company.website" type="url" :rules="[isRequired]" placeholder="Optional (but preferred)" /></td></tr>
      </tbody>
    </q-markup-table>

    <!-- ACCOUNT INFO -->
    <q-markup-table flat bordered class="rounded-borders">
      <thead><tr><th colspan="2" class="text-left text-primary text-h6">Account Information</th></tr></thead>
      <tbody>
        <tr><td>Username</td><td><q-input filled v-model.trim="modelValue.username" :rules="[isRequired, minLength(4), maxLength(20)]" /></td></tr>
        <tr>
          <td>Password</td>
          <td>
            <q-input
              filled
              :type="showPassword ? 'text' : 'password'"
              v-model.trim="modelValue.password"
              :rules="[isRequired, isStrongPassword]"
              label="Password"
            >
              <template #append>
                <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="showPassword = !showPassword" />
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
              :rules="[isRequired, isPasswordMatch]"
              label="Confirm Password"
            >
              <template #append>
                <q-icon :name="showRetypePassword ? 'visibility_off' : 'visibility'" class="cursor-pointer" @click="showRetypePassword = !showRetypePassword" />
              </template>
            </q-input>
          </td>
        </tr>
      </tbody>
    </q-markup-table>

    <!-- CONTACT INFO -->
    <q-markup-table flat bordered class="rounded-borders">
      <thead>
        <tr>
          <th colspan="2" class="text-left text-primary text-h6">Contact Information</th>
        </tr>
      </thead>
      <tbody>
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
        <q-input filled v-model.trim="modelValue.phone" :rules="[isRequired, isPhoneValid]" />
      </td>
    </tr>
      </tbody>
    </q-markup-table>

    <!-- ADDRESS INFO -->
    <q-markup-table flat bordered class="rounded-borders">
      <thead>
        <tr>
          <th colspan="2" class="text-left text-primary text-h6">Head Office Address</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Address Line 1</td><td><q-input filled v-model.trim="company.addressLine1" :rules="[isRequired,maxLength(30)]" /></td></tr>
        <tr><td>Address Line 2</td><td><q-input filled v-model.trim="company.addressLine2":rules="[maxLength(30)]" /></td></tr>

  <tr>
  <td>Country</td>
  <td>
    <q-select
      filled
      v-model="company.country"
      :options="countryOptions"
      label="Select Country"
      emit-value
      map-options
      :rules="[isRequired]"
      @update:model-value="fetchStates"
    />
  </td>
</tr>

<tr>
  <td>State</td>
  <td>
    <q-select
      filled
      v-model="company.state"
      :options="stateOptions"
      label="Select State"
      emit-value
      map-options
      :rules="[isRequired]"
      :disable="!company.country"
      @update:model-value="fetchCities"
    />
  </td>
</tr>

<tr>
  <td>City</td>
  <td>
    <q-select
      filled
      v-model="company.city"
      :options="cityOptions"
      label="Select City"
      emit-value
      map-options
      :rules="[isRequired]"
      :disable="!company.state"
    />
  </td>
</tr>
<tr>
  <td>Pincode</td>
  <td>
  <q-input
  filled
  v-model.trim="company.pincode"
  label="Pincode / ZIP"
  :rules="[isRequired, isPincodeValid]"
  :disable="!company.country || !company.state || !company.city"
/>

  </td>
</tr>
      </tbody>
    </q-markup-table>

    <!-- AUTHORIZED PERSON -->
    <q-markup-table flat bordered class="rounded-borders">
      <thead>
        <tr>
          <th colspan="2" class="text-left text-primary text-h6">HR / Authorized Contact</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Full Name</td><td><q-input filled v-model.trim="company.contactName" :rules="[isRequired, isAlphaOnly]" /></td></tr>
        <tr><td>Designation</td><td><q-input filled v-model.trim="company.designation" :rules="[isRequired]" /></td></tr>
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
        <q-input filled v-model.trim="modelValue.phone" :rules="[isRequired, isPhoneValid]" />
      </td>
    </tr>
      </tbody>
    </q-markup-table>

    <!-- DOCUMENTS -->
    <q-markup-table flat bordered class="rounded-borders">
      <thead>
        <tr>
          <th colspan="2" class="text-left text-primary text-h6">Documents</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Registration Certificate</td><td><q-file v-model="company.regCert" label="Choose file" filled use-chips /></td></tr>
        <tr><td>GST / Tax ID</td><td><q-input filled v-model.trim="company.gst" :rules="[isRequired]" /></td></tr>
        <tr><td>Company Logo</td><td><q-file v-model="company.logo" label="Upload logo" filled use-chips /></td></tr>
      </tbody>
    </q-markup-table>

    <!-- FORM ACTIONS -->
    <q-card-actions
  align="center"
  class="q-gutter-sm q-mt-xl bg-grey-2 q-pa-sm rounded-borders"
>
  <q-btn
    unelevated
    color="blue-grey"
    label="Cancel"
    icon="close"
    class="q-px-md"
    @click="$emit('cancel')"
  />
  <q-btn
    unelevated
    color="primary"
    label="Submit"
    icon="check_circle"
    class="q-px-md"
    type="submit"
    :disable="!isFormValid"
  />
</q-card-actions>



  </q-form>
</template>

<script setup>
import { ref, computed,onMounted } from 'vue'
import axios from 'axios'
// Options
const currentYear = new Date().getFullYear()
const foundedYears = Array.from({ length: 75 }, (_, i) => currentYear - i)
const companyTypes = ['Private Limited', 'Public Limited', 'LLP', 'Sole Proprietorship', 'Startup', 'NGO']
const industryOptions = ['Information Technology', 'Healthcare', 'Education', 'Finance', 'Manufacturing', 'Retail']
const companySizes = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+']

// States
const showPassword = ref(false)
const showRetypePassword = ref(false)

const modelValue = ref({
  username: '',
  password: '',
  retypePassword: ''
})

const company = ref({
  name: '',
  type: '',
  industry: '',
  size: '',
  year: '',
  website: '',
  email: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  country: '',
  pincode: '',
  contactName: '',
  designation: '',
  contactEmail: '',
  contactPhone: '',
  regCert: null,
  gst: '',
  logo: null
})

// Validation
const isRequired = val => !!val || 'Required'
const isAlphaOnly = val => !val || /^[a-zA-Z\s]*$/.test(val) || 'Only letters allowed'
const minLength = n => val => !val || val.length >= n || `Min ${n} characters`
const maxLength = n => val => !val || val.length <= n || `Max ${n} characters`
const isPhoneValid = val => !val || /^\d{10}$/.test(val) || 'Enter 10-digit number'
const isStrongPassword = val =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&]).{8,}$/.test(val) ||
  'Weak password: use upper, lower, number, special char'
/*const isPincodeValid = val => !val || /^[0-9]{4,10}$/.test(val) || 'Invalid pincode'*/
const isPincodeValid = val =>
  !val || /^[A-Za-z0-9\s\-]{3,10}$/.test(val) || 'Invalid pincode format'

const isPasswordMatch = val =>
  val === modelValue.value.password || 'Passwords do not match'

const isFormValid = computed(() => {
  // Simplified placeholder; you should integrate actual validation library or $refs check
  return true
})
const countryOptions = ref([])
const stateOptions = ref([])
const cityOptions = ref([])

// Fetch countries on mount
onMounted(async () => {
  try {
    const response = await axios.get('https://countriesnow.space/api/v0.1/countries/positions')
    if (response.data && response.data.data) {
      countryOptions.value = response.data.data.map(c => ({
        label: c.name,
        value: c.name
      }))
    }
  } catch (error) {
    console.error('Error loading countries:', error)
  }
})

// Fetch states when a country is selected
const fetchStates = async (selectedCountry) => {
  company.value.state = ''
  company.value.city = ''
  stateOptions.value = []
  cityOptions.value = []

  try {
    const response = await axios.post('https://countriesnow.space/api/v0.1/countries/states', {
      country: selectedCountry
    })

    if (response.data?.data?.states) {
      stateOptions.value = response.data.data.states.map(s => ({
        label: s.name,
        value: s.name
      }))
    }
  } catch (error) {
    console.error('Error loading states:', error)
  }
}

// Fetch cities when a state is selected
const fetchCities = async (selectedState) => {
  company.value.city = ''
  cityOptions.value = []

  try {
    const response = await axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
      country: company.value.country,
      state: selectedState
    })

    if (response.data?.data) {
      cityOptions.value = response.data.data.map(city => ({
        label: city,
        value: city
      }))
    }
  } catch (error) {
    console.error('Error loading cities:', error)
  }
}
/*const tryAutoFillFromPincode = async () => {
  const isoCode = isoCountryMap[company.value.country]
  if (!isoCode) return

  try {
    const res = await axios.get(`https://api.zippopotam.us/${isoCode.toLowerCase()}/${company.value.pincode}`)
    const place = res.data.places?.[0]
    if (place) {
      company.value.state = place['state']
      company.value.city = place['place name']
    }
  } catch (err) {
    console.warn('No match for pincode — user can fill manually.')
  }
}*/

const handleSubmit = () => {
  console.log('Company Submitted:', company.value)
  console.log('Credentials:', modelValue.value)
}
</script>

<style scoped>
.rounded-borders {
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}
@media (max-width: 600px) {
  .q-markup-table td {
    display: block;
    width: 100%;
  }
}
.q-markup-table td {
  display: table-cell;
  width: auto;
}
</style>
