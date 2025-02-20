---
title: Docker 青龙面板
tags:
  - docker
categories: qinglong
cover: 'https://image.6669998.xyz/FzH3BR.png'
description: Docker 青龙面板
abbrlink: 546ba51
date: 2024-04-03 10:39:11
top:
password:
---

- 基于Docker

# 安装docker 

[](https://xx.6669998.xyz/post/4eb3381c.html)

# 安装qinglgong

- [项目地址](https://github.com/whyour/qinglong)

```markdown
docker run -dit \
  -v /home/ql:/ql/data \ #前面自定义目录
  -p 6100:5700 \ #自定义前面端口
  --name qinglong \
  --hostname qinglong \
  --restart unless-stopped \
  whyour/qinglong:latest
```

# 安装依赖

## 一键安装青龙的依赖

- 以下代码中的 「qinglong」如果您的容器名字不一样记得改相同的
- 国内版 
- [项目地址](https://github.com/FlechazoPh/QLDependency)

```docker

docker exec -it qinglong bash -c "$(curl -fsSL https://ghproxy.com/https://raw.githubusercontent.com/FlechazoPh/QLDependency/main/Shell/QLOneKeyDependency.sh | bash)"
```

- 国外版

```docker

docker exec -it qinglong bash -c "$(curl -fsSL https://raw.githubusercontent.com/FlechazoPh/QLDependency/main/Shell/QLOneKeyDependency.sh | bash)"
```

-  版本号 2.12+ 的新版本青龙安装失败请尝试

```docker
docker exec -it qinglong bash -c "$(curl -fsSL https://raw.githubusercontent.com/FlechazoPh/QLDependency/main/Shell/XinQLOneKey.sh | bash)"
```

- 最后记得重启哦

```docker
docker restart qinglong
```

## 依赖管理(手动添加)

- Nodejs

```markdown
crypto-js
prettytable
dotenv
jsdom
date-fns
MD5@1.3.0 
md5@2.x 
canvas
tough-cookie
tslib
ws@7.4.3
ts-md5
jsdom -g
jsrsasign
jsencrypt
jieba
fs
form-data
json5
global-agent
png-js
@types/node
require
typescript
js-base64
axios
moment
node-jsencrypt
node-rsa
node-fetch
qs
ds
yml2213-utils
```
- python

```markdown
requests
canvas
ping3
jieba
PyExecJS
aiohttp
redis
pycryptodome
lxml
curl_cffi
```

- linux

```markdown
--no-cache
build-base
g++
cairo-dev
pango-dev
giflib-dev
```

# 拉库

-  订阅管理 
- 只需要手动填写 名称 链接 定时规则 
- 剩余的选项会自动跟随 链接 进行自动切分填写

![1723783518279.png](https://image.6669998.xyz/I17MKp.png)
![660cc70a109f2.png](https://image.6669998.xyz/5WhBZV.png)
![1723783488207.png](https://image.6669998.xyz/sX1F6l.png)


# Teps

![1723783804101.png](https://image.6669998.xyz/3tFgzM.png)