<script lang="ts" setup></script>

<template>
  <div>
    <h1>Projects Page</h1>
    <RouterLink :to="{ name: '/projects/[id]', params: { id: 'test' } }">Test Project</RouterLink>
  </div>
</template>
