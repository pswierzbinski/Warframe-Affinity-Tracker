export class Milestones {
    names: string[] = [ "Unranked", "Initiate", "Silver Initiate", "Gold Initiate", "Novice", "Silver Novice",
                        "Gold Novice", "Disciple", "Silver Disciple", "Gold Disciple", "Seeker", "Silver Seeker",
                        "Gold Seeker", "Hunter", "Silver Hunter", "Gold Hunter", "Eagle", "Silver Eagle",
                        "Gold Eagle", "Tiger", "Silver Tiger", "Gold Tiger", "Dragon", "Silver Dragon",
                        "Gold Dragon", "Sage", "Silver Sage", "Gold Sage", "Master", "Middle Master",
                        "True Master", "Legendary 1", "Legendary 2", "Legendary 3", "Legendary 4",
                        "Legendary 5"];
    calcReq(level: number) {
        let total = 2500;
        if (level == 0)
            return total;
        for (let i = 1; i < 30 && i < level; i++)
            total += (level * level) * 2500;
        if (level > 29)
            total += 147500 * level - 29;
        return total;
    }

    findReq(points: number) {
        let prevReq = 0;
        if(points < 2500)
            return [0, 2500, 0];
        for (let iter = 0; ; iter++) {
            const nextReq = this.calcReq(iter);
                if (nextReq >= points) {
                return [prevReq, nextReq, iter - 1];
            }
            prevReq = nextReq;
        }
    }
    getMilestone(points: number) {
        let reqs = this.findReq(points);
        return {
            name: this.names[reqs[2]] || "Unknown",
            req: reqs[0],
            nextReq: reqs[1],
            mr: reqs[2]
        };
    }
}