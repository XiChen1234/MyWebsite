<!-- 标签墙组件 -->
<script setup lang="ts">
interface Tag {
  name: string;
  color?: string;
}
interface TagGroup {
  name: string;
  tags: Tag[];
}

const props = defineProps<{
  data: TagGroup[];
}>();

const getAnimationDuration = (index: number): string => {
  const durations = [20, 10, 15];
  return `${durations[index % durations.length]}s`;
};
</script>

<template>
  <div class="tags-wall">
    <div class="tag-row" v-for="(tagsRow, rowIndex) in props.data" :key="rowIndex"
      :style="{ '--t': getAnimationDuration(rowIndex) }">
      <div>
        <span class="tag" v-for="(tag, index) in tagsRow.tags" :key="index"
        :style="tag.color ? { backgroundColor: tag.color, color: 'var(--neutral-50)' } : {}">
          {{ tag.name }}
        </span>
      </div>
      <div>
        <span class="tag" v-for="(tag, index) in tagsRow.tags" :key="index"
        :style="tag.color ? { backgroundColor: tag.color, color: 'var(--neutral-50)' } : {}">
          {{ tag.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tags-wall {
  width: 100%;
  overflow: hidden;
  border-radius: 20px;
}

.tag-row {
  display: flex;
}

.tag-row div {
  display: flex;
  white-space: nowrap;
  animation: scroll var(--t) linear infinite;
}

.tag-row div:nth-child(2) {
  animation: scroll-reverse var(--t) linear infinite;
  animation-delay: calc(var(--t) / -2);
}


@keyframes scroll {
  from {
    transform: translate(100%);
  }

  to {
    transform: translate(-100%);
  }
}

@keyframes scroll-reverse {
  from {
    transform: translate(0%);
  }

  to {
    transform: translate(-200%);
  }
}

.tag {
  display: inline-flex;
  margin: 10px;
  letter-spacing: .2em;
  background-color: var(--bg-tag);
  color: var(--text-main);
  padding: 5px 10px;
  border-radius: 5px;
}
</style>
