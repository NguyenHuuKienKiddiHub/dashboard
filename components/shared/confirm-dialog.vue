<template>
  <UModal v-model:open="open" :dismissible="!loading">
    <template #content>
      <div class="p-5 flex flex-col gap-5">
        <!-- Icon + Text -->
        <div class="flex items-start gap-3">
          <div
            class="shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-amber-50"
          >
            <UIcon
              name="i-heroicons-exclamation-triangle"
              class="w-5 h-5 text-amber-500"
            />
          </div>
          <div class="flex flex-col gap-0.5 pt-0.5">
            <p class="text-sm font-semibold text-gray-900 dark:text-white">
              {{ title }}
            </p>
            <p
              v-if="description"
              class="text-sm text-gray-500 dark:text-gray-400"
            >
              {{ description }}
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-2">
          <UButton
            variant="ghost"
            color="neutral"
            :disabled="loading"
            @click="emit('cancel')"
          >
            {{ cancelLabel }}
          </UButton>
          <UButton color="primary" :loading="loading" @click="emit('confirm')">
            {{ confirmLabel }}
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
const open = defineModel<boolean>("open", { required: true });

withDefaults(
  defineProps<{
    title: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
    loading?: boolean;
  }>(),
  {
    confirmLabel: "Xác nhận",
    cancelLabel: "Hủy",
    loading: false,
  },
);

const emit = defineEmits<{
  confirm: [];
  cancel: [];
}>();
</script>
