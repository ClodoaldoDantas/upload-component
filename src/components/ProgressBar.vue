<script lang="ts" setup>
interface Props {
  value: number
}

const { value } = defineProps<Props>()
</script>

<template>
  <div class="progress" :class="{ done: value === 100 }">
    <div class="bar">
      <div :style="`width: ${value}%`"></div>
    </div>

    <span class="percentage">{{ value }}%</span>
  </div>
</template>

<style lang="scss" scoped>
.progress {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;

  &.done .bar > div {
    background: var(--green-500);
  }

  &.done .percentage {
    color: var(--green-600);
  }
}

.bar {
  flex: 1;
  height: 8px;
  background: var(--gray-100);
  border-radius: 999px;

  & > div {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(
      90deg,
      rgba(58, 97, 237, 0.52) 0%,
      #7c3aed 100%
    );
    transition: width 200ms linear;
  }
}

.percentage {
  font-weight: 500;
  font-size: 0.75rem;
  color: var(--gray-200);
}
</style>
