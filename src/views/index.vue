<route lang="yaml">
meta:
  title: 主页
  icon: ant-design:home-twotone
</route>

<script setup lang="ts">
const tabbar = useTabbar();
const versionType = ref('basic')
watch(versionType, (val) => {
  if (val === 'pro') {
    location.href = `${location.origin}${location.pathname}`.replace('basic-example', 'pro-example')
  }
})

const fantasticStartkitInfo = ref({
  feature: [
    '玩家主动监控物资价格',
    '不打开游戏就能知道市场情况',
    '所有玩家共同完善信息'
  ],
})

const fantasticAdminInfo = ref({
  imageVisible: false,
  index: 0,
  data: [
  ],
})

const oneStepAdminInfo = ref({
  imageVisible: false,
  index: 0,
  data: [
    'https://one-step-admin.hurui.me/preview1.png',
    'https://one-step-admin.hurui.me/preview2.png',
    'https://one-step-admin.hurui.me/preview3.png',
    'https://one-step-admin.hurui.me/preview4.png',
    'https://one-step-admin.hurui.me/preview5.png',
    'https://one-step-admin.hurui.me/preview6.png',
  ],
})

function open(url: string) {
  window.open(url, '_blank')
}
</script>

<template>
  <div>
    <FaPageHeader>
      <template #title>
        <div class="flex items-center gap-4">
          欢迎使用 MarketTool
        </div>
      </template>
      <template #description>
        <div class="text-sm/6">
          <div>
            这是一款<b class="text-emphasis">赚金</b>计算工具
          </div>
        </div>
      </template>
    </FaPageHeader>
    <div class="w-full flex flex-col gap-4 px-4 xl-flex-row">
      <FaPageMain class="m-0 flex-1" title-class="flex flex-wrap items-center justify-between gap-4">
        <template #title>
          <div class="title-info">
            <img src="/mrzh/交易之城.png">
            <div>
              <h1 class="c-[#41b883]">
                交易之城
              </h1>
              <h2>监控每种资源的价格</h2>
            </div>
          </div>
          <div class="ms-auto">
            <FaButton @click="tabbar.open('/mrzh/market')">
              进入
            </FaButton>
          </div>
        </template>
        <ul class="m-0 list-disc px-8 text-sm leading-6 space-y-1">
          <li v-for="item in fantasticStartkitInfo.feature" :key="item">
            {{ item }}
          </li>
        </ul>
      </FaPageMain>
    </div>
  </div>
</template>

<style scoped>
.text-emphasis {
  text-emphasis-style: "❤";
}

.title-info {
  --uno: flex items-center gap-4;

  img {
    --uno: block w-12 h-12;
  }

  h1 {
    --uno: m-0 text-2xl;
  }

  h2 {
    --uno: m-0 text-base text-secondary-foreground/50 font-normal;
  }
}
</style>
