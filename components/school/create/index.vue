<template>
  <div class="bg-white dark:bg-gray-900 inline-flex flex-col w-full">
    <!-- Title -->
    <div class="px-3 pt-8 pb-4">
      <h1 class="text-4xl font-bold">Thêm mới</h1>
    </div>

    <!-- Row 1: Tên chính / Tên phụ / Hậu tố -->
    <div class="p-3 flex justify-start items-start gap-3">
      <UFormField label="Tên chính" required class="flex-1">
        <UInput
          v-model="form.name"
          placeholder="Ví dụ: Mầm non Hòa Bình"
          size="sm"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Tên phụ" class="w-40">
        <UInput
          v-model="form.subName"
          placeholder="Ví dụ: tên tiêng Anh"
          size="sm"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Hậu tố" class="w-28">
        <UInput
          v-model="form.suffix"
          placeholder="Ví dụ: Cơ sở 3"
          size="sm"
          class="w-full"
        />
      </UFormField>
    </div>

    <!-- Row 2: Phân loại / Phân loại chi tiết / Loại hình -->
    <div class="p-3 flex justify-start items-start gap-3">
      <UFormField label="Phân loại" required class="w-36">
        <USelect
          v-model="form.category"
          :items="categories"
          size="sm"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Phân loại chi tiết" required class="flex-1">
        <USelectMenu
          v-model="form.subCategories"
          :items="subCategories"
          multiple
          searchable
          size="sm"
          placeholder="Chọn chi tiết..."
          class="w-full"
        />
      </UFormField>

      <UFormField label="Loại hình" required class="w-24">
        <USelect v-model="form.type" :items="types" size="sm" class="w-full" />
      </UFormField>
    </div>

    <!-- Row 3: Nhận học sinh/học viên -->
    <div class="p-3 flex justify-start items-start gap-3">
      <UFormField label="Nhận học sinh/học viên" required class="flex-1">
        <div class="flex items-center gap-3">
          <!-- From -->
          <div class="flex-1 flex items-center gap-1">
            <UInputNumber
              v-model="form.ageFrom"
              :min="0"
              orientation="horizontal"
              size="xs"
              class="flex-1"
            />
            <USelect
              v-model="form.unitFrom"
              :items="ageUnits"
              size="xs"
              class="w-24"
            />
          </div>

          <span class="w-14 text-center text-xs font-medium shrink-0">Đến</span>

          <!-- To -->
          <div class="flex-1 flex items-center gap-1">
            <UInputNumber
              v-model="form.ageTo"
              :min="0"
              orientation="horizontal"
              size="xs"
              class="flex-1"
            />
            <USelect
              v-model="form.unitTo"
              :items="ageUnits"
              size="xs"
              class="w-24"
            />
          </div>
        </div>
      </UFormField>
    </div>

    <!-- Address section -->
    <div class="p-3 flex flex-wrap justify-start items-start gap-3">
      <!-- Heading -->
      <div class="w-full py-1">
        <h2 class="text-lg font-bold">Địa chỉ</h2>
      </div>

      <UFormField label="Tỉnh/Thành phố" required class="w-40">
        <USelect
          v-model="form.province"
          :items="provinces"
          size="sm"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Xã/Phường" required class="w-48">
        <USelect v-model="form.ward" :items="wards" size="sm" class="w-full" />
      </UFormField>

      <UFormField label="Quận/Huyện (cũ)" required class="w-40">
        <USelect
          v-model="form.district"
          :items="districts"
          size="sm"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Đường/Phố/Khu đô thị" class="w-40">
        <USelect
          v-model="form.street"
          :items="streets"
          size="sm"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Địa chỉ chi tiết" required class="w-48">
        <UInput
          v-model="form.addressDetail"
          placeholder="Ví dụ: Số nhà, ngách, ngõ"
          size="sm"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Ghi chú" class="w-40">
        <UInput
          v-model="form.note"
          placeholder="Ví dụ: đoạn giữa ngã tư đèn xanh..."
          size="sm"
          class="w-full"
        />
      </UFormField>

      <!-- Map -->
      <div
        class="flex-1 min-w-full h-48 relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800"
      >
        <div class="w-full h-full flex items-center justify-center">
          <div class="flex flex-col items-center text-gray-300">
            <UIcon name="i-heroicons-map" class="w-10 h-10 mb-2" />
            <span class="text-sm font-bold">Google Maps Placeholder</span>
          </div>
        </div>
        <div
          class="absolute bottom-2 left-2 right-2 bg-white dark:bg-gray-900 rounded-lg shadow-lg p-2 flex items-center gap-3"
        >
          <UInput
            v-model="form.mapLink"
            icon="i-heroicons-link"
            placeholder="Link Google Maps"
            size="sm"
            variant="none"
            class="flex-1"
          />
          <UButton color="primary" size="sm" class="font-medium shrink-0">
            Xác nhận
          </UButton>
        </div>
      </div>
    </div>

    <!-- Submit -->
    <div class="p-3 flex items-center gap-3">
      <UButton
        color="primary"
        size="sm"
        trailing-icon="i-heroicons-arrow-right"
        class="font-medium"
      >
        Tiếp theo
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
const categories = [
  "Trường mầm non",
  "Trường tiểu học",
  "Trường trung học cơ sở",
  "Trường trung học phổ thông",
  "Trung tâm ngoại ngữ",
  "Trung tâm kỹ năng sống",
  "Trung tâm âm nhạc / nghệ thuật",
  "Cơ sở chăm sóc sức khỏe",
  "Nhà trẻ / giữ trẻ",
  "Câu lạc bộ thể thao",
];

const subCategories = [
  "Nhà trẻ",
  "Mẫu giáo",
  "Mầm non",
  "Tiểu học",
  "Trung học cơ sở",
  "Trung học phổ thông",
  "Luyện thi đại học",
  "Ngoại ngữ",
  "Kỹ năng sống",
  "Âm nhạc",
  "Mỹ thuật",
  "Thể thao",
  "Năng khiếu",
  "STEM / Robotics",
  "Tin học",
];

const types = [
  "Tư thục",
  "Công lập",
  "Bán công",
  "Dân lập",
  "Quốc tế",
  "Liên kết quốc tế",
];

const ageUnits = ["Tháng", "Tuổi"];

const provinces = [
  "Thành phố Hà Nội",
  "TP. Hồ Chí Minh",
  "Thành phố Đà Nẵng",
  "Tỉnh Bình Dương",
  "Tỉnh Đồng Nai",
  "Tỉnh Bà Rịa - Vũng Tàu",
  "Thành phố Cần Thơ",
  "Tỉnh Hải Phòng",
];

const districts = [
  "Quận Ba Đình",
  "Quận Đống Đa",
  "Quận Cầu Giấy",
  "Quận Hai Bà Trưng",
  "Quận Hoàn Kiếm",
  "Quận Tây Hồ",
  "Quận Long Biên",
  "Quận Hoàng Mai",
  "Quận Thanh Xuân",
  "Huyện Đông Anh",
  "Huyện Gia Lâm",
];

const wards = [
  "Phường Văn Miếu - Quốc Tử Giám",
  "Phường Láng Hạ",
  "Phường Láng Thượng",
  "Phường Trung Liệt",
  "Phường Khâm Thiên",
  "Phường Nam Đồng",
  "Phường Ô Chợ Dừa",
];

const streets = [
  "Phố Tôn Đức Thắng",
  "Phố Tây Sơn",
  "Phố Chùa Bộc",
  "Phố Nguyễn Lương Bằng",
  "Phố Xã Đàn",
  "Đường Láng",
  "Phố Hoàng Cầu",
  "Phố Kim Hoa",
];

const form = reactive({
  name: "",
  subName: "",
  suffix: "",
  category: categories[2],
  subCategories: ["Mầm non", "Tiểu học", "Trung học cơ sở"] as string[],
  type: types[0],
  ageFrom: 0,
  unitFrom: "Tháng",
  ageTo: 0,
  unitTo: "Tháng",
  province: provinces[0],
  district: districts[0],
  ward: wards[0],
  street: streets[0],
  addressDetail: "",
  note: "",
  mapLink: "",
});
</script>
