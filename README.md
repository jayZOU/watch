# watch   

![enter image description here](https://api.travis-ci.org/jayZOU/watch.svg?branch=master)  

小程序不提供类似于vue一样监听数据([vm.watch](https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7-vs-%E8%A2%AB%E8%A7%82%E5%AF%9F%E7%9A%84%E5%B1%9E%E6%80%A7))，当数据改变时触发回调检测改变数据类型是否符合要求。
![enter image description here](https://sfault-image.b0.upaiyun.com/270/694/2706941227-59df1b4702528_articlex)
现在，使用wach即可扩展类似vm.watch的功能
## install   
2种方式下载  
1、线上链接  
2、`npm install we-watch`   
## Usage     
### 引入watch库   
```javascript
import Watch from '../../libs/watch';
```


### 配置初始化检察对象   
```javascript
import Watch from '../../libs/watch';
let watch;
Page({
    data: {
        a: '1',
        b: {
            c: {
                d: 33
            },
            e: [1, 2, [3, 4]]
        }
    },
    watch: {
        a: function(val, oldVal) {
            console.log('new: %s, old: %s', val, oldVal);
        },
        'b.c.d': function(val, oldVal) {
            console.log('new: %s, old: %s', val, oldVal);
        },
        'b.e[2][0]': function(val, oldVal) {
            console.log('new: %s, old: %s', val, oldVal);
        },
        'b.e[3][4]': function(val, oldVal) {
            console.log('new: %s, old: %s', val, oldVal);
        },
    }
})
```
可以将需要监听的数据放入**watch**里面，当数据改变时推送相应的订阅事件(注：不在data里面的数据项不会放入观察者列表，比如上面的`'b.e[3][4]'`)

### 实例化watch   
```javascript
watch = new Watch(this);
```
当**watch**创建示例初始化时会把监听数据项放入观察者列表里面

### 改变数据   
```javascript
watch.setData({
	a: 2,
	'b.c.d': 3,
	'b.e[2][0]': 444,
	c: 123
})

watch.data('b.e[2][0]', 555);
```

## API   
### watch.setData(obj)   
等价于原生小程序`this.setData`，会改变数据并更新视图，也会触发回调（假如有配置）  

**示例：**   

```javascript
watch.setData({
	a: 2,
	'b.c.d': 3,
	'b.e[2][0]': 444,
	c: 123
})
//等价于
// this.setData({
// 	a: 2,
// 	'b.c.d': 3,
// 	'b.e[2][0]': 444,
// 	c: 123
// })
```
### watch.data(key, val)   
等价于原生小程序`this.data.a = 3`，之后改变数据不更新视图，也会触发回调（假如有配置）  

**示例：**  
```javascript
watch.data('b.e[2][0]', 555);
//等价于this.b.e[2][0] = 555
```
### watch.getter(data, path)   
能根据提供的路径深度获取数据  

**示例：**  
```javascript
watch.get({
        a: '1',
        b: {
            c: {
                d: 33
            },
            e: [1, 2, [3, 4]]
        }
    }, 'b.e[2][0]');
 //3
```

### watch.unSubscribe(key)   
删除观察者，改变数据不触发回调  

**示例：**  
```javascript
watch.unSubscribe('b.e[2][0]');
```

## test
`npm test`  