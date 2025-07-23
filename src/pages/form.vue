<template>
  <q-form @submit.prevent="handleSubmit" class="q-gutter-md">
    <!-- PERSONAL INFO -->
    <q-markup-table flat bordered class="rounded-borders">
      <thead><tr><th colspan="2" class="text-left text-primary text-h6">Personal Information</th></tr></thead>
      <tbody>
        <tr><td>First Name</td><td><q-input filled v-model.trim="modelValue.firstName" :rules="[isRequired, isAlphaOnly, maxLength(15)]" /></td></tr>
        <tr><td>Middle Name</td><td><q-input filled v-model.trim="modelValue.middleName" :rules="[isAlphaOnly, maxLength(15)]" /></td></tr>
        <tr><td>Last Name</td><td><q-input filled v-model.trim="modelValue.lastName" :rules="[isRequired, isAlphaOnly, maxLength(15)]" /></td></tr>
        <tr><td>Age</td><td><q-select filled v-model="modelValue.age" :options="ageOptions" emit-value map-options :rules="[isRequired]" /></td></tr>
        <tr>
      <td>Gender</td>
      <td>
        <q-select
          filled
          v-model="modelValue.gender"
          :options="genderOptions"
          emit-value
          map-options
          label="Select gender"
          :rules="[isRequired]"
        />
      </td>
    </tr>
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
      :rules="[isRequired, isPasswordMatch]"
      label="Confirm Password"
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
<!-- SKILLS & CERTIFICATIONS -->
<q-markup-table flat bordered class="rounded-borders">
  <thead>
    <tr>
      <th colspan="2" class="text-left text-primary text-h6">Skills & Certifications</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Skill Sets</td>
      <td>
        <q-select
          filled
          v-model="modelValue.skills"
          :options="skillOptions"
          multiple
          use-chips
          label="Select or type skills"
          new-value-mode
          :rules="[isRequired]"
        />
      </td>
    </tr>

  <tr>
  <td>Do you have any certifications?</td>
  <td>
    <q-option-group
      v-model="hasCertifications"
      :options="[
              { label: 'Yes', value: true },
              { label: 'No', value: false }
            ]"
            type="radio"
            inline
            :rules="[isRequired]"
    />
  </td>
</tr>

<tr v-if="hasCertifications">
  <td>Certifications</td>
  <td>
    <div
      v-for="(cert, index) in modelValue.certifications"
      :key="index"
      class="q-gutter-sm q-mb-md"
    >
      <q-input
        filled
        v-model="cert.name"
        label="Certification Name"
      />
      <q-file
        filled
        v-model="cert.file"
        label="Upload Certificate"
        use-chips
        accept=".pdf,.jpg,.jpeg,.png"
      />
      <q-btn
        flat
        round
        color="negative"
        icon="delete"
        size="sm"
        @click="removeCertification(index)"
        v-if="modelValue.certifications.length > 1"
      />
      <q-separator spaced />
    </div>
    <q-btn
      flat
      color="primary"
      icon="add"
      label="Add Certification"
      @click="addCertification"
    />
  </td>
</tr>


  </tbody>
</q-markup-table>

    <!-- EXPERIENCE -->
    <q-markup-table flat bordered class="rounded-borders">
      <thead><tr><th colspan="2" class="text-left text-primary text-h6">Experience</th></tr></thead>
      <tbody>
        <tr>
          <td>Experience Level</td>
          <td>
            <q-select filled v-model="modelValue.experienceLevel" :options="experienceOptions" emit-value map-options :rules="[isRequired]" />
          </td>
        </tr>

        <!-- Internship Experience for Fresher -->
  <template v-if="modelValue.experienceLevel === 'fresher'">
  <!-- Ask if internship was done -->
  <q-markup-table flat bordered class="rounded-borders q-mt-md">
    <thead>
      <tr>
        <th colspan="2">Internship Experience</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Have you done any internship?</td>
        <td>
          <q-option-group
            v-model="modelValue.hasInternship"
            :options="[
              { label: 'Yes', value: true },
              { label: 'No', value: false }
            ]"
            type="radio"
            inline
            :rules="[isRequired]"
          />
        </td>
      </tr>
    </tbody>
  </q-markup-table>

  <!-- Internship section shown only if 'Yes' is selected -->
  <template v-if="modelValue.hasInternship">
    <div v-for="(intern, i) in modelValue.internshipExperience" :key="i">
      <q-markup-table flat bordered class="rounded-borders q-mt-sm">
        <thead><tr><th colspan="2">Internship {{ i + 1 }}</th></tr></thead>
        <tbody>
          <tr>
            <td>Company</td>
            <td><q-input filled v-model.trim="intern.company" :rules="[isRequired]" /></td>
          </tr>
          <tr>
            <td>Role</td>
            <td><q-input filled v-model.trim="intern.role" :rules="[isRequired]" /></td>
          </tr>
          <tr>
            <td>Duration</td>
            <td><q-input filled v-model.trim="intern.duration" :rules="[isRequired]" /></td>
          </tr>
          <tr>
           <td>Position</td>
             <td>
              <q-input
                filled
                v-model.trim="intern.position"
                :rules="[isRequired]"
                 />
              </td>
          </tr>
        </tbody>
      </q-markup-table>
    </div>

    <!-- Add / Remove Internship Buttons -->
    <q-btn flat icon="add" color="primary" label="Add Internship" @click="addInternship" />
    <q-btn
      flat
      icon="remove"
      color="negative"
      label="Remove"
      @click="removeInternship"
      :disable="modelValue.internshipExperience.length <1"
    />
  </template>
</template>


        <!-- Professional Experience -->
        <template v-if="isExperienced">
          <div v-for="(exp, index) in modelValue.experiences" :key="index">
            <q-markup-table flat bordered class="rounded-borders q-mt-sm">
              <thead><tr><th colspan="2">Experience {{ index + 1 }}</th></tr></thead>
              <tbody>
                <tr><td>Company</td><td><q-input filled v-model.trim="exp.company" :rules="[isRequired]" /></td></tr>
                <tr><td>Designation</td><td><q-input filled v-model.trim="exp.designation" @blur="() => updateSkillSuggestions(index)" :rules="[isRequired]" /></td></tr>
                <tr><td>Job Role</td><td><q-input filled v-model.trim="exp.jobRole" :rules="[isRequired]" /></td></tr>
                <tr><td>Key Skills</td><td><q-select filled v-model="exp.skills" multiple :options="suggestedSkillsMap[index]" use-chips :rules="[isRequired]" /></td></tr>
              </tbody>
            </q-markup-table>
          </div>
          <q-btn flat icon="add" color="primary" label="Add Experience" @click="addExperience" />
          <q-btn flat icon="remove" color="negative" label="Remove Last" @click="removeExperience" :disable="modelValue.experiences.length <= 1" />
        </template>
      </tbody>
    </q-markup-table>

    <!-- EDUCATION -->
    <div v-for="(edu, index) in modelValue.education" :key="index" class="q-my-md">
      <q-markup-table flat bordered class="rounded-borders">
        <thead><tr><th colspan="2" class="text-left text-primary text-h6">Education - {{ index + 1 }}</th></tr></thead>
        <tbody>
          <tr><td>Course Type</td><td><q-select filled v-model="edu.courseType" :options="courseTypes" :rules="[isRequired]" /></td></tr>
          <tr><td>College Name</td><td><q-input filled v-model.trim="edu.college" :rules="[isRequired, checkDuplicateCollege(index)]" /></td></tr>
          <tr><td>Graduation Year</td><td><q-select filled v-model="edu.year" :options="graduationYears" :rules="[isRequired, checkDuplicateYear(index)]" /></td></tr>
        </tbody>
      </q-markup-table>
    </div>
    <div class="q-pa-sm">
      <q-btn icon="add" flat color="primary" label="Add Education" @click="addEducation" />
      <q-btn icon="remove" flat color="negative" label="Remove Last" @click="removeEducation" :disable="modelValue.education.length <= 1" />
    </div>

    <!-- RESUME -->
    <q-markup-table flat bordered class="rounded-borders">
  <thead>
    <tr>
      <th colspan="2" class="text-left text-primary text-h6">Resume</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Upload Resume</td>
      <td>
        <q-file
          filled
          v-model="modelValue.resume"
          label="Choose PDF/DOC file"
          use-chips
          :rules="[isRequired, isResumeFile]"
          accept=".pdf,.doc,.docx"
        />
      </td>
    </tr>
  </tbody>
</q-markup-table>

<!-- CONTACT INFO -->
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
    <tr>
      <td>LinkedIn</td>
      <td>
        <q-input filled v-model.trim="modelValue.linkedin" :rules="[isRequired]" />
      </td>
    </tr>
    <tr>
      <td>GitHub</td>
      <td>
        <q-input filled v-model.trim="modelValue.github" :rules="[isRequired]" />
      </td>
    </tr>
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
import { ref, computed } from 'vue'
const isPasswordMatch = val =>
  val === modelValue.value.password || 'Passwords do not match'
const hasCertifications = ref(false)
const currentYear = new Date().getFullYear()
const graduationYears = Array.from({ length: 15 }, (_, i) => currentYear - i)
const ageOptions = Array.from({ length: 43 }, (_, i) => 18 + i)
const courseTypes = ['Diploma', 'Undergraduate', 'Postgraduate', 'PhD']
const experienceOptions = [
  { label: 'Fresher', value: 'fresher' },
  { label: '0-1 years', value: '0-1' },
  { label: '1-3 years', value: '1-3' },
  { label: '3-5 years', value: '3-5' },
  { label: '5+ years', value: '5+' }
]
const genderOptions = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  { label: 'Other', value: 'Other' },
  { label: 'Prefer not to say', value: 'Prefer not to say' }
]
const skillSuggestions = ref({})
const showPassword = ref(false)
const showRetypePassword = ref(false)
const allowedDomains = ['gmail.com', 'yahoo.com', 'outlook.com', 'company.com']

const isValidEmailFormat = val =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Invalid email format'

const isAllowedEmailDomain = val => {
  const domain = val.split('@')[1]
  return domain && allowedDomains.includes(domain)
    ? true
    : `Allowed domains: ${allowedDomains.join(', ')}`
}

const isResumeFile = file =>
  !file || (file && /\.(pdf|doc|docx)$/i.test(file.name)) || 'Only PDF, DOC, or DOCX files allowed'

const skillOptions = [
  'JavaScript', 'Python', 'Excel', 'Public Speaking',
  'Graphic Design', 'Project Management', 'SQL', 'Figma'
  // Optional: fetch dynamically based on industry
]


const modelValue = ref({
  firstName: '',
  middleName: '',
  lastName: '',
  age: '',
  gender: '',
  emailUser: '',
  emailDomain: '',
  phone: '',
  skills: [],
  certifications: [
    { name: '', file: null }
  ],
  linkedin: '',
  github: '',
  username: '',
  password: '',
  retypePassword: '',
  experienceLevel: '',
  resume: '',
  education: [{ courseType: '', college: '', year: '', certificate: null }],
  internshipExperience: [
    { company: '', role: '', duration: '', skills: [] }
  ],
  hasInternship: null,
  experiences: [
    { company: '', designation: '', jobRole: '', skills: [] }
  ]
})
//certifications
const addCertification = () => {
  modelValue.value.certifications.push({ name: '', file: null })
}

const removeCertification = (index) => {
  modelValue.value.certifications.splice(index, 1)
}


// Skill suggestions per experience index
const suggestedSkills = ref([[]])

const updateSkillSuggestions = (index) => {
  const role = modelValue.value.experiences[index]?.designation
  suggestedSkills.value[index] = skillMap[role] || []
}

const isExperienced = computed(() => {
  const level = modelValue.value.experienceLevel
  return level && level !== 'fresher'
})

// Internship handlers
const addInternship = () => {
  modelValue.value.internshipExperience.push({ company: '', role: '', duration: '', skills: [] })
}
const removeInternship = () => {
  if (modelValue.value.internshipExperience.length > 1) {
    modelValue.value.internshipExperience.pop()
  }
}

// Experience handlers
const addExperience = () => {
  modelValue.value.experiences.push({ company: '', designation: '', jobRole: '', skills: [] })
  suggestedSkills.value.push([])
}
const removeExperience = () => {
  if (modelValue.value.experiences.length > 1) {
    modelValue.value.experiences.pop()
    suggestedSkills.value.pop()
  }
}

// Education handlers
const addEducation = () => {
  modelValue.value.education.push({ courseType: '', college: '', year: '', certificate: null })
}
const removeEducation = () => {
  if (modelValue.value.education.length > 1) modelValue.value.education.pop()
}

// Validators
const checkDuplicateYear = (index) => val => {
  const years = modelValue.value.education.map(e => e.year)
  return years.indexOf(val) === index ? true : 'Duplicate year detected'
}
const checkDuplicateCollege = (index) => val => {
  const colleges = modelValue.value.education.map(e => e.college.toLowerCase().trim())
  return colleges.indexOf(val.toLowerCase().trim()) === index ? true : 'Duplicate college name'
}

const isRequired = val => !!val || 'Required'
const isAlphaOnly = val => !val || /^[a-zA-Z\s]*$/.test(val) || 'Only letters allowed'
const isPhoneValid = val => !val || /^\d{10}$/.test(val) || 'Enter 10-digit number'
const minLength = n => val => !val || val.length >= n || `Min ${n} characters`
const maxLength = n => val => !val || val.length <= n || `Max ${n} characters`
const isStrongPassword = val =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&]).{8,}$/.test(val) ||
  'Weak password: use upper, lower, number, special char'

// Form submission
const isFormValid = computed(() => true) // Replace with actual validations if needed
const handleSubmit = () => {
  const fullEmail = modelValue.value.email
  const [emailUser, emailDomain] = fullEmail.split('@')

  console.log('Form submitted:', {
    ...modelValue.value,
    emailUser,
    emailDomain
  })
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
