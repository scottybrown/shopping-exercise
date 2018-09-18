class Checkout {
    constructor(pricingRules) {
        this.scannedItems = [];
        this.pricingRules = pricingRules;
    }

    roundDollars(total) {
        return parseFloat(total.toFixed(2));
    }

    getTotal() {
        return this.roundDollars(this.applyPricingRules(this.scannedItems, this.pricingRules));
    }

    scan(item) {
        if (item) {
            this.scannedItems.push(Object.assign({}, item));
        }
    }

    sumItemPrices(items) {
        return items.map(item => item.price).reduce((total, price) => total + price, 0);
    }

    applyPricingRules(scannedItems, pricingRules) {
        let itemsWithPricingRulesApplied = scannedItems.slice();

        for (const key in pricingRules) {
            const special = pricingRules[key];
            if (special.appliedIfMoreThan !== undefined) {
                const conditionalProductsScanned = itemsWithPricingRulesApplied.filter(item => item.sku === special.conditionalProduct).length;

                if (conditionalProductsScanned > special.appliedIfMoreThan) {
                    const productsToModify = itemsWithPricingRulesApplied.filter(item => item.sku === special.modifiedProduct);
                    productsToModify.forEach(item => (item.price = 499.99));
                }
            }

            if (special.appliedForEvery !== undefined) {
                const conditionalProductsScanned = itemsWithPricingRulesApplied.filter(item => item.sku === special.conditionalProduct).length;
                let maxAmountOfDiscountsToApply = parseInt(conditionalProductsScanned / special.appliedForEvery);
                const discountableProductsScanned = itemsWithPricingRulesApplied.filter(item => item.sku === special.modifiedProduct).length;
                maxAmountOfDiscountsToApply =
                    maxAmountOfDiscountsToApply > discountableProductsScanned ? discountableProductsScanned : maxAmountOfDiscountsToApply;
                const productsToModify = itemsWithPricingRulesApplied.filter(item => item.sku === special.modifiedProduct);
                for (let i = 0; i < maxAmountOfDiscountsToApply; i++) {
                    productsToModify[i].price = special.modifiedPrice;
                }
            }
        }

        return this.sumItemPrices(itemsWithPricingRulesApplied);
    }
}

module.exports = Checkout;
