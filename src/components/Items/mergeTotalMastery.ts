import { TotalMastery } from "@/classes/TotalMastery";

function mergeByName<T extends { name: string }>(current: T[], newMastery: T[]): T[] {
  const currentNames = new Set(current.map((item) => item.name));
return [...current, ...newMastery.filter((item) => !currentNames.has(item.name))]
    .sort((a, b) => a.name.localeCompare(b.name));}

export function mergeTotalMastery(current: TotalMastery, newMastery: TotalMastery): TotalMastery {
  return new TotalMastery({
    ...current,
    Amp: mergeByName(current.Amp, newMastery.Amp),
    Archwing: mergeByName(current.Archwing, newMastery.Archwing),
    ArchGun: mergeByName(current.ArchGun, newMastery.ArchGun),
    ArchMelee: mergeByName(current.ArchMelee, newMastery.ArchMelee),
    Kdrives: mergeByName(current.Kdrives, newMastery.Kdrives),
    Melee: mergeByName(current.Melee, newMastery.Melee),
    Necramech: mergeByName(current.Necramech, newMastery.Necramech),
    Pets: mergeByName(current.Pets, newMastery.Pets),
    Primary: mergeByName(current.Primary, newMastery.Primary),
    Secondary: mergeByName(current.Secondary, newMastery.Secondary),
    Sentinels: mergeByName(current.Sentinels, newMastery.Sentinels),
    SentinelWeapons: mergeByName(current.SentinelWeapons, newMastery.SentinelWeapons),
    Warframes: mergeByName(current.Warframes, newMastery.Warframes),
    Nodes: mergeByName(current.Nodes, newMastery.Nodes),
    starchartExp: current.starchartExp,
    starchartExpSp: current.starchartExpSp,
    itemsExp: current.itemsExp,
    drifterIntrinsics: current.drifterIntrinsics,
    railjackIntrinsics: current.railjackIntrinsics
  });
}
