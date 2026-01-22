import { createRouter, createWebHistory } from "vue-router";

import TeachersView from "../views/TeachersView.vue";
import LoginView from "../views/LoginView.vue";
import MyProposalsView from "../views/MyProposalsView.vue";
import ProposalFormView from "../views/ProposalFormView.vue";

const routes = [
  { path: "/", redirect: "/teachers" },

  // públicas
  { path: "/teachers", name: "teachers", component: TeachersView, meta: { public: true } },
  { path: "/login", name: "login", component: LoginView, meta: { public: true } },

  // protegidas
  { path: "/my-proposals", name: "myProposals", component: MyProposalsView },
  { path: "/proposal/new", name: "proposalNew", component: ProposalFormView },
  { path: "/proposal/:id/edit", name: "proposalEdit", component: ProposalFormView, props: true },

  // fallback
  { path: "/:pathMatch(.*)*", redirect: "/teachers" }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

function isAuthed() {
  const t = localStorage.getItem("token");
  return !!t;
}

router.beforeEach((to) => {
  // se for pública, ok
  if (to.meta?.public) return true;

  // se estiver autenticado, ok
  if (isAuthed()) return true;

  // caso contrário, manda para login e guarda destino
  return {
    path: "/login",
    query: { next: to.fullPath }
  };
});

export default router;
