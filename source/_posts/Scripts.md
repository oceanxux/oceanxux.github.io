---
title: 脚本集
tags:
  - 笔记
  - Scripts
  - Linux
categories: Scripts
cover: >-
  https://42f2671d685f51e10fc6-b9fcecea3e50b3b59bdc28dead054ebc.ssl.cf5.rackcdn.com/illustrations/Augmented_reality_re_f0qd.svg
description: 脚本集
abbrlink: d29f98ac
date: 2023-05-06 15:14:37
---
#### 脚本集
### HostlocAutoGetPoints 签到
```shell
wget https://raw.githubusercontent.com/Solmonz/HostlocAutoGetPoints/main/install.sh -O install.sh && chmod +x install.sh && clear && ./install.sh
```
### 宝塔aaPanel liunx破解
```shell
wget https://raw.githubusercontent.com/Solmonz/aaPanel/main/script/aapanel.sh  -O aapanel.sh && chmod +x aapanel.sh && clear && ./aapanel.sh
```

### pcbetaBBS 签到
```shell
ql repo https://github.com/Solmonz/qlScripts.git "pcbeta_" "" ""
```
- 需添加环境变量PB_COOKIE
格式为jqCP_887f_saltkey=*****;jqCP_887f_auth=*************************************************

#### mao tai 
```shell
ql repo https://github.com/Solmonz/mao-tai.git "mao-tai_" "" ""
```
变量名称: MAOTAI_CONFIG 格式为（如图）：省份,城市,经度,维度,设备id,token,MT-Token-Wap

[配置获取](http://api.vus.tax/) app获取验证码，到这里获取配置即可，替换省和市，然后在省市后面后面加上经纬度，经纬度可以在这里获取自己位置的：获取经纬度

### SMZDM 签到
```shell
ql repo https://github.com/hex-ci/smzdm_script.git "" "env.js|bot.js|sendNotify.js" "env.js|bot.js|sendNotify.js"
```
环境变量: SMZDM_COOKIE 

抓包：https://user-api.smzdm.com/checkin

参考：[HEX-CI](https://github.com/hex-ci/smzdm_script)

#### BiliBiliTool
配置文件页 

修改 RepoFileExtensions="js py" 为 RepoFileExtensions="js py sh"
```markdown
名称：Bilibili
类型：公开仓库
链接：https://github.com/RayWangQvQ/BiliBiliToolPro.git
定时类型：crontab
定时规则：2 2 28 * *
白名单：bili_task_.+\.sh
文件后缀：sh
```
[BiliBiliToolPro](https://github.com/RayWangQvQ/BiliBiliToolPro/)

声明：
所有脚本都是来之网络收集、个人学习使用