/*
*ReactNative中能使用的css样式
 Valid style props: [

 "alignItems",居中对齐弹性盒的各项 <div> 元素
 例：alignItems:'center',
 -> stretch(项目被拉伸以适应容器)
 -> center(项目位于容器的中心)
 -> flex-start(项目位于容器的开头)
 -> flex-end(项目位于容器的结尾)
 -> baseline(项目位于容器的基线上)
 -> initial(设置该属性为它的默认值)
 -> inherit(从父元素继承该属性)

 "alignSelf",居中对齐弹性对象元素内的某个项
 例：alignSelf:'center',
 -> auto(默认值。元素继承了它的父容器的 align-items 属性。如果没有父容器则为 "stretch")
 -> stretch(项目被拉伸以适应容器)
 -> center(项目位于容器的中心)
 -> flex-start(项目位于容器的开头)
 -> flex-end(项目位于容器的结尾)
 -> baseline(项目位于容器的基线上)
 -> initial(设置该属性为它的默认值)
 -> inherit(从父元素继承该属性)

 "backfaceVisibility",当元素不面向屏幕时是否可见
 例：backfaceVisibility:'visible'
 -> visible (背面是可见的)
 -> hidden  (背面是不可见的)

 "backgroundColor",背景色
 例：backgroundColor:'red'
 例：backgroundColor:'#cccccc'
 -> color   (指定背景颜色。在CSS颜色值近可能的寻找一个颜色值的完整列表)
 -> transparent (指定背景颜色应该是透明的。这是默认)
 -> inherit (指定背景颜色，应该从父元素继承)

 "borderBottomColor",底部边框颜色
 例：borderBottomColor:'red'
 例：borderBottomColor:'#cccccc'
 -> color   (指定背景颜色。在CSS 颜色值 查找颜色值的完整列表)
 -> transparent (指定边框的颜色应该是透明的。这是默认)
 - >inherit (指定边框的颜色，应该从父元素继承)


 "borderBottomLeftRadius",左下角添加圆角边框
 例：borderBottomLeftRadius:10

 "borderBottomRightRadius",右下角添加圆角边框
 例：borderBottomRightRadius:10

 "borderBottomWidth",底部边框宽度
 例：borderBottomWidth:8

 "borderColor",四个边框颜色
 例：borderColor:'#00ff00'

 "borderLeftColor",左边框颜色
 例：borderLeftColor:'yellow'

 "borderLeftWidth",左边框宽度
 例：borderLeftWidth:10

 "borderRadius",四角圆角弧度
 例：borderRadius:15

 "borderRightColor",右边框颜色
 例：例：borderRightColor:'yellow'

 "borderRightWidth",右边框宽度
 例：borderRightWidth:10

 "borderStyle",四个边框的样式
 例：borderStyle:'dotted'
 -> none    定义无边框。
 -> hidden  与 "none" 相同。不过应用于表时除外，对于表，hidden 用于解决边框冲突。
 -> dotted  定义点状边框。在大多数浏览器中呈现为实线。
 -> dashed  定义虚线。在大多数浏览器中呈现为实线。
 -> solid   定义实线。
 -> double  定义双线。双线的宽度等于 border-width 的值。
 -> groove  定义 3D 凹槽边框。其效果取决于 border-color 的值。
 -> ridge   定义 3D 垄状边框。其效果取决于 border-color 的值。
 -> inset   定义 3D inset 边框。其效果取决于 border-color 的值。
 -> outset  定义 3D outset 边框。其效果取决于 border-color 的值。
 -> inherit 规定应该从父元素继承边框样式。

 "borderTopColor",上边框颜色
 例：borderTopColor：'red'

 "borderTopLeftRadius",左上角圆角弧度
 例：borderTopLeftRadius：3

 "borderTopRightRadius",右上角圆角弧度
 例：borderTopRightRadius：4

 "borderTopWidth",顶部边框宽度
 例：borderTopWidth：13

 "borderWidth",四个边框的宽度
 例：borderWidth：2

 "bottom",图像的底部边缘
 例：bottom:20

 "color",颜色
 例：color:'red'

 "elevation",Z轴，可产生立体效果
 例：elevation:1

 "flex",让所有弹性盒模型对象的子元素都有相同的长度，忽略它们内部的内容
 例：flex:1

 "flexDirection",设置 <div> 元素内弹性盒元素的方向为相反的顺序
 例：flexDirection:'column'
 -> row ((默认值。灵活的项目将水平显示，正如一个行一样)
 -> row-reverse (与 row 相同，但是以相反的顺序)
 -> column  (灵活的项目将垂直显示，正如一个列一样)
 -> column-reverse  (与 column 相同，但是以相反的顺序)
 -> initial (设置该属性为它的默认值。请参阅 initial)
 -> inherit (从父元素继承该属性。请参阅 inherit)

 "flexWrap",让弹性盒元素在必要的时候拆行
 例：flexWrap:'wrap'
 -> nowrap  (默认值。规定灵活的项目不拆行或不拆列)
 -> wrap    (规定灵活的项目在必要的时候拆行或拆列)
 -> wrap-reverse    (规定灵活的项目在必要的时候拆行或拆列，但是以相反的顺序)
 -> initial (设置该属性为它的默认值。请参阅 initial)
 -> inherit (从父元素继承该属性。请参阅 inherit)

 "fontFamily",字体
 例：fontFamily:'courier'

 "fontSize",字体大小
 例：fontSize:20

 "fontStyle",
 例：fontStyle:'italic'
 -> normal  默认值。浏览器显示一个标准的字体样式。
 -> italic  浏览器会显示一个斜体的字体样式。
 -> oblique 浏览器会显示一个倾斜的字体样式

 "fontWeight",文本的粗细
 例：fontWeight:'bold'
 -> normal  (默认值。定义标准的字符)
 -> bold    (定义粗体字符)
 -> bolder  (定义更粗的字符)
 -> lighter (定义更细的字符)
 -> 100    (定义由粗到细的字符。400 等同于 normal，而 700 等同于 bold)
 -> 200
 -> 300
 -> 400
 -> 500
 -> 600
 -> 700
 -> 800
 -> 900

 "height",设置元素的高度
 例：height:200

 "justifyContent",在弹性盒对象的元素中的各项周围留有空白
 例：justifyContent:'space-between'
 -> flex-start  (默认值。项目位于容器的开头)
 -> flex-end    (项目位于容器的结尾)
 -> center  (项目位于容器的中心)
 -> space-between   (项目位于各行之间留有空白的容器内)
 -> space-around    (项目位于各行之前、之间、之后都留有空白的容器内)

 "left",把图像的左边缘设置在其包含元素左边缘向右5像素的位置
 例：left:20

 "letterSpacing",字母间距
 例：letterSpacing:20

 "lineHeight",行高
 例：lineHeight:30

 "margin",元素的所有四个边距
 例：

 "marginBottom",下边距
 例：marginBottom:50

 "marginHorizontal",水平间距，即左边距和右边距
 例：marginHorizontal:10

 "marginLeft",左边距
 例：marginLeft:50

 "marginRight",右边距
 例：marginRight:50

 "marginTop",上边距
 例：marginTop:50

 "marginVertical",垂直间距，即上边距和下边距
 例：marginVertical:10

 "opacity",透明度级别
 例：opacity：0.5

 "overflow",设置overflow属性进行滚动
 例：overflow:'hidden'
 visible    (默认值。内容不会被修剪，会呈现在元素框之外)
 hidden (内容会被修剪，并且其余内容是不可见的)
 scroll (内容会被修剪，但是浏览器会显示滚动条以便查看其余的内容)

 "overlayColor",
 例：

 "padding",填充
 例：

 "paddingBottom",下填充
 例：

 "paddingHorizontal",左右填充
 例：

 "paddingLeft",左填充
 例：

 "paddingRight",右填充
 例：

 "paddingTop",上填充
 例：

 "paddingVertical",上下填充
 例：

 "position",定位
 例：position:'fixed'
 -> absolute    生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
 -> fixed       生成绝对定位的元素，相对于浏览器窗口进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。
 -> relative    生成相对定位的元素，相对于其正常位置进行定位。因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。
 -> static      默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）

 "resizeMode",用户调整大小
 例：resizeMode:'cover'
 -> cover    等比拉伸
 -> strech   保持原有大小
 -> contain  图片拉伸  充满空间

 "right",把图像的右边缘设置在其包含元素右边缘向左 5 像素的位置
 例：right:5

 "rotation",元素旋转
 例：rotation：180

 "scaleX",
 例：

 "scaleY",
 例：

 "shadowColor",
 例：

 "shadowOffset",
 例：

 "shadowOpacity",
 例：

 "shadowRadius",
 例：

 "textAlign",文本对齐方式
 例：textAlign:'left'
 -> left    把文本排列到左边。默认值：由浏览器决定。
 -> right   把文本排列到右边。
 -> center  把文本排列到中间。
 -> justify 实现两端对齐文本效果

 "textAlignVertical",
 例：

 "textDecorationColor",下划线文本中下划线的颜色
 例：textDecorationColor:'red'

 "textDecorationLine",显示一条线
 例：textDecorationLine:'underline'
 -> none            默认值。规定文本修饰没有线条。 测试 »
 -> underline       规定文本的下方将显示一条线。  测试 »
 -> overline        规定文本的上方将显示一条线。  测试 »
 -> line-through    规定文本的中间将显示一条线

 "textDecorationStyle",显示一条线的样式
 例：textDecorationStyle:'solid'
 -> solid   默认值。线条将显示为单线。
 -> double  线条将显示为双线。
 -> dotted  线条将显示为点状线。
 -> dashed  线条将显示为虚线。
 -> wavy    线条将显示为波浪线

 "textShadowColor",文字阴影颜色
 例：textShadowColor：'red'

 "textShadowOffset",文字阴影偏移量
 例：textShadowOffset:2

 "textShadowRadius",文字阴影圆角
 例：textShadowRadius:3

 "tintColor",
 例：

 "top",上
 例：

 "transform",旋转
 例：
 none   定义不进行转换。
 matrix(n,n,n,n,n,n)    定义 2D 转换，使用六个值的矩阵。
 matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n)  定义 3D 转换，使用 16 个值的 4x4 矩阵。
 translate(x,y) 定义 2D 转换。
 translate3d(x,y,z) 定义 3D 转换。
 translateX(x)  定义转换，只是用 X 轴的值。
 translateY(y)  定义转换，只是用 Y 轴的值。
 translateZ(z)  定义 3D 转换，只是用 Z 轴的值。
 scale(x[,y]?)  定义 2D 缩放转换。
 scale3d(x,y,z) 定义 3D 缩放转换。
 scaleX(x)  通过设置 X 轴的值来定义缩放转换。
 scaleY(y)  通过设置 Y 轴的值来定义缩放转换。
 scaleZ(z)  通过设置 Z 轴的值来定义 3D 缩放转换。
 rotate(angle)  定义 2D 旋转，在参数中规定角度。
 rotate3d(x,y,z,angle)  定义 3D 旋转。
 rotateX(angle) 定义沿着 X 轴的 3D 旋转。    测试
 rotateY(angle) 定义沿着 Y 轴的 3D 旋转。
 rotateZ(angle) 定义沿着 Z 轴的 3D 旋转。
 skew(x-angle,y-angle)  定义沿着 X 和 Y 轴的 2D 倾斜转换。
 skewX(angle)   定义沿着 X 轴的 2D 倾斜转换。
 skewY(angle)   定义沿着 Y 轴的 2D 倾斜转换。
 perspective(n) 为 3D 转换元素定义透视视图

 "translateX",
 例：

 "translateY",
 例：

 "width",款
 例：

 "writingDirection"文本方向
  auto’,’ltr’,’rtl

 *
* */

作者：精神病患者link常
链接：https://www.jianshu.com/p/3bcab975d447
來源：简书
简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。