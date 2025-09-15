<template>
  <div class="container">
    <h2>Welcome</h2>
    <p style="text-align:center">Hello!.</p>
    <div style="display:flex; gap:10px; justify-content:center; margin-top:10px;">
      <router-link to="/studentForm" class="btn">Student Form</router-link>
      <router-link to="/adminForm" class="btn">Admin Form</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// no script needed for static home
</script>

<style scoped>
body, :root { font-family: 'Georgia', serif; }
.container {
  background-color: rgba(255, 248, 220, 0.95);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  width: 350px;
  border: 4px solid #8B5A2B;
  margin: 40px auto;
  text-align: center;
}
.btn {
  display:inline-block;
  padding:10px 14px;
  background:#8B5A2B;
  color:white;
  border-radius:6px;
  text-decoration:none;
  font-weight:bold;
}
.btn:hover { background:#A0522D; }
</style>
