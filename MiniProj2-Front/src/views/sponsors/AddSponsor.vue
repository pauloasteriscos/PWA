<!-- Ficheiro adicionado para Tarefa 3.2 e 3.3. -->
<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Patrocinador" />

      <b-row>
        <b-col cols="2"></b-col>
        <b-col>
          <form @submit.prevent="add">
            <!-- NOME -->
            <div class="form-group">
              <input
                v-model="name"
                type="text"
                class="form-control form-control-lg"
                placeholder="Nome do patrocinador"
                required
              />
            </div>

            <!-- TIPO DE ORGANIZAÇÃO -->
            <div class="form-group">
              <input
                v-model="orgType"
                type="text"
                class="form-control form-control-lg"
                placeholder="Tipo de organização (empresa, ONG, indivíduo...)"
              />
            </div>

            <!-- EMAIL -->
            <div class="form-group">
              <input
                v-model="email"
                type="email"
                class="form-control form-control-lg"
                placeholder="Email"
                required
              />
            </div>

            <!-- TELEFONE -->
            <div class="form-group">
              <input
                v-model="phone"
                type="text"
                class="form-control form-control-lg"
                placeholder="Telefone"
              />
            </div>

            <!-- WEBSITE -->
            <div class="form-group">
              <input
                v-model="website"
                type="text"
                class="form-control form-control-lg"
                placeholder="Website"
              />
            </div>

            <!-- ANIMAIS ASSOCIADOS -->
            <div class="form-group">
              <input
                v-model="animals"
                type="text"
                class="form-control form-control-lg"
                placeholder="Animais patrocinados (separados por vírgula)"
              />
            </div>

            <!-- NOTAS -->
            <div class="form-group">
              <textarea
                v-model="notes"
                rows="4"
                class="form-control form-control-lg"
                placeholder="Notas adicionais"
              ></textarea>
            </div>

            <!-- BOTÕES -->
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-plus-square"></i> ADICIONAR
            </button>

            <router-link
              :to="{ name: 'listSponsors' }"
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
import { ADD_SPONSOR } from "@/store/sponsors/sponsor.constants";

export default {
  name: "AddSponsor",
  components: {
    HeaderPage
  },
  data: () => ({
    name: "",
    orgType: "",
    email: "",
    phone: "",
    website: "",
    animals: "",
    notes: ""
  }),
  computed: {
    ...mapGetters("sponsor", ["getMessage"])
  },
  methods: {
    add() {
      this.$store.dispatch(`sponsor/${ADD_SPONSOR}`, this.$data).then(
        () => {
          this.$alert(this.getMessage, "Patrocinador adicionado!", "success");
          router.push({ name: "listSponsors" });
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  }
};
</script>
