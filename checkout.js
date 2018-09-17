let scannedItems;

const reset = () => {
    scannedItems = [];
};
reset();

const skus = {
    superIpad: {sku: 'ipd', name: 'Super iPad', price: 549.99},
    macbookPro: {sku: 'mpb', name: 'MacBook Pro', price: 1399.99},
    appleTV: {sku: 'atv', name: 'Apple TV', price: 109.5},
    vgaAdapter: {sku: 'vga', name: 'VGA adapter', price: 30},
};

const roundDollars = total => parseFloat(total.toFixed(2));

const getTotal = () => {
    return roundDollars(applySpecials());
};

const amountOfAppleTVSpecials = scannedItems => {
    count = scannedItems
        .map(scannedItem => scannedItem.sku)
        .filter(scannedItemSku => scannedItemSku === skus.appleTV.sku).length;
    return parseInt(count / 3);
};

const superIpadDiscountReached = scannedItems => {
    count = scannedItems
        .map(scannedItem => scannedItem.sku)
        .filter(scannedItemSku => scannedItemSku === skus.superIpad.sku).length;
    return count > 4;
};

const scan = item => {
    scannedItems.push({...item});
};

const applySpecials = () => {
    let itemsWithSpecialsApplied = scannedItems.slice();

    if (superIpadDiscountReached(itemsWithSpecialsApplied)) {
        itemsWithSpecialsApplied
            .filter(item => item.sku === skus.superIpad.sku)
            .forEach(item => (item.price = 499.99));
    }

    let total = itemsWithSpecialsApplied
        .map(item => item.price)
        .reduce((total, price) => total + price, 0);

    const freeTvs = amountOfAppleTVSpecials(itemsWithSpecialsApplied);
    total = total - freeTvs * skus.appleTV.price;

    const booksScanned = itemsWithSpecialsApplied.filter(
        item => item.sku === skus.macbookPro.sku,
    ).length;
    const adaptersScanned = itemsWithSpecialsApplied.filter(
        item => item.sku === skus.vgaAdapter.sku,
    ).length;
    const freeAdapters =
        booksScanned > adaptersScanned ? adaptersScanned : booksScanned;

    total = total - freeAdapters * skus.vgaAdapter.price;

    return total;
};

module.exports = {skus, scan, getTotal, reset, roundDollars};
