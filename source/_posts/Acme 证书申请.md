---
title: acme 证书申请
tags:
  - Linux
  - acme
categories: Acme
cover: 'https://image.6669998.xyz/UxgsSJ.png'
description: acme 证书申请
abbrlink: 7cbd27cc
date: 2023-07-30 14:05:30
---
# Acme
- 安装curl socat

```markdown
apt update -y && apt install -y curl && apt install -y socat
```
- 拉取acme

```markdown
curl https://get.acme.sh | sh
```
- xxxxxx@gmail.com(替换为你的邮箱)

```markdown
~/.acme.sh/acme.sh --register-account -m xxxxxx@gmail.com
```
- xxxx.xxxxx.xx(自己的域名)

```markdown
~/.acme.sh/acme.sh --issue -d xxxx.xxxxx.xx --standalone
```
- 把证书秘钥拷到root目录 且自动加入nginx  

```markdown
~/.acme.sh/acme.sh --installcert -d xxxx.xxxxx.xx --key-file /root/private.key --fullchain-file /root/cert.crt --reloadcmd "service nginx reload"
```
- 示例：

```markdown
server {
    listen 443 ssl;
    server_name xxxx.xxxxx.xx;  ### 申请的域名

    ssl_certificate /root/cert.crt;
    ssl_certificate_key /root/private.key;

    # 其他 Nginx 配置...
}
```
```markdown
service nginx restart   ##确认无误后重启nginx
```
如果证书申请失败，就换个证书机构申请

## 重新加载 Bash
```markdown
source ~/.bashrc
```
## 切换 Let's Encrypt
````markdown
acme.sh --set-default-ca --server letsencrypt
````
## 切换 Buypass
```markdown
acme.sh --set-default-ca --server buypass
```
## 切换 ZeroSSL
```markdown
acme.sh --set-default-ca --server zerossl
```
## 切换 SSL.com
```markdown
acme.sh --set-default-ca --server ssl.com
```
## 切换 Google Public CA
```markdown
acme.sh --set-default-ca --server google
```
# acme 续签
- 一般是有一个定时 自动续签的
- 提供手动续签方法

```markdown
~/.acme.sh/acme.sh --renew -d xxxx.xxxxx.xx
```
