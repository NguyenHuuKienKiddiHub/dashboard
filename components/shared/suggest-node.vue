<template>
  <div class="relative" @keydown.escape="closeSuggestions">
    <UInput
      ref="inputRef"
      v-model="query"
      icon="i-heroicons-magnifying-glass"
      trailing-icon="i-heroicons-chevron-down"
      :placeholder="placeholder"
      size="md"
      autocomplete="off"
      :loading="loading"
      :class="inputClass"
      @input="onInput"
      @keydown.enter.prevent="onEnter"
      @keydown.down.prevent="onArrowDown"
      @keydown.up.prevent="onArrowUp"
      @blur="onBlur"
      @focus="onFocus"
    />

    <div
      v-if="isOpen && (suggestions.length || loading)"
      class="absolute left-0 z-50 mt-1 min-w-[280px] max-w-[420px] w-max overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900"
      style="top: 100%"
    >
      <template v-if="loading && !suggestions.length">
        <div
          class="px-3 py-2 text-center text-sm text-gray-400 dark:text-gray-500"
        >
          Đang tìm kiếm...
        </div>
      </template>

      <template v-else>
        <button
          v-for="(item, index) in suggestions"
          :key="item.id"
          type="button"
          class="flex w-full items-center whitespace-nowrap px-3 py-2 text-left text-sm transition-colors"
          :class="[
            highlightedIndex === index
              ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
              : 'text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800',
          ]"
          @mousedown.prevent="onSelect(item)"
          @mouseover="highlightedIndex = index"
        >
          {{ item.name }}
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SuggestItem } from "~/types/models";

const props = withDefaults(
  defineProps<{
    node: string;
    fields?: string;
    compareBy?: string;
    placeholder?: string;
    inputClass?: string;
    debounce?: number;
  }>(),
  {
    fields: "id,name",
    compareBy: "name",
    placeholder: "Tìm kiếm",
    inputClass: "",
    debounce: 200,
  },
);

const emit = defineEmits<{
  select: [item: SuggestItem];
  enter: [keywords: string];
}>();

const { get } = useSuggestApi();

const query = ref("");
const suggestions = ref<SuggestItem[]>([]);
const loading = ref(false);
const isOpen = ref(false);
const highlightedIndex = ref(-1);

let debounceTimer: ReturnType<typeof setTimeout> | null = null;

function onInput() {
  highlightedIndex.value = -1;

  if (debounceTimer) clearTimeout(debounceTimer);

  if (!query.value || query.value.length < 2) {
    suggestions.value = [];
    isOpen.value = false;
    return;
  }

  debounceTimer = setTimeout(() => fetchSuggestions(), props.debounce);
}

async function fetchSuggestions() {
  if (!query.value || query.value.length < 2) return;

  loading.value = true;
  isOpen.value = true;

  try {
    suggestions.value = await get(props.node, {
      fields: props.fields,
      compare: { [props.compareBy]: query.value },
    });
  } catch {
    suggestions.value = [];
  } finally {
    loading.value = false;
  }
}

function onSelect(item: SuggestItem) {
  query.value = item.name;
  closeSuggestions();
  emit("select", item);
}

function onEnter() {
  if (!query.value.trim()) return;
  closeSuggestions();
  emit("enter", query.value.trim());
}

function onArrowDown() {
  if (!suggestions.value.length) return;
  highlightedIndex.value = Math.min(
    highlightedIndex.value + 1,
    suggestions.value.length - 1,
  );
}

function onArrowUp() {
  if (!suggestions.value.length) return;
  highlightedIndex.value = Math.max(highlightedIndex.value - 1, -1);
}

function onFocus() {
  if (suggestions.value.length) isOpen.value = true;
}

function onBlur() {
  setTimeout(() => closeSuggestions(), 150);
}

function closeSuggestions() {
  isOpen.value = false;
  highlightedIndex.value = -1;
}
</script>
