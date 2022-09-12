<script setup lang="ts">
import { reactive } from "vue";

interface AppDependencies {
  dependencies: any;
  devDependencies: any;
}

const dependencies = reactive<string[]>([]);
const devDependencies = reactive<string[]>([]);

const getDependencies = () => {
  dependencies.length = 0;
  devDependencies.length = 0;
  window.api.getDependencies().then((app: AppDependencies) => {
    for (const dep of Object.keys(app.dependencies)) {
      dependencies.push(`${dep}: ${app.dependencies[dep]}`);
    }
    for (const dep of Object.keys(app.devDependencies)) {
      devDependencies.push(`${dep}: ${app.devDependencies[dep]}`);
    }
  });
};
</script>

<template>
  <el-button @click="getDependencies" size="small" type="primary" plain>Load dependencies</el-button>
  <el-space class="dependencies-container" style="width: 100%; justify-content: center" alignment="flex-start">
    <el-card :body-style="{ padding: '15px' }">
      <template #header>
        <div class="card-header">
          <span style="font-size: 13px">Dependencies</span>
        </div>
      </template>
      <div style="font-size: 13px; color: var(--el-text-color-secondary)" v-for="dep in dependencies" :key="dep">{{ dep }}</div>
    </el-card>
    <el-card :body-style="{ padding: '15px' }">
      <template #header>
        <div class="card-header">
          <span style="font-size: 13px">Dev Dependencies</span>
        </div>
      </template>
      <div style="font-size: 13px; color: var(--el-text-color-secondary)" v-for="devdep in devDependencies" :key="devdep">{{ devdep }}</div>
    </el-card>
  </el-space>
</template>

<style>
.dependencies-container .el-space__item .el-card .el-card__header {
  padding: 10px;
  text-align: center;
}
</style>
