<script lang="ts" setup>
import { PhCloudArrowUp } from '@phosphor-icons/vue'

const emit = defineEmits<{
  (e: 'change', file: File): void
}>()

function handleFileSelect(event: Event) {
  const fileInput = event.target as HTMLInputElement
  const fileList = fileInput.files

  if (fileList) {
    const file = fileList[0]
    emit('change', file)
  }
}

function handleDrop(event: DragEvent) {
  event.preventDefault()
  const file = event.dataTransfer?.files[0]

  if (file) {
    emit('change', file)
  }
}
</script>

<template>
  <div class="file-upload" @dragover.prevent @drop="handleDrop">
    <label for="upload">
      <ph-cloud-arrow-up :size="48" />
      <strong>Importe seus arquivos</strong>
      <p>Arraste ou clique para fazer upload</p>

      <input type="file" id="upload" @change="handleFileSelect" />
    </label>
  </div>
</template>

<style lang="scss" scoped>
@import '../styles/mixins.scss';

.file-upload {
  background-color: var(--purple-100);
  border: 1px dashed var(--purple-300);
  border-radius: 8px;

  width: 100%;
  height: 10rem;

  label {
    @include align-center;
    flex-direction: column;

    cursor: pointer;
    height: 100%;
    width: 100%;
  }

  input[type='file'] {
    display: none;
  }

  svg {
    color: var(--purple-600);
    margin-bottom: 0.75rem;
  }

  strong {
    font-size: 1rem;
    color: var(--purple-500);
  }

  p {
    font-size: 0.875rem;
    color: var(--gray-300);
  }
}
</style>
