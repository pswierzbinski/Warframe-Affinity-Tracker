export interface MapNode {
    name: string;
    systemIndex: number;
    systemName: string;
    exp: number;
    isDone: boolean;
    steelPathDone: boolean;
}

export class MapNode {
    name: string;
    systemIndex: number;
    systemName: string;
    exp: number;
    isDone: boolean;
    steelPathDone: boolean;

    constructor(name: string, systemIndex: number, systemName: string, exp: number) {
        this.name = name;
        this.systemName = systemName;
        this.systemIndex = systemIndex;
        this.exp = exp;
        this.isDone = false;
        this.steelPathDone = false;
    }

    static fromJSON(json: any): MapNode{
        const node = new MapNode(json.name, json.systemIndex, json.systemName, json.exp);
        node.isDone = json.isDone;
        node.steelPathDone = json.steelPathDone
        return node;
    }
}