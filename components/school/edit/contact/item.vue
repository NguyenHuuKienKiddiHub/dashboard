<template>
  <div class="self-stretch inline-flex justify-start items-center gap-2">
    <span
      class="text-sm font-bold font-['Nunito'] leading-5 text-[var(--ui-text)]"
      >{{ tag }}</span
    >
    <span
      class="flex-1 text-sm font-normal font-['Nunito'] leading-5 text-[var(--ui-text)] truncate"
      >{{ value }}</span
    >
    <UButtonGroup size="xs">
      <UButton variant="outline" color="neutral" size="xs" @click="emit('edit')"
        >Sửa</UButton
      >
      <UButton
        variant="outline"
        color="neutral"
        size="xs"
        @click="emit('delete')"
        >Xóa</UButton
      >
    </UButtonGroup>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  tag: string;
  value: string;
}>();

const emit = defineEmits<{
  edit: [];
  delete: [];
}>();
</script>
