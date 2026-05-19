import React, { useEffect, useState } from "react";
import { Navbar, Link, NavbarBrand, NavbarContent, NavbarItem, Button, Modal, ModalContent, ModalFooter, ModalBody, ModalHeader, useDisclosure, Image, Popover, PopoverTrigger, PopoverContent, Switch, Divider, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from "@heroui/react";
import SaveUpload from "./Topbar/SaveUpload";
import { useGlobal } from '@/context/GlobalContext';
import { ArrowDownTrayIcon, ArrowUpTrayIcon, EyeIcon, EyeSlashIcon, TrashIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import ItemSearch from "./Search/ItemSearch";


interface TopbarProps {
    clearLocalStorage: () => void;
    saveItemsAsJson: () => void;
    uploadSave: (file: File) => void;
    updateItemsList: () => void;
    currentMR: number;
    currentMRName: string;
    affinityRanges: number[];
    currentAffinity: number;
}

export const GitHubIcon = ({ fill = "currentColor", ...props }) => {
    return (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>GitHub repository</title>
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
    );
};

const navbarMobile: React.FC<TopbarProps> = ({ clearLocalStorage, saveItemsAsJson, updateItemsList, uploadSave, currentMR, currentMRName, affinityRanges, currentAffinity }) => {
    const [calculatedRange, setCalculatedRange] = useState<number>(2500);
    const [calculatedAffinity, setCalculatedAffinity] = useState<number>(0);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isOpenPop, setIsOpenPop] = React.useState(false);
    const progress = ((currentAffinity - affinityRanges[0]) / (affinityRanges[1] - affinityRanges[0])) * 100;
    const progressRounded = Math.round(Math.min(100, Math.max(0, progress)) * 100) / 100;
    const { hideMastered, setHideMastered } = useGlobal();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    useEffect(() => {
        setCalculatedRange(affinityRanges[1] - affinityRanges[0]);
        setCalculatedAffinity(currentAffinity - affinityRanges[0]);
    }, [currentAffinity]);
    
    //2nd useEffect because it did not update on first change when the MR ranges were changed, to be improved
    useEffect(() => {
        setCalculatedRange(affinityRanges[1] - affinityRanges[0]);
        setCalculatedAffinity(currentAffinity - affinityRanges[0]);
    }, [currentMR]);

    const content = (
        <PopoverContent>
            <div className="px-1 py-2">
                <div className="text-small font-bold">Are You sure?</div>
                <div className="text-tiny">This action cannot be undone</div>
                <Button color="primary" onPress={() => { clearLocalStorage(); setIsOpenPop(false); }} variant="bordered" className="border-white/80 text-white rounded-full px-6 backdrop-blur-sm bg-white/5 hover:bg-white/10 hover:border-white transition-all duration-200">
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
                <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">ACME</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" href="#">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        
      </NavbarMenu>
    </Navbar>

            <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-primary">Load save file</ModalHeader>
                            <ModalBody>
                                <SaveUpload uploadSave={uploadSave} />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

export default navbarMobile;