# 跨域

浏览器遵循同源策略(sop)这一安全机制。限制不同源之间的文档或脚本如何进行交互，保证用户的信息安全，防止恶意网站修改页面内容，窃取隐私数据。同源策略是由浏览器实现的，这意味着此策略并不适用于从服务器或者任何其他 HTTP 客户端发出的请求

协议、域名、端口完全相同

共三种行为受到限制：不同源的页面 DOM 无法访问，cookie、localStorage、indexDB 等本地存储无法读取，AJAX 请求不能发送

#### CORS 原理

跨域资源共享。是 W3C 标准，通过设置额外的请求头来告知浏览器是否允许访问不同源服务器上的资源

浏览器将跨域请求分为简单请求和非简单请求

简单请求：get、post、head 方法，请求头只能包含基本的 Accept、Accept-language、content-language、content-type 等，其中 content-type 只能是 text/plain、multipart/form-data、application/x-www-form-urlencoded 这三种，**简单请求其实就是普通的 html form 在不依赖脚本的情况下可以发出的请求**
对于简单请求，浏览器直接发送跨域请求，在请求头中有 Origin 字段，说明本次请求来自于哪个域，协议域名端口都包含；服务器允许这个源访问，就在响应头中设置 Access-Control-Allow-Origin 字段，浏览器正常接收请求；若不允许该跨域请求，则响应头中不包含 Access-Control-Allow-Origin 字段，浏览器会抛出一个错误

非简单请求，需要浏览器先用 options 方法发送一个预检请求(preflight)，请求头中包含 Origin、Access-control-Request-Method、Access-Control-Request-Headers 等字段，服务端判断是否允许该跨域请求，如果允许则返回的响应头中包含 Access-Control-Allow-Origin、Access-Control-Allow-Methods 和该次预检请求的有效时长 Access-Control-Max-Age，然后浏览器再发送真正的跨域请求

#### 解决办法

对于 cookie，可以设置其一级域名 domain，这样二级域名就可以读取这个 cookie

对于 iframe ，父窗口打开不同源的 iframe，无法获取其 DOM。如果两个窗口一级域名相同，只是二级域名不同，也可以设置 document.domain 属性来解决

若是完全不同源，则可以使用片段标识符、window.name 和 HTML5 的标准 API postMessage 来实现跨窗口通信，这样读写其他窗口的 localStorage 也成为可能

对于 AJAX 请求，可以使用 jsonp，cors 和 websocket 来发送跨域请求，也可以通过架设代理服务器来实现。

#### jsonp 原理

利用 script 标签的 src 可以跨域的特性来完成。前端预先定义一个回调函数，然后构造请求 URL，该回调也包含在查询字符串中，前端动态创建一个 script 标签，其 src 属性值就是拼接好的 URL，这样就发起了一次 GET 请求。服务端收到请求后将数据放在回调函数参数位置进行返回；script 请求的脚本会作为代码直接运行，回调函数在前端执行，这样就可以拿到服务端返回的数据了，需要前后端互相配合，只支持 GET 方法
