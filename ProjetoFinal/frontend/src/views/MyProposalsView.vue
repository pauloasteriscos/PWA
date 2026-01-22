<template>
  <div>
    <h3>Minhas Propostas</h3>

    <router-link to="/proposal/new">Nova Proposta</router-link>

    <p v-if="error" style="color:#b00020; margin-top:10px;">{{ error }}</p>
    <p v-if="info" style="color:green; margin-top:10px;">{{ info }}</p>

    <table
      border="1"
      cellpadding="6"
      cellspacing="0"
      style="border-collapse:collapse; margin-top:10px; width:100%; max-width:900px;"
    >
      <thead>
        <tr>
          <th style="text-align:left;">Título</th>
          <th style="text-align:left;">Estado</th>

          <th style="text-align:left;">
            Completude
            <span
              title="Indicador automático para ajudar na triagem inicial. Não é avaliação académica."
              style="cursor:help; opacity:.7; margin-left:6px;"
            >
              ⓘ
            </span>
          </th>

          <th style="text-align:left;">Ações</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="p in proposals" :key="p._id">
          <td>{{ p.title }}</td>
          <td>{{ p.status }}</td>

          <td>
            <span
              v-if="p.completenessScore !== undefined && p.completenessScore !== null"
              :title="scoreHelp"
              style="white-space:nowrap;"
            >
              {{ p.completenessScore }}%
            </span>
            <span v-else style="opacity:.6;">—</span>
          </td>

          <td style="white-space:nowrap;">
            <router-link :to="`/proposal/${p._id}/edit`">Editar</router-link>
            <button @click="remove(p._id)" style="margin-left:8px;">Apagar</button>
          </td>
        </tr>

        <tr v-if="proposals.length === 0">
          <td colspan="4" style="opacity:.75;">Ainda não tem propostas criadas.</td>
        </tr>
      </tbody>
    </table>

    <div style="font-size:12px; opacity:.85; margin-top:8px; max-width:900px; line-height:1.35;">
      <div>• <strong>Proposta só com título → completude baixa</strong></div>
      <div>
        • <strong>Proposta com descrição, palavras-chave, alunos e coorientadores → completude mais alta</strong>
      </div>
      <div style="opacity:.75; margin-top:4px;">
        Nota: este indicador serve apenas como apoio à triagem inicial e não corresponde a avaliação académica.
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";

const proposals = ref([]);
const error = ref("");
const info = ref("");

const scoreHelp =
  "Indicador automático baseado no preenchimento da proposta.\n" +
  "Proposta só com título → completude baixa.\n" +
  "Proposta com descrição, palavras-chave, alunos e coorientadores → completude mais alta.\n" +
  "Não é avaliação académica.";

async function load() {
  error.value = "";
  try {
    const res = await api.get("/proposals/mine");
    proposals.value = res.data;
  } catch (e) {
    error.value = e?.response?.data?.error || "Erro ao carregar propostas";
  }
}

async function remove(id) {
  info.value = "";
  error.value = "";

  const ok = confirm("Tem a certeza que pretende apagar esta proposta?");
  if (!ok) return;

  try {
    await api.delete(`/proposals/${id}`);
    info.value = "Proposta apagada com sucesso";
    await load();
  } catch (e) {
    error.value = e?.response?.data?.error || "Erro ao apagar proposta";
  }
}

onMounted(load);
</script>
