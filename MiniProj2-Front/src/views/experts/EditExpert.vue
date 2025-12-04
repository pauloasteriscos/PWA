<!-- Ficheiro atualizado para Tarefa 3.2 e 3.3 -->
<template>
  <div class="container">
    <h1 class="mb-4">Editar Especialista</h1>

    <div v-if="loaded">
      <b-form @submit.prevent="update">

        <!-- NOME -->
        <b-form-group label="Nome" label-for="name">
          <b-form-input id="name" v-model="form.name" required />
        </b-form-group>

        <!-- ESPECIALIDADE -->
        <b-form-group label="Especialidade" label-for="specialty">
          <b-form-input id="specialty" v-model="form.specialty" />
        </b-form-group>

        <!-- INSTITUIÇÃO -->
        <b-form-group label="Instituição" label-for="institution">
          <b-form-input id="institution" v-model="form.institution" />
        </b-form-group>

        <!-- EMAIL -->
        <b-form-group label="Email" label-for="email">
          <b-form-input id="email" v-model="form.email" type="email" required />
        </b-form-group>

        <!-- TELEFONE -->
        <b-form-group label="Telefone" label-for="phone">
          <b-form-input id="phone" v-model="form.phone" />
        </b-form-group>

        <!-- WEBSITE -->
        <b-form-group label="Website" label-for="website">
          <b-form-input id="website" v-model="form.website" />
        </b-form-group>

        <!-- ANIMAIS ASSOCIADOS -->
        <b-form-group label="Animais Associados" label-for="animals">
          <b-form-textarea
            id="animals"
            v-model="form.animals"
            placeholder="Ex: Lobo Ibérico, Águia Real"
            rows="2"
          />
        </b-form-group>

        <!-- BIO -->
        <b-form-group label="Biografia" label-for="bio">
          <b-form-textarea
            id="bio"
            v-model="form.bio"
            rows="4"
            placeholder="Escreve a biografia do especialista"
          />
        </b-form-group>

        <div class="mt-4">
          <b-button type="submit" variant="primary">Guardar</b-button>
          <router-link :to="{ name:'listExperts' }" class="btn btn-secondary ml-2">
            Cancelar
          </router-link>
        </div>

      </b-form>
    </div>

    <div v-else class="text-muted">
      A carregar dados do especialista...
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EditExpert",

  data() {
    return {
      form: {
        _id: "",
        name: "",
        specialty: "",
        institution: "",
        email: "",
        phone: "",
        website: "",
        animals: "",
        bio: "",
        active: true
      },
      loaded: false
    };
  },

  computed: {
    ...mapGetters("expert", ["getExpertsById"])
  },

  methods: {
    ...mapActions("expert", ["fetchExperts", "editExpert"]),

    async load() {
      const id = this.$route.params.expertId;
      let expert = this.getExpertsById(id);

      try {
        if (!expert) {
          await this.fetchExperts();
          expert = this.getExpertsById(id);
        }

        if (!expert) {
          this.$bvToast.toast("Especialista não encontrado.", {
            variant: "danger",
            solid: true
          });
          this.$router.push("/admin/experts");
          return;
        }

        // Preencher formulário com fallback caso venha null
        this.form = {
          _id: expert._id,
          name: expert.name || "",
          specialty: expert.specialty || "",
          institution: expert.institution || "",
          email: expert.email || "",
          phone: expert.phone || "",
          website: expert.website || "",
          animals: expert.animals || "",
          bio: expert.bio || "",
          active: expert.active
        };

        this.loaded = true;
      } catch (err) {
        this.$bvToast.toast("Erro ao carregar especialista.", {
          variant: "danger",
          solid: true
        });
        this.$router.push("/admin/experts");
      }
    },

    async update() {
      try {
        await this.editExpert(this.form);
        this.$bvToast.toast("Especialista atualizado com sucesso!", {
          variant: "success",
          solid: true
        });
        this.$router.push("/admin/experts");
      } catch (err) {
        this.$bvToast.toast("Erro ao atualizar especialista.", {
          variant: "danger",
          solid: true
        });
      }
    }
  },

  created() {
    this.load();
  }
};
</script>