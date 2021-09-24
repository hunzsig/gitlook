// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routeAsync routerConfig 为检测关键字，请不要修改名称

import React from 'react';
import {HomeOutlined} from '@ant-design/icons';

const routerConfig = [
  /**
   * 路由
   * 参数
   *   path[ must ]
   *   name[ must ]
   *   component
   *   layout
   *   icon[ default::null ] see https://ant.design/components/icon-cn/
   *   hide[ default::false ]
   *   disabled[ default::false ]
   *   async[ default::routerAsync ]
   * must 参数 必须设置
   * 如果该路由使用过程中无需访问或者说仅仅作为children一个包容器，则 component 可不设置
   * hide === true 时不会在导航显示(注意 '/' 'sign' '*' 默认为hide且设定无效)
   */
  {
    path: '/',
    name: '首页',
    icon: <HomeOutlined/>,
    component: () => import('./pages/Home/Index'),
  },
];

export default routerConfig;
