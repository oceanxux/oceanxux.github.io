---
title: Multi-EasyGost一键脚本
tags:
  - Linux
categories: Linux
cover: 'https://tu.idcfq.com/imgs/2023/10/05882490e930dc78.webp'
description: Gost一键脚本使用
abbrlink: 44f7c2ba
date: 2023-10-29 19:10:57
top:
---
# 简介

- [项目地址及帮助文档]( https://github.com/KANIKIG/Multi-EasyGost)
- [gost隧道程序官方文档](https://v2.gost.run)

# 启动脚本

```markdown
wget --no-check-certificate -O gost.sh https://raw.githubusercontent.com/KANIKIG/Multi-EasyGost/master/gost.sh && chmod +x gost.sh && ./gost.sh
```

- 再次运行本脚本只需要输入./gost.sh回车即可
- 由于 gost v2.11.2 功能稳定，此脚本将一直采用该版本，后续不再跟随官方更新

## 功能

### 原脚本功能

- 1、实现了systemd及gost配置文件对gost进行管理
- 2、在不借助其他工具(如screen)的情况下实现多条转发规则同时生效
- 3、机器reboot后转发不失效
- 4、支持传输类型：
- 4.1、tcp+udp不加密转发
- 4.2、relay+tls加密

### 此脚本新增功能

- 1、增加了传输类型选择功能
- 2、新支持传输类型
- 2.1、relay+ws
- 2.2、relay+wss
- 3、落地机一键创建ss或socks5代理 (gost内置)
- 4、支持多传输类型的多落地简单型均衡负载
- 5、增加gost国内加速下载镜像
- 6、简单创建或删除gost定时重启任务
- 7、脚本自动检查更新
- 8、转发CDN自选节点ip
- 9、支持自定义tls证书，落地可一键申请证书，中转可开启证书校验

## 操作示例


![1](https://tu.idcfq.com/imgs/2023/10/5c612b563d5c1ec0.png)
![2](https://tu.idcfq.com/imgs/2023/10/ea358f6a56ad27e2.png)
![3](https://tu.idcfq.com/imgs/2023/10/0e56386887944b91.png)
![4](https://tu.idcfq.com/imgs/2023/10/24425883ce028d55.png)
![5](https://tu.idcfq.com/imgs/2023/10/daade3e679a27315.png)
![6](https://tu.idcfq.com/imgs/2023/10/adc8655ff7d93b43.png)
![7](https://tu.idcfq.com/imgs/2023/10/d73d6189311ba266.png)