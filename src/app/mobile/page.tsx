'use client'
import ItemList from "@/components/Items/ItemList";
import Topbar from "@/components/Topbar/Topbar";
import { TotalMastery } from "@/classes/TotalMastery";
import { useEffect, useRef, useState } from "react";
import { Image, Tab, Tabs, ToastProvider } from "@heroui/react";
import NodeList from "@/components/Starchart/NodeList";
import { MapNode } from "@/classes/MapNode";
import { Milestones } from "@/classes/Milestones";
import IntrinsicsList from "@/components/Intrinsics/IntrinsicsList";
import { addToast } from "@heroui/react";
import { mergeTotalMastery } from "@/components/Items/mergeTotalMastery";
import ItemSearch from "@/components/Search/ItemSearch";
import NavbarMobile from "@/components/NavbarMobile";

export default function Home() {
  const [allMasteryData, setAllMasteryData] = useState<TotalMastery>(() => new TotalMastery);
  const [totalAffinity, setTotalAffinity] = useState<number>(0);
  const [currentMR, setCurrentMR] = useState<number>(0);
  const [currentMRName, setCurrentMRName] = useState<string>("Unranked");
  const [affinityRanges, setAffinityRanges] = useState<number[]>([0, 2500]);
  const MasteryRankHelper: Milestones = new Milestones();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const hasLoaded = useRef(false);
  const [activePage, setActivePage] = useState<"Warframe" | "Primary" | "Secondary" | "Melee" | "Companions" | "Vehicles" | "Archwing" | "Amp" | "Starchart" | "Intrinsics">("Warframe");
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/loadItems");
      // const res = await fetch("/api/loadBaseSave")
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
    else {
      fetchData();
      updateRank();
    }
  }, []);

  useEffect(() => {
    if (!hasLoaded.current && allMasteryData.Amp && allMasteryData.Amp.length > 0) {
      hasLoaded.current = true;
      setIsLoaded(true);
      updateRank();
    }

  }, [allMasteryData]);
  useEffect(() => {
    updateRank();
  }, [totalAffinity]);


  const updateRank = () => {
    const rank = MasteryRankHelper.getMilestone(totalAffinity);
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
  //No longer used, kept for a few next updates in case I want it to return anywhere
  const loadFromLocalStorage = () => {
    const data = localStorage.getItem("allMasteryData");

    if (data) {
      const parsed: TotalMastery = JSON.parse(data);
      setAllMasteryData(TotalMastery.fromJSON(parsed));
      setTotalAffinity(allMasteryData.getTotalAffinity())
      addToast({
        title: "Succesfully loaded saved data",
        color: "success",
      })
    } else
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
    // const res = await fetch("/api/loadBaseSave");
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
    let tmp = 0;
    setAllMasteryData((prevData) => {
      const newData = { ...prevData };
      nodes.forEach((node) => {
        if (steelPath) {
          if (node.steelPathDone !== setTo) {
            node.steelPathDone = setTo;
            if (setTo) {
              newData.starchartExpSp += node.exp;
              tmp += node.exp;
            } else {
              newData.starchartExpSp -= node.exp;
              tmp -= node.exp;
            }
          }
        } else {
          if (node.isDone !== setTo) {
            node.isDone = setTo;
            if (setTo) {
              newData.starchartExp += node.exp;
              tmp += node.exp;
            } else {
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
          } else {
            newData.starchartExpSp -= node.exp;
            setTotalAffinity(totalAffinity - node.exp)
          }
        }
      } else {
        if (node.isDone !== setTo) {
          node.isDone = setTo;
          if (setTo) {
            newData.starchartExp += node.exp;
            setTotalAffinity(totalAffinity + node.exp)
          } else {
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

  const updateItemsList = async () => {
    const res = await fetch("/api/loadItems");
    const data = await res.json();
    const newMastery = TotalMastery.fromJSON(data);
    setAllMasteryData(mergeTotalMastery(allMasteryData, newMastery));
    addToast({
      title: "Success",
      description: "Updated save data to the current patch",
      color: "success",
    })
  }

  //this is to be changed into a proper skeleton
  if (!isLoaded) return (
    <main className="h-dvh flex flex-col bg-linear-to-b from-primary-700 to-[#922d3b] text-white select-none">
      <ToastProvider placement={"top-right"} />

      <div className="h-full grow"></div>

    </main>
  );

  return (
    <main className="h-dvh flex bg-linear-to-b from-primary-700 to-[#922d3b] text-white overflow-x-hidden select-none">
      <ToastProvider placement={"top-right"} />
      <NavbarMobile clearLocalStorage={clearLocalStorage} saveItemsAsJson={saveItemsAsJson} uploadSave={uploadSave} updateItemsList={updateItemsList} currentMR={currentMR} currentMRName={currentMRName} affinityRanges={affinityRanges} currentAffinity={totalAffinity}></NavbarMobile>
      <div className="h-full grow"></div>
    </main>
  );
}
