<!-- 关于组件 -->
<script setup lang="ts">

</script>

<template>
  <div class="about-page" id="about">
    <div class="title">About Me</div>
    <div class="sub-title">Self-introduction</div>
    <div class="content">
      <div class="pic">
        <img src="/body.jpg" alt="">
      </div>
      <div class="text">
        <div class="welcome">大家好，我是希晨er！👋</div>
        <ul class="desc">
          <li>我毕业于中南大学，软件工程专业优秀毕业生，目前是一名央企“程序猿”；</li>
          <li>专注用代码解决问题，偶尔也用文字整理思考；</li>
          <li>这个网站是我diy的个人主页。如果您有任何想法或建议，非常欢迎与我交流；</li>
          <li>未来希望能成为一名优秀的程序员，参与一些有趣的项目，做出一些有意义的东西。</li>
        </ul>
        <div class="card-list">
          <div class="card button">
            <div class="num">01+</div>
            <div class="span">年工作经验</div>
          </div>
          <div class="card button">
            <div class="num">04+</div>
            <div class="span">段实习经历</div>
          </div>
          <div class="card button">
            <div class="num">03+</div>
            <div class="span">个项目推进</div>
          </div>
        </div>
        <div class="download button">
          <i class="iconfont icon-download"></i> Download My Resume
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  display: flex;
  width: 90%;
  padding: 40px 20px;
  flex-direction: column;
}

.content {
  gap: 20px;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content .pic {
  display: flex;
  justify-content: center;
  align-items: center;
}

.content .pic img {
  border-radius: 20px;
}

.content .text {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  color: var(--text-main);
}

.content .text .welcome {
  font-size: 30px;
  font-weight: bold;
}

.content .text .desc {
  font-size: 20px;
}

.content .text .desc li {
  padding-left: 1em;
}

.content .text .desc li::before {
  content: '';
  position: absolute;
  margin-left: -1em;
  transform: translateY(100%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: var(--text-main-focus);
}

.content .text .card-list {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.content .text .card-list .card {
  border-radius: 10px;
  height: 100px;
  width: 100px;
  font-weight: 500;
  text-align: center;
  background-color: var(--common-bg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.content .text .card-list .card .num {
  font-size: 30px;
  font-weight: bold;
  color: var(--text-main-focus);
}

.content .text .download {
  cursor: pointer;
  width: fit-content;
  padding: 10px 20px;
  border-radius: 30px;
  background-color: var(--text-main-focus);
  color: var(--text-card);
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
}
.content .text .download .iconfont {
  font-size: 24px;
  padding: 10px;
}
</style>
