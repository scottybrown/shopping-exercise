const co = require('./checkout.js');

test('begins with zero total', () => expect(co.getTotal()).toBe(0));

test('cover example scenario 1', () => {
    co.scan(co.skus.superIpad);
    expect(co.getTotal()).toBe(549.99);
});
