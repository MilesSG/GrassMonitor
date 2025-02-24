<template>
  <div class="vegetation">
    <n-grid :x-gap="12" :y-gap="8" :cols="2">
      <n-grid-item>
        <n-card title="植被覆盖度趋势">
          <div ref="coverageChartRef" style="height: 400px"></div>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="生物多样性指数">
          <div ref="biodiversityChartRef" style="height: 400px"></div>
        </n-card>
      </n-grid-item>
    </n-grid>

    <n-card title="优势物种分布" class="species-card">
      <n-data-table :columns="columns" :data="speciesData" :pagination="pagination" />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NCard, NGrid, NGridItem, NDataTable } from 'naive-ui'
import * as echarts from 'echarts'
import vegetationData from '../data/vegetation.json'

const coverageChartRef = ref<HTMLElement | null>(null)
const biodiversityChartRef = ref<HTMLElement | null>(null)

const columns = [
  {
    title: '物种名称',
    key: 'name'
  },
  {
    title: '学名',
    key: 'scientificName'
  },
  {
    title: '覆盖度 (%)',
    key: 'coverage'
  },
  {
    title: '分布区域',
    key: 'distribution'
  }
]

const speciesData = [
  {
    name: '大针茅',
    scientificName: 'Stipa grandis',
    coverage: 35,
    distribution: 'A1, A2, A3'
  },
  {
    name: '羊草',
    scientificName: 'Leymus chinensis',
    coverage: 28,
    distribution: 'A1, A2'
  },
  {
    name: '冷蒿',
    scientificName: 'Artemisia frigida',
    coverage: 15,
    distribution: 'A2, A3'
  }
]

const pagination = {
  pageSize: 10
}

onMounted(() => {
  const coverageChart = echarts.init(coverageChartRef.value!)
  const biodiversityChart = echarts.init(biodiversityChartRef.value!)

  const coverageOption = {
    title: {
      text: '植被覆盖度变化趋势'
    },
    tooltip: {
      trigger: 'axis' as const
    },
    xAxis: {
      type: 'category' as const,
      data: vegetationData.vegetationCoverage.map(item => item.date)
    },
    yAxis: {
      type: 'value' as const,
      name: '覆盖度 (%)'
    },
    series: [{
      type: 'line' as const,
      data: vegetationData.vegetationCoverage.map(item => item.coverage),
      areaStyle: {}
    }]
  }

  const biodiversityOption = {
    title: {
      text: '生物多样性指数变化',
      left: 'center',
      top: 10
    },
    tooltip: {
      trigger: 'axis' as const,
      axisPointer: {
        type: 'cross' as const
      }
    },
    legend: {
      data: ['Shannon指数', '物种数量'],
      top: 40
    },
    grid: {
      top: '20%',
      right: '10%',
      bottom: '15%',
      left: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category' as const,
      data: vegetationData.vegetationCoverage.map(item => item.date),
      axisLabel: {
        interval: 0,
        rotate: 30
      }
    },
    yAxis: [
      {
        type: 'value' as const,
        name: 'Shannon指数',
        position: 'left' as const,
        nameLocation: 'middle' as const,
        nameGap: 40,
        splitLine: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#91cc75'
          }
        },
        axisLabel: {
          color: '#91cc75'
        }
      },
      {
        type: 'value' as const,
        name: '物种数量',
        position: 'right' as const,
        nameLocation: 'middle' as const,
        nameGap: 40,
        splitLine: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#5470c6'
          }
        },
        axisLabel: {
          color: '#5470c6'
        }
      }
    ],
    series: [
      {
        name: 'Shannon指数',
        type: 'line' as const,
        data: vegetationData.vegetationCoverage.map(item => item.biodiversity.shannonIndex),
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
          color: '#91cc75'
        },
        itemStyle: {
          color: '#91cc75'
        }
      },
      {
        name: '物种数量',
        type: 'bar' as const,
        yAxisIndex: 1,
        data: vegetationData.vegetationCoverage.map(item => item.biodiversity.speciesCount),
        barWidth: '30%',
        itemStyle: {
          color: '#5470c6'
        }
      }
    ]
  }

  coverageChart.setOption(coverageOption)
  biodiversityChart.setOption(biodiversityOption)

  window.addEventListener('resize', () => {
    coverageChart.resize()
    biodiversityChart.resize()
  })
})
</script>

<style scoped>
.vegetation {
  padding: 24px;
}

.species-card {
  margin-top: 24px;
}
</style> 