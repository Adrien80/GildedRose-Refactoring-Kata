import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('GildedRose', () => {
    let gildedRose;
    beforeEach(() => {
        const items = [
            new Item("+5 Dexterity Vest", 10, 20), //
            new Item("Aged Brie", 2, 0), //
            new Item("Aged Brie", 0, 10), //
            new Item("Elixir of the Mongoose", 5, 7), //
            new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
            new Item("Sulfuras, Hand of Ragnaros", -1, 80),
            new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
            new Item("Backstage passes to a TAFKAL80ETC concert", 10, 40),
            new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
            new Item("Backstage passes to a TAFKAL80ETC concert", 5, 40),
            new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
            new Item("Backstage passes to a TAFKAL80ETC concert", 0, 37),
            new Item("Old elixir of the crusader", 0, 16), //
            // this conjured item does not work properly yet
            new Item("Conjured Mana Cake", 3, 6)
        ];
        gildedRose = new GildedRose([...items]);
    })
    describe("updateQualtily function", () => {
        it("should update quality value for classic item", () => {
            expect(gildedRose.items[0].quality).to.equal(20);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).to.equal(19);
        });

        it("shouldn't update quality value for aged brie", () => {
            expect(gildedRose.items[1].quality).to.equal(0);
            const items = gildedRose.updateQuality();
            expect(items[1].quality).to.equal(1);
        });

        it("shouldn't increase quality value by 2 for aged brie if the sellIn value is 0", () => {
            expect(gildedRose.items[2].quality).to.equal(10);
            const items = gildedRose.updateQuality();
            expect(items[2].quality).to.equal(12);
        });

        it("shouldn't increase quality value by 2 for aged brie if the sellIn value is 0", () => {
            expect(gildedRose.items[2].quality).to.equal(10);
            const items = gildedRose.updateQuality();
            expect(items[2].quality).to.equal(12);
        });

        it("shouldn't update the legenday items quality", () => {
            expect(gildedRose.items[4].quality).to.equal(80);
            const items = gildedRose.updateQuality();
            expect(items[4].quality).to.equal(80);
        });

        it("shouldn't update the legenday items sellIn value", () => {
            expect(gildedRose.items[4].sellIn).to.equal(0);
            expect(gildedRose.items[5].sellIn).to.equal(-1);
            const items = gildedRose.updateQuality();
            expect(items[4].sellIn).to.equal(0);
            expect(items[5].sellIn).to.equal(-1);
        });

        it("should increase by 1 backstage item quality value if sellIn value is > 10", () => {
            expect(gildedRose.items[6].quality).to.equal(20);
            const items = gildedRose.updateQuality();
            expect(items[6].quality).to.equal(21);
        });

        it("should increase by 2 backstage item quality value if sellIn value is <= 10 && >= 6", () => {
            expect(gildedRose.items[7].quality).to.equal(40);
            const items = gildedRose.updateQuality();
            expect(items[7].quality).to.equal(42);
        });

        it("should increase by 3 backstage item quality value if sellIn value is < 6", () => {
            expect(gildedRose.items[9].quality).to.equal(40);
            const items = gildedRose.updateQuality();
            expect(items[9].quality).to.equal(43);
        });

        it("should limit the item qualityValue to 50", () => {
            expect(gildedRose.items[10].quality).to.equal(49);
            const items = gildedRose.updateQuality();
            expect(items[10].quality).to.equal(50);
        });

        it("should reduce to 0 the quality value if the sellIn value is 0 for backstage item (after the concert is over)", () => {
            expect(gildedRose.items[11].quality).to.equal(37);
            const items = gildedRose.updateQuality();
            expect(items[11].quality).to.equal(0);
        });

        it("should reduce by 2 the quality value if the sellIn value is 0 for basic item", () => {
            expect(gildedRose.items[12].quality).to.equal(16);
            const items = gildedRose.updateQuality();
            expect(items[12].quality).to.equal(14);
        });
        
    });
});
