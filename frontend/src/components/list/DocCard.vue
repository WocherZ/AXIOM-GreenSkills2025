<script setup lang="ts">
import { Document } from 'src/client'
import { computed, toRefs } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Props {
  item: Document
}

const props = withDefaults(defineProps<Props>(), {
  item: () => ({} as Document)
})

const { item } = toRefs(props)

const userName = computed(() => `${item.value?.createdBy?.firstName} ${item.value?.createdBy?.lastName}`)
const created = computed(() => new Date(item.value.createdAt).toLocaleString())

const toDoc = async (id: string) => {
  console.log(123123, id)
  await router.push(`/docs/${id}`)
}
</script>

<template>
  <q-card class="my-card cursor-pointer" @click="toDoc(item.id) ">
    <q-img :ratio="16/9" :src="item.content?.images[0]" :alt="item.title" />

    <q-card-section class="q-pb-none">
      <router-link class="title" :to="`/docs/${item.id}`">{{ item.title || item.docGenerateInput.prompt }}</router-link>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-chip size="sm" bg-color="grey-6" label="Частный" text-color="grey" icon="lock"/>

    </q-card-section>
    <q-card-section class="q-pa-none q-pb-sm">
      <q-list dense>
        <q-item>
          <q-item-section avatar>
            <q-avatar color="pink-10" text-color="white" size="2rem">
              R
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ userName }}</q-item-label>
            <q-item-label caption lines="1">{{ created }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-btn flat round icon="more_horiz" size="sm">
              <q-menu content-class="bg-grey" style="max-width: 400px">
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-h6">{{ item.title || item.docGenerateInput.prompt }}</q-item-label>
                    <q-item-label caption lines="1">{{ userName }}</q-item-label>
                    <q-item-label caption lines="1">Создано {{ item.createdAt }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item clickable v-close-popup>
                  <q-item-section avatar>
                    <q-icon name="share"></q-icon>
                  </q-item-section>
                  <q-item-section>Поделиться</q-item-section>
                </q-item>

                <q-item clickable v-close-popup>
                  <q-item-section avatar>
                    <q-icon name="drive_file_rename_outline"></q-icon>
                  </q-item-section>
                  <q-item-section>Переименовать</q-item-section>
                </q-item>
                <q-separator/>

                <q-item clickable v-close-popup>
                  <q-item-section avatar>
                    <q-icon name="favorite_border"></q-icon>
                  </q-item-section>
                  <q-item-section>Добавить в избранное</q-item-section>
                </q-item>

                <q-item clickable v-close-popup>
                  <q-item-section avatar>
                    <q-icon name="content_copy"></q-icon>
                  </q-item-section>
                  <q-item-section>Дублировать</q-item-section>
                </q-item>

                <q-item clickable v-close-popup>
                  <q-item-section avatar>
                    <q-icon name="link"></q-icon>
                  </q-item-section>
                  <q-item-section>Копировать ссылку</q-item-section>
                </q-item>

                <q-separator/>
                <q-item clickable v-close-popup>
                  <q-item-section avatar>
                    <q-icon name="delete"></q-icon>
                  </q-item-section>
                  <q-item-section>Отправить в корзину</q-item-section>
                </q-item>
              </q-menu>
            </q-btn>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>

</template>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}

.link {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  word-break: break-all;
}

.title {
  text-decoration: none;
  color: #1D1D1D;
  font-size: 1.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  height: 3rem;
  margin-bottom: 0.5rem;
}
</style>
