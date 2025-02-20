---
title: 通过 Worker 白嫖CF 
tags:
  - CloudFlare
categories: CloudFlare
cover: 'https://image.6669998.xyz/ZCcThw.png'
description: 通过 Worker 白嫖CF
abbrlink: 344e297d
date: 2024-04-08 09:53:56
top:
password:
---

- 基于Cloudflare
- Workers 

# Cloudflare

## 先去注册 Cloudflare

![66134edb592bc.png](https://image.6669998.xyz/rEZj9R.png)

## 添加卡（可选）

- 提前准备
- 一个信用卡号生成网站，这里以[Namso-gen](https://namso-gen.com/?tab=basic&network=random)为例
- 一个信用卡校验测活网站，这里以[MrChecker](https://www.mrchecker.net/card-checker/ccn2/)为例
- 一个卡BIN查询网站，这里以[BINCheck](https://bincheck.io/zh)为例
- 一个虚拟地址生成网站，这里以[美国地址生成器](https://www.meiguodizhi.com/)为例
- 一个可以通过cf支付网关验证的卡段，这里我为大家提供一个：601121255660xxxx

### 操作步骤：

- 在Cloudflare Dashboard点击右上角的头像-->账单-->付款信息，添加付款方式

![661356c93ec82.png](https://image.6669998.xyz/Sf0Qrz.png)

- 使用信用卡号生成网站Namso-gen，在对应的卡段下生成一定数量的信用卡信息

![661356b9cdeeb.png](https://image.6669998.xyz/yyVBZS.png)

- 将随机生成得到的信用卡信息复制到MrChecker进行校验

![661356c201225.png](https://image.6669998.xyz/MkwFkc.png)

- 挑选一个通过校验的信用卡信息，将卡号，有效期，cvv填写到cf中，其中的地址信息最好要和信用卡段所在国家一致，比如我提供的信用卡卡段是美国的，就填写美国的地址信息。卡bin查询和虚拟地址生成可以使用我上面提供的网站。

![6613555ce280b.png](https://image.6669998.xyz/LL3KtK.png)

- [来源于nodeseek](https://www.nodeseek.com/post-84328-1)

# Workers 

- [项目地址](https://github.com/cmliu)

[提前准备好代码](https://github.com/oceanz764/Worker/tree/main)

##  Step 1

- sub

![661357ab82952.png](https://image.6669998.xyz/hCnfU3.png)

- 自定义名称

![66135861712fd.png](https://image.6669998.xyz/g7JR1t.png)

- 编辑代码

![6613591675321.png](https://image.6669998.xyz/e7t1qc.png)

- 复制 [链接代码](https://github.com/oceanz764/Worker/raw/main/Step%201/_worker.js)
- 百度随便找个[UUID生成器](https://1024tools.com/uuid)

![66135a98473b8.png](https://image.6669998.xyz/tVM60t.png)

- 修改自定义UUID  比如：636c5d20-e814-4a25-a7c4-249b4694659f

### 使用方式

- 打开创建的 https://sub.xxx.workers.dev/636c5d20-e814-4a25-a7c4-249b4694659f
- 提示以下就表示成功了

![66135d2f6622d.png](https://image.6669998.xyz/Nk4Ia0.png)
![66135c0fe7972.png](https://image.6669998.xyz/XRWla0.png)

## Step 2

- 订阅器
- 还是一样创建一个 Workers
- [复制代码](https://raw.githubusercontent.com/oceanz764/Worker/main/Step%202/_worker.js)

- ！！！！！ 记得加：/auto
- 打开提示这个就成功了

![66135c0fe7972.png](https://image.6669998.xyz/XRWla0.png)
![66135deecab78.png](https://image.6669998.xyz/MUHfkw.png)

### 自定义修改变量

- 添加 TOKEN 变量，快速订阅访问入口，默认值为: auto ，获取订阅器默认节点订阅地址即 /auto ，例如 https://sub.xxx.cloudns.biz/auto
- 添加 HOST 变量，例如 edgetunnel-2z2.pages.dev；
- 添加 UUID 变量，例如 30e9c5c8-ed28-4cd9-b008-dc67277f8b02；
- 添加 PATH 变量，例如 /?ed=2048；

![66135eefc6c2b.png](https://image.6669998.xyz/8M6FpE.png)


- 把我们自己的订阅器改到SUB 里面
![1712544406972.png](https://image.6669998.xyz/k8hFR3.png)

- 在第 12 行找到 sub 变量，将其修改为你部署的订阅生成器地址
- 例如 let sub = 'teps-dy.xxx.workers.dev';，注意不要带https等协议信息和符号

- 打开提示 这样就正常了

![1712545752746.png](https://image.6669998.xyz/K6keXz.png)

# 定时自动更新CF IP

-[项目地址](https://github.com/yonggekkk/openwrt_win64-ddns-cdnip)

```shell
curl -ksSL https://gitlab.com/rwkgyg/cdnopw/raw/main/cdnopw.sh -o cdnopw.sh && bash cdnopw.sh
```


