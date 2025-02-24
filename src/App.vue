<script setup lang="ts">
import { ref } from 'vue'
import { darkTheme, NConfigProvider, NLayout, NLayoutHeader, NLayoutContent, NLayoutSider, NMenu, NButton, NSpace } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import { h } from 'vue'
import {
  HomeOutline as HomeIcon,
  LeafOutline as VegetationIcon,
  WaterOutline as SoilIcon,
  WarningOutline as PestIcon
} from '@vicons/ionicons5'
import { RouterLink } from 'vue-router'

const theme = ref<null | typeof darkTheme>(null)
const collapsed = ref(false)
const activeKey = ref<string | null>(null)

function toggleTheme() {
  theme.value = theme.value ? null : darkTheme
}

function renderIcon(icon: any) {
  return () => h(icon)
}

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'home'
          }
        },
        { default: () => '首页' }
      ),
    key: 'home',
    icon: renderIcon(HomeIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'vegetation'
          }
        },
        { default: () => '植被覆盖度' }
      ),
    key: 'vegetation',
    icon: renderIcon(VegetationIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'soil'
          }
        },
        { default: () => '土壤水分' }
      ),
    key: 'soil',
    icon: renderIcon(SoilIcon)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: 'pests'
          }
        },
        { default: () => '病虫害分布' }
      ),
    key: 'pests',
    icon: renderIcon(PestIcon)
  }
]
</script>

<template>
  <n-config-provider :theme="theme">
    <n-layout style="height: 100vh">
      <n-layout-header bordered class="header">
        <div class="header-content">
          <h1>草地生态监测系统</h1>
          <n-space>
            <n-button @click="toggleTheme">切换主题</n-button>
          </n-space>
        </div>
      </n-layout-header>
      <n-layout has-sider position="absolute" style="top: 64px;">
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <n-menu
            v-model:value="activeKey"
            :collapsed="collapsed"
            :collapsed-width="64"
            :options="menuOptions"
          />
        </n-layout-sider>
        <n-layout-content content-style="padding: 24px;">
          <router-view></router-view>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </n-config-provider>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  height: 100%;
}

.header {
  height: 64px;
  padding: 0 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header h1 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--primary-color);
}
</style>
