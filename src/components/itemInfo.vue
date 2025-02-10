<template>
  <div class="item-card">
    <div class="item-image">
      <img :src="imageSrc" alt="item Image" />
    </div>
    <div class="item-info">
      <h2>{{ itemName }}</h2>
      <div class="info-bar">
        <div class="info-item">
          <span class="info-label">市场价格:</span>
          <input type="number"
                v-model="localItemPrice"
                @input="updatePrice"
                min="0">
        </div>
        <div class="info-item">
          <span class="info-label">成本:</span>
          <div class="info-value">{{ itemCost }}</div>
        </div>
        <div class="info-item">
          <span class="info-label">利润:</span>
          <div class="info-value">{{ localItemPrice - itemCost }}</div>
        </div>
        <div class="info-item">
          <span class="info-label">数量:</span>
          <input type="number"
                v-model="localItemAmount"
                @input="updateAmount"
                min="0">
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'itemCard',
  props: {
    imageSrc: {
      type: String,
      required: true
    },
    itemName: {
      type: String,
      required: true
    },
    itemPrice: {
      type: Number,
      required: true
    },
    itemAmount: {
      type: Number,
      required: true
    },
    itemCost: {
      type: Number,
      required: false,
      default: 0
    },
  },
  data() {
      return {
        localItemPrice: this.itemPrice, // 本地存储的价格
        localItemAmount: this.itemAmount // 本地存储的数量
      };
    },
  methods: {
    // 更新价格
    updatePrice() {
      this.$emit('update-price', this.itemName, this.localItemPrice);
    },
    // 更新数量
    updateAmount() {
      this.$emit('update-amount', this.itemName, this.localItemAmount);
    }
  },
  watch: {
    // 监听 prop 的变化，同步到本地数据
    itemPrice(newPrice) {
      this.localItemPrice = newPrice;
    },
    itemAmount(newAmount) {
      this.localItemAmount = newAmount;
    }
  }
};
</script>

<style scoped>
.item-card {
  display: flex;
  width: 100%; /* 默认宽度为 100% */
  min-width: 35rem; /* 最小宽度 */
  max-width: 50rem; /* 最大宽度 */
  height: 8rem;
  padding: 16px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
}

.item-info input {
  width: 80px;
}

.item-image img {
  width: 100px;
  height: 53px;
  object-fit: cover;
  border-radius: 8px 0 0 8px;
}

.item-info {
  flex: 1;
  padding-left: 16px;
}

.item-info h2 {
  margin: 0 0 8px;
  font-size: 1.5em;
}

.item-info p {
  margin: 0 0 8px;
  color: #555;
}

.info-bar {
  display: flex; /* 使用 Flexbox 布局 */
  align-items: center; /* 垂直居中 */
  justify-content: space-between; /* 信息项均匀分布 */
  padding: 16px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
}

.info-item {
  display: flex;
  align-items: center;
  margin: 0 10px; /* 信息项之间的间距 */
}

.info-label {
  margin-right: 8px; /* 标签和值之间的间距 */
  font-weight: bold;
  color: #333;
}

</style>
