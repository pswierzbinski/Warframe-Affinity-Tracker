export interface Item {
    name: string;
    masteryReq: number | undefined;
    currentLevel: number;
    maxLevelCap: number; //40 for some 30 for most
    category: string;
    type: string;
    imageName: string | undefined;
}

export class Item {
    name: string;
    masteryReq: number | undefined;
    currentLevel: number;
    maxLevelCap: number;
    category: string;
    type: string;
    imageName: string | undefined;

    constructor(name: string, masteryReq: number, maxLevelCap: number, category: string, type: string, imageName: string) {
        this.name = name;
        this.masteryReq = masteryReq;
        this.currentLevel = 0;

        if(maxLevelCap)
            this.maxLevelCap = maxLevelCap;
        else
            this.maxLevelCap = 30;

        this.category = category;
        this.type = type;
        this.imageName = imageName;
    }

    static fromJSON(json: any): Item{
        const item = new Item(json.name, json.masteryReq, json.maxLevelCap, json.category, json.type, json.imageName);
        item.currentLevel = json.currentLevel;
        return item;
    }
}