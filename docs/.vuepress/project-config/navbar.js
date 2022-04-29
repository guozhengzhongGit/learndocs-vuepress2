module.exports = [
  // 嵌套 Group - 最大深度为 2
  {
    text: "JavaScript",
    children: [
      {
        text: "语言基础",
        children: [
          {
            text: "ES5",
            link: "/js/es5",
          },
        ],
      },
      {
        text: "进阶提升",
        children: [
          {
            text: "ES6+",
            link: "/js/es6",
          },
          {
            text: "设计模式",
            link: "/js/design-pattern",
          },
        ],
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
            text: "vue 3",
            link: "/framework/vue3",
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
  },
  {
    text: "算法学习",
    children: [
      // {
      //   text: '数据结构',
      //   link: '/algorithm/datastructure'
      // },
      // {
      //   text: '算法常识',
      //   link: '/algorithm/basic'
      // },
      {
        text: "力扣刷题",
        link: "/algorithm/leetcode",
      },
    ],
  },
];
