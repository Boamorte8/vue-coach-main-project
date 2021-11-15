<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstName.isValid }">
      <label for="firstname">Firstname</label>
      <input type="text" id="firstname" v-model.trim="firstName.value" @keyup="clearValidity('firstName')"/>
      <span class="error" v-if="!firstName.isValid">{{ firstName.errorMessage }}</span>
    </div>
    <div class="form-control" :class="{ invalid: !lastName.isValid }">
      <label for="lastname">Lastname</label>
      <input type="text" id="lastname" v-model.trim="lastName.value" @keyup="clearValidity('lastName')"/>
      <span class="error" v-if="!lastName.isValid">{{ lastName.errorMessage }}</span>
    </div>
    <div class="form-control" :class="{ invalid: !description.isValid }">
      <label for="description">Description</label>
      <textarea type="text"
                id="description"
                rows="5"
                v-model.trim="description.value"
                @blur="clearValidity('description')"></textarea>
      <span class="error" v-if="!description.isValid">{{ description.errorMessage }}</span>
    </div>
    <div class="form-control" :class="{ invalid: !rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input type="text" id="rate" v-model.number="rate.value" @blur="clearValidity('rate')"/>
      <span class="error" v-if="!rate.isValid">{{ rate.errorMessage }}</span>
    </div>
    <div class="form-control" :class="{ invalid: !areas.isValid }">
      <h3>Areas of Expertise</h3>
      <div>
        <input type="checkbox"
               name="frontend"
               id="frontend"
               value="frontend"
               v-model="areas.value"
               @change="clearValidity('areas')"/>
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input type="checkbox"
               name="backend"
               id="backend"
               value="backend"
               v-model="areas.value"
               @change="clearValidity('areas')"/>
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input type="checkbox"
               name="career"
               id="career"
               value="career"
               v-model="areas.value"
               @change="clearValidity('areas')"/>
        <label for="career">Career Advisory</label>
      </div>
      <span class="error" v-if="!areas.isValid">{{ areas.errorMessage }}</span>
    </div>
    <p class="error" v-if="!formIsValid">Please fix the above errors and submit again.</p>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  emits: ['save-coach'],
  data() {
    return {
      firstName: {
        value: '',
        isValid: true,
        errorMessage: '',
      },
      lastName: {
        value: '',
        isValid: true,
        errorMessage: '',
      },
      description: {
        value: '',
        isValid: true,
        errorMessage: '',
      },
      rate: {
        value: null,
        isValid: true,
        errorMessage: '',
      },
      areas: {
        value: [],
        isValid: true,
        errorMessage: '',
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.firstName.value === '') {
        this.firstName.isValid = false;
        this.firstName.errorMessage = 'Firstname is required';
        this.formIsValid = false;
      }
      if (this.lastName.value === '') {
        this.lastName.isValid = false;
        this.lastName.errorMessage = 'Laststname is required';
        this.formIsValid = false;
      }
      if (this.description.value === '') {
        this.description.isValid = false;
        this.description.errorMessage = 'Description is required';
        this.formIsValid = false;
      }
      if (!this.rate.value || this.rate.value < 0) {
        this.rate.isValid = false;
        this.rate.errorMessage = 'Rate is required';
        this.formIsValid = false;
      }
      if (this.areas.value.length === 0) {
        this.areas.isValid = false;
        this.areas.errorMessage = 'At least one area of expertise is required';
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }

      const coach = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        description: this.description.value,
        rate: this.rate.value,
        areas: this.areas.value,
      };

      this.$emit('save-coach', coach);
    },
  }
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}

.error {
  color: red;
  font-size: 0.7rem;
}
</style>