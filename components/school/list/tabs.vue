<template>
  <!-- Row 1: Pill membership tabs -->
  <div
    class="px-6 py-2 shrink-0 border-b border-gray-200 bg-white flex items-center"
  >
    <div class="p-1 bg-gray-100 rounded-lg flex items-center gap-0.5">
      <button
        v-for="tab in membershipTabs"
        :key="String(tab.apiValue)"
        class="px-4 py-1 rounded-md text-sm font-medium font-['Nunito'] transition-colors"
        :class="
          membership === tab.apiValue
            ? 'bg-gray-900 text-white'
            : 'text-gray-500 hover:text-gray-700'
        "
        @click="setMembership(tab.apiValue)"
      >
        {{ tab.label }}
      </button>
    </div>
  </div>

  <!-- Row 2: Filter dropdowns -->
  <div
    class="px-6 shrink-0 border-b border-gray-200 bg-white flex justify-between items-center"
  >
    <!-- Left filters -->
    <div class="flex items-center gap-1">
      <!-- Category -->
      <UDropdownMenu :items="categoryItems">
        <button
          class="py-2 px-2.5 flex items-center gap-1.5 rounded-md hover:bg-gray-50 transition-colors"
        >
          <span
            class="text-sm font-medium"
            :class="category !== null ? 'text-primary-600' : 'text-gray-500'"
            >{{ categoryLabel }}</span
          >
          <UIcon
            name="i-heroicons-chevron-down"
            class="w-4 h-4 text-gray-400"
          />
        </button>
      </UDropdownMenu>

      <!-- Verified filter -->
      <UDropdownMenu :items="verifyItems">
        <button
          class="py-2 px-2.5 flex items-center gap-1.5 rounded-md hover:bg-gray-50 transition-colors"
        >
          <span
            class="text-sm font-medium"
            :class="verify !== null ? 'text-primary-600' : 'text-gray-500'"
            >{{ verifyLabel }}</span
          >
          <UIcon
            name="i-heroicons-chevron-down"
            class="w-4 h-4 text-gray-400"
          />
        </button>
      </UDropdownMenu>

      <!-- Web status -->
      <UDropdownMenu :items="webItems">
        <button
          class="py-2 px-2.5 flex items-center gap-1.5 rounded-md hover:bg-gray-50 transition-colors"
        >
          <span
            class="text-sm font-medium"
            :class="status !== null ? 'text-primary-600' : 'text-gray-500'"
            >{{ statusLabel }}</span
          >
          <UIcon
            name="i-heroicons-chevron-down"
            class="w-4 h-4 text-gray-400"
          />
        </button>
      </UDropdownMenu>

      <!-- Type filter (multi-select) -->
      <UDropdownMenu :items="typeItems">
        <button
          class="py-2 px-2.5 flex items-center gap-1.5 rounded-md hover:bg-gray-50 transition-colors"
        >
          <span
            class="text-sm font-medium"
            :class="types.length > 0 ? 'text-primary-600' : 'text-gray-500'"
            >{{ typeLabel }}</span
          >
          <span
            v-if="types.length > 0"
            class="px-1.5 py-0.5 text-[10px] font-medium border border-primary-200 bg-primary-50 text-primary-600 rounded-md leading-3"
            >{{ types.length }}</span
          >
          <UIcon
            name="i-heroicons-chevron-down"
            class="w-4 h-4 text-gray-400"
          />
        </button>
      </UDropdownMenu>
    </div>

    <!-- Right filters -->
    <div class="flex items-center gap-1">
      <!-- Sale filter -->
      <UDropdownMenu :items="salerDropdownItems">
        <button
          class="py-2 px-2.5 flex items-center gap-1.5 rounded-md hover:bg-gray-50 transition-colors"
        >
          <span
            class="text-sm font-medium"
            :class="salerId !== null ? 'text-primary-600' : 'text-gray-500'"
            >{{ salerLabel }}</span
          >
          <UIcon
            name="i-heroicons-chevron-down"
            class="w-4 h-4 text-gray-400"
          />
        </button>
      </UDropdownMenu>

      <!-- CSKH filter -->
      <UDropdownMenu :items="cskhDropdownItems">
        <button
          class="py-2 px-2.5 flex items-center gap-1.5 rounded-md hover:bg-gray-50 transition-colors"
        >
          <span
            class="text-sm font-medium"
            :class="customerId !== null ? 'text-primary-600' : 'text-gray-500'"
            >{{ cskhLabel }}</span
          >
          <UIcon
            name="i-heroicons-chevron-down"
            class="w-4 h-4 text-gray-400"
          />
        </button>
      </UDropdownMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
// ── Shared filter state ───────────────────────────────────────────────────────
const {
  membership,
  verify,
  types,
  salerId,
  customerId,
  category,
  status,
  setMembership,
  setVerify,
  toggleType,
  clearTypes,
  setSalerId,
  setCustomerId,
  setCategory,
  setStatus,
} = useSchoolFilter();

// ── Team store ────────────────────────────────────────────────────────────────
const { salers, cskhList } = useTeamStore();
// No explicit fetchAll needed — callOnce inside useTeamStore handles it.

// ── Membership tabs ───────────────────────────────────────────────────────────
// apiValue: null = no filter, 0 = Thành viên, 1 = Đã từng, 2 = Chưa từng
const membershipTabs = [
  { apiValue: null as number | null, label: "Tất cả" },
  { apiValue: 0 as number | null, label: "Thành viên" },
  { apiValue: 1 as number | null, label: "Đã từng là thành viên" },
  { apiValue: 2 as number | null, label: "Chưa từng là thành viên" },
];

// ── Verify filter ─────────────────────────────────────────────────────────────
const verifyLabel = computed(() => {
  if (verify.value === 1) return "Đã xác minh";
  if (verify.value === 0) return "Chưa xác minh";
  return "Xác minh";
});

const verifyItems = computed(() => [
  [
    {
      label: "Tất cả",
      icon: verify.value === null ? "i-heroicons-check" : undefined,
      onSelect: () => setVerify(null),
    },
    {
      label: "Đã xác minh",
      icon: verify.value === 1 ? "i-heroicons-check" : undefined,
      onSelect: () => setVerify(1),
    },
    {
      label: "Chưa xác minh",
      icon: verify.value === 0 ? "i-heroicons-check" : undefined,
      onSelect: () => setVerify(0),
    },
  ],
]);

// ── Type filter (multi-select: 1-5) ──────────────────────────────────────────
const typeOptions = [
  { label: "Tư thục", value: 1 },
  { label: "Công lập", value: 2 },
  { label: "Song ngữ", value: 3 },
  { label: "Quốc tế", value: 4 },
  { label: "Bán công lập", value: 5 },
];

const typeLabel = computed(() => {
  if (types.value.length === 0) return "Loại hình";
  if (types.value.length === 1) {
    return (
      typeOptions.find((t) => t.value === types.value[0])?.label ?? "Loại hình"
    );
  }
  return "Loại hình";
});

const typeItems = computed(() => {
  const opts = typeOptions.map((t) => ({
    label: t.label,
    icon: types.value.includes(t.value) ? "i-heroicons-check" : undefined,
    onSelect: () => toggleType(t.value),
  }));
  if (types.value.length === 0) return [opts];
  return [
    opts,
    [
      {
        label: "Xóa bộ lọc",
        icon: "i-heroicons-x-mark",
        onSelect: () => clearTypes(),
      },
    ],
  ];
});

// ── Sale filter ───────────────────────────────────────────────────────────────
const salerLabel = computed(() => {
  if (salerId.value === null) return "Sale";
  const found = salers.value.find((s) => s.id === salerId.value);
  return found ? `Sale: ${found.username}` : "Sale";
});

const salerDropdownItems = computed(() => [
  [
    {
      label: "Tất cả",
      icon: salerId.value === null ? "i-heroicons-check" : undefined,
      onSelect: () => setSalerId(null),
    },
    ...salers.value.map((s) => ({
      label: s.username,
      icon: salerId.value === s.id ? "i-heroicons-check" : undefined,
      onSelect: () => setSalerId(s.id),
    })),
  ],
]);

// ── CSKH filter ───────────────────────────────────────────────────────────────
const cskhLabel = computed(() => {
  if (customerId.value === null) return "Cskh";
  const found = cskhList.value.find((c) => c.id === customerId.value);
  return found ? `Cskh: ${found.username}` : "Cskh";
});

const cskhDropdownItems = computed(() => [
  [
    {
      label: "Tất cả",
      icon: customerId.value === null ? "i-heroicons-check" : undefined,
      onSelect: () => setCustomerId(null),
    },
    ...cskhList.value.map((c) => ({
      label: c.username,
      icon: customerId.value === c.id ? "i-heroicons-check" : undefined,
      onSelect: () => setCustomerId(c.id),
    })),
  ],
]);

// ── Static filters ────────────────────────────────────────────────────────────
const categoryOptions = [
  { id: 1, label: "Mầm non" },
  { id: 2, label: "Tiểu học" },
  { id: 3, label: "THCS" },
  { id: 4, label: "THPT" },
];

const categoryLabel = computed(() =>
  category.value === null
    ? "Danh mục"
    : (categoryOptions.find((c) => c.id === category.value)?.label ??
      "Danh mục"),
);

const categoryItems = computed(() => [
  [
    {
      label: "Tất cả",
      icon: category.value === null ? "i-heroicons-check" : undefined,
      onSelect: () => setCategory(null),
    },
    ...categoryOptions.map((c) => ({
      label: c.label,
      icon: category.value === c.id ? "i-heroicons-check" : undefined,
      onSelect: () => setCategory(c.id),
    })),
  ],
]);

const statusOptions = [
  { value: 1, label: "Đang hoạt động" },
  { value: 0, label: "Đã tắt" },
];

const statusLabel = computed(() =>
  status.value === null
    ? "Trạng thái web"
    : (statusOptions.find((s) => s.value === status.value)?.label ??
      "Trạng thái web"),
);

const webItems = computed(() => [
  [
    {
      label: "Tất cả",
      icon: status.value === null ? "i-heroicons-check" : undefined,
      onSelect: () => setStatus(null),
    },
    ...statusOptions.map((s) => ({
      label: s.label,
      icon: status.value === s.value ? "i-heroicons-check" : undefined,
      onSelect: () => setStatus(s.value),
    })),
  ],
]);
</script>
