---
title: Redmi AX6000 光猫桥接 OpenWrt下实现 Internet+IPTV+udpxy
tags:
  - openwrt
categories: Redmi AX6000
cover: 'https://image.6669998.xyz/M1KzLP.png'
description: 光猫桥接 OpenWrt下实现 Internet+IPTV+udpxy
abbrlink: 9c25eb08
date: 2024-03-17 17:28:12
top:
password:
---

- 设备：Redmi AX6000
- 基于 Immortalwrt

- 网络拓扑图

![65f6e5602f25c.png](https://image.6669998.xyz/3SawxD.png)

# 光猫桥接 

- 上网模式改桥接 （其他什么口 都不要选）

![](https://image.6669998.xyz/cmVnt6.png)

- IPTV （其他什么口 都不要选）
- 记住：VlanID

![65f6f8edb17cd.png](https://image.6669998.xyz/LDxvWV.png)

-  绑定端口

![65f6f942a6b4b.png](https://image.6669998.xyz/uXGTTg.png)

# AX6000 

## 固件降级

- 从web端的管理界面将Redmi AX6000的固件版本降级到1.0.60
[点这下载](https://oceanxx.lanzoum.com/iBrNa1ru9lpe)

## 获取SSH

- 获取路由器的stok

![65f6c7d07e21b.png](https://image.6669998.xyz/IRmx03.png)

```markdown
- 打开路由器的web端管理界面，输入管理员密码，从上方地址栏即可获得stok
- 例如，管理界面地址为：
- http://192.168.31.1/cgi-bin/luci/;stok=0aa9b98353f1be38bfc1afac76ee1c2313/web/home#router

- 则stok=0aa9b98353f1be38bfc1afac76ee1c2313，也即stok为0aa9b98353f1be38bfc1afac76ee1c2313。

- 注：每次路由器重启，stok值都会改变。
```



### 开启Redmi AX6000的开发者模式

#### 更改路由器的crash分区，使其进入到开发者模式 

- 例如，我的stok为TOCKN，则我应输入到浏览器地址栏的链接为

```markdown
http://192.168.31.1/cgi-bin/luci/;stok=TOCKN/api/misystem/set_sys_time?timezone=%20%27%20%3B%20zz%3D%24%28dd%20if%3D%2Fdev%2Fzero%20bs%3D1%20count%3D2%202%3E%2Fdev%2Fnull%29%20%3B%20printf%20%27%A5%5A%25c%25c%27%20%24zz%20%24zz%20%7C%20mtd%20write%20-%20crash%20%3B%20
```

![65f6c8589547a.png](https://image.6669998.xyz/29Ejce.png)

- code :0 为正常 下面也会输出 code= 0 

- 重启路由器

```markdown
http://192.168.31.1/cgi-bin/luci/;stok=TOCKN/api/misystem/set_sys_time?timezone=%20%27%20%3b%20reboot%20%3b%20
```

#### 设置Redmi AX6000的Bdata参数

-  设置参数telnet_en、 ssh_en、uart_en
- 老样子 游览器输入
- 重置后的TOCKN

````markdown
http://192.168.31.1/cgi-bin/luci/;stok=TOCKN/api/misystem/set_sys_time?timezone=%20%27%20%3B%20bdata%20set%20telnet_en%3D1%20%3B%20bdata%20set%20ssh_en%3D1%20%3B%20bdata%20set%20uart_en%3D1%20%3B%20bdata%20commit%20%3B%20
````

- 重启路由器

```markdown
http://192.168.31.1/cgi-bin/luci/;stok=TOCKN/api/misystem/set_sys_time?timezone=%20%27%20%3b%20reboot%20%3b%20
```

## 通过telnet开启ssh

- 在Windows 中输入指令:
- 或者其他软件 （在网盘里面）

```shell
telnet 192.168.31.1
```

![65f6c93248937.png](https://image.6669998.xyz/hn4vCb.png)
![65f6cc879bca3.png](https://image.6669998.xyz/HQ7Bti.png)

- 输入后会直接进入【ARE U OK】的界面，表示telnet成功

![65f6c90d36dbf.png](https://image.6669998.xyz/qiEinV.png)

###  开启ssh并修改密码为admin：

```shell
bdata set boot_wait=on
bdata commit
nvram set ssh_en=1
nvram set telnet_en=1
nvram set uart_en=1
nvram set boot_wait=on
nvram commit
sed -i 's/channel=.*/channel="debug"/g' /etc/init.d/dropbear
/etc/init.d/dropbear restart
echo -e 'admin\nadmin' | passwd root
```

# 刷入H大的UOOT

## 提前准备

- [hanwck 原文介绍 建议先看下](https://cmi.hanwckf.top/p/mt798x-uboot-usage/)

- [建议下载这个版本 截止目前新版我安装会获取不到dchp](https://github.com/hanwckf/bl-mt798x/releases)

![65f6bd1a0fe37.png](https://image.6669998.xyz/pH2FM2.png)

- 官方系统和刷保留官方分区的闭源OP后的分区号相同，BL2、Factory、FIP内容不变，Nvram、Bdata设置后内容有变，不过不影响，备份其中一个系统下面的即可，后面都是刷回备份后用小米救砖工具恢复。
- 刷其他固件和一些过渡固件的，注意cat /proc/mtd查看分区对应的mtd序号是否一样。 

## 运行dd命令备份分区到tmp文件夹

```shell
dd if=/dev/mtd1 of=/tmp/mtd1_BL2.bin
dd if=/dev/mtd2 of=/tmp/mtd2_Nvram.bin
dd if=/dev/mtd3 of=/tmp/mtd3_Bdata.bin
dd if=/dev/mtd4 of=/tmp/mtd4_Factory.bin
dd if=/dev/mtd5 of=/tmp/mtd5_FIP.bin
```

然后WinSCP等SCP协议软件登录路由器，打开tmp文件夹，将备份下载到电脑保存好。

![65f6cc879bca3.png](https://image.6669998.xyz/GG9vbz.png)
![65f6ccc76aa78.png](https://image.6669998.xyz/hg3eJH.png)

保存好备份分区后，可以用WinSCP把下载的：mt7986_redmi_ax6000-fip-fixed-parts-multi-layout.bin  上传uboot文件到tmp文件夹下，然后逐条输入下面命令，将uboot刷入FIP分区：

注意：FIP分区时不能断电、重启，不然就直接变砖

## 刷入uboot

```text
md5sum /tmp/mt7986_redmi_ax6000-fip-fixed-parts-multi-layout.bin
mtd write /tmp/mt7986_redmi_ax6000-fip-fixed-parts-multi-layout.bin FIP
mtd verify /tmp/mt7986_redmi_ax6000-fip-fixed-parts-multi-layout.bin FIP
```

- 说明如下：
    - 1 是看哈希值
    - 2 是刷写uboot
    - 3 是比对验证

运行结果类似这样，返回success说明刷的应该没问题

![1723437546921.png](https://image.6669998.xyz/ZHhGHw.png)

# Immortalwrt 安装

## 下载镜像

- Tips 任何固件一定是sysupgrade结尾
- [快捷方式搜索你想要的固件](https://firmware-selector.immortalwrt.org/)
- [Immortalwrt 下载 sysupgrade ](https://mirrors.jlu.edu.cn/immortalwrt/releases/23.05.1/targets/mediatek/filogic/)

![65f6b93b9cec9.png](https://image.6669998.xyz/BqEcyu.png)

###  上传至 UBOOT 

- 长按：RESET  15秒
- 设置本机IP 改为：192.168.31.2

![65f6cd741aa06.png](https://image.6669998.xyz/N9qBkI.png)

- 访问： http；//192.168.31.1/ 选择刚才下载的的uboot二进制并上传刷入
- 注意看英语 不要看转圈

![65f6baacb900e.png](https://image.6669998.xyz/YKtAi2.png)
![65f6cbffa0dce.png](https://image.6669998.xyz/mCQp6t.png)

- 如果刷固件后等很久系统都没有起来，可以断电重新进uboot再刷一次
- 改回 本机IP 改为自动获取

## Immortalwrt 网络及IPTV 配置

- 完整版

![65f6b32410521.png](https://image.6669998.xyz/Qvi8Jm.png)

### 设置 ppop 拨号☎️

```markdown
1、修改默认WAN口配置：
协议：PPPoE
设备：wan（本人设备wan连接光猫的网口）
开机自动运行：勾选
PAP/CHAP 用户名：PPPoE账号
PAP/CHAP 密码：PPPoE密码
高级设置-获取 IPv6 地址：手动（不自动生成Wan6，使用固定的Wan6接口。）

2、配置Wan6接口：
协议：DHCPv6客户端
设备：pppoe-wan
开机自动运行：勾选
请求IPv6地址：try
请求指定长度的IPv6前缀：自动

至此已经可以正常访问内外网，接下来配置其他接口
```
### 新建端口： iptv

```markdown
添加接口
名称：iptv
协议：静态地址
设备：br-iptv
开机自动运行：勾选
高级设置-使用默认网关：留空
高级设置-使用网关跃点：10（大于0即可）
防火墙设置-创建/分配防火墙区域：lan（以23.05.2版本为例，防火墙 - 通信规则已经包含了IPTV所需规则。）
```
![65f6b35fe1d8e.png](https://image.6669998.xyz/tZNWgK.png)
![65f6b3722c18c.png](https://image.6669998.xyz/dmRO7a.png)
![65f6b384d726f.png](https://image.6669998.xyz/iIpBBD.png)

### 设备设置

```markdown
添加设备
设备类型：网桥设备
设备名：br-iptv
网桥端口：wan.43 lan1.43 lan2.43 lan3.43 (添加所有端口方便盲插IPTV 43 为光猫的vlan ID ）
```

![65f6b3db85fa5.png](https://image.6669998.xyz/o6UHMW.png)

````markdown
修改默认的br-lan设备
高级设备选项-启用 IGMP 嗅探：勾选（不做此设置，IPTV播放几秒就会卡住停止播放）
````

![65f6b3fd0b0ef.png](https://image.6669998.xyz/Q8zJAr.png)

#### 直接在open SSH 下连接光猫

```markdown
3、添加并配置光猫接口（如不访问光猫可不设置）
名称：onu
协议：静态地址
设备：wan（本设备wan插网线，请以实际使用网口为准）
开机自动运行：勾选
IPv4地址：192.168.1.100（以光猫所在网段为准，现在光猫IP：192.168.1.1 所以不能设置相同 通信两端IP地址一致）
IPv4子网掩码：255.255.255.0
IPv4网关：可留空
高级设置-使用默认网关：留空
高级设置-使用网关跃点：10（大于0即可）
防火墙设置-创建/分配防火墙区域：wan
```

####   抄作业时间

- cat /etc/config/network

```shell
root@ImmortalWrt:~# cat /etc/config/network

config interface 'loopback'
        option device 'lo'
        option proto 'static'
        option ipaddr '127.0.0.1'
        option netmask '255.0.0.0'

config globals 'globals'
        option ula_prefix 'fd8e:b7e5:e13a::/48'

config device
        option name 'br-lan'
        option type 'bridge'
        list ports 'lan2'
        list ports 'lan3'
        list ports 'lan4'
        option igmp_snooping '1'

config interface 'lan'
        option device 'br-lan'
        option proto 'static'
        option ipaddr '192.168.31.2'
        option netmask '255.255.255.0'
        option ip6assign '60'
        option ip6ifaceid 'eui64'

config device
        option name 'wan'
        option macaddr '24:cf:24:1c:9a:52'

config interface 'wan'
        option device 'wan'
        option proto 'pppoe'
        option username 'username'
        option password 'password'
        option ipv6 'auto'
        option ip6ifaceid 'eui64'

config interface 'wan_6'
        option proto 'dhcpv6'
        option device 'pppoe-wan'
        option reqaddress 'try'
        option reqprefix 'auto'

config device
        option type 'bridge'
        option name 'br-iptv'
        list ports 'lan2.43'
        list ports 'lan3.43'
        list ports 'lan4.43'
        list ports 'wan.43'

config interface 'iptv'
        option proto 'static'
        option device 'br-iptv'
        option ipaddr '192.168.11.219'
        option defaultroute '0'
        option metric '10'
        option netmask '255.255.255.0'

config interface 'onu'
        option proto 'static'
        option device 'wan'
        option ipaddr '192.168.1.100'
        option netmask '255.255.255.0'
        option defaultroute '0'
        option metric '10'
```
-  cat /etc/config/firewall

```shell
root@ImmortalWrt:~# cat /etc/config/firewall

config defaults
        option syn_flood '1'
        option input 'REJECT'
        option output 'ACCEPT'
        option forward 'REJECT'
        option flow_offloading '1'
        option flow_offloading_hw '1'
        option fullcone '1'
        option fullcone6 '0'

config zone
        option name 'lan'
        option input 'ACCEPT'
        option output 'ACCEPT'
        option forward 'ACCEPT'
        list network 'lan'
        list network 'iptv'

config zone
        option name 'wan'
        option input 'REJECT'
        option output 'ACCEPT'
        option forward 'REJECT'
        option masq '1'
        option mtu_fix '1'
        list network 'wan'
        list network 'wan_6'
        list network 'onu'

config forwarding
        option src 'lan'
        option dest 'wan'

config rule
        option name 'Allow-DHCP-Renew'
        option src 'wan'
        option proto 'udp'
        option dest_port '68'
        option target 'ACCEPT'
        option family 'ipv4'

config rule
        option name 'Allow-Ping'
        option src 'wan'
        option proto 'icmp'
        option icmp_type 'echo-request'
        option family 'ipv4'
        option target 'ACCEPT'

config rule
        option name 'Allow-IGMP'
        option src 'wan'
        option proto 'igmp'
        option family 'ipv4'
        option target 'ACCEPT'

config rule
        option name 'Allow-DHCPv6'
        option src 'wan'
        option proto 'udp'
        option dest_port '546'
        option family 'ipv6'
        option target 'ACCEPT'

config rule
        option name 'Allow-MLD'
        option src 'wan'
        option proto 'icmp'
        option src_ip 'fe80::/10'
        list icmp_type '130/0'
        list icmp_type '131/0'
        list icmp_type '132/0'
        list icmp_type '143/0'
        option family 'ipv6'
        option target 'ACCEPT'

config rule
        option name 'Allow-ICMPv6-Input'
        option src 'wan'
        option proto 'icmp'
        list icmp_type 'echo-request'
        list icmp_type 'echo-reply'
        list icmp_type 'destination-unreachable'
        list icmp_type 'packet-too-big'
        list icmp_type 'time-exceeded'
        list icmp_type 'bad-header'
        list icmp_type 'unknown-header-type'
        list icmp_type 'router-solicitation'
        list icmp_type 'neighbour-solicitation'
        list icmp_type 'router-advertisement'
        list icmp_type 'neighbour-advertisement'
        option limit '1000/sec'
        option family 'ipv6'
        option target 'ACCEPT'

config rule
        option name 'Allow-ICMPv6-Forward'
        option src 'wan'
        option dest '*'
        option proto 'icmp'
        list icmp_type 'echo-request'
        list icmp_type 'echo-reply'
        list icmp_type 'destination-unreachable'
        list icmp_type 'packet-too-big'
        list icmp_type 'time-exceeded'
        list icmp_type 'bad-header'
        list icmp_type 'unknown-header-type'
        option limit '1000/sec'
        option family 'ipv6'
        option target 'ACCEPT'

config rule
        option name 'Allow-IPSec-ESP'
        option src 'wan'
        option dest 'lan'
        option proto 'esp'
        option target 'ACCEPT'

config rule
        option name 'Allow-ISAKMP'
        option src 'wan'
        option dest 'lan'
        option dest_port '500'
        option proto 'udp'
        option target 'ACCEPT'
```

- cat /etc/config/udpxy

```shell
root@ImmortalWrt:~# cat /etc/config/udpxy

config udpxy
        option disabled '0'
        option respawn '1'
        option status '1'
        option port '4022'
        option bind 'br-lan'
        option source 'br-iptv'
        option max_clients '16'
```

- cat etc/dnsmasq.conf

```shell
dhcp-option-force=125,28:35:x:x:x:x
```

## udpxy 设置

![65f6b306329ea.png](https://image.6669998.xyz/6hNZy9.png)

提示这个就表示成功了

![65f6b479ad454.png](https://image.6669998.xyz/83vtkG.png)

## wifi 设置 Master模式

- Master模式也被称为接入点AP模式，是Wireless Access Point的简称，中文名称：无线接入点。 AP相当于一个连接有线网和无线网的桥梁，其主要作用是将各个无线网络客户端连接到一起，然后将无线网络接入以太网
- 通俗讲，就是将连入互联网的有线网络扩展为无线网络，以供手机等无线设备连接到互联网中

![1723439270439.png](https://image.6669998.xyz/TCeZ8b.png)

- DoorNet配套镜像在初次开机初始化时，默认配置为Master模式，并且无线参数配置为80211AC协议、频宽80Mhz、44信道。这里为了方便接下来的操作，我们将默认的无线连接移除

###  AP模式2.4G频段

- 点击 radio0 右侧的新增按钮。在弹出标签 接口配置 -> 常规设置 中，将模式设置为 接入点AP；ESSID(无线网络名称)设置为 DoorNet； 网络指定为 lan 。

![1723439261843.png](https://image.6669998.xyz/RFTmux.png)

- 在 接口配置 -> 无线安全 中，加密算法选择 WPA2-PSK ；密钥(无线密码)设置为 password （自定义）

![1723439320905.png](https://image.6669998.xyz/EACYRb.png)

- 在 设备配置 中，我们的设置参数如下图中所示。

![1723439341399.png](https://image.6669998.xyz/G2RtX8.png)
![1723439359524.png](https://image.6669998.xyz/L7L0i1.png)

- 在802.11n模式下，如果无线频率为2.4GHz，信道宽度为20MHz，则无线网卡的理论连接速率上限为75Mbps。 为了提升连接速率，我们可以设置信道宽度为40MHz，则无线网卡理论连接速率为150Mbps。
- 如果信道带宽设置为20MHz，则需关闭高级设置中的 强制40MHz模式 选项。 如果信道带宽设置为40MHz，则需开启，否则可能无法稳定工作在40MHz模式。
- 以上设置完成后，点击页面右下角 保存，退出标签页后点击页面右下角 保存并应用 等待配置被应用完成。
- 如果以上操作完成无误，此时已经可以搜索到名为 DoorNet 的无线信号了。
- 如未成功启动，可尝试重启。

### AP模式5G频段
- 在5G频段模式下，会出现无线网卡修改配置后无法应用的错误。 另外在5G频段模式下，部分设置也与2.4G频段模式不同。经过多次测试后，得到了当前的5G频段配置参数及方法。
- 点击上小节建立的无线网络标签右侧的 编辑 按钮，在 设备配置 中，我们的设置参数如下图中所示。

![1723439371454.png](https://image.6669998.xyz/CEKYde.png)
![1723439535366.png](https://image.6669998.xyz/M45VTb.png)

- Teps

```markdown
信道可在以下参数中选择。
5180 MHz [36]
5200 MHz [40]
5220 MHz [44]
5240 MHz [48]
5745 MHz [149]
5765 MHz [153]
5785 MHz [157]
5805 MHz [161]
5825 MHz [165]
```
- 以上设置完成后，点击页面右下角 保存，退出标签页后点击页面右下角 保存并应用 等待配置被应用完成。

# IPTV

## 抓IPTV 源

- 打开软件：[wireshark 官方下载地址](https://www.wireshark.org/download.html#thirdparty)
- 搜索：rtsp igmp （二选一）
- 

![65fb948b72a38.png](https://image.6669998.xyz/JU6O8w.png)
![65fb9665d60dc.png](https://image.6669998.xyz/TPZozk.png)
![65fb92d714117.png](https://image.6669998.xyz/MrsAg6.png)

- 打开[VLC软件](https://oceanxx.lanzoum.com/i1x2o1s259bc)
- 播放修改后的rtp://xxx.xx.xx.:xxx
- 正常播放就可以了

## 抓 option 125 60 

- 博主目前没抓到 60 所以无法机顶盒插网线播放
- 抓包机顶盒的数据包 找到以下数据 125 

![65f6e8120c272.png](https://image.6669998.xyz/7ESGem.png)

- 把值复制出来 然后排序好 格式如下：

![65f6e8a35e742.png](https://image.6669998.xyz/FFHufX.png)

- 修改 dnsmasa.conf

```shell
vi /etc/dnsmasq.conf

#编辑 按 i   退出命令  ：wq #保存退出  q! 不保存强制退出

dhcp-option-force=125,28:35:x:x:x:x

# 重启DNS
/etc/init.d/dnsmasq restart
```

![65f6eb8ee2c70.png](https://image.6669998.xyz/hpDKZJ.png)

- 相关软件 在云盘

- [红米AX6000获取SSH权](https://www.right.com.cn/forum/thread-8253125-1-1.html)
- [AX6000 机参考](https://www.right.com.cn/forum/thread-8312884-1-1.html)
- [IPTV 参考](https://www.right.com.cn/forum/thread-8268077-1-1.html)
- [wifi 参考大佬](https://doc.embedfire.com/openwrt/user_manal/zh/latest/User_Manual/openwrt/wifi.html)

