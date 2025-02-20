---
title: NASTool 入门到养老
tags:
  - docker
  - 观影一条龙
categories: nastool
cover: 'https://image.6669998.xyz/ALwiqd.png'
description: NASTool 入门到养老
abbrlink: 5aa351b3
date: 2024-01-29 23:57:16
top:
password:
---

- 基于docker 下使用

#  安装 docker
[docker 教程](https://xx.6669998.xyz/post/4eb3381c.html)

# 无脑一键

- 端口啥的或者目录自己修改
- 具体配置如下
- 默认用户名admin和默认密码password

```markdown
docker run -d \
--name nas-tools \
--hostname nas-tools \
-p 3001:3000 \
-v /home/nastool/config:/config \
-v /home:/media \
-e PUID=0 \
-e PGID=0 \
-e UMASK=000 \
-e NASTOOL_AUTO_UPDATE=false \
-e NASTOOL_CN_UPDATE=false \
nastool/nas-tools:latest
```
- 3001:3000 # 默认的webui控制端口
- /home_nas-tools/config:/config # 冒号左边请修改为你想在主机上保存配置文件的路径
- /home:/media   # 媒体目录，多个目录需要分别映射进来
- PUID=0 # 想切换为哪个用户来运行程序，该用户的uid，详见下方说明
- PGID=0 # 想切换为哪个用户来运行程序，该用户的gid，详见下方说明
- UMASK=000 # 掩码权限，默认000，可以考虑设置为022
- NASTOOL_AUTO_UPDATE=false # 如需在启动容器时自动升级程程序请设置为true
- NASTOOL_CN_UPDATE=false # 如果开启了容器启动自动升级程序，并且网络不太友好时，可以设置为true，会使用国内源进行软件更新
- nastool/nas-tools:latest  #拉取的镜像

# 规则及部分基础设置

- 先添加站点

![](https://tu.i3.pw/imgs/2024/01/4d622ffd347d9d1f.jpg)

- 下载规则 优先1080P web

```markdown
- 自用Nastool 电影过滤规则：

eyJuYW1lIjogIndlYiIsICJydWxlcyI6IFt7Im5hbWUiOiAiMTA4MHdlYiIsICJwcmkiOiAiMSIsICJpbmNsdWRlIjogIldFQnxXRUItREx8d2ViXG5IRVZDfFtIeF0uPzI2WzQ1XXwyNjV8MjY0XG4xMDgwfDEwODBwfDEwODBQXG4iLCAiZXhjbHVkZSI6ICIyMTYwcCIsICJzaXplIjogIjIwIiwgImZyZWUiOiAiMS4wIDAuMCJ9LCB7Im5hbWUiOiAiV0VCMjE2MCIsICJwcmkiOiAiMiIsICJpbmNsdWRlIjogIldFQnxXRUItREx8d2ViXG5IRVZDfFtIeF0uPzI2WzQ1XXwyNjV8MjY0XG4yMTYwXG4iLCAiZXhjbHVkZSI6ICIiLCAic2l6ZSI6ICIxLDMwIiwgImZyZWUiOiAiMS4wIDAuMCJ9XX0=
```
![](https://tu.i3.pw/imgs/2024/01/ca6999c5f0ec95e6.png)

- 其他设置参考
- 基础设置

![](https://tu.i3.pw/imgs/2024/01/aff5645b451ed8db.png)

- 刮削图片

![](https://tu.i3.pw/imgs/2024/01/139309d97b1d820c.png)
![](https://tu.i3.pw/imgs/2024/01/c825e43771f6da11.png)

- 下载器设置

![](https://tu.i3.pw/imgs/2024/01/edd5ce2c7feffd40.jpg)

## 养老吧 没啥好玩的 少年！大好时光等你！