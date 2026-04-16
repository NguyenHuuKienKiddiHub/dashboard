<template>
  <div
    class="w-full p-3 bg-white flex flex-col justify-center items-start gap-3"
  >
    <!-- Section header -->
    <div class="self-stretch inline-flex justify-start items-center">
      <span
        class="flex-1 text-base font-bold font-['Nunito'] leading-6 text-[var(--ui-text-highlighted)]"
      >
        {{ title }}
      </span>
      <span
        v-if="subtitle"
        class="text-xs font-medium font-['Nunito'] leading-4 text-[var(--ui-text)]"
      >
        {{ subtitle }}
      </span>
    </div>

    <!-- Item rows -->
    <template v-for="(item, i) in localItems" :key="i">
      <!-- Edit form for this row -->
      <SchoolEditContactItemForm
        v-if="editIndex === i"
        :field-key="valueKey"
        :tag-value="item.tag"
        :field-value="item[valueKey]"
        @save="onSaveEdit(i, $event)"
        @cancel="editIndex = null"
      />
      <!-- Display row -->
      <SchoolEditContactItem
        v-else
        :tag="item.tag ?? ''"
        :value="item[valueKey] ?? ''"
        @edit="editIndex = i"
        @delete="onDelete(i)"
      />
    </template>

    <!-- Add form -->
    <SchoolEditContactItemForm
      v-if="addingNew"
      :field-key="valueKey"
      @save="onSaveNew($event)"
      @cancel="addingNew = false"
    />

    <!-- Add button -->
    <UButton
      v-if="!addingNew"
      variant="outline"
      color="neutral"
      size="xs"
      icon="i-heroicons-plus"
      @click="addingNew = true"
    >
      Thêm
    </UButton>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  subtitle?: string;
  items: Array<Record<string, string>>;
  valueKey: string;
}>();

const emit = defineEmits<{
  save: [items: Array<Record<string, string>>];
}>();

const localItems = ref<Array<Record<string, string>>>(
  JSON.parse(JSON.stringify(props.items)),
);
const addingNew = ref(false);
const editIndex = ref<number | null>(null);

watch(
  () => props.items,
  (val) => {
    localItems.value = JSON.parse(JSON.stringify(val));
  },
  { deep: true },
);

function onSaveNew(newItem: Record<string, string>) {
  localItems.value.push(newItem);
  addingNew.value = false;
  emit("save", [...localItems.value]);
}

function onSaveEdit(i: number, updated: Record<string, string>) {
  localItems.value[i] = updated;
  editIndex.value = null;
  emit("save", [...localItems.value]);
}

function onDelete(i: number) {
  localItems.value.splice(i, 1);
  emit("save", [...localItems.value]);
}
</script>
