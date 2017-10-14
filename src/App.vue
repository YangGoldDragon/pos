<template>
  <div id="app">
    <leftNav class="leftNav"></leftNav>
    <main>
      <pos></pos>
    </main>
  </div>
</template>

<script>
  import leftNav from '@/components/common/leftNav'
  import pos from '@/components/page/pos'
  export default {
    name: 'app',
    components: {
      leftNav,
      pos
    },
    mounted: function () {
      window.resize = function () {
        var windowHeight = document.body.clientHeight;
        document.querySelector('main').style.height = windowHeight + 'px';
      }
    }
  }

</script>

<style>
  html,body{
    margin: 0;
    padding: 0;
  }

  body{
    overflow: hidden;
  }

  ul{
    margin: 0;
    padding: 0;
  }

  li{
    list-style: none;
  }

  #app{
    display: flex;
    justify-content: flex-start;
  }

  main{
    flex-grow: 1;
    overflow: auto;
    display: flex;
    justify-content: flex-start;
  }
</style>
