---
title: Emby主题
tags:
 - Emby
categories: Emby主题美化
cover: 'https://oss.yiki.tech/img/202305030718195.svg'
abbrlink: 4eb3381ab
description: Emby
date: 2023-05-02 00:01:10
---

# Emby 首页大屏优化
### 项目地址
```http
https://github.com/Nolovenodie/emby-crx
```
该主题是通过chrome插件来调用的，但是本文介绍的是如何直接安装到emby server中

# Docker 版 (如遇脚本更新, 重新执行即可)
```dockerfile
# 注意: 需要能访问的上Github的环境,
docker exec EmbyServer /bin/sh -c 'cd /system/dashboard-ui && wget -O - https://tinyurl.com/2p97xcpd | sh'
```
# emby 4.7.11举例

 web ui目录为：
````
/opt/emby-server/system/dashboard-ui/
````
# docker 举例
```shell
/system/dashboard-ui/
```
无论你什么安装方式，你只需要找到安装目录下的index.html就找对了！比如容器就是
```shell
docker exec -it  容器ID find -name "index.html"
```

#### 从作者的github库中下载源码压缩包：emby-crx-master.zip

#### 从压缩包中提取如下文件：

````markdown
common-utils.js
jquery-3.6.0.min.js
md5.min.js
style.css
main.js
````
#### 把他们上传到 web ui目录 中去

#### 然后编辑 web ui目录 中的index.html文件

#### 在</head>前插入
````
<link rel='stylesheet' id='theme-css'  href='style.css' type='text/css' media='all' />
    <script src="common-utils.js"></script>
    <script src="jquery-3.6.0.min.js"></script>
    <script src="md5.min.js"></script>
    <script src="main.js"></script>
````

刷新Emby网页即可生效

转载
[一个首页大屏展示海报封面的Emby主题](https://cangshui.net/5167.html)【沧水】