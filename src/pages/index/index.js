import Watch from '../../libs/watch';

//index.js
//获取应用实例
const app = getApp()
let watch;
Page({
    data: {
        a: '1',
        b: {
            c: {
                d: 33
            },
            e: [1, 2, [3, 4]]
        },
        c: [1, 2, 3],
        d: 'abc',
        e: {
          a: 'efg'
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
        // c: function(val, oldVal) {
        //     console.log('new: %s, old: %s', val, oldVal);
        // },
        // 'b.c.e': function(val, oldVal) {
        //     console.log('new: %s, old: %s', val, oldVal);
        // },
    },
    onLoad: function() {
      watch = new Watch(this);
      watch.setData({
            a: 2,
            'b.c.d': 3,
            'b.e[2][0]': 444,
            c: 123
      })

      watch.data('b.e[2][0]', 555);

    },
    onShow: function() {



    },
    err: function(msg = ''){
      console.log(`err=${msg}`)
    }
})