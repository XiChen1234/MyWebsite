<!-- 分页展示内容 -->
<script setup lang="ts">

</script>

<template>
  <div class="page">
    page
  </div>
</template>

<style scoped>
.page {
  width: 90%;
  min-height: 300px;
  background-color: var(--page-bg);
}

/* 小屏手机 */
@media (max-width: 480px) {
  .page {
    width: 100%;
  }
}
/* 平板 */
@media (min-width: 481px) and (max-width: 1023px) {
}
</style>
