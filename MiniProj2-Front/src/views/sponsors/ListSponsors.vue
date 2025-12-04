<!-- Ficheiro adicionado para Tarefa 3.2 e 3.3. -->
<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Patrocinadores" />

      <!-- MENU SUPERIOR -->
      <b-row class="mb-4">
        <b-col cols="2"></b-col>

        <b-col>
          <router-link
            :to="{ name: 'addSponsor' }"
            tag="button"
            class="btn btn-outline-success mr-2 mt-2"
          >
            <i class="fas fa-plus-square"></i> ADICIONAR PATROCINADOR
          </router-link>

          <router-link
            :to="{ name: 'admin' }"
            tag="button"
            class="btn btn-outline-info mr-2 mt-2"
          >
            <i class="fas fa-bars"></i> MENU PRINCIPAL
          </router-link>
        </b-col>

        <b-col cols="2"></b-col>
      </b-row>

      <!-- TABELA -->
      <b-row>
        <b-col cols="2"></b-col>

        <b-col>
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">NOME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">TELEFONE</th>
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="sponsor in sponsors" :key="sponsor._id">
                <td class="pt-4">{{ sponsor.name }}</td>
                <td class="pt-4">{{ sponsor.email }}</td>
                <td class="pt-4">{{ sponsor.phone }}</td>

                <td>
                  <router-link
                    :to="{
                      name: 'editSponsor',
                      params: { sponsorId: sponsor._id }
                    }"
                    tag="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-edit"></i> EDITAR
                  </router-link>

                  <button
                    @click="remove(sponsor._id)"
                    class="btn btn-outline-danger mr-2 mt-2"
                  >
                    <i class="fas fa-trash-alt"></i> REMOVER
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <p v-if="sponsors.length === 0" class="text-muted mt-3">
            Nenhum patrocinador encontrado.
          </p>
        </b-col>

        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import {
  FETCH_SPONSORS,
  REMOVE_SPONSOR
} from "@/store/sponsors/sponsor.constants";
import { mapGetters } from "vuex";

export default {
  name: "ListSponsors",

  components: { HeaderPage },

  computed: {
    ...mapGetters("sponsor", ["getSponsors", "getMessage"]),
    sponsors() {
      return this.getSponsors;
    }
  },

  methods: {
    fetchSponsors() {
      this.$store.dispatch(`sponsor/${FETCH_SPONSORS}`).catch(err => {
        this.$alert(err.message, "Erro", "error");
      });
    },

    remove(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover o patrocinador?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(() => {
        this.$store
          .dispatch(`sponsor/${REMOVE_SPONSOR}`, id)
          .then(() => {
            this.$alert(this.getMessage, "Sucesso", "success");
            this.fetchSponsors();
          })
          .catch(err => {
            this.$alert(err.message, "Erro", "error");
          });
      });
    }
  },

  created() {
    this.fetchSponsors();
  }
};
</script>
