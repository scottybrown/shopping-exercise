let total, scannedItems;

const reset = () => {
    total = 0;
    scannedItems = [];
};
reset();

const skus = {
    superIpad: {sku: 'ipd', name: 'Super iPad', price: 549.99},
    macbookPro: {sku: 'mpb', name: 'MacBook Pro', price: 1399.99},
    appleTV: {sku: 'atv', name: 'Apple TV', price: 109.5},
    vgaAdapter: {sku: 'vga', name: 'VGA adapter', price: 30.0},
};

const getTotal = () => total;

const isAppleTVSpecial = scannedItems => {
    appleTVCount = scannedItems
        .map(scannedItem => scannedItem.sku)
        .filter(scannedItemSku => scannedItemSku === skus.appleTV.sku).length;
    return appleTVCount % 3 === 0;
};

const scan = item => {
    const appleTVSpecialAlreadyApplied = isAppleTVSpecial(scannedItems);
    total += item.price;
    scannedItems.push(item);
    const appleTVSpecialReached = isAppleTVSpecial(scannedItems);
    const appleTVWasScanned = item.sku === skus.appleTV.sku;
    const needToApplyAppleTVSpecial =
        appleTVSpecialReached && appleTVWasScanned;

    if (needToApplyAppleTVSpecial) {
        total = total - skus.appleTV.price;
    }
};

module.exports = {skus, scan, getTotal, reset};
