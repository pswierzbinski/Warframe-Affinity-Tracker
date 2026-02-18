import React from "react";
import { MapNode } from "@/classes/MapNode";
import SliderSystem from "./SliderSystem";
import useEmblaCarousel from 'embla-carousel-react'
import styles from './NodeList.module.css'

interface NodeListProps {
  nodes: MapNode[];
  setMastered: (node: MapNode, steelPath: boolean, setTo: boolean) => void;
  setAllMastered: (nodes: MapNode[], steelPath: boolean, setTo: boolean) => void;

}

const NodeList: React.FC<NodeListProps> = ({ nodes, setMastered, setAllMastered }: NodeListProps) => {
  const [emblaRef] = useEmblaCarousel({ loop: true })
  
  const mercuryNodes: MapNode[] = nodes.filter(node => node.systemIndex == 0);
  const venusNodes: MapNode[] = nodes.filter(node => node.systemIndex == 1);
  const earthNodes: MapNode[] = nodes.filter(node => node.systemIndex == 2);
  const marsNodes: MapNode[] = nodes.filter(node => node.systemIndex == 3)
  const jupiterNodes: MapNode[] = nodes.filter(node => node.systemIndex == 4);
  const saturnNodes: MapNode[] = nodes.filter(node => node.systemIndex == 5);
  const uranusNodes: MapNode[] = nodes.filter(node => node.systemIndex == 6);
  const neptuneNodes: MapNode[] = nodes.filter(node => node.systemIndex == 7);
  const plutoNodes: MapNode[] = nodes.filter(node => node.systemIndex == 8);
  const ceresNodes: MapNode[] = nodes.filter(node => node.systemIndex == 9);
  const erisNodes: MapNode[] = nodes.filter(node => node.systemIndex == 10);
  const sednaNodes: MapNode[] = nodes.filter(node => node.systemIndex == 11);
  const europaNodes: MapNode[] = nodes.filter(node => node.systemIndex == 12);
  const voidNodes: MapNode[] = nodes.filter(node => node.systemIndex == 14);
  const phobosNodes: MapNode[] = nodes.filter(node => node.systemIndex == 15);
  const deimosNodes: MapNode[] = nodes.filter(node => node.systemIndex == 16);
  const luaNodes: MapNode[] = nodes.filter(node => node.systemIndex == 17);
  const fortressNodes: MapNode[] = nodes.filter(node => node.systemIndex == 18);
  const zarimanNodes: MapNode[] = nodes.filter(node => node.systemIndex == 21);
  const duviriNodes: MapNode[] = nodes.filter(node => node.systemIndex == 22);
  const hollvaniaNodes: MapNode[] = nodes.filter(node => node.systemIndex == 23);

  return (
    <section className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          <div className={styles.embla__slide}>
            <SliderSystem systemName="Mercury" systemNodes={mercuryNodes} setMastered={setMastered} setAllMastered={setAllMastered}></SliderSystem>
          </div>
          <div className={styles.embla__slide}>
            <SliderSystem systemName="Venus" systemNodes={venusNodes} setMastered={setMastered} setAllMastered={setAllMastered}></SliderSystem>
          </div>
          <div className={styles.embla__slide}>
            <SliderSystem systemName="Earth" systemNodes={earthNodes} setMastered={setMastered} setAllMastered={setAllMastered}></SliderSystem>
          </div>
          <div className={styles.embla__slide}>
            <SliderSystem systemName="Mars" systemNodes={marsNodes} setMastered={setMastered} setAllMastered={setAllMastered}></SliderSystem>
          </div>
          <div className={styles.embla__slide}>
            <SliderSystem systemName="Jupiter" systemNodes={jupiterNodes} setMastered={setMastered} setAllMastered={setAllMastered}></SliderSystem>
          </div>
          <div className={styles.embla__slide}>
            <SliderSystem systemName="Saturn" systemNodes={saturnNodes} setMastered={setMastered} setAllMastered={setAllMastered}></SliderSystem>
          </div>
          <div className={styles.embla__slide}>
            <SliderSystem systemName="Uranus" systemNodes={uranusNodes} setMastered={setMastered} setAllMastered={setAllMastered}></SliderSystem>
          </div>
          <div className={styles.embla__slide}>
            <SliderSystem systemName="Neptune" systemNodes={neptuneNodes} setMastered={setMastered} setAllMastered={setAllMastered}></SliderSystem>
          </div>
          <div className={styles.embla__slide}>
            <SliderSystem systemName="Pluto" systemNodes={plutoNodes} setMastered={setMastered} setAllMastered={setAllMastered}></SliderSystem>
          </div>
          <div className={styles.embla__slide}>
            <SliderSystem systemName="Ceres" systemNodes={ceresNodes} setMastered={setMastered} setAllMastered={setAllMastered}></SliderSystem>
          </div>
          <div className={styles.embla__slide}>
            <SliderSystem systemName="Eris" systemNodes={erisNodes} setMastered={setMastered} setAllMastered={setAllMastered}></SliderSystem>
          </div>
          <div className={styles.embla__slide}>
            <SliderSystem systemName="Sedna" systemNodes={sednaNodes} setMastered={setMastered} setAllMastered={setAllMastered}></SliderSystem>
          </div>
          <div className={styles.embla__slide}>
            <SliderSystem systemName="Europa" systemNodes={europaNodes} setMastered={setMastered} setAllMastered={setAllMastered}></SliderSystem>
          </div>
          <div className={styles.embla__slide}>
            <SliderSystem systemName="Void" systemNodes={voidNodes} setMastered={setMastered} setAllMastered={setAllMastered}></SliderSystem>
          </div>
          <div className={styles.embla__slide}>
            <SliderSystem systemName="Phobos" systemNodes={phobosNodes} setMastered={setMastered} setAllMastered={setAllMastered}></SliderSystem>
          </div>
          <div className={styles.embla__slide}>
            <SliderSystem systemName="Deimos" systemNodes={deimosNodes} setMastered={setMastered} setAllMastered={setAllMastered}></SliderSystem>
          </div>
          <div className={styles.embla__slide}>
            <SliderSystem systemName="Lua" systemNodes={luaNodes} setMastered={setMastered} setAllMastered={setAllMastered}></SliderSystem>
          </div>
          <div className={styles.embla__slide}>
            <SliderSystem systemName="Fortress" systemNodes={fortressNodes} setMastered={setMastered} setAllMastered={setAllMastered}></SliderSystem>
          </div>
          <div className={styles.embla__slide}>
            <SliderSystem systemName="Zariman" systemNodes={zarimanNodes} setMastered={setMastered} setAllMastered={setAllMastered}></SliderSystem>
          </div>
          <div className={styles.embla__slide}>
            <SliderSystem systemName="Duviri" systemNodes={duviriNodes} setMastered={setMastered} setAllMastered={setAllMastered}></SliderSystem>
          </div>
          <div className={styles.embla__slide}>
            <SliderSystem systemName="Höllvania" systemNodes={hollvaniaNodes} setMastered={setMastered} setAllMastered={setAllMastered}></SliderSystem>
          </div>
        </div>
      </div>
    </section>

  );
};

export default NodeList;