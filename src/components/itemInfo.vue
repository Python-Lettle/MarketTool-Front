<template>
  <div class="item-card">
    <div class="item-image">
      <img :src="imageSrc" alt="item Image" />
      <h2 class="item-name">{{ itemName }}</h2>
    </div>
    <div class="item-info">
      <div class="info-bar">
        <div class="info-item">
          <span class="info-label">价格:</span>
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
  display: inline;
  width: 100%; /* 默认宽度为 100% */
  padding: 16px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgb(0 0 0 / 10%);
}

.item-image img {
  display: inline-block;
  width: 100px;
  height: 53px;
}

.item-info {
  flex: 1;
  padding-left: 16px;
}

.item-info p {
  margin: 0 0 8px;
  color: #555;
}

.item-name {
  display: inline-block;
  margin: 0 10px 8px;
  font-size: 1.5em;
}

.info-bar {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  gap: 10px; /* 信息项之间的间距 */
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
}

.info-item {
  display: flex;
  flex: 1 1 calc(50% - 8px); /* 每行显示两个，减去间距 */
  align-items: center;
  max-width: 45%;
  padding: 8px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgb(0 0 0 / 10%);
}

.info-item input {
  max-width: 50%;
}

.info-label {
  width: 50%;
  height: 25px;
  margin-right: 8px;
  font-weight: bold;
  color: #333;
}


</style>
