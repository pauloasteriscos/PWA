<template>
  <div>
    <h3 class="h3">Login Docente</h3>

    <form class="form" @submit.prevent="login">
      <div>
        <div class="label">Email</div>
        <input class="input" v-model="email" type="email" autocomplete="username" required />
      </div>

      <div>
        <div class="label">Password</div>
        <input
          ref="passwordInput"
          class="input"
          v-model="password"
          type="password"
          autocomplete="current-password"
          required
        />
      </div>

      <div class="row" style="justify-content:space-between;">
        <button class="btn btn-primary" type="submit" :disabled="loading">
          {{ loading ? "A entrar..." : "Entrar" }}
        </button>

        <router-link class="btn" to="/teachers">
          Voltar
        </router-link>
      </div>

      <p v-if="error" class="msg-error" style="margin:0;">{{ error }}</p>
      <p v-if="info" class="msg-ok" style="margin:0;">{{ info }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue"; // nextTick
import { useRouter, useRoute } from "vue-router";
import api from "../services/api";

const router = useRouter();
const route = useRoute();

const email = ref("");
const password = ref("");

const passwordInput = ref(null);

const error = ref("");
const info = ref("");
const loading = ref(false);

onMounted(async () => {
  const qEmail = route.query.email;
  if (typeof qEmail === "string" && qEmail.trim()) {
    email.value = qEmail.trim().toLowerCase();


    await nextTick();
    passwordInput.value?.focus();
  }
});

async function login() {
  error.value = "";
  info.value = "";

  const emailClean = email.value.trim().toLowerCase();
  const passwordClean = password.value.trim();

  if (!emailClean || !passwordClean) {
    error.value = "Email e password são obrigatórios.";
    return;
  }

  loading.value = true;
  try {
    const res = await api.post("/auth/login", {
      email: emailClean,
      password: passwordClean
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("teacher", JSON.stringify(res.data.teacher));
	window.dispatchEvent(new Event("auth-changed"));
	
	const next = typeof route.query.next === "string" ? route.query.next : "/my-proposals";
    router.push(next);

  } catch (e) {
    error.value = e?.response?.data?.error || "Erro no login";
  } finally {
    loading.value = false;
  }
}
</script>
