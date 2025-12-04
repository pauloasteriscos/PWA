<!-- Ficheiro adicionado para Tarefa 3.2 e 3.3. -->
<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Especialista" />

      <!-- FORM -->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <form @submit.prevent="add">
            <!-- Nome -->
            <div class="form-group">
              <input
                v-model="form.name"
                type="text"
                class="form-control form-control-lg"
                placeholder="Nome do especialista"
                required
              />
            </div>

            <!-- Especialidade -->
            <div class="form-group">
              <input
                v-model="form.specialty"
                type="text"
                class="form-control form-control-lg"
                placeholder="Especialidade (ex: Cozinheiro)"
              />
            </div>

            <!-- Instituição -->
            <div class="form-group">
              <input
                v-model="form.institution"
                type="text"
                class="form-control form-control-lg"
                placeholder="Instituição (ex: Universidade Aberta)"
              />
            </div>

            <!-- Email -->
            <div class="form-group">
              <input
                v-model="form.email"
                type="email"
                class="form-control form-control-lg"
                placeholder="E-mail"
                required
              />
            </div>

            <!-- Telefone -->
            <div class="form-group">
              <input
                v-model="form.phone"
                type="text"
                class="form-control form-control-lg"
                placeholder="Telefone"
              />
            </div>

            <!-- Website -->
            <div class="form-group">
              <input
                v-model="form.website"
                type="url"
                class="form-control form-control-lg"
                placeholder="Website (opcional)"
              />
            </div>

            <!-- Animais associados -->
            <div class="form-group">
              <input
                v-model="form.animals"
                type="text"
                class="form-control form-control-lg"
                placeholder="Animais associados (ex: repteis, aves)"
              />
            </div>

            <!-- Biografia -->
            <div class="form-group">
              <textarea
                v-model="form.bio"
                class="form-control form-control-lg"
                rows="4"
                placeholder="Biografia / notas importantes"
              ></textarea>
            </div>

            <!-- Botões -->
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-plus-square"></i> ADICIONAR
            </button>

            <router-link
              :to="{ name: 'listExperts' }"
              tag="button"
              class="btn btn-outline-danger btn-lg"
            >
              <i class="fas fa-window-close"></i> CANCELAR
            </router-link>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import router from "@/router";
import { mapGetters } from "vuex";
import { ADD_EXPERT } from "@/store/experts/expert.constants";

export default {
  name: "AddExpert",
  components: {
    HeaderPage
  },
  data() {
    return {
      form: {
        name: "",
        specialty: "",
        institution: "",
        email: "",
        phone: "",
        website: "",
        animals: "",
        bio: ""
      }
    };
  },
  computed: {
    ...mapGetters("expert", ["getMessage"])
  },
  methods: {
    add() {
      this.$store.dispatch(`expert/${ADD_EXPERT}`, this.form).then(
        () => {
          this.$alert(this.getMessage, "Especialista adicionado!", "success");
          router.push({ name: "listExperts" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  }
};
</script>
