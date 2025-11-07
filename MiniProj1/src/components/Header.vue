<template>
  <header>
    <div class="container header-flex">
      <!-- Foto de perfil -->
      <img
        src="https://media.licdn.com/dms/image/v2/C4D03AQH4_LWv69L37A/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1579025845716?e=2147483647&v=beta&t=ViRYoqAYzPgLWi3STcRzvRb1wwe4X0c5r1O1B1MLSow"
        alt="Foto de Paulo Sousa Silva"
        class="profile-pic"
      />

      <!-- Título e navegação -->
      <div class="header-content">
        <h1>Currículo de Eng. Paulo Sousa Silva</h1>
        <nav>
          <RouterLink to="/">Quem Sou Eu</RouterLink>
          <RouterLink to="/oque-faco">O que faço</RouterLink>
          <RouterLink to="/hobbies">Hobbies</RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.header-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}

.profile-pic {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #0ea5e9; /* azul suave */
  margin-right: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.header-content {
  flex: 1;
  min-width: 220px;
}

@media (max-width: 600px) {
  .header-flex {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .profile-pic {
    margin: 0 0 0.8rem 0;
  }
}
</style>
