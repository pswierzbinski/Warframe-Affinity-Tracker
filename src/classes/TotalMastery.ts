import { Intrinsic } from "./Intrinsic";
import { Item } from "./Item";
import { MapNode } from "./MapNode";

export interface TotalMastery {
    Amp: Item[];
    Archwing: Item[];
    ArchGun: Item[];
    ArchMelee: Item[];
    Companions: Item[];
    Kdrives: Item[];
    Melee: Item[];
    Necramech: Item[];
    Pets: Item[];
    Primary: Item[];
    Secondary: Item[];
    Sentinels: Item[];
    SentinelWeapons: Item[];
    Warframes: Item[];
    Nodes: MapNode[];
    starchartExp: number;
    starchartExpSp: number;
    drifterIntrinsics: Intrinsic[];
    railjackIntrinsics: Intrinsic[];
}

export class TotalMastery {
    Amp: Item[];
    Archwing: Item[];
    ArchGun: Item[];
    ArchMelee: Item[];
    Companions: Item[];
    Kdrives: Item[];
    Melee: Item[];
    Necramech: Item[];
    Pets: Item[];
    Primary: Item[];
    Secondary: Item[];
    Sentinels: Item[];
    SentinelWeapons: Item[];
    Warframes: Item[];
    Nodes: MapNode[];
    starchartExp: number;
    starchartExpSp: number;
    itemsExp: number;
    drifterIntrinsics: Intrinsic[];
    railjackIntrinsics: Intrinsic[];

    constructor() {
        this.Amp = [];
        this.Archwing = [];
        this.ArchGun = [];
        this.ArchMelee = [];
        this.Companions = [];
        this.Kdrives = [];
        this.Melee = [];
        this.Necramech = [];
        this.Pets = [];
        this.Primary = [];
        this.Secondary = [];
        this.Sentinels = [];
        this.SentinelWeapons = [];
        this.Warframes = [];
        this.Nodes = [];
        this.starchartExp = 0;
        this.starchartExpSp = 0;
        this.itemsExp = 0;
        this.drifterIntrinsics = [new Intrinsic("Combat"), new Intrinsic("Riding"), new Intrinsic("Opportunity"), new Intrinsic("Endurance")];
        this.railjackIntrinsics = [new Intrinsic("Tactical"), new Intrinsic("Piloting"), new Intrinsic("Gunnery"), new Intrinsic("Engineering"), new Intrinsic("Command")];
    }

    setAmps(items: Item[]) {
        this.Amp = items;
    }

    setArchwing(items: Item[]) {
        this.Archwing = items;
    }

    setArchGun(items: Item[]) {
        this.ArchGun = items;
    }

    setArchMelee(items: Item[]) {
        this.ArchMelee = items;
    }

    setCompanions(items: Item[]) {
        this.Companions = items;
    }

    setKdrives(items: Item[]) {
        this.Kdrives = items;
    }

    setMelee(items: Item[]) {
        this.Melee = items;
    }

    setNecramech(items: Item[]) {
        this.Necramech = items;
    }

    setPets(items: Item[]) {
        this.Pets = items;
    }

    setPrimary(items: Item[]) {
        this.Primary = items;
    }

    setSecondary(items: Item[]) {
        this.Secondary = items;
    }

    setSentinels(items: Item[]) {
        this.Sentinels = items;
    }

    setSentinelWeapons(items: Item[]) {
        this.SentinelWeapons = items;
    }

    setWarframes(items: Item[]) {
        this.Warframes = items;
    }

    setNodes(nodes: MapNode[]) {
        this.Nodes = nodes;
    }

    setStarchartExp(starchartExp: number){
        this.starchartExp = starchartExp;
    }

    setStarchartExpSp(starchartExpSp: number){
        this.starchartExpSp = starchartExpSp;
    }

    setItemsExp(itemsExp: number){
        this.itemsExp = itemsExp;
    }

    setDrifterIntrinsic(intrinsic: Intrinsic[]) {
        this.drifterIntrinsics = intrinsic;
    }

    setRailjackIntrinsic(intrinsic: Intrinsic[]) {
        this.railjackIntrinsics = intrinsic;
    }


    getTotalAffinity() {
        var total = this.itemsExp + this.starchartExp + this.starchartExpSp;
        this.Amp.forEach(item => total += item.currentLevel * 100);
        this.Archwing.forEach(item => total += item.currentLevel * 200);
        this.ArchGun.forEach(item => total += item.currentLevel * 100);
        this.ArchMelee.forEach(item => total += item.currentLevel * 100);
        this.Companions.forEach(item => total += item.currentLevel * 200);
        this.Kdrives.forEach(item => total += item.currentLevel * 200);
        this.Melee.forEach(item => total += item.currentLevel * 100);
        this.Necramech.forEach(item => total += item.currentLevel * 200);
        this.Pets.forEach(item => total += item.currentLevel * 200);
        this.Primary.forEach(item => total += item.currentLevel * 100);
        this.Secondary.forEach(item => total += item.currentLevel * 100);
        this.Sentinels.forEach(item => total += item.currentLevel * 200);
        this.SentinelWeapons.forEach(item => total += item.currentLevel * 100);
        this.Warframes.forEach(item => total += item.currentLevel * 200);
        this.railjackIntrinsics.forEach(intrinsic => total += intrinsic.level * 1500);
        this.drifterIntrinsics.forEach(intrinsic => total += intrinsic.level * 1500);
        return total;
    }

    updateItemLevel(listName: keyof TotalMastery, name: string, value: number) {
        const list = this[listName] as Item[];
        if (!Array.isArray(list)) {
            console.error(`The property ${listName} is not an array.`);
            return;
        }

        const index = list.findIndex((i) => i.name === name);
        if (index !== -1) {
            list[index] = { ...list[index], currentLevel: value };
            this[listName] = [...list] as any;
        }
    }

    setIntrinsicLevel(listName: keyof TotalMastery, name: string, value: number) {
        const list = this[listName] as Intrinsic[];
        if (!Array.isArray(list)) {
            console.error(`The property ${listName} is not an array.`);
            return;
        }

        const index = list.findIndex((i) => i.name === name);
        if (index !== -1) {
            list[index].setLevel(value);
            this[listName] = [...list] as any;
        }
    }
    
    static fromJSON(json: any): TotalMastery {
        const tm = new TotalMastery();
        tm.Amp = json.Amp.map((itemJson: any) => Item.fromJSON(itemJson));
        tm.Archwing = json.Archwing.map((itemJson: any) => Item.fromJSON(itemJson));
        tm.ArchGun = json.ArchGun.map((itemJson: any) => Item.fromJSON(itemJson));
        tm.ArchMelee = json.ArchMelee.map((itemJson: any) => Item.fromJSON(itemJson));
        tm.Companions = json.Companions.map((itemJson: any) => Item.fromJSON(itemJson));
        tm.Kdrives = json.Kdrives.map((itemJson: any) => Item.fromJSON(itemJson));
        tm.Melee = json.Melee.map((itemJson: any) => Item.fromJSON(itemJson));
        tm.Necramech = json.Necramech.map((itemJson: any) => Item.fromJSON(itemJson));
        tm.Pets = json.Pets.map((itemJson: any) => Item.fromJSON(itemJson));
        tm.Primary = json.Primary.map((itemJson: any) => Item.fromJSON(itemJson));
        tm.Secondary = json.Secondary.map((itemJson: any) => Item.fromJSON(itemJson));
        tm.Sentinels = json.Sentinels.map((itemJson: any) => Item.fromJSON(itemJson));
        tm.SentinelWeapons = json.SentinelWeapons.map((itemJson: any) => Item.fromJSON(itemJson));
        tm.Warframes = json.Warframes.map((itemJson: any) => Item.fromJSON(itemJson));
        tm.drifterIntrinsics = json.drifterIntrinsics.map((json: any) => Intrinsic.fromJSON(json));
        tm.railjackIntrinsics = json.railjackIntrinsics.map((json: any) => Intrinsic.fromJSON(json));
        tm.Nodes = json.Nodes.map((nodeJson: any) => MapNode.fromJSON(nodeJson));
        tm.starchartExp = json.starchartExp;
        tm.starchartExpSp = json.starchartExpSp;
        tm.itemsExp = json.itemsExp;
        return tm;
    }
}