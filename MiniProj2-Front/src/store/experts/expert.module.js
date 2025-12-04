// Ficheiro adicionado para Tarefa 3.2 e 3.3.
// Módulo Vuex responsável pela gestão dos especialistas (Experts).

import expertService from "@/api/expert.service";
import {
  SET_EXPERTS,
  SET_MESSAGE,
  FETCH_EXPERTS,
  ADD_EXPERT,
  EDIT_EXPERT,
  REMOVE_EXPERT
} from "./expert.constants";

const state = {
  experts: [],
  message: ""
};

const getters = {
  getExperts: state => state.experts,
  getExpertsById: state => id => state.experts.find(e => e._id === id),
  getMessage: state => state.message
};

const actions = {
  // Obter lista de especialistas
  [FETCH_EXPERTS]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      expertService.getExperts(rootState.auth.token).then(
        res => {
          commit(SET_EXPERTS, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },

  // Criar especialista
  [ADD_EXPERT]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      expertService.addExpert(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, "Especialista adicionado com sucesso!");
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },

  // Editar especialista
  [EDIT_EXPERT]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      expertService.editExpert(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, "Especialista atualizado com sucesso!");
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },

  // Remover especialista
  [REMOVE_EXPERT]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      expertService.removeExpert(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, "Especialista removido com sucesso!");
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  }
};

const mutations = {
  [SET_EXPERTS]: (state, experts) => {
    state.experts = experts;
  },
  [SET_MESSAGE]: (state, message) => {
    state.message = message;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
