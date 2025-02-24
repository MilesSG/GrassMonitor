<template>
  <div class="soil">
    <n-grid :x-gap="12" :y-gap="8" :cols="2">
      <n-grid-item>
        <n-card title="土壤水分时间序列">
          <div ref="moistureChartRef" style="height: 400px"></div>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="土壤质量指标">
          <div ref="qualityChartRef" style="height: 400px"></div>
        </n-card>
      </n-grid-item>
    </n-grid>

    <n-card title="传感器数据" class="sensor-card">
      <n-data-table :columns="columns" :data="sensorData" :pagination="pagination" />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NCard, NGrid, NGridItem, NDataTable } from 'naive-ui'
import * as echarts from 'echarts'
import soilData from '../data/soil.json'

const moistureChartRef = ref<HTMLElement | null>(null)
const qualityChartRef = ref<HTMLElement | null>(null)

const columns = [
  {
    title: '传感器ID',
    key: 'id'
  },
  {
    title: '深度 (cm)',
    key: 'depth'
  },
  {
    title: '水分含量 (%)',
    key: 'value'
  },
  {
    title: '位置',
    key: 'location',
    render(row: any) {
      return `${row.location.lat.toFixed(4)}, ${row.location.lng.toFixed(4)}`
    }
  }
]

const sensorData = soilData.soilMoisture[0].sensors

const pagination = {
  pageSize: 10
}

onMounted(() => {
  const moistureChart = echarts.init(moistureChartRef.value!)
  const qualityChart = echarts.init(qualityChartRef.value!)

  // 配置土壤水分时间序列图表
  const moistureOption = {
    title: {
      text: '土壤水分变化趋势'
    },
    tooltip: {
      trigger: 'axis' as const
    },
    xAxis: {
      type: 'category' as const,
      data: soilData.soilMoisture.map(item => item.timestamp.split('T')[1])
    },
    yAxis: {
      type: 'value' as const,
      name: '水分含量 (%)'
    },
    series: soilData.soilMoisture[0].sensors.map(sensor => ({
      name: `深度 ${sensor.depth}cm`,
      type: 'line' as const,
      data: soilData.soilMoisture.map(item => 
        item.sensors.find(s => s.id === sensor.id)?.value
      )
    }))
  }

  // 配置土壤质量指标图表
  const qualityOption = {
    title: {
      text: '土壤质量指标'
    },
    tooltip: {
      trigger: 'axis' as const,
      axisPointer: {
        type: 'shadow' as const
      }
    },
    xAxis: {
      type: 'category' as const,
      data: ['pH', '有机质', '氮', '磷', '钾']
    },
    yAxis: {
      type: 'value' as const,
      name: '含量'
    },
    series: [{
      type: 'bar' as const,
      data: [
        soilData.soilQuality.ph,
        soilData.soilQuality.organicMatter,
        soilData.soilQuality.nitrogen,
        soilData.soilQuality.phosphorus,
        soilData.soilQuality.potassium
      ]
    }]
  }

  moistureChart.setOption(moistureOption)
  qualityChart.setOption(qualityOption)

  window.addEventListener('resize', () => {
    moistureChart.resize()
    qualityChart.resize()
  })
})
</script>

<style scoped>
.soil {
  padding: 24px;
}

.sensor-card {
  margin-top: 24px;
}
</style> 