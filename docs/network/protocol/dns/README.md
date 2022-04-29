---
title: "网络世界-DNS"
tags:
  - DNS
---

# DNS 协议

域名系统。在 DNS 中，域名又称主机名，即 `Host`，域名用 '.' 分隔成多个单词，级别从左到右依次升高，最右边的称为顶级域名，比如 `com`、`cn`、`edu` 等，域名是 IP 地址的映射，通过 DNS 服务器做域名解析找到某个域名对应的 IP 地址

## 域名的用途

- 代替 IP 地址
- 在 Nginx 等 web 服务器里，可以用来标识虚拟主机，决定由哪个虚拟主机来对外提供服务，比如在 Nginx 里使用 `server_name` 指令：

```nginx
server {
    listen 80;                       #监听80端口
    server_name  vuepress.airbry.com;  #主机名是vuepress.airbry.com
}
```

- 基于域名实现的负载均衡。域名解析可以返回多个 IP 地址，所以一个域名可以对应多台主机。

## 域名解析

- 根域名服务器，管理顶级域名服务器，返回像 `com`、`cn` 等顶级域名服务器的 IP 地址
- 顶级域名服务器，管理各自域名下的权威域名服务器，比如 com 顶级域名服务器可以返回 apple.com 域名服务器的 IP 地址
- 权威域名服务器，管理自己域名下主机的 IP 地址，比如 apple.com 权威域名服务器返回 www.apple.com 的 IP 地址
  > 这些远程查询基于 UDP 协议，通常使用 53 号端口

比如访问 `www.apple.com` 网站，域名解析过程如下：

1. 访问根域名服务器，返回 `com` 顶级域名服务器的 IP
2. 访问 `com` 顶级域名服务器，返回 `apple.com` 权威域名服务器的 IP
3. 访问 `apple.com` 权威域名服务器的 IP，得到 `www.apple.com` 的 IP 地址

实际情况中为了减轻域名解析的压力，更快的获取结果，都会使用缓存。各大网络运营商会建立自己的 DNS 服务器，作为用户 DNS 查询的代理，代替用户访问核心 DNS 系统，也会缓存之前查询的结果，操作系统也会对 DNS 解析结果做缓存，机器里的 hosts 文件也会记录域名映射

Nginx 里的 `resolver` 指令，就是用来配置 DNS 服务器的，例如：

```nginx
resolver 8.8.8.8 valid=30s;  #指定Google的DNS，缓存30秒
```

## dns-prefetch

DNS 预获取。默认情况下浏览器会对页面中和当前域名不在同一个域的域名进行预获取，并且缓存结果，这是隐式的 dns-prefetch。如果想对页面中没有出现的域进行预获取，那么就要使用显示的 dns-prefetch 了，也就是使用 link 标签

```html
<link rel="dns-prefetch" href="" />
```

尽量放在网页的前面，推荐放在 <meta charset=""/> 的后面
此外，还可以通过下面的标签禁止隐式的 DNS prefetch

```html
<meta http-equiv="x-dns-preftch-control" content="off" />
```
