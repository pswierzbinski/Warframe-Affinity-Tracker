import { Item } from "@/classes/Item";
import { NextResponse } from "next/server";
import Items from '@wfcd/items';
import * as fs from "fs";
import path from "path";
import { TotalMastery } from "@/classes/TotalMastery";
import { MapNode } from "@/classes/MapNode";

export async function GET() {
  //Dev api call
  // const rawItems = new Items({ category: ["Archwing", "Arch-Gun", "Arch-Melee", "Melee", "Pets", "Primary", "Secondary", "Sentinels", "SentinelWeapons", "Warframes"] });
  // const rawNodes = new Items({ category: ["Node"] });


  //Prod api call
  const itemsPath = path.join(process.cwd(), "public/data/items.json");
  const nodesPath = path.join(process.cwd(), "public/data/nodes.json");
  
  const rawItems = JSON.parse(fs.readFileSync(itemsPath, "utf-8"));
  const rawNodes = JSON.parse(fs.readFileSync(nodesPath, "utf-8"));

  let mappedNodes: MapNode[] = rawNodes.map(
    (node: any) =>
      new MapNode(
        node.name,
        node.systemIndex,
        node.systemName,
        expFromNode(node.name, node.systemIndex)
      )
  );

  const nodeFilePath = path.join(process.cwd(), "src/data/junctions.json");
  const rawJunctions = fs.readFileSync(nodeFilePath, "utf-8");
  const hardcodedJunctions = JSON.parse(rawJunctions);
  mappedNodes = [...mappedNodes, ...hardcodedJunctions];

  let mappedItems: Item[] = rawItems.map(
    (item: any) =>
      new Item(
        item.name,
        "masteryReq" in item ? (item.masteryReq ?? 0) : 0,
        "maxLevelCap" in item ? (item.maxLevelCap ?? 30) : 30,
        item.category ?? "Unknown",
        item.type ?? item.category ?? "Unknown",
        item.imageName ?? "default.png"
      )
  );

  mappedItems = mappedItems.filter(item => item.name !== "Sirocco");

  const voidrig = mappedItems.filter(item => item.name === "Voidrig");
  if (voidrig)
    voidrig[0].category = "Necramech";

  const bonewidow = mappedItems.filter(item => item.name === "Bonewidow");
  if (bonewidow)
    bonewidow[0].category = "Necramech";

  const sentinelWeaponNames = [
    "Akaten", "Artax", "Batoten", "Burst Laser", "Burst Laser Prime", "Cryotra",
    "Deconstructor", "Deconstructor Prime", "Deth Machine Rifle", "Deth Machine Rifle Prime",
    "Helstrum", "Lacerten", "Laser Rifle", "Multron", "Prime Laser Rifle", "Prisma Burst Laser", "Stinger", "Sweeper",
    "Sweeper Prime", "Tazicor", "Verglas", "Verglas Prime", "Vulcax", "Vulklok"
  ];

  sentinelWeaponNames.forEach(name => {
    const items = mappedItems.filter(item => item.name === name);
    if (items.length > 0) {
      items[0].category = "SentinelWeapons";
    }
  });

  const response: TotalMastery = new TotalMastery();

  const filePath = path.join(process.cwd(), "src/data/hardcodedstuff.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const hardcodeditems = JSON.parse(raw);
  mappedItems = [...mappedItems, ...hardcodeditems];

  // to be optimized
  response.Warframes = mappedItems.filter(item => item.category === "Warframes" && !/(helminth)/i.test(item.name));
  response.Primary = mappedItems.filter(item => item.category === "Primary");
  response.Secondary = mappedItems.filter((item, index) => {
    if (item.name === "Grimoire" && item.category === "Secondary") {
      return mappedItems.findIndex(i => i.name === "Grimoire" && i.category === "Secondary") !== index;
    }
    return item.category === "Secondary";
  });

  //the @wfcd/warframe-items api categorizes all zaw components as melee and the masterable ones are pulled twice
  const dupeMeleeNames = ["Balla", "Cyath", "Dehtat", "Kronsh", "Mewan", "Ooltha", "Plague Keewar", "Plague Kripath"];
  const unMasterableNames = ["Ekwana Ii Jai", "Ekwana Ii Ruhang", "Ekwana Jai", "Ekwana Jai Ii", "Ekwana Ruhang", "Ekwana Ruhang Ii", "Jai", "Jai Ii", "Jayap", "Korb", "Kroostra", "Kwath", "Laka", "Peye", "Plague Akwin", "Plague Bokwin",
                              "Ruhang", "Ruhang Ii", "Seekalla", "Shtung", "Vargeet Ii Jai", "Vargeet Ii Ruhang", "Vargeet Jai", "Vargeet Jai Ii", "Vargeet Ruhang", "Vargeet Ruhang Ii"];

  response.Melee = mappedItems.filter((item, index) => {
    if (item.category !== "Melee") return false;
    if (item.category === "Melee" && unMasterableNames.includes(item.name)) {
      return false;
    }
    if (item.category === "Melee" && dupeMeleeNames.includes(item.name)) {
      return mappedItems.findIndex(i => i.name === item.name && i.category === "Melee") !== index;
    }

    return true;
  });


  response.Archwing = mappedItems.filter(item => item.category === "Archwing");
  response.ArchGun = mappedItems.filter(item => item.category === "Arch-Gun");
  response.ArchMelee = mappedItems.filter(item => item.category === "Arch-Melee");
  response.Pets = mappedItems.filter(item => item.category === "Pets" && !/(core|mutagen|gyro|antigen|bracket|stabilizer)/i.test(item.name) && !/(Moa|Hound)$/i.test(item.name));
  response.Sentinels = mappedItems.filter(item => item.category === "Sentinels" || (item.category === "Pets" && /(Moa|Hound)$/i.test(item.name)));
  response.SentinelWeapons = mappedItems.filter(item => item.category === "SentinelWeapons");
  response.Amp = mappedItems.filter(item => item.category === "Amp");
  response.Necramech = mappedItems.filter(item => item.category === "Necramech");
  response.Kdrives = mappedItems.filter(item => item.category === "K-Drive");
  response.Nodes = mappedNodes;
  response.ArchGun.forEach(item => {
    if (item.category === "Arch-Gun") {
      item.category = "ArchGun";
    }
  });
  response.Kdrives.forEach(item => {
    if (item.category === "K-Drive") {
      item.category = "Kdrives";
    }
  });
  response.ArchMelee.forEach(item => {
    if (item.category === "Arch-Melee") {
      item.category = "ArchMelee";
    }
  });
  return NextResponse.json(response);
}

function expFromNode(name: string, systemIndex: number) {
  switch (systemIndex) {
    case 0:
      switch (name) {
        case "Tolstoj":
          return 25;
        case "Apollodorus":
        case "Terminus":
          return 0;
        default:
          return 3;
      }
    case 1:
      switch (name) {
        case "Fossa":
          return 41;
        case "Orb Vallis":
        case "Ishtar":
          return 24;
        case "Romula":
        case "Malva":
          return 0;
        default:
          return 18;
      }
    case 2:
      switch (name) {
        case "Gaia":
          return 20;
        case "Coba":
        case "Tikal":
        case "Saya's Visions":
          return 0;
        default:
          return 24;
      }
    case 3:
      switch (name) {
        case "Gradivus":
          return 45;
        case "Tyana Pass":
          return 18;
        case "Wahiba":
        case "Kadesh":
          return 0;
        default:
          return 51;
      }
    case 4:
      switch (name) {
        case "The Ropalolyst":
          return 55;
        case "Cameria":
        case "Sinai":
          return 0;
        default:
          return 51;
      }
    case 5:
      switch (name) {
        case "Caracol":
        case "Piscinas":
          return 0;
        case "Enceladus":
          return 49;
        default:
          return 55;
      }
    case 6:
      switch (name) {
        case "Ur":
        case "Assur":
          return 0;
        case "Puck":
          return 44;
        default:
          return 69;
      }
    case 7:
      switch (name) {
        case "Yursa":
        case "The Index":
        case "Kelashin":
          return 0;
        default:
          return 52;
      }
    case 8:
      switch (name) {
        case "Hieracon":
        case "Sechura":
          return 0;
        default:
          return 51;
      }
    case 9:
      switch (name) {
        case "Seimeni":
        case "Gabii":
          return 0;
        default:
          return 163;
      }
    case 10:
      switch (name) {
        case "Mutalist Alad V Assassinate":
        case "Jordas Golem":
        case "Akkad":
        case "Zabala":
          return 0;
        default:
          return 279;
      }
    case 11:
      switch (name) {
        case "Merrow":
          return 100;
        case "Berehynia":
          return 50;
        case "Sangeru":
        case "Amarna":
          return 0;
        default:
          return 177;
      }
    case 12:
      switch (name) {
        case "Cholistan":
        case "Larzac":
          return 0;
        default:
          return 138;
      }
    case 15:
      switch (name) {
        case "Iliad":
          return 100;
        case "Memphis":
        case "Zeugma":
          return 0;
        default:
          return 157;
      }
    default:
      return 0;
  }
}