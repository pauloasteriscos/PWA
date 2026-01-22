<template>
  <div>
    <h3>{{ isEdit ? "Editar Proposta" : "Nova Proposta" }}</h3>

    <form @submit.prevent="save" style="display:grid; gap:10px; max-width:760px;">
      <label>Título</label>
      <input v-model="title" required />

      <label>Descrição e objetivos</label>
      <textarea v-model="descriptionObjectives" rows="6" required />

      <label>Palavras-chave (separadas por vírgula)</label>
      <input v-model="keywordsText" placeholder="web, full-stack, pwa" />

      <label>Estado</label>
      <select v-model="status">
        <option value="rascunho">rascunho</option>
        <option value="submetida">submetida</option>
        <option value="em_analise">em_analise</option>
      </select>

      <label>Coorientadores</label>
      <div style="border:1px solid #ccc; padding:10px; border-radius:6px;">
        <div
          v-for="t in teachers"
          :key="t.id"
          style="display:flex; align-items:center; gap:8px; margin:4px 0;"
        >
          <button
            type="button"
            @click="toggleCoorientator(t.id)"
            :style="buttonStyle(coorientators.includes(t.id))"
            :title="coorientators.includes(t.id) ? 'Remover' : 'Adicionar'"
          >
            {{ coorientators.includes(t.id) ? "-" : "+" }}
          </button>

          <span>{{ t.name }} ({{ t.email }})</span>
        </div>
      </div>

      <label>Alunos</label>
      <div style="border:1px solid #ccc; padding:10px; border-radius:6px; max-height:220px; overflow:auto;">
        <div
          v-for="s in studentsList"
          :key="s.id"
          style="display:flex; align-items:center; gap:8px; margin:4px 0;"
        >
          <button
            type="button"
            @click="toggleStudent(s.id)"
            :style="buttonStyle(students.includes(s.id))"
            :title="students.includes(s.id) ? 'Remover' : 'Adicionar'"
          >
            {{ students.includes(s.id) ? "-" : "+" }}
          </button>

          <span>{{ s.name }} ({{ s.number }})</span>
        </div>
      </div>

      <div style="display:flex; gap:10px; align-items:center;">
        <button type="submit">Guardar</button>
        <router-link to="/my-proposals">Voltar à lista</router-link>
        
		<div v-if="score !== null" style="display:flex; flex-direction:column; gap:6px;">
  <div style="display:flex; align-items:center; gap:8px;">
    <span style="opacity:.85;">
      <strong>Indicador de completude:</strong> {{ score }}%
    </span>

    <span
      title="É um indicador automático para ajudar na triagem inicial. Não é avaliação académica."
      style="cursor:help; opacity:.7;"
    >
      ⓘ
    </span>
  </div>

  
  <div style="background:#eee; border-radius:6px; overflow:hidden; height:10px; width:220px;">
    <div
      :style="{
        width: Math.max(0, Math.min(100, score)) + '%',
        height: '100%',
        background: score >= 70 ? '#2e7d32' : '#ef6c00'
      }"
    ></div>
  </div>

  
  <div style="font-size:12px; opacity:.85; line-height:1.35;">
    <div>• <strong>Proposta só com título → score baixo</strong></div>
    <div>• <strong>Proposta com descrição, palavras-chave, alunos e coorientadores → score mais alto</strong></div>
  </div>

  
  <details style="font-size:12px; opacity:.85;">
    <summary style="cursor:pointer;">Ver critérios usados no cálculo</summary>
    <ul style="margin:6px 0 0 18px;">
      <li>Título preenchido</li>
      <li>Descrição e objetivos preenchidos</li>
      <li>Palavras-chave preenchidas</li>
      <li>Alunos associados</li>
      <li>Coorientadores associados</li>
    </ul>
  </details>
</div>

		
      </div>

      <p v-if="error" style="color:#b00020;">{{ error }}</p>
      <p v-if="info" style="color:green;">{{ info }}</p>
    </form>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../services/api";

const route = useRoute();
const router = useRouter();

const isEdit = computed(() => !!route.params.id);

const title = ref("");
const descriptionObjectives = ref("");
const keywordsText = ref("");
const status = ref("submetida");
const coorientators = ref([]);
const students = ref([]);

const teachers = ref([]);
const studentsList = ref([]);

const error = ref("");
const info = ref("");
const score = ref(null);

function toKeywordsArray(txt) {
  return String(txt || "")
    .replaceAll(";", ",")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
}

function toggleCoorientator(id) {
  if (coorientators.value.includes(id)) {
    coorientators.value = coorientators.value.filter(x => x !== id);
  } else {
    coorientators.value.push(id);
  }
}

function toggleStudent(id) {
  if (students.value.includes(id)) {
    students.value = students.value.filter(x => x !== id);
  } else {
    students.value.push(id);
  }
}

function buttonStyle(selected) {
  return {
    width: "28px",
    height: "28px",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "18px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "1px solid",
    backgroundColor: selected ? "#ffecec" : "#eaffea",
    color: selected ? "#b00020" : "#0a7a0a",
    borderColor: selected ? "#b00020" : "#0a7a0a"
  };
}

async function loadLookups() {
  const [tRes, sRes] = await Promise.all([api.get("/teachers"), api.get("/students")]);
  teachers.value = tRes.data;
  studentsList.value = sRes.data;
}

async function loadProposalFromMine() {
  const { data } = await api.get("/proposals/mine");
  const p = data.find(x => x._id === route.params.id);
  if (!p) throw new Error("Proposta não encontrada");

  title.value = p.title;
  descriptionObjectives.value = p.descriptionObjectives;
  keywordsText.value = (p.keywords || []).join(", ");
  status.value = p.status || "submetida";
  coorientators.value = (p.coorientators || []).map(t => t._id);
  students.value = (p.students || []).map(s => s._id);
  score.value = p.completenessScore ?? null;
}

async function save() {
  error.value = "";
  info.value = "";

  const titleClean = title.value.trim();
  const descClean = descriptionObjectives.value.trim();

  if (!titleClean) {
    error.value = "O título é obrigatório.";
    return;
  }
  if (!descClean) {
    error.value = "A descrição e objetivos são obrigatórios.";
    return;
  }

  const keywordsArr = Array.from(
    new Set(
      toKeywordsArray(keywordsText.value).map(k => k.toLowerCase())
    )
  );

  const payload = {
    title: titleClean,
    descriptionObjectives: descClean,
    keywords: keywordsArr,
    status: status.value,
    coorientators: coorientators.value,
    students: students.value
  };

  try {
    if (isEdit.value) {
      const { data } = await api.put(`/proposals/${route.params.id}`, payload);
      info.value = "Atualizado com sucesso";
      score.value = data.completenessScore ?? null;
      router.push("/my-proposals");
    } else {
      await api.post("/proposals", payload);
      router.push("/my-proposals");
    }
  } catch (e) {
    error.value = e?.response?.data?.error || "Erro ao guardar";
  }
}

onMounted(async () => {
  try {
    await loadLookups();
    if (isEdit.value) await loadProposalFromMine();
  } catch (e) {
    error.value = e?.message || "Erro ao carregar";
  }
});
</script>