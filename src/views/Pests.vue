<template>
  <div class="pests">
    <n-grid :x-gap="12" :y-gap="8" :cols="2">
      <n-grid-item>
        <n-card title="病虫害分布热力图">
          <div ref="heatmapRef" style="height: 400px"></div>
        </n-card>
      </n-grid-item>
      <n-grid-item>
        <n-card title="病虫害类型分布">
          <div ref="pieChartRef" style="height: 400px"></div>
        </n-card>
      </n-grid-item>
    </n-grid>

    <n-card title="病虫害详细信息" class="details-card">
      <n-data-table :columns="columns" :data="pestData" :pagination="pagination" />
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NCard, NGrid, NGridItem, NDataTable } from 'naive-ui'
import * as echarts from 'echarts'
import pestsData from '../data/pests.json'

const heatmapRef = ref<HTMLElement | null>(null)
const pieChartRef = ref<HTMLElement | null>(null)

const columns = [
  {
    title: '区域ID',
    key: 'id'
  },
  {
    title: '病虫害类型',
    key: 'type'
  },
  {
    title: '严重程度',
    key: 'severity',
    render(row: any) {
      return `${(row.severity * 100).toFixed(1)}%`
    }
  },
  {
    title: '受影响面积 (㎡)',
    key: 'affectedArea'
  }
]

const pestData = pestsData.pestDistribution[0].hotspots

const pagination = {
  pageSize: 10
}

onMounted(() => {
  const heatmapChart = echarts.init(heatmapRef.value!)
  const pieChart = echarts.init(pieChartRef.value!)

  // 统计各类型病虫害的数量
  const pestTypes = pestsData.pestTypes.map(type => ({
    name: type.name,
    value: pestsData.pestDistribution[0].hotspots.filter(spot => spot.type === type.name).length
  }))

  // 配置散点图
  const heatmapOption = {
    title: {
      text: '病虫害分布图'
    },
    tooltip: {
      trigger: 'item' as const,
      formatter: function (params: any) {
        const data = params.data
        return `位置: (${data[0]}, ${data[1]})<br/>严重程度: ${(data[2] * 100).toFixed(1)}%`
      }
    },
    xAxis: {
      type: 'value' as const,
      name: '经度',
      min: 116.65,
      max: 116.72
    },
    yAxis: {
      type: 'value' as const,
      name: '纬度',
      min: 43.54,
      max: 43.58
    },
    visualMap: [{
      min: 0,
      max: 1,
      calculable: true,
      inRange: {
        color: ['#50a3ba', '#eac736', '#d94e5d']
      },
      orient: 'horizontal' as const,
      left: 'center',
      bottom: '5%'
    }],
    series: [{
      name: '病虫害分布',
      type: 'scatter' as const,
      symbolSize: 40,
      data: pestsData.pestDistribution[0].hotspots.map(spot => [
        spot.location.lng,
        spot.location.lat,
        spot.severity
      ]),
      label: {
        show: true,
        formatter: function(params: any) {
          return (params.data[2] * 100).toFixed(0) + '%'
        }
      },
      itemStyle: {
        opacity: 0.8
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  }

  // 配置饼图
  const pieOption = {
    title: {
      text: '病虫害类型分布',
      left: 'center',
      top: 10
    },
    tooltip: {
      trigger: 'item' as const,
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical' as const,
      left: '5%',
      top: 'middle',
      itemWidth: 10,
      itemHeight: 10,
      data: pestTypes.map(type => type.name)
    },
    series: [{
      type: 'pie' as const,
      radius: ['40%', '70%'],
      center: ['60%', '50%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'outside',
        formatter: '{b}\n{c}个 ({d}%)'
      },
      labelLine: {
        show: true,
        length: 15,
        length2: 10
      },
      data: pestTypes.map(type => ({
        name: type.name,
        value: type.value,
        itemStyle: {
          color: type.name === 'grasshopper' ? '#91cc75' : 
                 type.name === 'leafrust' ? '#fac858' : '#ee6666'
        }
      })),
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }]
  }

  heatmapChart.setOption(heatmapOption)
  pieChart.setOption(pieOption)

  window.addEventListener('resize', () => {
    heatmapChart.resize()
    pieChart.resize()
  })
})
</script>

<style scoped>
.pests {
  padding: 24px;
}

.details-card {
  margin-top: 24px;
}
</style> 