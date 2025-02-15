<script setup lang="ts">
import { api } from 'boot/axios'
import { computed, ref } from 'vue'
import { AuthResponseDto } from 'src/client'
import { SessionStorage } from 'quasar'

const file = defineModel()
const files = ref<File | null>(null)
const path = 'prompt/files'
const typeOfImport = ref<string | null>(null)

const isUploading = computed(() => uploading.value !== null)
const canUpload = computed(() => files.value !== null)

const uploadProgress = ref<{ percent: number; error?: boolean, icon?: string, color?: string }[]>([])
const uploading = ref<ReturnType<typeof setTimeout> | null>(null)

function updateUploadProgress () {
  let done = true

  uploadProgress.value = uploadProgress.value.map(progress => {
    if (progress.percent === 1 || progress.error === true) {
      return progress
    }

    const percent = Math.min(1, progress.percent + Math.random() / 10)
    const error = percent < 1 && Math.random() > 0.95

    if (!error && percent < 1 && done) {
      done = false
    }

    return {
      ...progress,
      error,
      color: error ? 'red-2' : 'green-2',
      percent
    }
  })

  uploading.value = !done
    ? setTimeout(updateUploadProgress, 300)
    : null
}

function cancelFile (index: number) {
  uploadProgress.value[index] = {
    ...uploadProgress.value[index],
    error: true,
    color: 'orange-2'
  }
}

const loading = ref(false)

async function upload () {
  loading.value = true // add loading state to submit button
  const formData = new FormData()
  console.log(123, files.value)

  if (files.value) {
    updateUploadProgress()
    formData.append('files', files.value)
    formData.append('path', path)
    const auth: AuthResponseDto | null = SessionStorage.getItem('auth')
    const accessToken = auth?.accessToken
    const resp = await api.post('http://158.160.132.237:8080/api/files?path=prompt%2Ffiles', formData, { headers: { 'Authorization': `Bearer ${accessToken}` } })
    loading.value = false
    file.value = resp.data[0]
  }
}
</script>

<template>
  <div class="row q-gutter-md text-center q-my-md" v-if="!typeOfImport">
    <q-card class="my-card" @click="typeOfImport = 'upload'">
      <q-img src="/images/thumbnail-upload.svg"/>
      <q-card-section>
        <div class="text-h6">Загрузить</div>
      </q-card-section>
      <q-card-section>
        TXT, DOCX, XLSX, PDF
      </q-card-section>
      <q-card-actions>
        <q-btn flat label="Выбрать файл"/>
      </q-card-actions>
    </q-card>

    <q-card class="my-card">
      <q-img src="/images/thumbnail-drive.svg"/>
      <q-card-section>
        <div class="text-h6">Импорт с диска</div>
      </q-card-section>
      <q-card-section>
        Слайды, Гугло-доки
      </q-card-section>
      <q-card-actions>
        <q-btn flat label="Поиск"/>
      </q-card-actions>
    </q-card>

    <q-card class="my-card">
      <q-img src="/images/thumbnail-site.svg"/>
      <q-card-section>
        <div class="text-h6">Импорт из URL</div>
      </q-card-section>
      <q-card-section>
        вэб-страницы, посты в блогах, и прочее
      </q-card-section>
      <q-card-actions>
        <q-btn flat label="Введите URL"/>
      </q-card-actions>
    </q-card>
  </div>

  <q-file
    v-if="typeOfImport === 'upload'"
    v-model="files"
    label="Выберите файл"
    outlined
    style="max-width: 100%"
    accept=".txt,.xls,.xlsx,.doc,.docx,.pdf"
    :clearable="!isUploading"
  >
    <template v-slot:file="{ index, file }">
      <q-chip
        class="full-width q-my-xs"
        :removable="isUploading"
        square
        @remove="cancelFile(index)"
      >
        <!--        <q-linear-progress-->
        <!--          class="absolute-full full-height"-->
        <!--          :value="uploadProgress[index].percent"-->
        <!--          :color="uploadProgress[index].color"-->
        <!--          track-color="grey-2"-->
        <!--        />-->

        <!--        <q-avatar>-->
        <!--          <q-icon :name="uploadProgress[index].icon"/>-->
        <!--        </q-avatar>-->

        <div class="ellipsis relative-position">
          {{ file.name }}
        </div>

        <q-tooltip>
          {{ file.name }}
        </q-tooltip>
      </q-chip>
    </template>

    <template v-slot:after v-if="canUpload">
      <q-btn
        color="primary"
        dense
        icon="cloud_upload"
        round
        @click="upload"
        :disable="!canUpload"
        :loading="isUploading"
      />
    </template>
  </q-file>
</template>

<style lang="scss" scoped>
.my-card {
  width: 15rem;
}
</style>
