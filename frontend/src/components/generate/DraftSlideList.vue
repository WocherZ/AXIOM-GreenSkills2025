<script setup lang="ts">
import draggable from 'vuedraggable'
import { useDocsStore } from 'stores/docsStore'

const docsStore = useDocsStore()

const model = defineModel<{ title: string }[]>()
const onChange = async () => {
  await docsStore.updateDraft({ content: model.value })
}

</script>

<template>
  <q-card>
    <q-card-section>
      <div class="text-h6">Конспект</div>
    </q-card-section>

    <q-card-section>

      <q-list dense bordered separator class="rounded-borders">
        <draggable
          v-model="model"
          group="simple"
          item-key="id"
          class="list-group"
          :animation="200"
          @end="onChange"
        >
          <template #item="{ element, index }">
            <q-item
              v-ripple
              class="list-group-item q-my-sm cursor-move shadow-2"
              bordered
            >
              <q-item-section avatar>
                <span class="item-index">{{ index + 1 }}</span>
              </q-item-section>
              <q-item-section>
                {{ element.title }}
              </q-item-section>
              <q-item-section side>
                <q-icon name="drag_indicator"/>
              </q-item-section>
            </q-item>
          </template>
        </draggable>
      </q-list>
    </q-card-section>
  </q-card>

</template>

<style lang="scss" scoped>
.list-group-item {
  transition: background-color 0.2s;
}

.list-group-item:hover {
  background-color: #f5f5f5;
  cursor: move;
}
.item-index {
  background-color: #e9e9e9;
  padding: 0.5rem 1rem;
}
</style>
