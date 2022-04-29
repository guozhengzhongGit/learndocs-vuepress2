---
title: "网络世界-URI"
tags:
  - URI
  - URL
---

# URI

## URI 介绍

`URI` 统一资源标识符

`URI` 主要由三部分构成

- 协议名，scheme
- 主机名，host:port，可以是域名或者 IP 地址，端口号可省略，这时 HTTP 会使用默认的 80，HTTPS 会使用默认的 443
- 路径，path，资源在主机上的位置，使用 `/` 来分隔多级目录，**path 必须以 `/` 开头，即 `/` 是 path 的一部分**
- 查询参数，query，在 path 之后，以一个 `?` 开始，但**不包含** `?`
- 片段标识符，#fragment。**但浏览器永远不会把它发送给服务器，服务器是看不到的**
  ![URI](https://qiniucdn.airbry.com/uri.png)
  例如：

```
http://nginx.org/en/download.html
```

其中，协议名是 **http**，主机名这里是 **nginx.org**，路径是 **/en/download.html**

再比如：

```
http://nginx.org
http://www.chrono.com:8080/11-1
https://tools.ietf.org/html/rfc7230
file:///D:/http_study/www/
```

完整例子，比如一个网址：`http://localhost:63342/interview/index.html?name=x&age=18#ddd`，其中：

- href 是 http://localhost:63342/interview/index.html?name=gzz#hash
- 协议 protocol 是 http
- host 是 localhost:63342
- hostname 是 localhost
- port 是 63342
- pathname 是 /interview/index.html
- search 是 ?name=gzz&age=18
- hash 是 #hash
- origin 是 http://localhost:63342

## URI 的编码

在 URI 里只能使用 ASCII 码，对于中文、日文以及 `?`、`@`、`&` 等特殊字符，就需要转义

转义规则是**转换成十六进制字节值，然后前面加一个%**，比如空格被转成 `%20`，`?` 转成了 `%3F`，而中文、日文等通常使用 UTF-8 编码后再转义

## URL 介绍

`URL` 统一资源定位符，是 URI 的一个子集
