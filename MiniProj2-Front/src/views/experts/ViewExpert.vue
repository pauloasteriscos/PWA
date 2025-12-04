<!-- Ficheiro adicionado para Tarefa 3.2 e 3.3. -->
<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Detalhes do Especialista" />

      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <div v-if="expert">
            <b-card>
              <h3 class="mb-3">{{ expert.name }}</h3>

              <p>
                <strong>Especialidade:</strong> {{ expert.specialty || "-" }}
              </p>
              <p>
                <strong>Instituição:</strong> {{ expert.institution || "-" }}
              </p>

              <p><strong>Email:</strong> {{ expert.email }}</p>
              <p><strong>Telefone:</strong> {{ expert.phone || "-" }}</p>

              <p>
                <strong>Website:</strong>
                <a v-if="expert.website" :href="expert.website" target="_blank">
                  {{ expert.website }}
                </a>
                <span v-else>-</span>
              </p>

              <p>
                <strong>Animais associados:</strong> {{ expert.animals || "-" }}
              </p>

              <p><strong>Biografia:</strong></p>
              <p>{{ expert.bio || "-" }}</p>

              <p><strong>Ativo:</strong> {{ expert.active ? "Sim" : "Não" }}</p>

              <p class="text-muted mt-3">
                <small>Criado em: {{ formatDate(expert.createdAt) }}</small
                ><br />
                <small>Atualizado em: {{ formatDate(expert.updatedAt) }}</small>
              </p>

              <b-button
                variant="info"
                class="mt-3"
                @click="$router.push({ name: 'listExperts' })"
              >
                Voltar
              </b-button>
            </b-card>
          </div>

          <div v-else class="text-muted">A carregar especialista...</div>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ViewExpert",

  components: { HeaderPage },

  data() {
    return {
      expert: null
    };
  },

  computed: {
    ...mapGetters("expert", ["getExpertsById"])
  },

  methods: {
    ...mapActions("expert", ["fetchExperts"]),

    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleString("pt-PT");
    },

    async load() {
      const id = this.$route.params.expertId;
      let result = this.getExpertsById(id);

      try {
        // Se não estiver no estado, carregar todos
        if (!result) {
          await this.fetchExperts();
          result = this.getExpertsById(id);
        }

        if (!result) {
          this.$bvToast.toast("Especialista não encontrado.", {
            variant: "danger",
            solid: true
          });
          this.$router.push({ name: "listExperts" });
          return;
        }

        this.expert = result;
      } catch (err) {
        console.error(err);
        this.$bvToast.toast("Erro ao carregar especialista.", {
          variant: "danger",
          solid: true
        });
        this.$router.push({ name: "listExperts" });
      }
    }
  },

  created() {
    this.load();
  }
};
</script>

<style scoped>
p {
  font-size: 1.1rem;
}
</style>
