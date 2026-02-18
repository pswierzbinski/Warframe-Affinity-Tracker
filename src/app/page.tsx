'use client'
import ItemList from "@/components/Items/ItemList";
import Topbar from "@/components/Topbar/Topbar";
import { TotalMastery } from "@/classes/TotalMastery";
import { useEffect, useState } from "react";
import { Image, Tab, Tabs, ToastProvider } from "@heroui/react";
import NodeList from "@/components/Starchart/NodeList";
import { MapNode } from "@/classes/MapNode";
import { Milestones } from "@/classes/Milestones";
import IntrinsicsList from "@/components/Intrinsics/IntrinsicsList";
import {addToast} from "@heroui/react";

export default function Home() {
  const [allMasteryData, setAllMasteryData] = useState<TotalMastery>(() => new TotalMastery);
  const [totalAffinity, setTotalAffinity] = useState<number>(0);
  const [currentMR, setCurrentMR] = useState<number>(0);
  const [currentMRName, setCurrentMRName] = useState<string>("Unranked");
  const [affinityRanges, setAffinityRanges] = useState<number[]>([0, 2500]);
  const MasteryRankHelper: Milestones = new Milestones(); 

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/loadItems");
      const data = await res.json();
      const allMastery = TotalMastery.fromJSON(data);
      setAllMasteryData(allMastery);
      setTotalAffinity(allMastery.getTotalAffinity());
    }

    const data = localStorage.getItem("allMasteryData");
      
    // tempData is created and used here in order for the initial render to calculate the mastery values properly
    if (data) {
      const parsed: TotalMastery = JSON.parse(data);
      const tempData: TotalMastery = TotalMastery.fromJSON(parsed);
      setAllMasteryData(tempData);
      setTotalAffinity(tempData.getTotalAffinity())
    }
    else
      fetchData();

     updateRank();
  }, []);
  

  useEffect(() => {
    updateRank();
  }, [totalAffinity]);


  const updateRank = () => {
    var rank = MasteryRankHelper.getMilestone(totalAffinity);
    saveToLocalStorage();

    if (rank.mr != currentMR) {
      setCurrentMR(rank.mr);
      setCurrentMRName(rank.name);
      setAffinityRanges([rank.req, rank.nextReq]);
    }
  }

  const saveItemsAsJson = () => {
    const file = new Blob([JSON.stringify(allMasteryData, null, 2)], {
      type: "application/json",
    });

    const url = window.URL.createObjectURL(file);

    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", "items.json");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  
  const saveToLocalStorage = () => {
    if (allMasteryData) {
      localStorage.setItem("allMasteryData", JSON.stringify(allMasteryData));
    } else {
      console.error("No data to save to localStorage");
    }
  }

  const loadFromLocalStorage = () => {
    const data = localStorage.getItem("allMasteryData");

    if (data) {
      const parsed: TotalMastery = JSON.parse(data);
      setAllMasteryData(TotalMastery.fromJSON(parsed));
      setTotalAffinity(allMasteryData.getTotalAffinity())
      addToast({
      title: "Succesfully loaded saved data",
      color: "success",
    })}else
      addToast({
      title: "Couldn't load saved data",
      description: "Saved data not found",
      color: "danger",
    })
  }

  const uploadSave = async (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        const allMastery = TotalMastery.fromJSON(parsed);
        setAllMasteryData(allMastery);
        localStorage.setItem("allMasteryData", JSON.stringify(parsed));
        addToast({
          title: "Succesfully loaded saved data",
          color: "success",
        })
      } catch (err) {
        console.error("Invalid JSON file", err);
      }
    };
    reader.readAsText(file);
  };

  const clearLocalStorage = async () => {
    localStorage.removeItem("allMasteryData");
    const res = await fetch("/api/loadItems");
    const data = await res.json();
    const allMastery = TotalMastery.fromJSON(data);
    setAllMasteryData(allMastery);
    setTotalAffinity(0);
    addToast({
      title: "Succesfully cleared saved data",
      color: "warning",
    })
  }
  
  const setLevel = (listName: keyof TotalMastery, name: string, level: number) => {
    allMasteryData.updateItemLevel(listName, name, level);
    setAllMasteryData(TotalMastery.fromJSON(allMasteryData));
    setTotalAffinity(allMasteryData.getTotalAffinity());
  }

  const setAllMastered = (nodes: MapNode[], steelPath: boolean, setTo: boolean) => {
    var tmp = 0;
    setAllMasteryData((prevData) => {
      const newData = { ...prevData };
      nodes.forEach((node) => {
        if (steelPath) {
          if (node.steelPathDone !== setTo) {
            node.steelPathDone = setTo;
            if (setTo) {
              newData.starchartExpSp += node.exp;
              tmp += node.exp;
            }else {
              newData.starchartExpSp -= node.exp;
              tmp -= node.exp;
            }
          }
        }else {
          if (node.isDone !== setTo) {
            node.isDone = setTo;
            if (setTo) {
              newData.starchartExp += node.exp;
              tmp += node.exp;
            }else {
              newData.starchartExp -= node.exp;
              tmp -= node.exp;
            }
          }
        }
      });

      return TotalMastery.fromJSON(newData);
    });

    setTotalAffinity(totalAffinity + tmp);
  };


  const setMastered = (node: MapNode, steelPath: boolean, setTo: boolean) => {
    setAllMasteryData((prevData) => {
      const newData = { ...prevData };

      if (steelPath) {
        if (node.steelPathDone !== setTo) {
          node.steelPathDone = setTo;
          if (setTo) {
            newData.starchartExpSp += node.exp;
            setTotalAffinity(totalAffinity + node.exp)
          }else {
            newData.starchartExpSp -= node.exp;
            setTotalAffinity(totalAffinity - node.exp)
          }
        }
      }else {
        if (node.isDone !== setTo) {
          node.isDone = setTo;
          if (setTo) {
            newData.starchartExp += node.exp;
            setTotalAffinity(totalAffinity + node.exp)
          }else {
            newData.starchartExp -= node.exp;
            setTotalAffinity(totalAffinity - node.exp)
          }
        }
      }

      return TotalMastery.fromJSON(newData);
    });
  };

  const updateIntrinsicLevel = (listName: keyof TotalMastery, name: string, level: number) => {
    const newData = TotalMastery.fromJSON(allMasteryData);
    newData.setIntrinsicLevel(listName, name, level);
    setAllMasteryData(newData);
    setTotalAffinity(newData.getTotalAffinity());
  }

  return (
    <main className="h-dvh flex flex-col bg-linear-to-b from-primary-700 to-[#922d3b] text-white overflow-x-hidden select-none">
      <ToastProvider placement={"top-right"}/>
      <Topbar clearLocalStorage={clearLocalStorage} loadFromLocalStorage={loadFromLocalStorage} saveItemsAsJson={saveItemsAsJson} uploadSave={uploadSave} currentMR={currentMR} currentMRName={currentMRName} affinityRanges={affinityRanges} currentAffinity={totalAffinity} />
      <Tabs className="mt-2" color="primary"
        classNames={{
          tabList: "gap-5 m-auto  rounded-xl p-2 bg-white/10 backdrop-blur-md border-white/20",
          tab: "px-4 h-10 data-[hover=true]:bg-white/10",
          tabContent: "text-white",
          cursor: "bg-white/20 backdrop-blur-md",
        }} variant="bordered">
        <Tab title={
          <div className="flex flex-row gap-1">
            <Image
              alt={"Warframe"}
              width={30}
              height={30}
              src={`/Icons/${"Warframe"}.webp`}
              className="min-w-7.5 h-7.5"
            />
            <a className="text-base mt-1">Warframe</a>
          </div>
        }><div className="mt-18">
            <ItemList items={allMasteryData?.Warframes || []} setLevel={setLevel} />
          </div>
        </Tab>
        <Tab title={
          <div className="flex flex-row gap-1">
            <Image
              alt={"Primary"}
              width={30}
              height={30}
              src={`/Icons/${"Primary"}.webp`}
              className="min-w-7.5 h-7.5"
            />
            <a className="text-base mt-1">Primary</a>
          </div>
        }>
          <div className="mt-18">
            <ItemList items={allMasteryData?.Primary || []} setLevel={setLevel} />
          </div>
        </Tab>
        <Tab title={
          <div className="flex flex-row gap-1">
            <Image
              alt={"Secondary"}
              width={30}
              height={30}
              src={`/Icons/${"Secondary"}.webp`}
              className="min-w-7.5 h-7.5"
            />
            <a className="text-base mt-1">Secondary</a>
          </div>
        }>
          <div className="mt-18">
            <ItemList items={allMasteryData?.Secondary || []} setLevel={setLevel} />
          </div>
        </Tab>
        <Tab title={
          <div className="flex flex-row gap-1">
            <Image
              alt={"Melee"}
              width={30}
              height={30}
              src={`/Icons/${"Melee"}.webp`}
              className="min-w-7.5 h-7.5"
            />
            <a className="text-base mt-1">Melee</a>
          </div>
        }>
          <div className="mt-18">
            <ItemList items={allMasteryData?.Melee || []} setLevel={setLevel} />
          </div>
        </Tab>
        <Tab title={
          <div className="flex flex-row gap-1">
            <Image
              alt={"Companions"}
              width={30}
              height={30}
              src={`/Icons/${"Companions"}.webp`}
              className="min-w-7.5 h-7.5"
            />
            <a className="text-base mt-1">Companions</a>
          </div>
        } className="flex flex-col">
          <Tabs classNames={{
                  tabList: "gap-5 m-auto  rounded-xl p-2 bg-white/10 backdrop-blur-md border-white/20",
                  tab: "px-4 h-10 data-[hover=true]:bg-white/10",
                  tabContent: "text-white",
                  cursor: "bg-white/20 backdrop-blur-md",
                }} variant="bordered" color="primary">
            <Tab title="Sentinel Weapons">
              <ItemList items={allMasteryData?.SentinelWeapons || []} setLevel={setLevel} />
            </Tab>
            <Tab title={
              <div className="flex flex-row gap-1">
                <Image
                  alt={"Sentinels"}
                  width={30}
                  height={30}
                  src={`/Icons/${"Companions"}.webp`}
                  className="min-w-7.5 h-7.5 object-contain"
                />
                <a className="text-base mt-1">Sentinels</a>
              </div>
            }>
              <ItemList items={allMasteryData?.Sentinels || []} setLevel={setLevel} />
            </Tab>
            <Tab title={
              <div className="flex flex-row gap-1">
                <Image
                  alt={"Beasts"}
                  width={30}
                  height={30}
                  src={`/Icons/${"Beasts"}.webp`}
                  className="min-w-7.5 h-7.5 object-contain"
                />
                <a className="text-base mt-1">Beasts</a>
              </div>
            }>
              <ItemList items={allMasteryData?.Pets || []} setLevel={setLevel} />
            </Tab>
          </Tabs>
        </Tab>
        <Tab title={
          <div className="flex flex-row gap-1">
            <Image
              alt={"Vehicles"}
              width={30}
              height={30}
              src={`/Icons/${"Vehicles"}.webp`}
              className="min-w-7.5 h-7.5"
            />
            <a className="text-base mt-1">Vehicles</a>
          </div>
        } className="flex flex-col">
          <Tabs classNames={{
                  tabList: "gap-5 m-auto rounded-xl p-2 bg-white/10 backdrop-blur-md border-white/20",
                  tab: "px-4 h-10 data-[hover=true]:bg-white/10",
                  tabContent: "text-white",
                  cursor: "bg-white/20 backdrop-blur-md",
                }} variant="bordered" color="primary">
            <Tab title="K-Drive">
              <ItemList items={allMasteryData?.Kdrives || []} setLevel={setLevel} />
            </Tab>
            <Tab title="Necramech">
              <ItemList items={allMasteryData?.Necramech || []} setLevel={setLevel} />
            </Tab>

          </Tabs>
        </Tab>
        <Tab title={
          <div className="flex flex-row gap-1">
            <Image
              alt={"Archwing"}
              width={30}
              height={30}
              src={`/Icons/${"Archwing"}.webp`}
              className="min-w-7.5 h-7.5"
            />
            <a className="text-base mt-1">Archwing</a>
          </div>
        } className="flex flex-col">
          <Tabs classNames={{
                  tabList: "gap-5 m-auto rounded-xl p-2 bg-white/10 backdrop-blur-md border-white/20",
                  tab: "px-4 h-10 data-[hover=true]:bg-white/10",
                  tabContent: "text-white",
                  cursor: "bg-white/20 backdrop-blur-md",
                }} variant="bordered" color="primary">
            <Tab title={
              <div className="flex flex-row gap-1">
                <Image
                  alt={"Archwing"}
                  width={30}
                  height={30}
                  src={`/Icons/${"Archwing"}.webp`}
                  className="min-w-7.5 h-7.5"
                />
                <a className="text-base mt-1">Archwing</a>
              </div>
            } className="flex flex-col">
              <ItemList items={allMasteryData?.Archwing || []} setLevel={setLevel} />
            </Tab>
            <Tab title={
              <div className="flex flex-row gap-1">
                <Image
                  alt={"Archmelee"}
                  width={30}
                  height={30}
                  src={`/Icons/${"Archmelee"}.webp`}
                  className="min-w-7.5 h-7.5"
                />
                <a className="text-base mt-1">Archmelee</a>
              </div>
            } className="flex flex-col">
              <ItemList items={allMasteryData?.ArchMelee || []} setLevel={setLevel} />
            </Tab>
            <Tab title={
              <div className="flex flex-row gap-1">
                <Image
                  alt={"Archgun"}
                  width={30}
                  height={30}
                  src={`/Icons/${"Archgun"}.webp`}
                  className="min-w-7.5 h-7.5"
                />
                <a className="text-base mt-1">Archgun</a>
              </div>
            } className="flex flex-col">
              <ItemList items={allMasteryData?.ArchGun || []} setLevel={setLevel} />
            </Tab>
          </Tabs>
        </Tab>
        <Tab title={
          <div className="flex flex-row gap-1">
            <Image
              alt={"Amp"}
              width={30}
              height={30}
              src={`/Icons/${"Amp"}.webp`}
              className="min-w-7.5 h-7.5"
            />
            <a className="text-base mt-1">Amp</a>
          </div>
        }>
          <div className="mt-18">
            <ItemList items={allMasteryData?.Amp || []} setLevel={setLevel} />
          </div>
        </Tab>
        <Tab title={
          <div className="flex flex-row gap-1">
            <Image
              alt={"Starchart"}
              width={30}
              height={30}
              src={`/Icons/${"Sortie"}.webp`}
              className="min-w-7.5 h-7.5"
            />
            <a className="text-base mt-1">Starchart</a>
          </div>
        }>
          <NodeList nodes={allMasteryData?.Nodes} setMastered={setMastered} setAllMastered={setAllMastered}></NodeList>
        </Tab>
        <Tab title={
          <div className="flex flex-row gap-1">
            <Image
              alt={"Intrinsics"}
              width={30}
              height={30}
              src={`/Icons/${"Intrinsics"}.webp`}
              className="min-w-7.5 h-7.5"
            />
            <a className="text-base mt-1">Intrinsics</a>
          </div>
        } className="flex flex-col">
          <Tabs classNames={{
                  tabList: "gap-5 m-auto rounded-xl p-2 bg-white/10 backdrop-blur-md border-white/20",
                  tab: "px-4 h-10 data-[hover=true]:bg-white/10",
                  tabContent: "text-white",
                  cursor: "bg-white/20 backdrop-blur-md",
                }} variant="bordered">
            <Tab title={
              <div className="flex flex-row gap-1">
                <Image
                  alt={"Drifter"}
                  width={30}
                  height={30}
                  src={`/Icons/${"Operator"}.webp`}
                  className="min-w-7.5 h-7.5"
                />
                <a className="text-base mt-1">Drifter</a>
              </div>
            } className="flex flex-col">
              <IntrinsicsList intrinsics={allMasteryData.drifterIntrinsics} drifter={true} updateIntrinsicLevel={updateIntrinsicLevel}></IntrinsicsList>
            </Tab>
            <Tab title={
              <div className="flex flex-row gap-1">
                <Image
                  alt={"Railjack"}
                  width={30}
                  height={30}
                  src={`/Icons/${"Railjack"}.webp`}
                  className="min-w-7.5 h-7.5"
                />
                <a className="text-base mt-1">Railjack</a>
              </div>
            } className="flex flex-col">
              <IntrinsicsList intrinsics={allMasteryData.railjackIntrinsics} drifter={false} updateIntrinsicLevel={updateIntrinsicLevel}></IntrinsicsList>
            </Tab>
          </Tabs>
        </Tab>
      </Tabs>
      <div className="h-full grow"></div>

    </main>
  );
}
