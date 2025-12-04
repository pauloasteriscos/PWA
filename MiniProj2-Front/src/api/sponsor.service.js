// Ficheiro adicionado para Tarefa 3.2 e 3.3.
import API_URL from "./config.js";

export const sponsorService = {
  async getSponsors(token) {
    const response = await fetch(`${API_URL}/sponsors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },

  async addSponsor(token, payload) {
    const response = await fetch(`${API_URL}/sponsors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },

  async getSponsorById(token, id) {
    const response = await fetch(`${API_URL}/sponsors/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },

  async editSponsor(token, payload) {
    const response = await fetch(`${API_URL}/sponsors/${payload._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  },

  async removeSponsor(token, id) {
    const response = await fetch(`${API_URL}/sponsors/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      }
    });

    if (response.ok) {
      return await response.json();
    } else {
      throw Error(handleResponses(response.status));
    }
  }
};

function handleResponses(code) {
  switch (code) {
    case 400:
      return "Pedido inválido.";
    case 401:
      return "Não está autorizado a executar esta ação!";
    case 404:
      return "Registo não encontrado.";
    case 500:
      return "Erro interno do servidor.";
    default:
      return "Ocorreu um erro inesperado.";
  }
}

export default sponsorService;
