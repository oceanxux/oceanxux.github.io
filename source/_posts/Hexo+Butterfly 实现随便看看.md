---
title: Hexo+Butterfly 实现随便看看
tags:
  - Hexo
categories: Hexo
description: Hexo+Butterfly 实现随便看看
abbrlink: e366afcf
date: 2024-02-15 18:17:14
cover: 'https://image.6669998.xyz/LeRzaZ.png'
top:
password:
---
- 实现随便逛逛的功能，需要用到这个插件：hexo-generator-random
[github ](https://github.com/Drew233/hexo-generator-random/)

# 操作步骤

- 安装依赖

```shell
npm install object-assign
```

-     在博客根目录的：package.json 里的 dependencies 添加如下代码 

```shell
 ,
 "hexo-generator-random": "^1.0.0"
```

## npm 安装

- 首先安装依赖

```shell
npm install object-assign
```

- 本地安装插件

```shell
npm install hexo-generator-random --save
```

-      通过 hexo g 就会在 public 文件夹下看到这个文件：random.html
-  在_config.butterfly.yml 添加标签即可

```shell
menu:
  首頁: / || fas fa-home
  随便逛逛: javascript:toRandomPost() || fas fa-bus
```

- 最后三连就可以看到了
![](https://image.6669998.xyz/A70lyC.png)

[参考1](https://zsyyblog.com/1cb07080.html)
[参考2](https://immmmm.com/randompost-by-sitemap/)