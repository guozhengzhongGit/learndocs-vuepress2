module.exports = {
  lang: "zh-CN",
  title: "码力全开",
  description: "vue react javascript 前端 面试 js",
  theme: "@vuepress/default",
  themeConfig: {
    logo: "https://vuejs.org/images/logo.png",
    editLink: false,
    home: "/",
    navbar: [
      // 嵌套 Group - 最大深度为 2
      {
        text: "前端框架",
        children: [
          {
            text: "React",
            children: [
              {
                text: "源码",
                link: "/framework/react/source",
              },
            ],
          },
          {
            text: "Vue",
            children: [
              {
                text: "源码(vue2)",
                link: "/framework/vue2-source/source",
              },
              {
                text: 'vue 3',
                link: '/framework/vue3'
              }
            ],
          },
        ],
      },
      {
        text: "JavaScript",
        children: [
          {
            text: "语言基础",
            children: [
              {
                text: "原生API",
                link: "/js/basic",
              },
            ],
          },
          {
            text: '进阶提升',
            children: [
              {
                text: 'ES6+',
                link: "/js/es6"
              },
              {
                text: '设计模式',
                link: "/js/design-pattern"
              }
            ]
          },
          {
            text: "函数式编程",
            children: [
              {
                text: "高阶函数",
                link: "/js/function/higher-function",
              },
            ],
          },
        ],
      },
      // {
        // text: "前端工程化",
        // children: [
        //   {
        //     text: "前端工程化",
        //     children: [
        //       {
        //         text: "原生API",
        //         link: "/js/basic",
        //       },
        //     ],
        //   },
        // ],
      // },
      {
        text: "项目构建",
        children: [
          {
            text: "代码打包",
            children: [
              {
                text: "Tree Shaking",
                link: "/bundle/treeshaking",
              },
            ],
          },
        ],
      }
    ],
    // 侧边栏对象
    // 不同子路径下的页面会使用不同的侧边栏
    sidebar: "auto",
  },
};
