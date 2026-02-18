export class Intrinsic {
    name: string;
    level: number;

    constructor(name: string) {
        this.name = name;
        this.level = 0;
    }

    setLevel(level: number){
        this.level = level;
    }

    setName(name: string){
        this.name = name;
    }

    static fromJSON(json: any): Intrinsic{
        const item = new Intrinsic(json.name);
        item.level = json.level;
        return item;
    }
}