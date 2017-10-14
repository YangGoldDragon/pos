<template>
  <div id="#app" class="leftNav">
    <ul>
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-dianpu"></use>
        </svg>
        <p>店铺</p>
      </li>
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-216"></use>
        </svg>
        <p>收银</p>
      </li>
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zuanshi"></use>
        </svg>
        <p>商品</p>
      </li>
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-shouji"></use>
        </svg>
        <p>联系</p>
      </li>
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-huiyuanqia"></use>
        </svg>
        <p>会员</p>
      </li>
      <li>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gongnengjianyi"></use>
        </svg>
        <p>设置</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'leftNav',
    data(){
      return{
      }
    }
  }
</script>

<style>
  .icon {
    width: 4em; height: 4em;
    vertical-align: -0.15em;
    fill: white;
    overflow: hidden;
  }

  .leftNav ul{
    width: 10vw;
    height: 100vh;
    background: #1D8ce0;
    color: white;
  }

  .leftNav ul li{
    height: calc(16.666666% - 1px);
    border-bottom:1px solid #20a0ff;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .leftNav ul li svg{
    cursor: pointer;
  }

  .leftNav ul li p{
    margin: 0;
    padding: 0;
    cursor: pointer;
  }

  @media screen and (max-width: 900px) {
    .leftNav ul{
      width: 15vw;
    }
  }

  @media screen and (max-width: 500px) {
    .leftNav ul{
      width: 20vw;
    }
  }


</style>
