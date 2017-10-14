<template>
  <div id="pos">
    <div>
      <el-row>
        <el-col :span="7" id="orderList">
          <el-tabs>
            <el-tab-pane label="点餐">
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
              <div class="total">
                <span>数量：<small>{{totalCount}}</small></span>
                <span>金额：<small>{{totalMoney}}</small></span>
              </div>
              <div class="operate">
                <div><el-button type="warning" size="large">挂单</el-button></div>
                <div><el-button type="danger" size="large" @click="delTotal()">删除</el-button></div>
                <div><el-button type="success" size="large" @click="checkout()">结账</el-button></div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="挂单">挂单</el-tab-pane>
            <el-tab-pane label="外卖">外卖</el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :span="17" id="goodsList" class="goodsList">
          <div class="goodsListCt">
            <div class="usedGoods">
              <h3>常用商品</h3>
              <div class="usedGoodsList">
                <ul>
                  <li v-for="goods in usedGoodsList" @click="addOrderList(goods)">
                    <span>{{goods.goodsName}}</span>
                    <span class="price">￥{{goods.price}}元</span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="goodsType" id="goodsType">
              <el-tabs>
                <el-tab-pane label="汉堡">
                  <ul class="hamburgers">
                    <li v-for="goods in hambGoods0" @click="addOrderList(goods)">
                      <span class="hambImg"><img :src="goods.goodsImg" alt=""></span>
                      <p class="hambName">{{goods.goodsName}}</p>
                      <p class="hambPrice">￥{{goods.price}}元</p>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="小食">
                  <ul class="hamburgers">
                    <li v-for="goods in hambGoods1" @click="addOrderList(goods)">
                      <span class="hambImg"><img :src="goods.goodsImg" alt=""></span>
                      <p class="hambName">{{goods.goodsName}}</p>
                      <p class="hambPrice">￥{{goods.price}}元</p>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="饮料">
                  <ul class="hamburgers">
                    <li v-for="goods in hambGoods2" @click="addOrderList(goods)">
                      <span class="hambImg"><img :src="goods.goodsImg" alt=""></span>
                      <p class="hambName">{{goods.goodsName}}</p>
                      <p class="hambPrice">￥{{goods.price}}元</p>
                    </li>
                  </ul>
                </el-tab-pane>
                <el-tab-pane label="套餐">
                  <ul class="hamburgers">
                    <li v-for="goods in hambGoods3" @click="addOrderList(goods)">
                      <span class="hambImg"><img :src="goods.goodsImg" alt=""></span>
                      <p class="hambName">{{goods.goodsName}}</p>
                      <p class="hambPrice">￥{{goods.price}}元</p>
                    </li>
                  </ul>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'pos',
    data() {
      return {
        tableData: [],
        usedGoodsList: [],
        hambGoods0: [],
        hambGoods1: [],
        hambGoods2: [],
        hambGoods3: [],
        totalCount: 0,
        totalMoney: 0,
      }

    },
    mounted: function () {
      var windowHeight = document.body.clientHeight;
      document.querySelector('#orderList').style.height = windowHeight + 'px';
      document.querySelector('#goodsList').style.height = windowHeight + 'px';

    },
    created: function () {
      axios.get('http://jspang.com/DemoApi/oftenGoods.php')
        .then(response => {
          console.log(response);
          this.usedGoodsList = response.data;
        })
        .catch(response => {
          console.log('error');
          alert('网络错误，不可访问');
        });
      axios.get('http://jspang.com/DemoApi/typeGoods.php')
        .then(response => {
          console.log(response);
          this.hambGoods0 = response.data[0];
          this.hambGoods1 = response.data[1];
          this.hambGoods2 = response.data[2];
          this.hambGoods3 = response.data[3];
        })
        .catch(response => {
          console.log('error');
          alert('网络错误，不可访问');
        });
    },
    methods: {
      //添加订单列表
      addOrderList(goods){
        this.totalCount = 0;
        this.totalMoney = 0;
        let isHave = false;
        //判断这个商品是否已经存在于订单列表
        for(let i = 0; i < this.tableData.length; i++){
          //存在添加数量
          if(this.tableData[i].goodsId === goods.goodsId){
            isHave = true;
          }
        }
        //根据isHave的值判断订单列表中是否已有此商品
        if(isHave){
          //如果存在，添加数量
          let arr = this.tableData.filter(cur => cur.goodsId === goods.goodsId);
          arr[0].count++;
        }else{
          //不存在就推入数组
          let newGoods = {
            goodsId: goods.goodsId,
            goodsName: goods.goodsName,
            price: goods.price,
            count: 1
          };
          this.tableData.push(newGoods);
        }

        //进行数量和价格的汇总计算
        this.getTotal();
      },
      delGoods(goods){
        this.tableData.forEach((cur,index,arr) => {
          if(cur.goodsId === goods.goodsId){
            if(cur.count > 1){
              cur.count--;
            }else{
              arr.splice(index,1);
            }
          }
        });
        this.getTotal();
      },
      getTotal(){
        this.totalCount = 0;
        this.totalMoney = 0;
        if(this.tableData){
          this.tableData.forEach((cur) => {
            this.totalCount += cur.count;
            this.totalMoney += (cur.price * cur.count);
          })
        }
      },
      delTotal(){
        this.tableData = [];
        this.totalCount = 0;
        this.totalMoney = 0;
      },
      checkout(){
        if(this.totalCount){
          this.delTotal();
          this.$message({
            message: '结账成功，请继续使用！',
            type: 'success'
          });
        }else{
          this.$message.error('结账失败，请确保存在订单！');
        }
      }
    }
  }
</script>

<style>
  .operate{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .operate div{
    margin: 10px;
  }

  .goodsListCt{
    border-left: 1px solid #D3DCE6;
    height: 100vh;
    overflow: auto;
  }

  .goodsType{
    margin-top: 20px;
  }

  .usedGoods h3 {
    margin: 0;
    padding: 8px;
    border-bottom: 1px solid #D3DCE6;
    background-color: #F9FAFC;
  }

  .usedGoods .usedGoodsList ul{
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .usedGoods .usedGoodsList ul li {
    border: 1px solid #E5E9F2;
    background-color: #fff;
    margin: 5px;
    padding: 10px;
  }

  .usedGoods .usedGoodsList ul li .price {
    color: #58B7FF;
  }

  .hamburgers{
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 100%;
  }

  .hamburgers li{
    border:1px solid #E5E9F2;
    background-color:#fff;
    padding: 2px;
    margin: 2px;
    text-align: center;
    width: 18%;
  }

  .hamburgers li img{
    width: 100%;
  }

  .hamburgers li p:nth-of-type(2){
    color: #58B7FF;
  }

  li{
    cursor: pointer;
  }

  .total{
    border: 1px solid #D3DCE6;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
  }
  .total span:first-child{
    margin-right: 30px;
  }
</style>

