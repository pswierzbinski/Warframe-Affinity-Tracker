import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button, Modal, ModalContent, ModalFooter, ModalBody, ModalHeader, useDisclosure, Image, Popover, PopoverTrigger, PopoverContent } from "@heroui/react";
import SaveUpload from "./SaveUpload";

interface TopbarProps {
    clearLocalStorage: () => void;
    loadFromLocalStorage: () => void;
    saveItemsAsJson: () => void;
    uploadSave: (file: File) => void;
    currentMR: number;
    currentMRName: string;
    affinityRanges: number[];
    currentAffinity: number;
}
const Topbar: React.FC<TopbarProps> = ({ clearLocalStorage, saveItemsAsJson, loadFromLocalStorage, uploadSave, currentMR, currentMRName, affinityRanges, currentAffinity }) => {
    const [calculatedRange, setCalculatedRange] = useState<number>(2500);
    const [calculatedAffinity, setCalculatedAffinity] = useState<number>(0);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [ isOpenPop, setIsOpenPop] = React.useState(false);
    const progress = ((currentAffinity - affinityRanges[0]) / (affinityRanges[1] - affinityRanges[0])) * 100;
    const progressRounded = Math.round(Math.min(100, Math.max(0, progress)) * 100) / 100;
    
    useEffect(() => {
        setCalculatedRange(affinityRanges[1] - affinityRanges[0]);
        setCalculatedAffinity(currentAffinity - affinityRanges[0]);
    }, [currentAffinity]);
    //2nd useEffect because it did not update on first change when the MR ranges were changed, to be improved
    useEffect(()=> {
        setCalculatedRange(affinityRanges[1] - affinityRanges[0]);
        setCalculatedAffinity(currentAffinity - affinityRanges[0]);
    }, [currentMR]);

    const content = (
    <PopoverContent>
      <div className="px-1 py-2">
        <div className="text-small font-bold">Are You sure?</div>
        <div className="text-tiny">This action cannot be undone</div>
        <Button color="primary" onPress={() => {clearLocalStorage(); setIsOpenPop(false);}} variant="bordered" className="border-white/80 text-white rounded-full px-6 backdrop-blur-sm bg-white/5 hover:bg-white/10 hover:border-white transition-all duration-200">
            Yes
        </Button>
        <Button color="primary" onPress={() => setIsOpenPop(false)} variant="bordered" className="border-white/80 text-white rounded-full px-6 backdrop-blur-sm bg-white/5 hover:bg-white/10 hover:border-white transition-all duration-200">
            No
        </Button>
      </div>
    </PopoverContent>
  );
    return (
        <>
            <Navbar isBlurred className="bg-gray-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 w-min self-center mt-1"
                maxWidth="2xl" height={75}>
                <NavbarBrand>
                    <p className="font-bold text-inherit">WarframeAffinityTracker</p>
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex gap-4" justify="end">
                    <NavbarItem>
                        <Button onPress={saveItemsAsJson} variant="bordered" className="border-white/80 text-white rounded-full px-6 backdrop-blur-sm bg-white/5 hover:bg-white/10 hover:border-white transition-all duration-200">
                            Download Save
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Button onPress={loadFromLocalStorage} variant="bordered" className=" border-white/80 text-white rounded-full px-6 backdrop-blur-sm bg-white/5 hover:bg-white/10 hover:border-white transition-all duration-200">
                            Load from cookies
                        </Button>
                    </NavbarItem>
                    <NavbarItem>
                        <Popover isOpen={isOpenPop} onOpenChange={(open) => setIsOpenPop(open)} color={"warning"} placement="bottom" showArrow backdrop={"opaque"}>
                            <PopoverTrigger>
                                <Button onPress={clearLocalStorage} variant="bordered" className="border-white/80 text-white rounded-full px-6 backdrop-blur-sm bg-white/5 hover:bg-white/10 hover:border-white transition-all duration-200">
                                    Clear saved data
                                </Button>
                            </PopoverTrigger>
                            {content}
                        </Popover>
                    </NavbarItem>
                    <NavbarItem>
                        <Button onPress={onOpen} variant="bordered" className=" border-white/80 text-white rounded-full px-6 backdrop-blur-sm bg-white/5 hover:bg-white/10 hover:border-white transition-all duration-200">
                            Upload save file
                        </Button>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent className="group flex items-center gap-4 " justify="center">
                    <NavbarItem>
                        <div className="flex flex-col items-center mt-1 justify-between">
                            <Image
                                alt={currentMRName}
                                width={50}
                                height={50}
                                src={`/Icons/Rank/${currentMR}.webp`}
                                className="min-w-12.5 h-12.5 object-contain"
                            />
                            <a className="-mt-1.25 text-lg">
                                {currentMR}
                            </a>
                        </div>
                    </NavbarItem>
                    <NavbarItem>
                        <div className="grid relative mt-2 w-60 flex-1">
                            <span
                                className="absolute -top-4.5 text-xs text-white group-hover:hidden"
                                style={{ left: `50%`, transform: "translateX(-50%)" }}>
                                {currentAffinity} / {affinityRanges[1]} ({progressRounded}%)
                            </span>
                            <span
                                className="absolute -top-4.5 text-xs text-white hidden group-hover:block"
                                style={{ left: `50%`, transform: "translateX(-50%)" }}>
                                {calculatedAffinity} / {calculatedRange} ({progressRounded}%)
                            </span>
                            <div className="mt-1 h-1.5 rounded-full bg-white/20 overflow-hidden">
                                <div
                                    className="h-full bg-white rounded-full transition-all duration-300"
                                    style={{ width: `${progressRounded}%` }}
                                />
                            </div>
                            <span
                                className="mt-3 text-xs text-white justify-self-center">
                                To next rank: {calculatedRange - calculatedAffinity}
                            </span>
                        </div>
                    </NavbarItem>
                    <NavbarItem>
                        <div className="flex flex-col items-center mt-1 justify-between">
                            <Image
                                alt={currentMRName}
                                width={50}
                                height={50}
                                src={`/Icons/Rank/${currentMR + 1}.webp`}
                                className="min-w-12.5 h-12.5 object-contain"
                            />
                            <a className="-mt-1.25 text-lg">
                                {currentMR + 1}
                            </a>
                        </div>
                    </NavbarItem>
                </NavbarContent>
                {/* <NavbarContent className="hidden sm:flex gap-4" justify="start">
                    <NavbarItem>
                        <ChangeTheme/>
                    </NavbarItem>
                </NavbarContent> */}
            </Navbar>

            <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-primary">Load save file</ModalHeader>
                            <ModalBody>
                                <SaveUpload uploadSave={uploadSave}/>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default Topbar;