---
title: nginx 证书申请
tags:
  - Linux
  - 服务器证书相关
categories: nginx
cover: 'https://image.6669998.xyz/Ey2GmS.png'
description: nginx 证书申请
abbrlink: bf1de88f
date: 2024-07-17 21:10:21
top:
password:
---

# 证书申请

```markdown
apt-get updateapt-get install software-properties-commonadd-apt-repository universeadd-apt-repository ppa:certbot/certbotapt-get update
apt install software-properties-common && add-apt-repository -r ppa:certbot/certbot && apt update && apt install certbot python3-certbot-nginx
apt-get update
apt-get install certbot python-certbot-nginx
systemctl enable --now nginx
systemctl enable nginx
systemctl status nginx
certbot --nginx 运行这个，会提示输入邮箱
重启nginx -t;nginx -s reload
更新 run "certbot renew"
```

# mtproxy电报代理

- 这是一个一键安装 MTProxy 代理的绿色脚本，脚本可以在官方版本的 MTProxy 程序和兼容性最强的第三方作者开发的 mtg 程序中进行选择静态安装或者编译，该版本默认支持 Fake TLS 以及 AdTag 配置

```markdown
rm -rf /home/mtproxy && mkdir /home/mtproxy && cd /home/mtproxy
```

```markdown
curl -sS -O https://raw.githubusercontent.com/yilong001/mtproxy/master/mtproxy.sh && chmod +x mtproxy.sh && ./mtproxy.sh
```

![1723776894843.png](https://image.6669998.xyz/UK3scv.png)

# 虚拟内存

```markdown
wget https://raw.githubusercontent.com/yilong001/swap/main/swap.sh && bash swap.sh
选择①然后按需添加
```

- systemctl 相关
```dtd
systemctl start <service_name>      ##启动服务
systemctl stop <service_name>       ##停止服务
systemctl restart <service_name>    ##重启服务
systemctl reload <service_name>     ##重新加载服务配置（不重启服务）
systemctl status <service_name>     ##显示服务的状态
systemctl enable <service_name>     ##系统启动时自动启动
systemctl disable <service_name>    ##禁用系统启动时自动启动
systemctl is-enabled <service_name> ##查看服务是否已启用
systemctl is-active <service_name>  ##查看服务是否正在运行
systemctl is-failed <service_name>  ##查看服务是否处于失败状态
######### 列出所有已启用的服务
systemctl list-unit-files --type=service
######### 列出所有运行中的服务
systemctl list-units --type=service
```