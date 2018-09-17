const co = require('./checkout.js');

beforeEach(() => {
    co.reset();
});

describe('example scenarios', () => {
    test('example scenario 1', () => {
        co.scan(co.skus.appleTV);
        co.scan(co.skus.appleTV);
        co.scan(co.skus.appleTV);
        co.scan(co.skus.vgaAdapter);
        expect(co.getTotal()).toBe(249);
    });

    test('example scenario 2', () => {
        co.scan(co.skus.appleTV);
        co.scan(co.skus.superIpad);
        co.scan(co.skus.superIpad);
        co.scan(co.skus.appleTV);
        co.scan(co.skus.superIpad);
        co.scan(co.skus.superIpad);
        co.scan(co.skus.superIpad);
        expect(co.getTotal()).toBe(2718.95);
    });

    test('example scenario 3', () => {
        co.scan(co.skus.macbookPro);
        co.scan(co.skus.vgaAdapter);
        co.scan(co.skus.superIpad);
        expect(co.getTotal()).toBe(1949.98);
    });
});

test('begins with zero total', () => expect(co.getTotal()).toBe(0));

test('rounds floating point errors to 2 decimal places', () => {
    expect(co.roundDollars(10.899)).toBe(10.9);
    expect(co.roundDollars(10.001)).toBe(10);
});

test('sums items that are scanned', () => {
    co.scan(co.skus.appleTV);
    co.scan(co.skus.appleTV);
    expect(co.getTotal()).toBe(co.skus.appleTV.price * 2);
});

describe('can scan each type of item correctly', () => {
    test('can scan superIpad', () => {
        co.scan(co.skus.superIpad);
        expect(co.getTotal()).toBe(co.skus.superIpad.price);
    });

    test('can scan appleTV', () => {
        co.scan(co.skus.appleTV);
        expect(co.getTotal()).toBe(co.skus.appleTV.price);
    });

    test('can scan macbookPro', () => {
        co.scan(co.skus.macbookPro);
        expect(co.getTotal()).toBe(co.skus.macbookPro.price);
    });

    test('can scan vgaAdapter', () => {
        co.scan(co.skus.vgaAdapter);
        expect(co.getTotal()).toBe(co.skus.vgaAdapter.price);
    });
});

describe('can handle multiple specials', () => {
    test('multiple apple TVs', () => {
        co.scan(co.skus.appleTV);
        expect(co.getTotal()).toBe(co.skus.appleTV.price);
        co.scan(co.skus.appleTV);
        expect(co.getTotal()).toBe(co.skus.appleTV.price * 2);
        co.scan(co.skus.appleTV);
        expect(co.getTotal()).toBe(co.skus.appleTV.price * 2);
        co.scan(co.skus.appleTV);
        expect(co.getTotal()).toBe(co.skus.appleTV.price * 3);
        co.scan(co.skus.appleTV);
        expect(co.getTotal()).toBe(co.skus.appleTV.price * 4);
        co.scan(co.skus.appleTV);
        expect(co.getTotal()).toBe(co.skus.appleTV.price * 4);
        co.scan(co.skus.appleTV);
        expect(co.getTotal()).toBe(co.skus.appleTV.price * 5);
    });

    test('multiple super ipads', () => {
        co.scan(co.skus.superIpad);
        expect(co.getTotal()).toBe(co.skus.superIpad.price);
        co.scan(co.skus.superIpad);
        expect(co.getTotal()).toBe(co.skus.superIpad.price * 2);
        co.scan(co.skus.superIpad);
        expect(co.getTotal()).toBe(co.skus.superIpad.price * 3);
        co.scan(co.skus.superIpad);
        expect(co.getTotal()).toBe(co.skus.superIpad.price * 4);
        co.scan(co.skus.superIpad);
        expect(co.getTotal()).toBe(499.99 * 5);
        co.scan(co.skus.superIpad);
        expect(co.getTotal()).toBe(499.99 * 6);
    });

    test('multiple macbooks/adapters', () => {
        co.scan(co.skus.macbookPro);
        co.scan(co.skus.macbookPro);
        co.scan(co.skus.macbookPro);
        co.scan(co.skus.macbookPro);
        co.scan(co.skus.macbookPro);
        expect(co.getTotal()).toBe(co.skus.macbookPro.price * 5);

        co.scan(co.skus.vgaAdapter);
        co.scan(co.skus.vgaAdapter);
        co.scan(co.skus.vgaAdapter);
        co.scan(co.skus.vgaAdapter);
        expect(co.getTotal()).toBe(co.skus.macbookPro.price * 5);
        co.scan(co.skus.vgaAdapter);
        expect(co.getTotal()).toBe(co.skus.macbookPro.price * 5);

        co.scan(co.skus.vgaAdapter);
        expect(co.getTotal()).toBe(
            co.skus.macbookPro.price * 5 + co.skus.vgaAdapter.price,
        );

        co.scan(co.skus.vgaAdapter);
        expect(co.getTotal()).toBe(
            co.skus.macbookPro.price * 5 + co.skus.vgaAdapter.price * 2,
        );

        co.scan(co.skus.macbookPro);
        expect(co.getTotal()).toBe(
            co.skus.macbookPro.price * 6 + co.skus.vgaAdapter.price * 1,
        );

        co.scan(co.skus.macbookPro);
        expect(co.getTotal()).toBe(co.skus.macbookPro.price * 7);
    });
});
