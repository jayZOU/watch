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
		},
		f: {
			'c.d': {
				sd: 233
			},
			'sa^*sf': 'exm',
		},
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
		it(`path equal "b[c].d" should return 33`, () => {
			expect(watch.getter(pageCtx.data, "b[c].d")).to.equal(33);
		})
		it(`path equal "f[c.d].sd" should return 233`, () => {
			expect(watch.getter(pageCtx.data, "f[c.d].sd")).to.equal(233);
		})
		it(`path equal "f[sa^*sf]" should return exm`, () => {
			expect(watch.getter(pageCtx.data, "f[sa^*sf]")).to.equal('exm');
		})
	})

	describe('setter test', () => {
		it('path equal "a" should equal data.a', () => {
			expect(watch.setter(pageCtx.data, 'a', 123)).to.equal(pageCtx.data.a);
		})
		it('path equal "b.c.d" should equal data.b.c.d', () => {
			expect(watch.setter(pageCtx.data, 'b.c.d', 33)).to.equal(33);
		})
		it('path equal "b.e[2][0]" should equal data.b.e[2][0]', () => {
			expect(watch.setter(pageCtx.data, 'b.e[2][0]', 3)).to.equal(3);
		})
		it('path equal "c[1]" should equal data.c[1]', () => {
			expect(watch.setter(pageCtx.data, 'c[1]', 2)).to.equal(2);
		})
		it('path equal "f[c.d].sd" should equal data.f[c.d].sd', () => {
			expect(watch.setter(pageCtx.data, 'f[c.d].sd', 244)).to.equal(244);
		})
		it('path equal "f[sa^*sf]" should equal data.f[sa^*sf]', () => {
			expect(watch.setter(pageCtx.data, 'f[sa^*sf]', 'exm1')).to.equal('exm1');
		})
	})

	describe('inData test', () => {
		it('path equal "a" should return true', () => {
			expect(watch.inData('a')).to.be.true;
		})
		it('path equal "b.c.d" should return true', () => {
			expect(watch.inData('b.c.d')).to.be.true;
		})
		it('path equal "b.e[2][0]" should return true', () => {
			expect(watch.inData('b.e[2][0]')).to.be.true;
		})
		it('path equal "c[1]" should return true', () => {
			expect(watch.inData('c[1]')).to.be.true;
		})
		it('path equal "f[c.d].sd" should return true', () => {
			expect(watch.inData('f[c.d].sd')).to.be.true;
		})
		it('path equal "f[sa^*sf]" should return true', () => {
			expect(watch.inData('f[sa^*sf]')).to.be.true;
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
			expect(watch.setter(pageCtx.data, 'no', 123)).to.be.undefined;
		})
		it('path equal "b.c.a" should return undefined', () => {
			expect(watch.setter(pageCtx.data, 'b.c.a', 33)).to.be.undefined;
		})
		it('path equal "b.e[2][4]" should return undefined', () => {
			expect(watch.setter(pageCtx.data, 'b.e[2][4]', 3)).to.be.undefined;
		})
		it('path equal "c[4]" should return undefined', () => {
			expect(watch.setter(pageCtx.data, 'c[4]', 2)).to.be.undefined;
		})
	})


	describe('inData test', () => {
		it('path equal "no" should return true', () => {
			expect(watch.inData('no')).to.be.false;
		})
		it('path equal "b.c.a" should return true', () => {
			expect(watch.inData('b.c.a')).to.be.false;
		})
		it('path equal "b.e[2][4]" should return true', () => {
			expect(watch.inData('b.e[2][4]')).to.be.false;
		})
		it('path equal "c[4]" should return true', () => {
			expect(watch.inData('c[4]')).to.be.false;
		})

	})
})
