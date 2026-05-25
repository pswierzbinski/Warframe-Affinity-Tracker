import React, { useEffect, useState } from "react";
import { Navbar, Link, NavbarBrand, NavbarContent, NavbarItem, Button, Modal, ModalContent, ModalFooter, ModalBody, ModalHeader, useDisclosure, Image, Popover, PopoverTrigger, PopoverContent, Switch, Divider, NavbarMenu, NavbarMenuItem, NavbarMenuToggle, Spacer, DropdownItem, DropdownMenu, DropdownTrigger, Dropdown } from "@heroui/react";
import SaveUpload from "./Topbar/SaveUpload";
import { useGlobal } from '@/context/GlobalContext';
import { ArrowDownTrayIcon, ArrowUpTrayIcon, EyeIcon, EyeSlashIcon, TrashIcon, ArrowPathIcon, BookmarkIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
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

export const DisketteIcon = ({ fill = "currentColor", ...props }) => {
  return (
    <svg fill="#ffff" height="27px" width="27px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64" enableBackground="new 0 0 64 64">
      <g id="Floppy-disk">
        <path d="M35.2673988,6.0411h-7.9999981v10h7.9999981V6.0411z M33.3697014,14.1434002h-4.2046013V7.9387999h4.2046013V14.1434002z"
        />
        <path d="M41,47.0410995H21c-0.5527992,0-1,0.4472008-1,1c0,0.5527,0.4472008,1,1,1h20c0.5527,0,1-0.4473,1-1
		C42,47.4883003,41.5527,47.0410995,41,47.0410995z"/>
        <path d="M41,39.0410995H21c-0.5527992,0-1,0.4472008-1,1c0,0.5527,0.4472008,1,1,1h20c0.5527,0,1-0.4473,1-1
		C42,39.4883003,41.5527,39.0410995,41,39.0410995z"/>
        <path d="M12,56.0410995h38v-26H12V56.0410995z M14,32.0410995h34v22H14V32.0410995z" />
        <path d="M49.3811989,0.0411L49.3610992,0H7C4.7908001,0,3,1.7909,3,4v56c0,2.2092018,1.7908001,4,4,4h50
		c2.2090988,0,4-1.7907982,4-4V11.6962996L49.3811989,0.0411z M39.9604988,2.0804999v17.9211006H14.0394001V2.0804999H39.9604988z
		 M59,60c0,1.1027985-0.8972015,2-2,2H7c-1.1027999,0-2-0.8972015-2-2V4c0-1.1027999,0.8972001-2,2-2h5v20.0410995h30V2h6.5099983
		L59,12.5228996V60z"/>
      </g>
    </svg>
  );
}

const NavbarMobile: React.FC<TopbarProps> = ({ clearLocalStorage, saveItemsAsJson, updateItemsList, uploadSave, currentMR, currentMRName, affinityRanges, currentAffinity }) => {
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

      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        classNames={{
          base: "fixed bottom-0 top-auto bg-gray-100 backdrop-filter backdrop-blur-md bg-opacity-10  self-center z-50",
          wrapper: "px-2 h-16 flex items-center",
          menu: "bottom-[var(--navbar-height)] top-auto bg-linear-to-b from-primary-700 to-[#922d3b]",
        }}
        disableAnimation={true}
      >
        <NavbarContent className="absolute left-2 w-auto p-0" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="text-white w-8 min-w-0"
          />
        </NavbarContent>

        <div className="flex flex-row items-center w-full gap-2 pl-10">

          <Divider orientation="vertical" className="h-6 bg-white/20 shrink-0" />
          <div className="flex flex-col items-center gap-0.5 shrink-0">
            <Switch
              isSelected={hideMastered}
              endContent={<EyeIcon className="size-3" />}
              startContent={<EyeSlashIcon className="size-3" />}
              onValueChange={setHideMastered}
              size="sm"
              color="primary"
              className="border border-white/50 rounded-full p-0.5"
            />
            <span className="text-[10px] text-white/80 leading-none whitespace-nowrap">
              {hideMastered ? "Hiding maxed" : "Show maxed"}
            </span>
          </div>

          <Divider orientation="vertical" className="h-6 bg-white/20 shrink-0" />
          <div className="flex-1 min-w-0">
            <ItemSearch mobile={true} />
          </div>

          <Divider orientation="vertical" className="h-6 bg-white/20 shrink-0" />

          <Dropdown
            placement="top-end"
            classNames={{
              content: "bg-black/10 backdrop-blur-xl border border-white/15 shadow-xl shadow-black/40"
            }}
          >
            <DropdownTrigger>
              <Button
                style={{ padding: "0 6px", minWidth: 0 }}
                className="flex flex-row text-white bg-white/0"
                color="primary"
                variant="solid"
              >
                <DisketteIcon className="size-4" />
                <ChevronUpIcon className="-ml-2 w-4 h-4 self-center" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Save options"
              itemClasses={{
                base: "p-0 rounded-full mb-1 last:mb-0",
              }}
            >
              <DropdownItem key="download" textValue="Download Save" isReadOnly>
                <Button
                  onPress={saveItemsAsJson}
                  variant="bordered"
                  className="w-full justify-start border-white/80 text-white rounded-full bg-white/5 transition-all duration-200"
                >
                  <ArrowDownTrayIcon className="size-4 shrink-0" />
                  Download Save
                </Button>
              </DropdownItem>

              <DropdownItem key="clear" textValue="Clear saved data" isReadOnly>
                <Popover
                  isOpen={isOpenPop}
                  onOpenChange={(open) => setIsOpenPop(open)}
                  color="warning"
                  placement="left"
                  showArrow
                  backdrop="opaque"
                >
                  <PopoverTrigger>
                    <Button
                      onPress={clearLocalStorage}
                      variant="bordered"
                      className="w-full justify-start border-white/80 text-white rounded-full bg-white/5 transition-all duration-200"
                    >
                      <TrashIcon className="size-4 shrink-0" />
                      Clear saved data
                    </Button>
                  </PopoverTrigger>
                  {content}
                </Popover>
              </DropdownItem>

              <DropdownItem key="upload" textValue="Upload save file" isReadOnly>
                <Button
                  onPress={onOpen}
                  variant="bordered"
                  className="w-full justify-start border-white/80 text-white rounded-full bg-white/5 transition-all duration-200"
                >
                  <ArrowUpTrayIcon className="size-4 shrink-0" />
                  Upload save file
                </Button>
              </DropdownItem>

              <DropdownItem key="update" textValue="Update to newest patch" isReadOnly>
                <Button
                  onPress={updateItemsList}
                  variant="bordered"
                  className="w-full justify-start border-white/80 text-white rounded-full bg-white/5 transition-all duration-200"
                >
                  <ArrowPathIcon className="size-4 shrink-0" />
                  Update to newest patch
                </Button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

        </div>
        <NavbarMenu>
          {/* menu items */}
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

export default NavbarMobile;