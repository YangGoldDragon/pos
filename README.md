# pos
## 项目：快餐店收银系统

## 技术栈：vue + vue-cli(webpack) + element + vueRouter + axios

## 预览地址：http://yanggolddragon.gitee.io/index.html/#/

## 项目说明：
#### 1.由于github强制执行https访问，而我使用的数据接口是http协议的，所以只能使用国内的码云进行项目预览。
#### 2.项目的核心功能是增加订单，删除订单并实时更新金额和数量。
#### 3.增加/删除绑定点击事件函数，使用scope.row作为参数控制每一行的数据。
```
<el-table :data="tableData" border style="width: 100%">
<el-table-column prop="goodsName" label="商品"></el-table-column>
<el-table-column prop="count" label="数量"></el-table-column>
<el-table-column prop="price" label="金额"></el-table-column>
<el-table-column label="操作" fixed="right">
  <template scope="scope">
    <el-button type="text" size="small" @click="delGoods(scope.row)">删除</el-button>
    <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
  </template>
</el-table-column>
</el-table>
```

