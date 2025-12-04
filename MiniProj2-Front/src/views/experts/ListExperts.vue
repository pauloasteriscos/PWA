<!-- Ficheiro adicionado para Tarefa 3.2 e 3.3. -->
<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Especialistas" />

      <!-- MENU TOPO -->
      <b-row class="mb-4">
        <b-col cols="2"></b-col>
        <b-col>
          <router-link
            :to="{ name: 'addExpert' }"
            tag="button"
            class="btn btn-outline-success mr-2 mt-2"
          >
            <i class="fas fa-plus-square"></i> ADICIONAR ESPECIALISTA
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
                <th scope="col">ESPECIALIDADE</th>
                <th scope="col">INSTITUIÇÃO</th>
                <th scope="col">EMAIL</th>
                <th scope="col">TELEFONE</th>
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="expert in experts" :key="expert._id">
                <td class="pt-4">{{ expert.name }}</td>
                <td class="pt-4">{{ expert.specialty || "-" }}</td>
                <td class="pt-4">{{ expert.institution || "-" }}</td>
                <td class="pt-4">{{ expert.email }}</td>
                <td class="pt-4">{{ expert.phone }}</td>
                <td>
                  <router-link
                    :to="{
                      name: 'editExpert',
                      params: { expertId: expert._id }
                    }"
                    tag="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-edit"></i> EDITAR
                  </router-link>

                  <button
                    @click="removeExpert(expert._id)"
                    type="button"
                    class="btn btn-outline-danger mr-2 mt-2"
                  >
                    <i class="fas fa-trash-alt"></i> REMOVER
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <p v-if="experts.length === 0" class="text-muted mt-3">
            Nenhum especialista encontrado.
          </p>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import HeaderPage from "@/components/HeaderPage.vue";
import { FETCH_EXPERTS, REMOVE_EXPERT } from "@/store/experts/expert.constants";
import { mapGetters } from "vuex";

export default {
  name: "ListExperts",
  components: { HeaderPage },

  data() {
    return { experts: [] };
  },

  computed: {
    ...mapGetters("expert", ["getExperts", "getMessage"])
  },

  methods: {
    async fetchExperts() {
      try {
        await this.$store.dispatch(`expert/${FETCH_EXPERTS}`);
        this.experts = this.getExperts;
      } catch (error) {
        this.$alert("Erro ao carregar especialistas.", "Erro", "error");
      }
    },

    async removeExpert(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover o especialista?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(async () => {
        try {
          await this.$store.dispatch(`expert/${REMOVE_EXPERT}`, id);

          this.$alert(
            this.getMessage || "Especialista removido com sucesso!",
            "Sucesso",
            "success"
          );

          this.fetchExperts();
        } catch (error) {
          this.$alert("Erro ao remover especialista.", "Erro", "error");
        }
      });
    }
  },

  created() {
    this.fetchExperts();
  }
};
</script>
