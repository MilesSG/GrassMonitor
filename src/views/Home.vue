<template>
  <div class="home">
    <n-card title="系统概览" class="overview-card">
      <n-grid :x-gap="12" :y-gap="8" :cols="4">
        <n-grid-item>
          <n-statistic label="植被覆盖度">
            <n-number-animation
              ref="numberAnimationInstRef"
              :from="0"
              :to="85.2"
              :duration="3000"
              :active="true"
            />
            <template #suffix>
              %
            </template>
          </n-statistic>
        </n-grid-item>
        <n-grid-item>
          <n-statistic label="物种数量">
            <n-number-animation
              :from="0"
              :to="45"
              :duration="3000"
              :active="true"
            />
          </n-statistic>
        </n-grid-item>
        <n-grid-item>
          <n-statistic label="土壤水分">
            <n-number-animation
              :from="0"
              :to="32.5"
              :duration="3000"
              :active="true"
            />
            <template #suffix>
              %
            </template>
          </n-statistic>
        </n-grid-item>
        <n-grid-item>
          <n-statistic label="病虫害警报">
            <n-number-animation
              :from="0"
              :to="3"
              :duration="3000"
              :active="true"
            />
          </n-statistic>
        </n-grid-item>
      </n-grid>
    </n-card>

    <n-grid :x-gap="12" :y-gap="8" :cols="2" class="dashboard-grid">
      <n-grid-item>
        <n-card title="最新动态" class="dashboard-card">
          <n-timeline>
            <n-timeline-item
              type="success"
              title="植被覆盖度更新"
              content="区域A1植被覆盖度达到87.5%"
              time="2024-03-15 10:00"
            />
            <n-timeline-item
              type="warning"
              title="病虫害预警"
              content="发现新的蝗虫活动区域"
              time="2024-03-15 09:30"
            />
            <n-timeline-item
              type="info"
              title="土壤水分监测"
              content="土壤水分保持稳定状态"
              time="2024-03-15 09:00"
            />
          </n-timeline>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="系统状态" class="dashboard-card">
          <n-space vertical>
            <n-progress
              type="line"
              :percentage="100"
              :indicator-placement="'inside'"
              processing
              status="success"
            >
              无人机网络连接
            </n-progress>
            <n-progress
              type="line"
              :percentage="95"
              :indicator-placement="'inside'"
              status="success"
            >
              传感器网络状态
            </n-progress>
            <n-progress
              type="line"
              :percentage="85"
              :indicator-placement="'inside'"
              status="warning"
            >
              数据处理系统负载
            </n-progress>
          </n-space>
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script setup lang="ts">
import { NCard, NGrid, NGridItem, NStatistic, NNumberAnimation, NTimeline, NTimelineItem, NProgress, NSpace } from 'naive-ui'
</script>

<style scoped>
.home {
  padding: 24px;
}

.overview-card {
  margin-bottom: 24px;
}

.dashboard-grid {
  margin-top: 24px;
}

.dashboard-card {
  height: 100%;
}
</style> 