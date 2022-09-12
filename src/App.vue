<script setup lang="ts">
import { ElMessage } from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { useDark, useToggle } from "@vueuse/core";
import DependenciesComponent from "./components/DependenciesComponent.vue";

const isDark = useDark();
const toggleTheme = useToggle(isDark);
const versionChrome = ref("?");
const versionElectron = ref("?");
const versionNode = ref("?");
const count = ref(0);
const dbPath = ref("?");
const usersData = reactive<Array<object>>([]);

const getVersions = () => {
  count.value++;
  window.api
    .getVersions()
    .then((versions: any) => {
      versionChrome.value = versions.chromium;
      versionElectron.value = versions.electron;
      versionNode.value = versions.node;
    })
    .catch((err: Error) => ElMessage.error(err.message));
};

onMounted(() => {
  window.api
    .getDBPath()
    .then((path: string) => {
      dbPath.value = path;
    })
    .catch((err: Error) => (dbPath.value = err.message));

    usersData.length = 0;
  window.api.getUsers().then((rows: Array<object>) => {
    rows.forEach((row) => {
      usersData.push(row);
    });
  }).catch((err: Error) => console.log(err));
});
</script>

<template>
  <div class="root-container">
    <div style="font-size: 22px; font-weight: 500">Electron Fullstack Quick Start</div>
    <div class="small-secondary-text">Path to application data: {{ dbPath }}</div>
    <div class="small-secondary-text">Users: {{ usersData }}</div>
    <el-switch inactive-text="Light" active-text="Dark" @change="toggleTheme(isDark)" v-model="isDark" />
    <el-button plain type="success" @click="getVersions">Get versions (Clicked {{ count }} times)</el-button>
    <el-space size="large">
      <div class="versions-container">
        <el-image src="chromium-svgrepo-com.svg" class="versions-image" />
        <div class="small-secondary-text">Chromium version: {{ versionChrome }}</div>
      </div>
      <div class="versions-container">
        <el-image src="electron.svg" class="versions-image" />
        <div class="small-secondary-text">Electron version: {{ versionElectron }}</div>
      </div>
      <div class="versions-container">
        <el-image src="nodejs-icon-logo-svgrepo-com.svg" class="versions-image" />
        <div class="small-secondary-text">Node JS version: {{ versionNode }}</div>
      </div>
    </el-space>
    <dependencies-component />
  </div>
</template>

<style>
html,
body {
  min-height: 100%;
  font-family: v-sans, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.root-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 30px;
  margin-top: 50px;
  align-items: center;
}
.small-secondary-text {
  color: var(--el-text-color-secondary);
  font-size: 13px;
}
.versions-image {
  width: 30vw;
  max-width: 280px;
}
.versions-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>
