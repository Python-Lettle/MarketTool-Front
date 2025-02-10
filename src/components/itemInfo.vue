<template>
  <div class="item-card">
    <div class="item-image">
      <img :src="imageSrc" alt="item Image" />
    </div>
    <div class="item-info">
      <h2>{{ itemName }}</h2>
      <p>市场价格: <input
                type="number"
                v-model="localItemPrice"
                @input="updatePrice"
                min="0"
                ></p>
      <p>数量: <input
                type="number"
                v-model="localItemAmount"
                @input="updateAmount"
                min="0"
                > </p>

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
    }
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
  width: 100%; /* 默认宽度为 100% */
  min-width: 24rem; /* 最小宽度 */
  max-width: 35rem; /* 最大宽度 */
  height: 10rem;


  background-color: #FFF;

  display: flex;
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.item-info input {
  width: 80px;
}

.item-image img {
  width: 205px;
  height: 106px;
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
</style>
