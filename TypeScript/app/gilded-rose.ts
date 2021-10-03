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
     * update gilded rose items
     */
    updateQuality() {
        this.items.forEach((item: Item) => {
            //update "classic" items qualtiy by decreasing it by 1 
            if (item.name != 'Aged Brie' && item.name != 'Backstage passes to a TAFKAL80ETC concert') {
                if (item.quality > 0 && item.name != 'Sulfuras, Hand of Ragnaros') {
                    item.quality = (item.name.includes("Conjured")) ?
                        item.quality - 2 :
                        item.quality - 1;
                }
            } else {
                //update aged brie or backstage passes items quality
                if (item.quality < 50) {
                    item.quality++;
                    if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
                        if (item.sellIn < 11 && item.quality < 50) {
                            item.quality++;
                        }
                        if (item.sellIn < 6 && item.quality < 50) {
                            item.quality++;
                        }
                    }
                }
            }
            // reduce sellIn value except for legendary item
            if (item.name != 'Sulfuras, Hand of Ragnaros') {
                item.sellIn--;
            }
            // update item quality if the item expiration date is passed for aged brie and backstage items
            if (item.sellIn < 0) {
                if (item.name != 'Aged Brie') {
                    if (item.name != 'Backstage passes to a TAFKAL80ETC concert') {
                        if (item.quality > 0 && item.name != 'Sulfuras, Hand of Ragnaros') {
                            item.quality = (item.name.includes("Conjured")) ?
                                item.quality - 2 :
                                item.quality - 1;
                        }
                    } else {
                        item.quality = 0;
                    }
                } else if (item.quality < 50) {
                    item.quality++;
                }
            }
        });

        return this.items;
    }
}
