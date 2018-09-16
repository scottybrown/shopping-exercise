let total = 0;

const skus = {
    superIpad: {sku: 'ipd', name: 'Super iPad', price: 549.99},
    macbookPro: {sku: 'mpb', name: 'MacBook Pro', price: 1399.99},
    appleTV: {sku: 'atv', name: 'Apple TV', price: 109.5},
    vgaAdapter: {sku: 'vga', name: 'VGA adapter', price: 30.0},
};

const scan = item => (total += item.price);

const getTotal = () => total;

const reset = () => (total = 0);

module.exports = {skus, scan, getTotal, reset};
