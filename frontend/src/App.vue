<template>
  <div id="app">
    <header class="nav">
      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/studentForm">Student Form</router-link>
        <router-link to="/adminForm">Admin Form</router-link>
      </nav>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
// top-level app; nothing else needed here
</script>

<style scoped>
.nav {
  background: linear-gradient(45deg, #8B5A2B, #CD853F);
  padding: 12px;
}
nav {
  display:flex;
  gap:12px;
  justify-content:center;
}
nav a {
  color: white;
  text-decoration: none;
  font-weight: 700;
  padding: 6px 10px;
  border-radius:6px;
}
nav a.router-link-exact-active {
  background: rgba(255,255,255,0.12);
}
main { padding: 20px; }
</style>
