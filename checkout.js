class Checkout {
    constructor(pricingRules) {
        this.scannedItems = [];
        this.pricingRules = pricingRules;
    }

    roundDollars(total) {
        return parseFloat(total.toFixed(2));
    }

    getTotal() {
        return this.roundDollars(this.applySpecials());
    }

    scan(item) {
        if (item) {
            this.scannedItems.push(Object.assign({}, item));
        }
    }

    sumItemPrices(items) {
        return items.map(item => item.price).reduce((total, price) => total + price, 0);
    }

    applySpecials() {
        let itemsWithSpecialsApplied = this.scannedItems.slice();

        for (const specialKey in this.pricingRules) {
            const special = this.pricingRules[specialKey];
            if (special.appliedIfMoreThan !== undefined) {
                const conditionalProductsScanned = itemsWithSpecialsApplied.filter(item => item.sku === special.conditionalProduct).length;

                if (conditionalProductsScanned > special.appliedIfMoreThan) {
                    const productsToModify = itemsWithSpecialsApplied.filter(item => item.sku === special.modifiedProduct);
                    productsToModify.forEach(item => (item.price = 499.99));
                }
            }

            if (special.appliedForEvery !== undefined) {
                const conditionalProductsScanned = itemsWithSpecialsApplied.filter(item => item.sku === special.conditionalProduct).length;
                let maxAmountOfDiscountsToApply = parseInt(conditionalProductsScanned / special.appliedForEvery);
                const discountableProductsScanned = itemsWithSpecialsApplied.filter(item => item.sku === special.modifiedProduct).length;
                maxAmountOfDiscountsToApply =
                    maxAmountOfDiscountsToApply > discountableProductsScanned ? discountableProductsScanned : maxAmountOfDiscountsToApply;
                const productsToModify = itemsWithSpecialsApplied.filter(item => item.sku === special.modifiedProduct);
                for (let i = 0; i < maxAmountOfDiscountsToApply; i++) {
                    productsToModify[i].price = special.modifiedPrice;
                }
            }
        }

        return this.sumItemPrices(itemsWithSpecialsApplied);
    }
}

module.exports = Checkout;
