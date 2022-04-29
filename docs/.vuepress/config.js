const navbar = require('./project-config/navbar');
module.exports = {
  lang: "zh-CN",
  title: "前端资源",
  description: "vue react javascript 前端 面试 js",
  theme: "@vuepress/default",
  themeConfig: {
    logo: "https://assets-1253723501.cos.ap-beijing.myqcloud.com/uPic/20220429165654code.png",
    home: "/",
    navbar,
    // 侧边栏对象
    // 不同子路径下的页面会使用不同的侧边栏
    sidebar: "auto",
    editLink: false,
    lastUpdated: true,
    lastUpdatedText: '创作于',
    contributors: true,
    contributorsText: '创作者'
  },
};
