<template>
  <div>
    <!-- 工具栏 -->
    <div class="filter-bar">
      <label for="type-filter">筛选类型：</label>
      <select id="type-filter" v-model="filterType">
        <option value="1">木材资源</option>
        <option value="2">矿产资源</option>
        <option value="3">麻类资源</option>
        <option value="4">怪物资源</option>
        <option value="5">半成品</option>
      </select>

      <FaButton @click="this.updateAll()">上传数据</FaButton>
    </div>

    <!-- 物品列表 -->
    <div class="item-box">
      <ItemCard
            v-for="(item, index) in filteredItems"
            :key="index"
            :imageSrc="item.imageSrc"
            :itemName="item.itemName"
            :itemPrice="item.itemNowPrice"
            :itemAmount="item.itemAmount"
            @update-price="update_price"
            @update-amount="update_amount"
          />
    </div>
  </div>
</template>

<script>
import TreeChart from "@/components/treechart.vue";
import ItemCard from "@/components/itemInfo.vue";
import FaButton from "@/ui/components/FaButton/index.vue"
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
  name: 'mrzh',
  components: {
    ItemCard
  },
  data() {
    return {
      updateItems: [],
      items: [],      // 定义产品数据数组
      filterType: '', // 当前筛选条件

      hostname: "http://192.168.1.2:8080",
    };
  },
  created() {
      this.fetchProducts(); // 在组件创建时调用 fetchProducts 方法
    },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get(this.hostname + '/api/getItems'); // 假设你的后端有一个 /api/products 端点
        var data_temp = response.data.data; // 将获取到的数据赋值给 products 数组
        for (var item of data_temp) {
          item.imageSrc = "/mrzh/" + item.itemName + ".png";
        }
        this.items = data_temp;
        console.log(this.items);
      } catch (error) {
        console.error('Error fetching products:', error); // 在控制台打印错误信息
        // 你可以在这里处理错误，比如显示一个错误消息给用户
      }
    },
    async updateAll() {
      axios.post(this.hostname + "/api/setItems", this.items)
           .then(response => {
             ElMessage({
               message: '数据上传完毕',
               type: 'success',
             });
           })
           .catch(error => {
             console.log(error);
             ElMessage({
               message: '数据上传失败',
               type: 'error',
             });
           });
    },
    update_price(name, price) {
      for (let i=0; i<this.items.length; i++) {
        if (this.items[i].itemName === name) {
          this.items[i].itemNowPrice = price;
        }
      }
    },
    update_amount(name, amount) {
      for (let i=0; i<this.items.length; i++) {
        if (this.items[i].itemName === name) {
          this.items[i].itemAmount = amount;
        }
      }
    }
  },
  computed: {
    // 根据筛选条件过滤 items
    filteredItems() {
      if (!this.filterType) {
        return this.items; // 如果没有筛选条件，返回全部
      }
      return this.items.filter(item => item.itemType2 === parseInt(this.filterType));
    }
  }
};
</script>

<style scoped>
.item-box {
  display: flex;
  flex-wrap: wrap;
  margin: 3px; /* 用于抵消子元素的外边距，以实现紧密的布局 */
}

.item-card {
  flex: 1 1 calc(20% - 20px); /* 每个卡片占据大约 1/3 的宽度，减去 20px 的外边距 */
  margin: 10px; /* 添加外边距以创建间隙 */
  box-sizing: border-box; /* 包括内边距和边框在内计算宽度 */
  /* 其他样式，如背景色、边框等，可以根据需要添加 */
}

/* 响应式布局调整 */
@media (max-width: 1024px) {
  .item-card {
    flex: 1 1 calc(50% - 20px); /* 在中等屏幕上每行显示 2 个卡片 */
  }
}

@media (max-width: 768px) {
  .item-card {
    flex: 1 1 calc(100% - 20px); /* 在小屏幕上每行显示 1 个卡片 */
  }
}

.filter-bar {
  margin-bottom: 20px;
}

.filter-bar label {
  margin-right: 10px;
}

.filter-bar select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
