<script lang="ts" setup>
import FileUpload from './components/FileUpload.vue'
import FileItem from './components/FileItem.vue'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export interface FileItem {
  id: string
  file: File
}

const fileList = ref<FileItem[]>([])

function removeFile(fileItem: FileItem) {
  fileList.value = fileList.value.filter((item) => {
    return item.id !== fileItem.id
  })
}

function handleFile(newFile: File) {
  const fileItem = {
    id: uuidv4(),
    file: newFile,
  }

  fileList.value = [...fileList.value, fileItem]
}
</script>

<template>
  <main class="wrapper">
    <file-upload @change="handleFile" />

    <div class="file-list">
      <file-item
        v-for="fileItem in fileList"
        :key="fileItem.id"
        :fileItem="fileItem"
        @remove="removeFile"
      />
    </div>
  </main>
</template>

<style lang="scss" scoped>
@import './styles/mixins.scss';

.wrapper {
  @include align-center;
  flex-direction: column;
  gap: 1.25rem;

  height: 100vh;
  width: 100vw;
  max-width: 29.5rem;

  padding: 0 1rem;
  margin: 0 auto;
}

.file-list {
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
