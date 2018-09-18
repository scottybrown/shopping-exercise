class Checkout {
    constructor() {
        this.scannedItems = [];
        this.skus = {
            superIpad: {sku: 'ipd', name: 'Super iPad', price: 549.99},
            macbookPro: {sku: 'mpb', name: 'MacBook Pro', price: 1399.99},
            appleTV: {sku: 'atv', name: 'Apple TV', price: 109.5},
            vgaAdapter: {sku: 'vga', name: 'VGA adapter', price: 30},
        };
    }

    roundDollars(total) {
        return parseFloat(total.toFixed(2));
    }

    getTotal() {
        return this.roundDollars(this.applySpecials());
    }

    amountOfAppleTVSpecials(scannedItems) {
        const count = scannedItems
            .map(scannedItem => scannedItem.sku)
            .filter(scannedItemSku => scannedItemSku === this.skus.appleTV.sku)
            .length;
        return parseInt(count / 3);
    }

    superIpadDiscountReached(scannedItems) {
        const count = scannedItems
            .map(scannedItem => scannedItem.sku)
            .filter(
                scannedItemSku => scannedItemSku === this.skus.superIpad.sku,
            ).length;
        return count > 4;
    }

    scan(item) {
        if (item) {
            this.scannedItems.push({...item});
        }
    }

    applySpecials() {
        let itemsWithSpecialsApplied = this.scannedItems.slice();
        // todo function to  apply each special. then distill into generic special types
        if (this.superIpadDiscountReached(itemsWithSpecialsApplied)) {
            itemsWithSpecialsApplied
                .filter(item => item.sku === this.skus.superIpad.sku)
                .forEach(item => (item.price = 499.99));
        }

        let total = itemsWithSpecialsApplied
            .map(item => item.price)
            .reduce((total, price) => total + price, 0);

        const freeTvs = this.amountOfAppleTVSpecials(itemsWithSpecialsApplied);
        total = total - freeTvs * this.skus.appleTV.price;

        const booksScanned = itemsWithSpecialsApplied.filter(
            item => item.sku === this.skus.macbookPro.sku,
        ).length;
        const adaptersScanned = itemsWithSpecialsApplied.filter(
            item => item.sku === this.skus.vgaAdapter.sku,
        ).length;
        const freeAdapters =
            booksScanned > adaptersScanned ? adaptersScanned : booksScanned;

        total = total - freeAdapters * this.skus.vgaAdapter.price;

        return total;
    }
}

module.exports = Checkout;
