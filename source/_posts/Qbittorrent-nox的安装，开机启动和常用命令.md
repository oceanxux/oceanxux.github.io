---
title: Qbittorrent-nox的安装，开机启动和常用命令
tags:
  - Linux
  - Qbittorrent-nox
categories: Qbittorrent-nox
description: Qbittorrent-nox的安装，开机启动和常用命令
abbrlink: 5d155e06
date: 2023-07-19 13:46:58
cover: 'https://image.6669998.xyz/4SN3Rn.png'
---
ARM 甲骨文
---
### 安装 qBittorrent-nox
```bash
apt update  
apt install qbittorrent-nox
```
安装完成后放行指定的端口，然后访问设置好Qbittorrent

### 添加开机自启动
```bash
nano  /etc/systemd/system/qbittorrent-nox.service
```
输入以下文本保存
```
[Unit]
    
Description=qBittorrent-nox
    
After=network.target
    
    
    
[Service]
    
User=root
    
Type=forking
    
RemainAfterExit=yes
    
ExecStart=/usr/bin/qbittorrent-nox -d
    
    
    
[Install]
    
 WantedBy=multi-user.target
 ```
### 启动 qbittorrent-nox 并创建服务配置
```bash
systemctl start qbittorrent-nox  
```
### 设置开机自动启动 qbittorrent-nox
```bash
systemctl enable qbittorrent-nox 
```
### 常用命令
```bahs
qbittorrent-nox    ###启动Qbittorrent
qbittorrent-nox -d ###在后台启动Qbittorrent
qbittorrent-nox -v ###查看Qbittorrent版本
qbittorrent-nox -h ###查看帮助
qbittorrent-nox --webui-port=xxxx  ###启动 Qbittorrent 并指定 Web 面板的端口
```
