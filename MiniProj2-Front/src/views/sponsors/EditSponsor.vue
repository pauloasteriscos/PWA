<!-- Ficheiro adicionado para Tarefa 3.2 e 3.3. -->
<template>
  <div class="container">
    <h1 class="mb-4">Editar Patrocinador</h1>

    <div v-if="loaded">
      <b-form @submit.prevent="update">
        <b-form-group label="Nome" label-for="name">
          <b-form-input id="name" v-model="form.name" required />
        </b-form-group>

        <b-form-group label="Email" label-for="email">
          <b-form-input id="email" v-model="form.email" type="email" required />
        </b-form-group>

        <b-form-group label="Telefone" label-for="phone">
          <b-form-input id="phone" v-model="form.phone" />
        </b-form-group>

        <div class="mt-4">
          <b-button type="submit" variant="primary">Guardar</b-button>
          <router-link to="/admin/sponsors" class="btn btn-secondary ml-2">
            Cancelar
          </router-link>
        </div>
      </b-form>
    </div>

    <div v-else class="text-muted">
      A carregar dados do patrocinador...
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "EditSponsor",

  data() {
    return {
      form: {
        _id: "",
        name: "",
        email: "",
        phone: ""
      },
      loaded: false
    };
  },

  computed: {
    ...mapGetters("sponsor", ["getSponsorsById"])
  },

  methods: {
    ...mapActions("sponsor", ["fetchSponsors", "editSponsor"]),

    async load() {
      const id = this.$route.params.sponsorId;

      let sponsor = this.getSponsorsById(id);

      try {
        if (!sponsor) {
          await this.fetchSponsors();
          sponsor = this.getSponsorsById(id);
        }

        if (!sponsor) {
          this.$bvToast.toast("Patrocinador não encontrado.", {
            variant: "danger",
            solid: true
          });
          this.$router.push("/admin/sponsors");
          return;
        }

        this.form = {
          _id: sponsor._id,
          name: sponsor.name || "",
          email: sponsor.email || "",
          phone: sponsor.phone || ""
        };

        this.loaded = true;
      } catch (err) {
        this.$bvToast.toast("Erro ao carregar patrocinador.", {
          variant: "danger",
          solid: true
        });
        this.$router.push("/admin/sponsors");
      }
    },

    async update() {
      try {
        await this.editSponsor(this.form);

        this.$bvToast.toast("Patrocinador atualizado com sucesso!", {
          variant: "success",
          solid: true
        });

        this.$router.push("/admin/sponsors");
      } catch (err) {
        this.$bvToast.toast("Erro ao atualizar patrocinador.", {
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