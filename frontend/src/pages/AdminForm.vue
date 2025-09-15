<template>
  <div class="container">
    <h2>Admin Form</h2>
    <form @submit.prevent="submit">
      <label for="adminId">Admin ID</label>
      <input id="adminId" v-model="adminId" type="text" />

      <label for="firstName">First Name</label>
      <input id="firstName" v-model="firstName" type="text" />

      <label for="lastName">Last Name</label>
      <input id="lastName" v-model="lastName" type="text" />

      <label for="department">Department</label>
      <input id="department" v-model="department" type="text" />

      <label for="file">Upload File</label>
      <input id="file" type="file" @change="onFileChange" />

      <input type="submit" :value="loading ? 'Submitting...' : 'Submit'" />
    </form>

    <p v-if="result" class="result">{{ result }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const adminId = ref('');
const firstName = ref('');
const lastName = ref('');
const department = ref('');
const file = ref<File | null>(null);
const loading = ref(false);
const result = ref('');

function onFileChange(e: Event) {
  const target = e.target as HTMLInputElement;
  if (target.files && target.files.length) {
    file.value = target.files[0];
  } else {
    file.value = null;
  }
}

async function submit() {
  loading.value = true;
  result.value = '';
  try {
    const formData = new FormData();
    formData.append('adminId', adminId.value);
    formData.append('firstName', firstName.value);
    formData.append('lastName', lastName.value);
    formData.append('department', department.value);
    if (file.value) formData.append('file', file.value);

    const res = await fetch('/postAdmin', {
      method: 'POST',
      body: formData
    });

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
.container {
  font-family: 'Georgia', serif;
  background-color: rgba(255, 248, 220, 0.95);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  width: 350px;
  border: 4px solid #8B5A2B;
  margin: 40px auto;
}
h2 { text-align:center; color:#5C4033; margin-bottom:20px; }
label { display:block; margin-bottom:5px; font-weight:bold; color:#5C4033; }
input[type="text"], input[type="file"] { width:100%; padding:8px; margin-bottom:15px; border:1px solid #A0522D; border-radius:4px; background:#FFF8DC; }
input[type="submit"] { width:100%; padding:10px; background:#8B5A2B; border:none; color:white; font-weight:bold; border-radius:4px; cursor:pointer; }
input[type="submit"]:hover { background:#A0522D; }
.result { margin-top:12px; background:#fff; padding:8px; border-radius:6px; border:1px solid #ddd; }
</style>
