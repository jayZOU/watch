import { expect } from 'chai';
import Watch from '../src/libs/watch';

let pageCtx = {
	data: {
		test: 'abc',
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
        a: function(val) {
            console.log('new: %s, old: %s', val);
        },
        'b.c.d': function(val, oldVal) {
            console.log('new: %s, old: %s', val, oldVal);
        },
        // 'b.e[2][0]': function(val, oldVal) {
        //     console.log('new: %s, old: %s', val, oldVal);
        //     // return [val, oldVal];
        // },
        // c: function(val, oldVal) {
        //     console.log('new: %s, old: %s', val, oldVal);
        // },
        // 'b.c.e': function(val, oldVal) {
        //     console.log('new: %s, old: %s', val, oldVal);
        // },
    },
    setData: function(obj){
    	//setData

    }
}

let watch = new Watch(pageCtx);

describe('subscribe', () => {
	it('observers should return Map', () => {
		expect(watch.getObs()).to.be.an.instanceof(Map);
	})
})

describe('Correct data', () => {
	describe('getter test', () => {
		it('path equal "test" should return "abc"', () => {
			expect(watch.getter(pageCtx.data, 'test')).to.equal('abc');
		})
		it('path equal "a" should return "1"', () => {
			expect(watch.getter(pageCtx.data, 'a')).to.equal('1');
		})
		it('path equal "b.c.d" should return 33', () => {
			expect(watch.getter(pageCtx.data, 'b.c.d')).to.equal(33);
		})
		it('path equal "b.e[2][0]" should return 3', () => {
			expect(watch.getter(pageCtx.data, 'b.e[2][0]')).to.equal(3);
		})
		it('path equal "c[1]" should return 2', () => {
			expect(watch.getter(pageCtx.data, 'c[1]')).to.equal(2);
		})
	})

	describe('setter test', () => {
		it('path equal "a" should equal data.a', () => {
			expect(watch.setter('a', 123)).to.equal(pageCtx.data.a);
		})
		it('path equal "b.c.d" should equal data.b.c.d', () => {
			expect(watch.setter('b.c.d', 33)).to.equal(33);
		})
		it('path equal "b.e[2][0]" should equal data.b.e[2][0]', () => {
			expect(watch.setter('b.e[2][0]', 3)).to.equal(3);
		})
		it('path equal "c[1]" should equal data.c[1]', () => {
			expect(watch.setter('c[1]', 2)).to.equal(2);
		})
	})

	describe('isSet test', () => {
		it('path equal "a" should return true', () => {
			expect(watch.isSet(pageCtx.data, 'a')).to.be.true;
		})
		it('path equal "b.c.d" should return true', () => {
			expect(watch.isSet(pageCtx.data, 'b.c.d')).to.be.true;
		})
		it('path equal "b.e[2][0]" should return true', () => {
			expect(watch.isSet(pageCtx.data, 'b.e[2][0]')).to.be.true;
		})
		it('path equal "c[1]" should return true', () => {
			expect(watch.isSet(pageCtx.data, 'c[1]')).to.be.true;
		})
	})
})

describe('Incorrect data', () => {
	describe('getter test', () => {
		it('path equal "no" should return undefined', () => {
			expect(watch.getter(pageCtx.data, 'no')).to.be.undefined;
		})
		it('path equal "b.c.a" should return undefined', () => {
			expect(watch.getter(pageCtx.data, 'b.c.a')).to.be.undefined;
		})
		it('path equal "b.e[2][4]" should return undefined', () => {
			expect(watch.getter(pageCtx.data, 'b.e[2][4]')).to.be.undefined;
		})
		it('path equal "b.e[3][4]" should return undefined', () => {
			expect(watch.getter(pageCtx.data, 'b.e[3][4]')).to.be.undefined;
		})
		it('path equal "c[4]" should return undefined', () => {
			expect(watch.getter(pageCtx.data, 'c[4]')).to.be.undefined;
		})
	})

	describe('setter test', () => {
		it('path equal "no" should return undefined', () => {
			expect(watch.setter('no', 123)).to.be.undefined;
		})
		it('path equal "b.c.a" should return undefined', () => {
			expect(watch.setter('b.c.a', 33)).to.be.undefined;
		})
		it('path equal "b.e[2][4]" should return undefined', () => {
			expect(watch.setter('b.e[2][4]', 3)).to.be.undefined;
		})
		it('path equal "c[4]" should return undefined', () => {
			expect(watch.setter('c[4]', 2)).to.be.undefined;
		})
	})


	describe('isSet test', () => {
		it('path equal "no" should return true', () => {
			expect(watch.isSet(pageCtx.data, 'no')).to.be.false;
		})
		it('path equal "b.c.a" should return true', () => {
			expect(watch.isSet(pageCtx.data, 'b.c.a')).to.be.false;
		})
		it('path equal "b.e[2][4]" should return true', () => {
			expect(watch.isSet(pageCtx.data, 'b.e[2][4]')).to.be.false;
		})
		it('path equal "c[4]" should return true', () => {
			expect(watch.isSet(pageCtx.data, 'c[4]')).to.be.false;
		})

	})
})
