<template>
  <form class="form" @submit.prevent="submit">
    <h2>Student Form</h2>

    <label for="studentId">Student ID</label>
    <input id="studentId" v-model="studentId" type="text" />

    <label for="firstName">First Name</label>
    <input id="firstName" v-model="firstName" type="text" />

    <label for="lastName">Last Name</label>
    <input id="lastName" v-model="lastName" type="text" />

    <label for="section">Section</label>
    <input id="section" v-model="section" type="text" />

    <input type="submit" :value="loading ? 'Submitting...' : 'Submit'" />

    <p v-if="result" class="result">{{ result }}</p>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const studentId = ref('');
const firstName = ref('');
const lastName = ref('');
const section = ref('');
const result = ref('');
const loading = ref(false);

async function submit() {
  loading.value = true;
  result.value = '';
  try {
    const params = new URLSearchParams({
      studentId: studentId.value,
      firstName: firstName.value,
      lastName: lastName.value,
      section: section.value
    });
    const res = await fetch(`/getStudent?${params.toString()}`, { method: 'GET' });
    const text = await res.text();
    result.value = text;
  } catch (err) {
    result.value = 'Error: ' + (err as Error).message;
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.form {
  font-family: 'Georgia', serif;
  background-color: rgba(255, 248, 220, 0.95);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  width: 320px;
  border: 4px solid #8B5A2B;
  margin: 40px auto;
}
label { display:block; margin-bottom:5px; font-weight:bold; color:#5C4033; }
input[type="text"] { width:100%; padding:8px; margin-bottom:15px; border:1px solid #A0522D; border-radius:4px; background:#FFF8DC; }
input[type="submit"] { width:100%; padding:10px; background:#8B5A2B; border:none; color:white; font-weight:bold; border-radius:4px; cursor:pointer; }
input[type="submit"]:hover { background:#A0522D; }
.result { margin-top:12px; background:#fff; padding:8px; border-radius:6px; border:1px solid #ddd; }
</style>
