<template>
  <div class="topbar">
    <div class="topbar-inner">
      <div class="brand">
        <router-link to="/teachers" class="brand-link">
          Projeto Final PWA - {{ studentName }}
        </router-link>
      </div>

      <nav class="nav">
        <router-link to="/teachers">Docentes</router-link>

        <router-link v-if="authed" to="/my-proposals">Minhas Propostas</router-link>

        <router-link v-if="!authed" to="/login">Login</router-link>

        <span v-if="authed" class="who">
          {{ teacherName }}
        </span>

        <button v-if="authed" class="btn btn-small" @click="logout">
          Logout
        </button>
      </nav>
    </div>
  </div>

  <div class="container">
    <div class="card">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const studentName = "Paulo Silva";

/**
 * Trigger reativo: mudamos este contador sempre que
 * houver login/logout, para forçar recomputação.
 */
const authTick = ref(0);

function bumpAuthTick() {
  authTick.value++;
}

const authed = computed(() => {
  authTick.value; // dependência reativa
  return !!localStorage.getItem("token");
});

const teacherName = computed(() => {
  authTick.value; // dependência reativa
  try {
    const t = JSON.parse(localStorage.getItem("teacher") || "null");
    return t?.name ? `Sessão: ${t.name}` : "Sessão ativa";
  } catch {
    return "Sessão ativa";
  }
});

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("teacher");
  bumpAuthTick();
  router.push("/teachers");
}

function onStorageChange() {
  bumpAuthTick();
}

onMounted(() => {
  window.addEventListener("storage", onStorageChange);
  window.addEventListener("auth-changed", onStorageChange);
});

onBeforeUnmount(() => {
  window.removeEventListener("storage", onStorageChange);
  window.removeEventListener("auth-changed", onStorageChange);
});
</script>

<style scoped>
.brand-link {
  color: inherit;
  text-decoration: none;
  font-weight: 800;
}

.nav {
  display: flex;
  gap: 10px;
  align-items: center;
}

.who {
  opacity: 0.8;
  font-size: 14px;
  padding-left: 8px;
  border-left: 1px solid rgba(0,0,0,0.15);
  margin-left: 4px;
}
</style>
