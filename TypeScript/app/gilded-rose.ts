/**
 * GildedRose Item class
 */
export class Item {
    /**
     * item name
     */
    name: string;
    /**
     * item sellIn value (number until expiration date)
     */
    sellIn: number;
    /**
     * item quality value (item price)
     */
    quality: number;

    /**
     * Item constructor
     * @param name item name
     * @param sellIn item sellIn value
     * @param quality item quality value
     */
    constructor(name: string, sellIn: number, quality: number) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

/**
 * Gilded Rose class
 */
export class GildedRose {
    /**
     * gildedRose items list
     */
    items: Array<Item>;

    /**
     * GildedRose constructor
     * @param items new gilded's items list 
     */
    constructor(items: Array<Item> = []) {
        this.items = items;
    }

    /**
     * update backstage item
     * @param item backstageItem
     */
    updateBackStageItem(item: Item) {
        item.sellIn--;
        if (item.sellIn < 0) {
            item.quality = 0;
        } else {
            let increaseValue = 1;
            if (item.sellIn < 11) {
                increaseValue = 2;
            }
            if (item.sellIn < 6) {
                increaseValue = 3;
            }
            item.quality = Math.min(item.quality + increaseValue, 50);
        }
    }

    /**
     * update aged brie item
     * 
     * @param item aged brie item
     */
    updateAgedBrieItem(item: Item): void {
        item.sellIn--;
        const newQuality = (item.sellIn >= 0) ? item.quality + 1 : item.quality + 2;
        item.quality = Math.min(newQuality, 50);
    }

    /**
     * update common brie item
     * @param item common item
     * @param conjured is conjured item
     */
    updateCommonItem(item: Item, conjured: boolean): void {
        // multiplier is used to alter the decrease value of conjured item compare to the usual item
        const multiplier = conjured ? 2 : 1;
        item.quality = this.decreaseItemQualityValue(item.quality, multiplier);
        item.sellIn--;
        if (item.sellIn < 0) {
            item.quality = this.decreaseItemQualityValue(item.quality, multiplier);
        }
    }

    /**
     * decrease item quality value based on its current value and the multiplier
     * @param itemQuality current item quality value
     * @param multiplier number used to calculate the new item value (*2 for conjured item)
     */
    decreaseItemQualityValue(itemQuality: number, multiplier: number): number {
        const newQuality = itemQuality - (1 * multiplier);
        return Math.max(newQuality, 0);
    }

    /**
     * update gilded rose items
     */
    updateQuality(): Item[] {
        this.items.forEach((item: Item) => {
            if (item.name !== "Sulfuras, Hand of Ragnaros") {
                if (item.name === "Aged Brie") {
                    this.updateAgedBrieItem(item);
                }
                else if (item.name === "Backstage passes to a TAFKAL80ETC concert") {
                    this.updateBackStageItem(item);
                }
                else {
                    this.updateCommonItem(item, item.name.includes("Conjured"));
                }
            }
        });
        return this.items;
    }
}
