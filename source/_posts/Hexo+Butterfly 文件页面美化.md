---
title: Hexo+Butterfly 文件页面美化
tags:
  - Hexo
categories: Hexo
cover: 'https://image.6669998.xyz/jy5yCj.png'
description: Hexo+Butterfly 文件页面美化
abbrlink: 2109be7c
date: 2024-02-15 16:02:41
top:
password:
---

- 看到别的大佬的文章页一页到底：

![](https://image.6669998.xyz/k0gOiJ.png)

- 那么怎么样修改才能做到这一点呢？
- 在网上找到相关教程
- [竹山一叶](https://zsyyblog.com/f41cebc6.html)

# 安装教程
```text
适用范围:butterfly3.3.0-4.8.1。更低版本以及更高有没有效果不能保证。
```

## 新建Styl文件

- 在themes\butterfly\source\css\page目录新建topimg.styl
- page目录为_page，因为markdown的渲染问题会导致\无法显示

```markdown
// 顶部图
#page-header, #page-header:before
  background-color: transparent !important
  background-image: unset !important
.top-img
  height: 12.5rem
  display: block
  margin: -50px -40px 50px -40px
  border-top-left-radius: inherit
  border-top-right-radius: inherit
  background-position: center center
  -webkit-background-size: cover
  -moz-background-size: cover
  background-size: cover
  background-repeat: no-repeat
  transition: all 0.3s
  .read-mode
    display: none
  @media screen and (max-width: 768px)
    margin: -1.8rem -0.7rem 1.8rem -0.7rem
  [data-theme='dark'] &
    filter: brightness(0.8)
```
## 修改post.pug

- \themes\butterfly\layout目录，打开post.pug

```shell
block content
  #post
    if top_img === false
      include includes/header/post-info.pug
    .top-img.gist(style=`background-image: url(${url_for(top_img)})`)
    article#article-container.post-content!=page.content
```
- 然后一键三连 就可以看到了

# 注意事项
```text
注意事项：
cover图片请勿加入(),因为括号会破坏css结构。导致无法加载cover。
如/img/1(1).webp。会加载不出来的。建议用-1等方式替代括号。
```

- 如：cover: https://img.cdn.nesxc.com/upload/wordpress/yydd(1).webp

的写法会导致css结构破坏，如有这种建议更改为：

- cover: https://img.cdn.nesxc.com/upload/wordpress/yydd-1.webp以区分

## 修改原理

```text
基本原理就是插入一个新的标签作为头图,再用css隐藏旧头图和定义新头图的样式
```

```text
效果
```

- 修改前

![修改前](https://image.6669998.xyz/nec4QR.png)

- 修改后

![修改后](https://image.6669998.xyz/cVKUui.png)

- [参考文章](https://www.imcharon.com/60/)