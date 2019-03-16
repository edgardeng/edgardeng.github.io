<template>
    <div style="background:#f0f2f5;">
      <div class="http404">
        <p>
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </p>
        <div>该页面不存在(´･ω･`)</div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'NotFound',
  data() {
    return {
    }
  }
}
</script>

<style rel="stylesheet/scss"  scoped>

  .http404 p span {
    cursor: pointer;
    color: #e00060;
    text-shadow: 0 0 2px #686868, 0 1px 1px #ddd, 0 2px 1px #d6d6d6, 0 3px 1px #ccc, 0 4px 1px #c5c5c5, 0 5px 1px #c1c1c1, 0 6px 1px #bbb, 0 7px 1px #777, 0 8px 3px rgba(100, 100, 100, 0.4), 0 9px 5px rgba(100, 100, 100, 0.1), 0 10px 7px rgba(100, 100, 100, 0.15), 0 11px 9px rgba(100, 100, 100, 0.2), 0 12px 11px rgba(100, 100, 100, 0.25), 0 13px 15px rgba(100, 100, 100, 0.3);
    -webkit-transition: all .1s linear;
    transition: all .1s linear;
  }

  .http404 p {
    text-align: center;
    font-family: cursive;
    font-size: 150px;
    font-weight: bold;
    line-height: 100px;
    letter-spacing: 5px;
    color: #fff;
  }


</style>
