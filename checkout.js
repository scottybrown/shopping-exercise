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

    applyDiscountForIfMoreThanXItems(pricingRule, itemsWithPricingRulesApplied) {
        const conditionalProductsScanned = itemsWithPricingRulesApplied.filter(item => item.sku === pricingRule.conditionalProduct).length;

        if (conditionalProductsScanned > pricingRule.appliedIfMoreThan) {
            const productsToModify = itemsWithPricingRulesApplied.filter(item => item.sku === pricingRule.modifiedProduct);
            productsToModify.forEach(item => (item.price = 499.99));
        }
    }

    applyDiscountForEveryXItems(pricingRule, itemsWithPricingRulesApplied) {
        const conditionalProductsScanned = itemsWithPricingRulesApplied.filter(item => item.sku === pricingRule.conditionalProduct).length;
        let maxAmountOfDiscountsToApply = parseInt(conditionalProductsScanned / pricingRule.appliedForEvery);
        const discountableProductsScanned = itemsWithPricingRulesApplied.filter(item => item.sku === pricingRule.modifiedProduct).length;
        maxAmountOfDiscountsToApply = maxAmountOfDiscountsToApply > discountableProductsScanned ? discountableProductsScanned : maxAmountOfDiscountsToApply;
        const productsToModify = itemsWithPricingRulesApplied.filter(item => item.sku === pricingRule.modifiedProduct);
        for (let i = 0; i < maxAmountOfDiscountsToApply; i++) {
            productsToModify[i].price = pricingRule.modifiedPrice;
        }
    }

    applyPricingRules(scannedItems, pricingRules) {
        let itemsWithPricingRulesApplied = scannedItems.slice();

        // and i may need some more test cases and pricing rules....
        // and maybe some renaming to make it clearer what each does

        for (const key in pricingRules) {
            const pricingRule = pricingRules[key];
            if (pricingRule.appliedIfMoreThan !== undefined) {
                this.applyDiscountForIfMoreThanXItems(pricingRule, itemsWithPricingRulesApplied);
            }

            if (pricingRule.appliedForEvery !== undefined) {
                this.applyDiscountForEveryXItems(pricingRule, itemsWithPricingRulesApplied);
            }
        }

        return this.sumItemPrices(itemsWithPricingRulesApplied);
    }
}

module.exports = Checkout;
