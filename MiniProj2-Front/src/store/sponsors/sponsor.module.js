// Ficheiro adicionado para Tarefa 3.2 e 3.3.
// Módulo Vuex responsável pela gestão dos Patrocinadores (Sponsors).

import sponsorService from "@/api/sponsor.service";
import {
  SET_SPONSORS,
  SET_MESSAGE,
  FETCH_SPONSORS,
  ADD_SPONSOR,
  EDIT_SPONSOR,
  REMOVE_SPONSOR
} from "./sponsor.constants";

const state = {
  sponsors: [],
  message: ""
};

const getters = {
  // Lista completa
  getSponsors: state => state.sponsors,

  // Obter 1 pelo ID
  getSponsorsById: state => id => state.sponsors.find(s => s._id === id),

  // Última mensagem apresentada
  getMessage: state => state.message
};

const actions = {
  // LISTAR TODOS
  [FETCH_SPONSORS]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      sponsorService.getSponsors(rootState.auth.token).then(
        res => {
          commit(SET_SPONSORS, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },

  // CRIAR
  [ADD_SPONSOR]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      sponsorService.addSponsor(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, "Patrocinador adicionado com sucesso!");
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },

  // EDITAR
  [EDIT_SPONSOR]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      sponsorService.editSponsor(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, "Patrocinador atualizado com sucesso!");
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },

  // REMOVER
  [REMOVE_SPONSOR]: ({ commit, rootState }, id) => {
    return new Promise((resolve, reject) => {
      sponsorService.removeSponsor(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, "Patrocinador removido com sucesso!");
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
  [SET_SPONSORS]: (state, sponsors) => {
    state.sponsors = sponsors;
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
