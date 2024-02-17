---
title: Hexo+Twikoo 私有化部署
tags:
  - Twikoo
categories: Twikoo
cover: 'https://tu.i3.pw/imgs/2024/02/52f7383f2ac7e1e6.webp'
description: 基于docker下Twikoo 私有化部署
abbrlink: b3492643
date: 2024-02-03 17:35:36
top:
password:
---
- 基于docker下部署

# docker 下安装镜像

- [教程地址](https://xx.6669998.xyz/post/4eb3381c.html)

- 1、拉取镜像

```markdown
sudo docker pull imaegoo/twikoo
```

- 2、创建并启动容器

```dockerfile
sudo docker run -p 7905:8080 -v /root/twikoo/data:/app/data -d imaegoo/twikoo
```

- 3、正常情况下访问http://服务器ip:port，即twikoo的服务地址，可以看到如下运行状况

```yaml
#test
twikoo:
envId: http://服务器ip:7950
```
![](https://tu.i3.pw/imgs/2024/02/dd0732976a9c2c08.png)

# Nginx反向代理配置

![](https://tu.i3.pw/imgs/2024/02/4eaf8a96e9d17156.png)
```nginx
upstream twi {#需要配置upstream
        server xxxx.cnp:7950; #你的域名+加端口
    }  

server {
    listen  443 ssl;
    server_name  twikoo.xxxx.cn; #子域名

    ssl_certificate      /etc/nginx/cert/twikoo.cnhuazhu.top.pem;
    ssl_certificate_key  /etc/nginx/cert/twikoo.cnhuazhu.top.key;

    # ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    
    ssl_protocols SSLv3 TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers  HIGH:!ADH:!EXPORT56:RC4+RSA:+MEDIUM;
    ssl_prefer_server_ciphers  on;

    location / {
        #proxy_pass http://localhost:7950;
        proxy_pass http://twi;

        # add_header Access-Control-Allow-Origin "*" always; #这个不要加
        # add_header Access-Control-Allow-Methods "POST, GET,PUT,DELETE, OPTIONS";
        # add_header Access-Control-Allow-Headers "Origin, Authorization, Accept";
  
        
    }
}
```
# caddy 

- 我个人喜欢用caddy 更简单

```caddy
twikoo.xxxx.xx {
    reverse_proxy http:/ip:port
}
```


## 保存，重新启动Nginx服务

```shell
sudo service nginx restart
```

- 如此便实现了：访问https://twikoo.twikoo.xxxx.cn ，Nginx 会将转发到 http:/twikoo.xxxx.cn:8099。实现反向代理。
- 修改envId：

```yaml
twikoo:
  envId: https://twikoo.xxxx.cn/
```

- 保存，重新部署。最后配置twikoo面板就可以了

# Twoikoo

- 设置twoikoo

![](https://tu.i3.pw/imgs/2024/02/50020e2aa1389d06.png)
## 记得去注册 才会有头像显示

- [头像注册网站：gravatar](https://gravatar.com/profile/links)

## 导入数据

- 默认twikoo数据文件会在/root/data中，我们通过宝塔就可以看到db.json.0
- 如果需要转移建议备份整个 data
![](https://tu.i3.pw/imgs/2024/02/7024ec006dfacda3.jpg)

## hexo butterfly 设置

- Butterfly中我们更改配置文件，将themes/butterfly/_config.yml中的
![](https://tu.i3.pw/imgs/2024/02/caae94c0ad74f0d8.png)



参考以下博客收集，感谢以下大佬不分顺序
- [花猪](https://cnhuazhu.top/butterfly/2022/09/20/Twikoo%E7%A7%81%E6%9C%89%E5%8C%96%E9%83%A8%E7%BD%B2/)
- [张军](https://xiaoniuhululu.com/2022-08-09_twikoo_privatization_deployment_tutorial/?highlight=twikoo)
- [张洪](https://blog.zhheo.com/p/99d020fe.html)
- [butterfly](https://butterfly.js.org/posts/ceeb73f/#%E8%A9%95%E8%AB%96)
- [twikoo](https://twikoo.js.org/)