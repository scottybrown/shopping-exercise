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
        const productsScannedMatchingPricingRule = itemsWithPricingRulesApplied.filter(item => item.sku === pricingRule.forProductSku).length;

        if (productsScannedMatchingPricingRule > pricingRule.appliedIfMoreThan) {
            const productsToModify = itemsWithPricingRulesApplied.filter(item => item.sku === pricingRule.modifyProduct);
            productsToModify.forEach(item => (item.price = pricingRule.applyNewPriceOf));
        }
    }

    applyDiscountForEveryXItems(pricingRule, itemsWithPricingRulesApplied) {
        const productsScannedMatchingPricingRule = itemsWithPricingRulesApplied.filter(item => item.sku === pricingRule.forProductSku).length;
        const amountOfDiscountsToApply = parseInt(productsScannedMatchingPricingRule / pricingRule.forEveryXSold);

        const discountableProductsScanned = itemsWithPricingRulesApplied.filter(item => item.sku === pricingRule.modifyProduct).length;
        const maxAmountOfDiscountsToApply = amountOfDiscountsToApply > discountableProductsScanned ? discountableProductsScanned : amountOfDiscountsToApply;
        const productsToModify = itemsWithPricingRulesApplied.filter(item => item.sku === pricingRule.modifyProduct);
        for (let i = 0; i < maxAmountOfDiscountsToApply; i++) {
            productsToModify[i].price = pricingRule.applyNewPriceOf;
        }
    }

    applyPricingRules(scannedItems, pricingRules) {
        let itemsWithPricingRulesApplied = scannedItems.slice();

        for (const key in pricingRules) {
            const pricingRule = pricingRules[key];
            if (pricingRule.appliedIfMoreThan !== undefined) {
                this.applyDiscountForIfMoreThanXItems(pricingRule, itemsWithPricingRulesApplied);
            }

            if (pricingRule.forEveryXSold !== undefined) {
                this.applyDiscountForEveryXItems(pricingRule, itemsWithPricingRulesApplied);
            }
        }

        return this.sumItemPrices(itemsWithPricingRulesApplied);
    }
}

module.exports = Checkout;
