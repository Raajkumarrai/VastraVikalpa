import React, { useRef } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Listbox,
  ListboxItem,
  ListboxSection,
  Avatar,
} from "@nextui-org/react";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import SwitchAccountIcon from "@mui/icons-material/SwitchAccount";
import Confirmlogout from "./ConFirmlogout";
import SwitchAccountModal from "./SwitchAccountModal";
import { useNavigate } from "react-router-dom";

export default function Profile(props) {
  const { loginData } = props;
  const btnRef = useRef();
  const switchAccountRef = useRef();
  const listBtnRef = useRef();
  const navigate = useNavigate();

  const logoutbtnClk = () => {
    btnRef.current.click();
    listBtnRef.current.click();
  };
  const linkClick = () => {
    listBtnRef.current.click();
    navigate("/dashboard/profile");
  };
  const goHomeClick = () => {
    listBtnRef.current.click();
    navigate("/");
  };
  const switchAccountClick = () => {
    listBtnRef.current.click();
    switchAccountRef.current.click();
  };
  return (
    <>
      <Popover placement="bottom" showArrow={true} className="!rounded-[3px]">
        <PopoverTrigger>
          <div className="scale-95">
            <Avatar
              className="shadow"
              as="button"
              src={loginData?.image}
              showFallback
              classNames={{
                icon: "text-black/50",
              }}
              ref={listBtnRef}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="!rounded-[3px]">
          <Listbox variant="faded" aria-label="Listbox menu with icons">
            <ListboxItem
              className="hover:!border-transparent p-0 m-0 cursor-text hover:!bg-transparent"
              textValue="Signed in as"
            >
              <div className="p-0 m-0">
                <div className="text-base font-semibold">Signed in as</div>
                <div>
                  {loginData?.email ? loginData?.email : "zoey@example.com"}
                </div>
              </div>
            </ListboxItem>

            <ListboxSection title="Actions" className="border-b pb-1">
              <ListboxItem
                key="account"
                startContent={
                  <PersonIcon className="text-slate-600 relative text-xl ml-[3px] dark:text-slate-200" />
                }
                textValue="My Account"
                onClick={linkClick}
              >
                <div className="!text-xs !font-semibold">My Account</div>
              </ListboxItem>
              <ListboxItem
                key="gohome"
                startContent={
                  <HomeIcon className="text-slate-600 text-lg ml-[5px] dark:text-slate-200" />
                }
                textValue="Go Home"
                onClick={goHomeClick}
              >
                <div className="!text-xs !font-semibold">Go Home</div>
              </ListboxItem>
              <ListboxItem
                key="switch account"
                startContent={
                  <SwitchAccountIcon className="text-slate-600 text-lg ml-[5px] dark:text-slate-200" />
                }
                textValue="switch account"
                onClick={switchAccountClick}
              >
                <div className="!text-xs !font-semibold">Switch Account</div>
              </ListboxItem>
            </ListboxSection>

            <ListboxSection title="Danger zone">
              <ListboxItem
                key="logout"
                className="text-danger"
                color="danger"
                description="Logout from browser"
                startContent={<PowerSettingsNewIcon className="text-lg" />}
                textValue="Logout"
                onClick={logoutbtnClk}
              >
                Logout
              </ListboxItem>
            </ListboxSection>
          </Listbox>
        </PopoverContent>
      </Popover>
      <Confirmlogout btnRef={btnRef} />
      <SwitchAccountModal btnRef={switchAccountRef} />
    </>
  );
}
