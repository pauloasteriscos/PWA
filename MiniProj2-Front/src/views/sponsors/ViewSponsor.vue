<!-- Ficheiro adicionado para Tarefa 3.2 e 3.3. -->
<template>
  <div class="container">
    <h1 class="mb-4">Detalhes do Patrocinador</h1>

    <div v-if="sponsor">
      <p><strong>Nome:</strong> {{ sponsor.name }}</p>
      <p><strong>Email:</strong> {{ sponsor.email }}</p>
      <p><strong>Telefone:</strong> {{ sponsor.phone }}</p>

      <p v-if="sponsor.orgType">
        <strong>Tipo de organização:</strong> {{ sponsor.orgType }}
      </p>
      <p v-if="sponsor.website">
        <strong>Website:</strong>
        <a :href="sponsor.website" target="_blank">{{ sponsor.website }}</a>
      </p>
      <p v-if="sponsor.animals">
        <strong>Animais associados:</strong> {{ sponsor.animals }}
      </p>
      <p v-if="sponsor.notes"><strong>Notas:</strong> {{ sponsor.notes }}</p>

      <p>
        <strong>Ativo:</strong>
        <span :class="sponsor.active ? 'text-success' : 'text-danger'">
          {{ sponsor.active ? "Sim" : "Não" }}
        </span>
      </p>
    </div>

    <div v-else class="text-muted">
      Carregando dados do patrocinador...
    </div>

    <hr />

    <router-link to="/admin/sponsors" class="btn btn-secondary">
      Voltar
    </router-link>

    <router-link
      :to="{ name: 'editSponsor', params: { sponsorId } }"
      class="btn btn-primary ml-2"
    >
      Editar
    </router-link>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ViewSponsor",

  data() {
    return {
      sponsorId: this.$route.params.sponsorId
    };
  },

  computed: {
    ...mapGetters("sponsor", ["getSponsorsById"]),
    sponsor() {
      return this.getSponsorsById(this.sponsorId);
    }
  },

  methods: {
    ...mapActions("sponsor", ["fetchSponsors"])
  },

  created() {
    if (!this.sponsor) {
      this.fetchSponsors().catch(err => {
        console.error(err);
        this.$bvToast.toast("Erro ao carregar patrocinador.", {
          variant: "danger",
          solid: true
        });
      });
    }
  }
};
</script>
