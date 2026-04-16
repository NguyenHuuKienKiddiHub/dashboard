<template>
  <div class="flex flex-col justify-start items-start">
    <!-- Page title -->
    <div class="w-full px-3 pt-8 pb-4 flex flex-col justify-center items-center">
      <div class="self-stretch text-[var(--ui-text-highlighted)] text-3xl font-bold font-['Nunito'] leading-9">
        Liên hệ
      </div>
    </div>

    <template v-if="pending">
      <div class="w-full p-6 flex justify-center">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin text-[var(--ui-text)] w-6 h-6" />
      </div>
    </template>

    <template v-else-if="contact">
      <SchoolEditContactSection
        title="Hotline"
        subtitle="Số nhận tin nhắn yêu cầu tư vấn"
        :items="toRecords(contact.hotlines)"
        value-key="hotline"
        @save="(items) => saveSection('hotlines', items)"
      />

      <SchoolEditContactSection
        title="Số tuyển sinh"
        subtitle="Số nhận tin nhắn yêu cầu tư vấn"
        :items="toRecords(contact.phones)"
        value-key="phone"
        @save="(items) => saveSection('phones', items)"
      />

      <SchoolEditContactSection
        title="Email"
        :items="toRecords(contact.emails)"
        value-key="email"
        @save="(items) => saveSection('emails', items)"
      />

      <SchoolEditContactSection
        title="Zalo"
        :items="toRecords(contact.zalo)"
        value-key="phone"
        @save="(items) => saveSection('zalo', items)"
      />

      <SchoolEditContactSection
        title="Facebook"
        :items="toRecords(contact.facebook)"
        value-key="url"
        @save="(items) => saveSection('facebook', items)"
      />

      <SchoolEditContactSection
        title="Website"
        :items="toRecords(contact.website)"
        value-key="url"
        @save="(items) => saveSection('website', items)"
      />
    </template>

    <!-- Footer actions -->
    <div class="self-stretch p-3 inline-flex justify-start items-center gap-3">
      <UButton
        color="primary"
        size="sm"
        trailing-icon="i-heroicons-arrow-right"
        @click="navigateTo(`/school/${schoolId}`)"
      >
        Tiếp theo
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Contact } from '~/types/models'

const route = useRoute()
const schoolId = route.params.id as string

const { get, save } = useSchoolContactApi()
const { data, pending } = get(schoolId)

const contact = computed(() => (data.value as { data: Contact } | null)?.data ?? null)

type ContactSection = keyof Pick<Contact, 'hotlines' | 'phones' | 'emails' | 'zalo' | 'facebook' | 'website'>

function toRecords(arr: Array<Record<string, string>> | null | undefined): Array<Record<string, string>> {
  return (arr ?? []) as Array<Record<string, string>>
}

async function saveSection(section: ContactSection, items: Array<Record<string, string>>) {
  await save(schoolId, { [section]: items })
}
</script>
