<!-- DraggableDemo.vue -->
<template>
  <q-page padding>
<!--    <div class="" draggable="true" @dragstart.prevent="onDragStart" @dragend.prevent="onDragEnd"></div>-->
    <div class="row q-col-gutter-md">
      <!-- Простой список с перетаскиванием -->
      <div class="col-12 col-md-6">
        <q-card>
          <q-card-section>
            <div class="text-h6">Простой список</div>
          </q-card-section>

          <q-card-section>
            <draggable
              v-model="simpleList"
              group="simple"
              item-key="id"
              class="list-group"
              :animation="200"
            >
              <template #item="{ element }">
                <q-item
                  v-ripple
                  class="list-group-item q-my-sm cursor-move"
                  bordered
                >
                  <q-item-section>
                    <q-item-label>{{ element.name }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-icon name="drag_indicator"/>
                  </q-item-section>
                </q-item>
              </template>
            </draggable>
          </q-card-section>
        </q-card>
      </div>
      <!-- Сетка с перетаскиванием -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Сетка</div>
          </q-card-section>

          <q-card-section>
            <draggable
              v-model="gridItems"
              group="grid"
              item-key="id"
              class="row q-col-gutter-sm"
              :animation="200"
              @start="onDragStart"
              @end="onDragEnd"
              @change="onChange"            >
              <template #item="{ element }">
                <div class="col-4 col-md-3">
                  <q-card class="cursor-move">
                    <q-img :src="`/api/placeholder/${element.id}/200/200`"/>
                    <q-card-section class="text-center">
                      {{ element.name }}
                    </q-card-section>
                  </q-card>
                </div>
              </template>
            </draggable>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'

// Простой список
const simpleList = ref([
  {
    id: 1,
    name: 'Элемент 1'
  },
  {
    id: 2,
    name: 'Элемент 2'
  },
  {
    id: 3,
    name: 'Элемент 3'
  },
  {
    id: 4,
    name: 'Элемент 4'
  },
  {
    id: 5,
    name: 'Элемент 5'
  }
])

// Канбан-доска
// const kanbanBoard = ref({
//   inProgress: [
//     {
//       id: 3,
//       title: 'Задача 3',
//       description: 'Описание задачи 3'
//     }
//   ],
//   todo: [
//     {
//       id: 1,
//       title: 'Задача 1',
//       description: 'Описание задачи 1'
//     },
//     {
//       id: 2,
//       title: 'Задача 2',
//       description: 'Описание задачи 2'
//     }
//   ],
//   done: [
//     {
//       id: 4,
//       title: 'Задача 4',
//       description: 'Описание задачи 4'
//     }
//   ]
// })

// Сетка
const gridItems = ref([
  {
    id: 1,
    name: 'Изображение 1'
  },
  {
    id: 2,
    name: 'Изображение 2'
  },
  {
    id: 3,
    name: 'Изображение 3'
  },
  {
    id: 4,
    name: 'Изображение 4'
  },
  {
    id: 5,
    name: 'Изображение 5'
  },
  {
    id: 6,
    name: 'Изображение 6'
  }
])

// Обработчики событий при необходимости
const onChange = (evt: any) => {
  console.log('Элемент перемещен:', getPosition(evt))
}

const onDragStart = (evt: any) => {
  console.log('Drag start:', getPosition(evt))
}
const onDragEnd = (evt: any) => {
  console.log('Drag end:', getPosition(evt))
}
const getPosition = (evt: any) => {
  return {
    to: {
      x: evt.to.offsetLeft,
      y: evt.to.offsetTop,
      h: evt.to.offsetHeight,
      w: evt.to.offsetWidth
    },
    from: {
      x: evt.from.offsetLeft,
      y: evt.from.offsetTop,
      h: evt.from.offsetHeight,
      w: evt.from.offsetWidth
    }
  }
}

</script>

<style scoped>
.list-group-item {
  transition: background-color 0.2s;
}

.list-group-item:hover {
  background-color: #f5f5f5;
}

.kanban-list {
  min-height: 200px;
}

/* Стили для перетаскивания */
.sortable-ghost {
  opacity: 0.5;
}

.sortable-drag {
  opacity: 0.8;
}
</style>
