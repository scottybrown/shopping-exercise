const Checkout = require('./checkout.js');
const skus = require('./skus.json');
const pricingRules = require('./pricingRules.json');

let co;
beforeEach(() => {
    co = new Checkout(pricingRules);
});

describe('example scenarios', () => {
    test('example scenario 1', () => {
        co.scan(skus.appleTV);
        co.scan(skus.appleTV);
        co.scan(skus.appleTV);
        co.scan(skus.vgaAdapter);
        expect(co.getTotal()).toBe(249);
    });

    test('example scenario 2', () => {
        co.scan(skus.appleTV);
        co.scan(skus.superIpad);
        co.scan(skus.superIpad);
        co.scan(skus.appleTV);
        co.scan(skus.superIpad);
        co.scan(skus.superIpad);
        co.scan(skus.superIpad);
        expect(co.getTotal()).toBe(2718.95);
    });

    test('example scenario 3', () => {
        co.scan(skus.macbookPro);
        co.scan(skus.vgaAdapter);
        co.scan(skus.superIpad);
        expect(co.getTotal()).toBe(1949.98);
    });
});

describe('implicit functionality', () => {
    test('begins with zero total', () => expect(co.getTotal()).toBe(0));

    test('rounds floating point errors to 2 decimal places', () => {
        expect(co.roundDollars(10.899)).toBe(10.9);
        expect(co.roundDollars(10.001)).toBe(10);
    });

    test('gracefully handles bad scan', () => {
        co.scan(undefined);
        expect(co.getTotal()).toBe(0);
        co.scan(null);
        expect(co.getTotal()).toBe(0);

        co.scan(skus.superIpad);
        expect(co.getTotal()).toBe(skus.superIpad.price);
    });

    test('handles very large dollar values', () => {
        const testItem = {sku: 'tst', name: 'Test Item', price: 3147483647.12};
        co.scan(testItem);
        expect(co.getTotal()).toBe(testItem.price);
        co.scan(testItem);
        expect(co.getTotal()).toBe(6294967294.24);
    });
});

test('sums items that are scanned', () => {
    co.scan(skus.appleTV);
    co.scan(skus.appleTV);
    expect(co.getTotal()).toBe(skus.appleTV.price * 2);
});

describe('can scan each type of item correctly', () => {
    test('can scan superIpad', () => {
        co.scan(skus.superIpad);
        expect(co.getTotal()).toBe(skus.superIpad.price);
    });

    test('can scan appleTV', () => {
        co.scan(skus.appleTV);
        expect(co.getTotal()).toBe(skus.appleTV.price);
    });

    test('can scan macbookPro', () => {
        co.scan(skus.macbookPro);
        expect(co.getTotal()).toBe(skus.macbookPro.price);
    });

    test('can scan vgaAdapter', () => {
        co.scan(skus.vgaAdapter);
        expect(co.getTotal()).toBe(skus.vgaAdapter.price);
    });
});

describe('can handle multiple specials', () => {
    test('multiple apple TVs', () => {
        co.scan(skus.appleTV);
        expect(co.getTotal()).toBe(skus.appleTV.price);
        co.scan(skus.appleTV);
        expect(co.getTotal()).toBe(skus.appleTV.price * 2);
        co.scan(skus.appleTV);
        expect(co.getTotal()).toBe(skus.appleTV.price * 2);
        co.scan(skus.appleTV);
        expect(co.getTotal()).toBe(skus.appleTV.price * 3);
        co.scan(skus.appleTV);
        expect(co.getTotal()).toBe(skus.appleTV.price * 4);
        co.scan(skus.appleTV);
        expect(co.getTotal()).toBe(skus.appleTV.price * 4);
        co.scan(skus.appleTV);
        expect(co.getTotal()).toBe(skus.appleTV.price * 5);
    });

    test('multiple super ipads', () => {
        co.scan(skus.superIpad);
        expect(co.getTotal()).toBe(skus.superIpad.price);
        co.scan(skus.superIpad);
        expect(co.getTotal()).toBe(skus.superIpad.price * 2);
        co.scan(skus.superIpad);
        expect(co.getTotal()).toBe(skus.superIpad.price * 3);
        co.scan(skus.superIpad);
        expect(co.getTotal()).toBe(skus.superIpad.price * 4);
        co.scan(skus.superIpad);
        expect(co.getTotal()).toBe(499.99 * 5);
        co.scan(skus.superIpad);
        expect(co.getTotal()).toBe(499.99 * 6);
    });

    test('multiple macbooks/adapters', () => {
        co.scan(skus.macbookPro);
        co.scan(skus.macbookPro);
        co.scan(skus.macbookPro);
        co.scan(skus.macbookPro);
        co.scan(skus.macbookPro);
        expect(co.getTotal()).toBe(skus.macbookPro.price * 5);

        co.scan(skus.vgaAdapter);
        co.scan(skus.vgaAdapter);
        co.scan(skus.vgaAdapter);
        co.scan(skus.vgaAdapter);
        expect(co.getTotal()).toBe(skus.macbookPro.price * 5);
        co.scan(skus.vgaAdapter);
        expect(co.getTotal()).toBe(skus.macbookPro.price * 5);

        co.scan(skus.vgaAdapter);
        expect(co.getTotal()).toBe(skus.macbookPro.price * 5 + skus.vgaAdapter.price);

        co.scan(skus.vgaAdapter);
        expect(co.getTotal()).toBe(skus.macbookPro.price * 5 + skus.vgaAdapter.price * 2);

        co.scan(skus.macbookPro);
        expect(co.getTotal()).toBe(skus.macbookPro.price * 6 + skus.vgaAdapter.price * 1);

        co.scan(skus.macbookPro);
        expect(co.getTotal()).toBe(skus.macbookPro.price * 7);
    });
});
