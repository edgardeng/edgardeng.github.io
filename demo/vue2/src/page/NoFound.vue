<template>
    <div style="background:#f0f2f5;margin-top: -20px;">
        <div class="wscn-http404">
            <div class="pic-404">
                <img class="pic-404__parent" :src="img_404" alt="404">
            </div>
            <div class="bullshit">
                <div class="bullshit__info">版权所有<a class='link-type' href='https://edgardeng.github.io' target='_blank'>Edgardeng</a></div>
                <a href="/" class="bullshit__return-home">返回首页</a>
            </div>
        </div>
    </div>
</template>

<script>
import img_404 from 'assets/image/404.png'

export default {
  name: 'HelloWorld',
  data() {
    return {
      img_404
    }
  },
  computed: {
  }
}
</script>

<style rel="stylesheet/scss"  scoped>

.wscn-http404 {
    position: relative;
    width: 1200px;
    margin: 20px auto 60px;
    padding: 0 100px;
    overflow: hidden;
}
.pic-404 {
    position: relative;
    float: left;
    width: 600px;
    padding: 150px 0;
    overflow: hidden;
}
.bullshit {
    position: relative;
    float: left;
    width: 300px;
    padding: 150px 0;
    overflow: hidden;
}

.bullshit__info {
     font-size: 13px;
     line-height: 21px;
     color: grey;
     opacity: 0;
     margin-bottom: 30px;
     animation-name: slideUp;
     animation-duration: 0.5s;
     animation-delay: 0.2s;
     animation-fill-mode: forwards;
 }

</style>
