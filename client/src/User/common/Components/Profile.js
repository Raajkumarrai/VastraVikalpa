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
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Confirmlogout from "./ConFirmlogout";
import { useNavigate } from "react-router-dom";
import { IoGitBranch } from "react-icons/io5";

export default function Profile({ userData }) {
  const { data } = userData;
  const btnRef = useRef();
  const listBtnRef = useRef();
  const navigate = useNavigate();

  const logoutbtnClk = () => {
    btnRef.current.click();
    listBtnRef.current.click();
  };

  return (
    <>
      <Popover placement="bottom" showArrow={true} className="!rounded-[3px]">
        <PopoverTrigger>
          <div className="scale-110">
            <Avatar
              size="sm"
              as="button"
              src={data?.image}
              showFallback
              classNames={{
                icon: "text-black/50",
              }}
              ref={listBtnRef}
            />
          </div>
        </PopoverTrigger>
        <PopoverContent className="!rounded-[3px] py-2">
          <Listbox variant="faded" aria-label="Listbox menu with icons">
            <ListboxItem
              className="hover:!border-transparent p-0 m-0 cursor-text hover:!bg-transparent"
              textValue="Signed in as"
            >
              <div className="p-0 m-0">
                <div className="text-sm font-semibold font-poppins">
                  Signed in as
                </div>
                <div className="text-xs font-poppins">
                  {data?.email ? data?.email : "zoey@example.com"}
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
                onClick={() =>
                  navigate(
                    `/myaccount/${JSON.parse(localStorage.getItem("data"))._id}`
                  )
                }
              >
                {/* <Link
                  to={`/myaccount/${JSON.parse(localStorage.getItem("data"))._id}`}
                >
                </Link> */}
                <div className="!text-xs !font-semibold">My Account</div>
              </ListboxItem>
              <ListboxItem
                key="gohome"
                startContent={
                  <IoGitBranch className="text-slate-600 text-2xl ml-[5px] dark:text-slate-200" />
                }
                textValue="Go Home"
                onClick={() => navigate(`/ordertrack`)}
              >
                <div className="!text-xs !font-semibold">Order Track</div>
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
    </>
  );
}
