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
            :itemCost="item.cost"
            @update-price="update_price"
            @update-amount="update_amount"
          />
    </div>
  </div>
</template>

<script>
import ItemCard from "@/components/itemInfo.vue";
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

      // 合成配方
      recipes:
      {
        "生铁" : {"铁矿" : 2, "小树枝" : 4},
        "六角钉" : {"生铁" : 2, "硬木藤蔓" : 4, "骨头" : 2},
        "黑火药" : {"燧石" : 2},
        "粗布条" : {"植物根茎" : 2},
        "铁铸件" : {"锡矿" : 4, "铁矿" : 4, "木心" : 4},
        "螺钉" : {"铁铸件" : 1, "小枝芽" : 4, "麻籽" : 1, "硫黄" : 2},
        "布" : {"粗布条" : 1, "麻茎皮" : 1},
        "塑料" : {"树脂" : 8, "硝石" : 2, "布" : 1, "麻茎杆" : 2},
        "硬铝合金" : {"铝矿" : 5, "锡矿" : 5, "老柏木" : 9, "树油" : 5},
        "无烟火药" : {"黑火药" : 1, "硝石" : 3, "蓝晶石" : 3},
        "尼龙布" : {"亚麻叶" : 3, "亚麻花瓣" : 1, "柏树叶" : 5},
        "钢" : {"生铁" : 2, "硅晶矿" : 3, "钨棒" : 1},
        "钢管" : {},
        "涤纶布" : {"黄麻叶" : 3, "亚麻叶" : 3, "阔树叶" : 5, "黄麻杆" : 1},
        "皮革" : {},
        "弹簧" : {"银矿" : 6, "深红银矿" : 3, "铜矿" : 6, "老橡木" : 12},
        "工程塑料" : {},
        "呢绒布" : {"剑麻叶" : 3, "红麻皮" : 2, "海麻叶" : 2, "硬甲尾" : 2, "禽羽" : 2},
        "缝纫线" : {},
        "武器零件" : {"红杉木" : 13, "钢" : 1, "金矿" : 7, "稀土矿" : 4, "兽蹄" : 2},
        "钛合金" : {"杉叶" : 7, "稀土矿" : 4, "兽脊" : 2, "硬铝合金" : 1, "弹簧" : 1},
        "纤维布" : {"苎麻叶" : 4, "苎麻皮" : 2, "剑麻叶" : 4, "亚麻叶" : 4, "禽羽" : 2},
        "玻璃钢" : {},
        "汞齐" : {"水银" : 8, "金矿" : 8, "铜矿" : 8, "红麻皮" : 2, "硬铝合金" : 2},
        "低温钢" : {},
        "法兰绒" : {"蛇麻" : 4, "楠木" : 15, "兽皮" : 2, "呢绒布" : 1, "尼龙布" : 2},
        "无机硅胶" : {},
        "高温合金" : {},
        "锦纶布" : {},
        "中碳钢" : {},
        "混纺材料" : {},
        "混凝土" : {},
        "软磁合金" : {},
        "专用铸铁" : {},
        "平纹布" : {},
        "纳米纤维" : {},
        "刚性陶瓷" : {},
        "电阻合金" : {},
        "碳素精钢" : {},
        "涂层布" : {},
        "静电纺丝" : {},
        "钢塑复合管" : {},
        "非晶合金" : {},
      },
    };
  },
  created() {
      this.fetchProducts(); // 在组件创建时调用 fetchProducts 方法
    },
  methods: {
    async fetchProducts() {
      try {
        // 获取全部数据
        const response = await axios.get(this.hostname + '/api/getItems'); // 假设你的后端有一个 /api/products 端点
        var data_temp = response.data.data; // 将获取到的数据赋值给 products 数组
        console.log(data_temp);
        // 逐条数据处理
        for (var item of data_temp) {
          // 图片位置
          item.imageSrc = "/mrzh/" + item.itemName + ".png";

          // 成本和利润计算
          let recipe = this.recipes[item.itemName];
          if ((recipe != undefined) && (recipe != {})) {
            item.cost = 0;
            // 遍历每个原料
            for (const matName in recipe) {
              console.log("原料: " + matName);
              // 寻找原料对象
              let matCost = 0;
              for (let mat of data_temp) {
                if (mat.itemName === matName) {
                  console.log(mat);
                  matCost = mat.itemNowPrice;
                  // if ((mat.cost != undefined) && (mat.cost != 0)) { // 如果该原料也有成本价
                  //   matCost = min(matCost, mat.cost)// 取原料市场价和成本价的最低值作为该成本的价值
                  // }
                  break;
                }
              }
              item.cost += matCost * recipe[matName];
              console.log(item.itemName + "的成本 +" + matCost + "*" + recipe[matName]);
              console.log(matCost);
            }
          }
        }
        this.items = data_temp;
        // console.log(this.items);
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
  box-sizing: border-box; /* 包括内边距和边框在内计算宽度 */
  flex: 1 1 calc(20% - 20px); /* 每个卡片占据大约 1/3 的宽度，减去 20px 的外边距 */
  margin: 10px; /* 添加外边距以创建间隙 */

  /* 其他样式，如背景色、边框等，可以根据需要添加 */
}

/* 响应式布局调整 */
@media (width <= 1024px) {
  .item-card {
    flex: 1 1 calc(50% - 20px); /* 在中等屏幕上每行显示 2 个卡片 */
  }
}

@media (width <= 768px) {
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
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
