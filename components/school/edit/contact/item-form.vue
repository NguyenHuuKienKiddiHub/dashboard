<template>
  <div class="self-stretch inline-flex justify-start items-center gap-2">
    <UInput
      v-model="tag"
      placeholder="Tên gợi nhớ"
      size="xs"
      class="w-32 shrink-0"
    />
    <UInput
      v-model="fieldVal"
      :placeholder="fieldKey"
      size="xs"
      class="flex-1"
    />
    <UButtonGroup size="xs">
      <UButton variant="solid" color="primary" size="xs" @click="onSave"
        >Lưu</UButton
      >
      <UButton
        variant="outline"
        color="neutral"
        size="xs"
        @click="emit('cancel')"
        >Hủy</UButton
      >
    </UButtonGroup>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  fieldKey: string;
  tagValue?: string;
  fieldValue?: string;
}>();

const emit = defineEmits<{
  save: [item: Record<string, string>];
  cancel: [];
}>();

const tag = ref(props.tagValue ?? "");
const fieldVal = ref(props.fieldValue ?? "");

function onSave() {
  emit("save", { tag: tag.value, [props.fieldKey]: fieldVal.value });
}
</script>
