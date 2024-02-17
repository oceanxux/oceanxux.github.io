---
title: Hexo+Butterfly 动画特效美化
tags:
  - Hexo 
categories: Hexo
cover: 'https://image.6669998.xyz/u3avCY.png'
description: Hexo+Butterfly 动画特效美化
abbrlink: 39bfde64
date: 2024-02-15 15:30:07
top:
password:
---

- 效果看首页

# 安装插件,在博客根目录下打开终端，运行以下指令：

```shell
npm install hexo-butterfly-wowjs --save
```

# 添加配置信息，以下为写法示例
在站点配置文件_config.yml或者主题配置文件_config.butterfly.yml中添加

```yaml
wowjs:
  enable: true #控制动画开关。true是打开，false是关闭
  priority: 10 #过滤器优先级
  mobile: false #移动端是否启用，默认移动端禁用
  animateitem:
    - class: recent-post-item #必填项，需要添加动画的元素的class
      style: animate__zoomIn #必填项，需要添加的动画
      duration: 2s #选填项，动画持续时间，单位可以是ms也可以是s。例如3s，700ms。
      delay: 1s #选填项，动画开始的延迟时间，单位可以是ms也可以是s。例如3s，700ms。
      offset: 100 #选填项，开始动画的距离（相对浏览器底部）
      iteration: 2 #选填项，动画重复的次数
    - class: card-widget
      style: animate__zoomIn
  animate_css: https://npm.elemecdn.com/hexo-butterfly-wowjs/lib/animate.min.css
  wow_js: https://npm.elemecdn.com/hexo-butterfly-wowjs/lib/wow.min.js
  wow_init_js: https://npm.elemecdn.com/hexo-butterfly-wowjs/lib/wow_init.js
```

# 参数释义

| 参数 | 备选值/类型      | 释义       |
|--|-------------|----------|
| enable	 | true/false  | 【必选】控制开关 |
| priority | 	number	    |【可选】过滤器优先级，数值越小，执行越早，默认为10，选填|
| mobile	 | true/false |	控制移动端是否启用，默认移动端禁用                                                                  |
| animateitem.class | 	class	|【可选】添加动画类名，只支持给class添加                                                                  |
| animateitem.style | 	text	|【可选】动画样式，具体类型参考animate.css                                                               |
| animateitem.duration | 	time,单位为s或ms	|【可选】动画持续时间，单位可以是ms也可以是s。例如3s，700ms。                                              |
| animateitem.delay | 	time,单位为s或ms	|【可选】动画开始的延迟时间，单位可以是ms也可以是s。例如3s，700ms。                                           |
| animateitem.offset	 | number,单位为px|	【可选】开始动画的距离（相对浏览器底部）。                                                             |
| animateitem.iteration | number,单位为s或ms	|【可选】动画重复的次数                                                                     |
| animate_css	 | URL|	【可选】animate.css的CDN链接,默认为https://npm.elemecdn.com/hexo-butterfly-wowjs/lib/animate.min.css |
| wow_js	 | URL	|【可选】wow.min.js的CDN链接,默认为https://npm.elemecdn.com/hexo-butterfly-wowjs/lib/wow.min.js       |
| wow_init_js	 | URL	|【可选】wow_init.js的CDN链接,默认为https://npm.elemecdn.com/hexo-butterfly-wowjs/lib/wow_init.js     |


- [参考](https://akilar.top/posts/abab51cf/)