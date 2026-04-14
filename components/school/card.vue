<template>
  <div
    class="p-3 bg-white rounded-lg border border-slate-200 flex items-center gap-4"
  >
    <!-- Section 1: Tags + Avatar + School Info -->
    <div class="flex-1 flex flex-col justify-center items-start gap-1 min-w-0">
      <!-- Tags row -->
      <div class="flex items-center gap-1">
        <div class="flex items-center gap-1">
          <UIcon
            name="i-heroicons-building-office-2"
            class="w-3 h-3 text-primary-600 shrink-0"
          />
          <span
            class="text-primary-600 text-xs font-normal leading-4 line-clamp-1"
            >Thành viên</span
          >
        </div>
        <span class="text-primary-600 text-xs leading-4">·</span>
        <div class="flex items-center gap-1">
          <UIcon
            name="i-heroicons-shield-check"
            class="w-3 h-3 text-primary-600 shrink-0"
          />
          <span
            class="text-primary-600 text-xs font-normal leading-4 line-clamp-1"
            >Xác minh</span
          >
        </div>
      </div>

      <!-- Avatar + school info -->
      <div class="flex items-center gap-2 w-full min-w-0">
        <div class="relative shrink-0">
          <UAvatar
            :src="school.picture?.xs || undefined"
            size="sm"
            alt="Avatar Trường"
          />
          <span
            class="absolute top-0 right-0 w-2 h-2 rounded-full bg-primary-500 ring-1 ring-white"
          />
        </div>
        <div class="flex-1 flex flex-col min-w-0">
          <span
            class="text-sm font-medium leading-5 text-gray-900 line-clamp-1"
          >
            {{ school.name }}
          </span>
          <span class="text-xs text-gray-400 leading-4 line-clamp-1">
            {{ school.address }}
          </span>
        </div>
      </div>
    </div>

    <!-- Section 2: Sale + CSKH dropdowns -->
    <div class="w-36 flex flex-col gap-2 shrink-0">
      <USelectMenu
        v-model="selectedSaler"
        :items="salerItems"
        value-key="value"
        size="xs"
        placeholder="Sale phụ trách"
        leading-icon="i-heroicons-user"
        searchable
        class="w-full"
      />
      <USelectMenu
        v-model="selectedCskh"
        :items="cskhItems"
        value-key="value"
        size="xs"
        placeholder="Cskh phụ trách"
        leading-icon="i-heroicons-building-office"
        searchable
        class="w-full"
      />
    </div>

    <!-- Section 3: Hotline + Tuyển sinh -->
    <div class="flex flex-col gap-2 shrink-0">
      <a
        :href="`tel:${school.contact?.hotlines?.[0]?.hotline}`"
        class="flex items-center gap-1.5 p-1.5 rounded-md text-gray-500 hover:bg-gray-50 transition-colors"
      >
        <UIcon
          name="i-heroicons-phone-arrow-up-right"
          class="w-4 h-4 shrink-0"
        />
        <span class="text-xs font-medium leading-4">
          Hotline: {{ school.contact?.hotlines?.[0]?.hotline ?? "—" }}
        </span>
      </a>
      <a
        :href="`tel:${school.contact?.phones?.[0]?.phone}`"
        class="flex items-center gap-1.5 p-1.5 rounded-md text-gray-500 hover:bg-gray-50 transition-colors"
      >
        <UIcon name="i-lucide-headset" class="w-4 h-4 shrink-0" />
        <span class="text-xs font-medium leading-4">
          Tuyển sinh: {{ school.contact?.phones?.[0]?.phone ?? "—" }}
        </span>
      </a>
    </div>

    <!-- Section 4: Xác minh + Web toggles -->
    <div class="flex flex-col gap-2 shrink-0">
      <div class="flex items-center gap-2">
        <USwitch
          :model-value="verify"
          color="primary"
          size="xs"
          @update:model-value="onVerifyRequest"
        />
        <span class="text-xs font-medium text-gray-800">Xác minh</span>
      </div>
      <div class="flex items-center gap-2">
        <USwitch
          :model-value="member"
          color="primary"
          size="xs"
          @update:model-value="onMemberRequest"
        />
        <span class="text-xs font-medium text-gray-800">Web</span>
      </div>
    </div>

    <!-- Section 5: Actions -->
    <div class="flex items-center gap-2 shrink-0">
      <UButton
        color="neutral"
        variant="solid"
        size="sm"
        class="bg-neutral-900 text-white hover:bg-neutral-800"
        >Cập nhật</UButton
      >
      <UButton
        color="neutral"
        variant="solid"
        size="sm"
        icon="i-heroicons-ellipsis-horizontal"
        square
        class="bg-neutral-900 text-white hover:bg-neutral-800"
      />
    </div>
  </div>

  <!-- Shared confirm dialog — one instance handles all actions -->
  <SharedConfirmDialog
    v-model:open="dialog.open"
    :title="dialog.title"
    :description="dialog.description"
    :loading="dialog.loading"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  />
</template>

<script setup lang="ts">
import type { School } from "~/types/models";

const props = defineProps<{
  school: School;
}>();

// ── Team members ────────────────────────────────────────────────────────────
const { salers, cskhList } = useTeamStore();

const salerItems = computed(() => {
  const fetched = salers.value.map((m) => ({ label: m.username, value: m.id }));
  // Keep current saler visible while store is loading
  if (
    props.school.saler &&
    !fetched.some((i) => i.value === props.school.saler?.id)
  ) {
    return [
      { label: props.school.saler.username, value: props.school.saler.id },
      ...fetched,
    ];
  }
  return fetched;
});

const cskhItems = computed(() => {
  const fetched = cskhList.value.map((m) => ({
    label: m.username,
    value: m.id,
  }));
  // Keep current cskh visible while store is loading
  if (
    props.school.customer_support &&
    !fetched.some((i) => i.value === props.school.customer_support?.id)
  ) {
    return [
      {
        label: props.school.customer_support.username,
        value: props.school.customer_support.id,
      },
      ...fetched,
    ];
  }
  return fetched;
});

// ── Selected staff ───────────────────────────────────────────────────────────
const selectedSaler = ref<number | null>(props.school.saler_id ?? null);
const selectedCskh = ref<number | null>(
  props.school.customer_support_id ?? null,
);

// ── Toggle state ─────────────────────────────────────────────────────────────
const verify = ref(props.school.verify === 1);
const member = ref(props.school.member === 1);

// ── API + notifications ───────────────────────────────────────────────────────
const { updateCustomerSupport, updateStatuses } = useSchoolApi();
const { success, error } = useNotification();

// ── Confirm dialog ────────────────────────────────────────────────────────────
const dialog = reactive({
  open: false,
  title: "",
  description: "",
  loading: false,
  confirmFn: null as (() => Promise<void>) | null,
  cancelFn: null as (() => void) | null,
});

function openConfirm(opts: {
  title: string;
  description?: string;
  onConfirm: () => Promise<void>;
  onCancel?: () => void;
}) {
  dialog.title = opts.title;
  dialog.description = opts.description ?? "";
  dialog.confirmFn = opts.onConfirm;
  dialog.cancelFn = opts.onCancel ?? null;
  dialog.open = true;
}

async function handleConfirm() {
  if (!dialog.confirmFn) return;
  dialog.loading = true;
  try {
    await dialog.confirmFn();
  } catch {
    error("Có lỗi xảy ra", "Vui lòng thử lại.");
  } finally {
    dialog.loading = false;
    dialog.open = false;
  }
}

function handleCancel() {
  if (dialog.cancelFn) dialog.cancelFn();
  dialog.open = false;
}

// ── CSKH change ───────────────────────────────────────────────────────────────
// prevCskh tracks the last committed value to guard the watcher on revert
let prevCskh = props.school.customer_support_id ?? null;

watch(selectedCskh, (newVal) => {
  // Triggered by our own revert in onCancel — skip
  if (newVal === prevCskh) return;

  const oldVal = prevCskh;
  const newLabel =
    cskhItems.value.find((i) => i.value === newVal)?.label ?? String(newVal);

  openConfirm({
    title: "Đổi CSKH phụ trách",
    description: `Chuyển CSKH của "${props.school.name}" sang "${newLabel}"?`,
    onConfirm: async () => {
      await updateCustomerSupport(props.school.id, newVal);
      prevCskh = newVal;
      success(
        "Đã cập nhật CSKH",
        `CSKH phụ trách "${props.school.name}" đã được thay đổi.`,
      );
    },
    onCancel: () => {
      // Setting back to prevCskh will re-fire the watcher,
      // but the guard above (`newVal === prevCskh`) will stop it.
      selectedCskh.value = oldVal;
    },
  });
});

// ── Verify toggle ─────────────────────────────────────────────────────────────
function onVerifyRequest(newVal: boolean) {
  const oldVal = verify.value;
  verify.value = newVal; // optimistic — switch shows new state while dialog is open

  openConfirm({
    title: newVal ? "Bật Xác minh" : "Tắt Xác minh",
    description: `Bạn có chắc muốn ${newVal ? "xác minh" : "bỏ xác minh"} trường "${props.school.name}"?`,
    onConfirm: async () => {
      await updateStatuses(props.school.id, { verify: newVal });
      success(
        newVal ? "Đã bật Xác minh" : "Đã tắt Xác minh",
        `Trường "${props.school.name}" đã được cập nhật.`,
      );
    },
    onCancel: () => {
      verify.value = oldVal; // revert switch
    },
  });
}

// ── Member (Web) toggle ───────────────────────────────────────────────────────
function onMemberRequest(newVal: boolean) {
  const oldVal = member.value;
  member.value = newVal; // optimistic

  openConfirm({
    title: newVal ? "Bật Web" : "Tắt Web",
    description: `Bạn có chắc muốn ${newVal ? "hiển thị" : "ẩn"} trường "${props.school.name}" trên Web?`,
    onConfirm: async () => {
      await updateStatuses(props.school.id, { status: newVal });
      success(
        newVal ? "Đã bật Web" : "Đã tắt Web",
        `Trường "${props.school.name}" đã được cập nhật.`,
      );
    },
    onCancel: () => {
      member.value = oldVal; // revert switch
    },
  });
}
</script>
