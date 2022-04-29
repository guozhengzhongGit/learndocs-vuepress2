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
            text: "原理分析",
            link: "/framework/react-code",
          },
          {
            text: "源码解析",
            link: "/framework/react-source",
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
  {
    text: "常用类库",
    children: [
      {
        text: "immer",
        link: "/library/immer",
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
    text: "前端工程化",
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
      {
        text: "脚手架",
        children: [
          {
            text: "项目搭建",
            link: "/bundle/feproject",
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
  {
    text: "综合扩展",
    children: [
      {
        text: "网络世界",
        children: [
          {
            text: "网络协议",
            link: "/network/protocol",
          },
          {
            text: "CDN",
            link: "/network/cdn",
          },
        ],
      },
      {
        text: "浏览器",
        link: "/plus/browser",
      },
    ],
  },
  {
    text: "题海拾贝",
    children: [
      {
        text: "模拟考场",
        children: [
          {
            text: "代码运行结果",
            link: "/question/coderes",
          },
          {
            text: "表达陈述",
            link: "/question/talk",
          },
        ],
      },
      {
        text: "手写代码",
        children: [
          {
            text: "实现原生API",
            link: "/writecode/api",
          },
          {
            text: "手写自定义方法",
            link: "/writecode/fn",
          },
          {
            text: "场景设计",
            link: "/writecode/design",
          },
        ],
      },
      {
        text: "真题收纳",
        link: "/question/real",
      },
    ],
  },
];
