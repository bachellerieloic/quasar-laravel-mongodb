<template>
    <div>
        <q-dialog v-model="dialog">
            <q-card style="width: 350px" class="q-pa-md q-pa-lg-sm q-pa-xl-md">
                <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">Edit Todo</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>

                <q-card-section>
                    <q-input v-model="editContent" label="Todo content" filled @keyup.enter="saveTodo" />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" v-close-popup />
                    <q-btn flat label="Save" color="primary" @click="saveTodo" />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-card class="q-mb-sm">
            <q-card-section class="row items-center q-pa-md">
                <div class="col-grow">
                    {{ todo.content }}
                </div>
                <div class="row items-center q-gutter-sm">
                    <q-checkbox :model-value="todo.completed"
                        @update:model-value="todoStore.updateCompleted(todo.id, $event)" />
                    <q-btn v-if="!todo.completed" icon="edit" flat round dense @click="openDialog" color="primary" />
                    <q-btn v-else icon="delete" flat round dense @click="todoStore.deleteTodo(todo.id)" color="red" />
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Todo } from './models';
import { useTodoStore } from 'src/stores/todo';

const todoStore = useTodoStore();

interface Props {
    todo: Todo;
}

const props = withDefaults(defineProps<Props>(), {
    todo: () => ({
        id: 0,
        content: '',
        completed: false,
    }),
});

const dialog = ref<boolean>(false);
const editContent = ref<string>('');

function openDialog() {
    editContent.value = props.todo.content;
    dialog.value = true;
}

function saveTodo() {
    todoStore.editTodo(props.todo.id, editContent.value);
    dialog.value = false;
}
</script>