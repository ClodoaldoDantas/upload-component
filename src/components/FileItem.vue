<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { PhFile, PhX } from '@phosphor-icons/vue'
import ProgressBar from './ProgressBar.vue'

import { FileItem } from '../App.vue'
import { formatFileSize } from '../utils/format-file-size'

interface Props {
  fileItem: FileItem
}

const { fileItem } = defineProps<Props>()
const emit = defineEmits<{
  (e: 'remove', fileItem: FileItem): void
}>()

const progressValue = ref(0)
const fileIsUploaded = computed(() => progressValue.value === 100)

const handleRemoveFile = () => {
  emit('remove', fileItem)
}

const fakeUpload = async () => {
  let value = 0

  while (value < 100) {
    await new Promise((resolve) => setTimeout(resolve, 500))
    value += Math.floor(Math.random() * 10)
    progressValue.value = value
  }

  progressValue.value = 100
}

onMounted(() => {
  fakeUpload()
})
</script>

<template>
  <div class="file">
    <div class="file-icon-wrapper" :class="{ done: fileIsUploaded }">
      <ph-file :size="24" weight="fill" />
    </div>

    <div class="file-info">
      <div class="file-name">
        <strong>{{ fileItem.file.name }}</strong>

        <button
          type="button"
          @click="handleRemoveFile()"
          v-if="!fileIsUploaded"
        >
          <ph-x :size="20" />
        </button>
      </div>

      <span class="file-size">{{ formatFileSize(fileItem.file.size) }}</span>
      <progress-bar :value="progressValue" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

.file {
  background-color: var(--white);
  box-shadow: 0px 4px 16px #eae2fd;
  border-radius: 8px;

  width: 100%;
  padding: 0.5rem;

  display: flex;
  align-items: stretch;
  gap: 0.75rem;
}

.file-icon-wrapper {
  width: 3rem;
  height: 3.5rem;
  background-color: var(--purple-200);
  border-radius: 4px;

  @include align-center;

  svg {
    color: var(--purple-400);
  }

  &.done {
    background-color: var(--green-100);

    svg {
      color: var(--green-500);
    }
  }
}

.file-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.file-name {
  display: flex;
  align-items: center;
  justify-content: space-between;

  strong {
    font-size: 0.875rem;
    color: var(--gray-500);
  }

  button {
    background: transparent;
    border: 0;

    svg {
      color: var(--purple-600);
    }
  }
}

.file-size {
  font-size: 0.75rem;
  font-weight: 500;
}
</style>
