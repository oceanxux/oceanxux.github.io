---
title: caddy2 下载及使用
tags:
  - Linux
  - caddy2
categories: caddy2
cover: 'https://tu.i3.pw/imgs/2023/10/1b247b079ea74da7.png'
description: 使用方法及常见问题
abbrlink: 22f0e0cb
top: 6
date: 2023-07-19 18:44:43
---
以下是个人笔记
---

# 安装
```bash
wget https://github.com/caddyserver/caddy/releases/download/v2.6.4/caddy_2.6.4_linux_arm64.deb
```
## 解压
```bash
mkdir /root/caddy

dpkg -i caddy_2.6.4_linux_arm64.deb ## 只是解压

dpkg-deb -x caddy_2.6.4_linux_arm64.deb /root/caddy  解压到指定文件夹
```
## 非ARM安装
去这里下载对应系统的版本,然后解压到指定文件夹
```markdown
https://github.com/caddyserver/caddy/releases

## 比如amd64
wget https://github.com/caddyserver/caddy/releases/download/v2.6.4/caddy_2.6.4_linux_amd64.deb
```
# 常用命令
```markdown
systemctl start caddy     ##启动caddy
systemctl status caddy    ##验证 Caddy 是否运行
caddy run                 ##以前台运行 Caddy
caddy start               ##以后台模式运行 Caddy
caddy stop                ##停止后台运行的
caddy reload              ## 重新加载配置文件
```

## 其他命令

```bash
caddy version        ：查看安装的 Caddy 版本。

caddy list-modules    ：列出可用的 Caddy 模块（插件）。

caddy list-modules --installed    ：列出已安装的 Caddy 模块。

caddy fmt              ：格式化 Caddyfile，使其符合 Caddy 的标准格式。

caddy validate         ：验证 Caddyfile 的语法是否正确。

caddy adapt            ：将 Caddyfile 转换为 JSON 配置，并打印出来，可用于检查配置是否正确。

caddy run --config /path/to/your/Caddyfile：以前台模式运行 Caddy，并加载指定路径的 Caddyfile 配置文件。

caddy start --config /path/to/your/Caddyfile：以后台守护进程模式运行 Caddy，并加载指定路径的 Caddyfile 配置文件。

caddy stop --config /path/to/your/Caddyfile：停止后台运行的指定配置文件的 Caddy 进程。
```
# 端口查看是否占用

```bash
# 1、
ss -tuln
# 2、
sudo lsof -i :端口号
# 3、
sudo netstat -tuln | grep :端口

sudo lsof -i :443 | grep LISTEN

```
# 写法示例

- 配置在线链接可拉取

```markdown
xxx.com {
    tls xxxxx@email.com
    root * /xx/xx.  ##路径
    file_server
}
```

- 单纯反带端口

```bahs
{
    # 全局配置选项，如果有的话
}

example.com {
      reverse_proxy localhost:端口# 该域名的配置选项
}

# 可以有更多的域名配置
```

## 其他示例

```markdown
ex.com {
    root * /root/ex
    encode gzip
    file_server

    @proxy {
        path /api/*   # 匹配以 /api/ 开头的路径
    }

    reverse_proxy @proxy http://127.0.0.1:1020 {
        # 可选配置项
        # header_up Host {host}
        # header_up X-Real-IP {remote}
        # header_up X-Forwarded-For {remote}
        # header_up X-Forwarded-Proto {scheme}
    }
}
```

- ![官方wiki](https://caddy2.dengxiaolong.com/docs/caddyfile/concepts)

配置说明：

root * /root/ex：设置网站根目录为 /root/ex，用于提供静态文件服务，就像之前提到的一样。

encode gzip：启用 Gzip 压缩功能，对返回的文本文件进行压缩。

file_server：启用静态文件服务器，用于提供静态文件。

@proxy：这是一个匹配器（Matcher），用于定义反向代理的匹配条件。在这里，我们使用了一个路径匹配，匹配所有以 /api/ 开头的路径。

reverse_proxy @proxy 127.0.0.1:1020：这是反向代理指令，它将匹配到的请求转发到 127.0.0.1:1020 这台服务器上。你可以将 127.0.0.1:1020 替换为你实际的目标服务器地址和端口。

在配置中，我们使用 @proxy 匹配器来定义反向代理的匹配条件。只有请求路径以 /api/ 开头的请求会被转发到目标服务器。对于其他路径，Caddy 仍然会提供静态文件服务。

请注意，reverse_proxy 指令还支持其他可选配置项，例如自定义请求头，你可以根据需要进行配置。