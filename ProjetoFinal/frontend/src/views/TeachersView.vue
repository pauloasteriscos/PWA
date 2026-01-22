<template>
  <div>
    <h3 class="h3">Docentes</h3>

    <p class="muted" style="margin-top:-6px;">
      Lista pública de docentes registados.
    </p>

    <p v-if="loading" class="muted">A carregar...</p>
    <p v-if="error" class="msg-error">{{ error }}</p>

    <div v-if="!loading && !error" class="teachers-grid">
      <div v-for="t in teachers" :key="t.id" class="teacher-card">
        <div class="teacher-name">{{ t.name }}</div>
        <div class="teacher-email">{{ t.email }}</div>

        <div class="row" style="margin-top:10px;">
          <router-link class="btn" :to="`/login?email=${encodeURIComponent(t.email)}`">  Login </router-link>
        </div>
      </div>

      <div v-if="teachers.length === 0" class="muted">
        Não existem docentes registados.
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import api from "../services/api";

const teachers = ref([]);
const loading = ref(false);
const error = ref("");

async function load() {
  loading.value = true;
  error.value = "";
  try {
    const res = await api.get("/teachers");
    teachers.value = res.data;
  } catch (e) {
    error.value = e?.response?.data?.error || "Erro ao carregar docentes";
  } finally {
    loading.value = false;
  }
}

onMounted(load);
</script>

<style scoped>
.teachers-grid{
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
  margin-top: 12px;
}

.teacher-card{
  border: 1px solid var(--border);
  border-radius: 10px;
  background: #fff;
  padding: 14px;
}

.teacher-name{
  font-weight: 800;
}

.teacher-email{
  color: var(--muted);
  margin-top: 2px;
  font-size: 14px;
}
</style>
