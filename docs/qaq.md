https://blog.csdn.net/levine_hhb/article/details/82819420

https://github.com/cys85/blog/issues/1

link 安卓git 取消

返回指定页面
this.props.navigation.goBack("AddHousingAddress");

react-navigation是提供了goBack()到指定页面的方法的，那就是在goBack()中添加一个参数，但当你使用goBack('Main')的时候，你会发现并没有跳转，
原因是react-navigation默认goBack()中的参数是系统随机分配的key，而不是手动设置的routeName，而方法内部又没有提供可以获得key的方法，
所以这里只能通过修改源码将key换成routeName了。

```
把项目/node_modules/react-navigation/src/routers/StackRouter.js文件里的
const backRoute = state.routes.find((route: *) => route.key === action.key);
改成 const backRoute = state.routes.find(route => route.routeName === action.key);

但不是很完美, 这里的component要填想返回的组件的前一个组件的routeName, 比如你的栈里顺序是home1, home2, home3, home4, 在home4里要返回home2,
使用this.props.navigation.goBack('home3');;
并且又会带出一个问题: goBack()方法没反应了, 必须加个null进去, 写成goBack(null)...
```

解决React Native--_this.*** is not a function 的问题
https://blog.csdn.net/theVicTory/article/details/80113394
