import React, { useRef, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Tooltip,
} from "@nextui-org/react";
import { SearchIcon } from "../../../common/components/Tables/Icons/SearchIcon";
import { ChevronDownIcon } from "../../../common/components/Tables/Icons/ChevronDownIcon";
import { capitalize } from "../../../common/components/Tables/utils";
import { EyeIcon } from "../../../common/components/Tables/Icons/EyeIcon";
import { DeleteIcon } from "../../../common/components/Tables/Icons/DeleteIcon";
import UserModal from "./UserModal";
import ConFirm from "../../../common/components/ConFirm";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ConFirmAddadmin from "./ConFirmAddadmin";
import { VerifiedUser } from "@mui/icons-material";
import BredCrumbFun from "../../../common/Navigation/BredCrumb";

const statusOptions = [
  { name: "Superadmin", uid: 2 },
  { name: "Admin", uid: 1 },
  { name: "User", uid: 0 },
];

const columns = [
  { name: "SN", uid: "sn" },
  { name: "ID", uid: "_id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "EMAIL", uid: "email", sortable: true },
  { name: "STATUS", uid: "privilege" },
  { name: "DATE", uid: "date" },
  { name: "ACTIONS", uid: "actions" },
];

const getStatus = (id) => {
  if (id === 2) return "Superadmin";
  else if (id === 1) return "Admin";
  else return "User";
};
const INITIAL_VISIBLE_COLUMNS = ["sn", "name", "email", "privilege", "actions"];

export default function TablePage(props) {
  const { contentData, handelDelete, handelUpdate } = props;
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [Page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);
  const userRef = useRef();

  const [fullUserData, setFullUserData] = useState({});
  const viewBtnClk = (user) => {
    setFullUserData(user);
    userRef.current.click();
  };

  const btnRef = useRef();
  const [deleteId, setDeleteId] = useState("");
  const deleteBtnClk = (id) => {
    setDeleteId(id);
    btnRef.current.click();
  };
  const adminconfirmRef = useRef();
  const [updateAdminData, setUpdateAdminData] = useState({
    data: {},
    status: false,
  });
  const removeAdmin = (id) => {
    const data = {
      privilege: 0,
      id,
    };
    // handelUpdate(data);
    setUpdateAdminData({ data, status: false });
    adminconfirmRef.current.click();
  };
  const addAdmin = (id) => {
    const data = {
      privilege: 1,
      id,
    };
    setUpdateAdminData({ data, status: true });
    adminconfirmRef.current.click();
    // handelUpdate(data);
  };

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...contentData];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(String(user.privilege))
      );
    }

    return filteredUsers;
  }, [contentData, filterValue, statusFilter, hasSearchFilter]);

  let Pages = Math.ceil(filteredItems.length / rowsPerPage);
  Pages = Pages > 0 ? Pages : 1;

  const items = React.useMemo(() => {
    const start = (Page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [Page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.image }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "role":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
            <p className="text-bold text-tiny capitalize text-default-400">
              {user.team}
            </p>
          </div>
        );
      case "privilege":
        return (
          <Chip
            className="capitalize"
            color={user.privilege > 0 ? "success" : "default"}
            size="sm"
            variant="flat"
          >
            {getStatus(Number(user.privilege))}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => viewBtnClk(user)}
              >
                <EyeIcon className="mt-[3px] scale-105" />
              </span>
            </Tooltip>
            {Number(user.privilege) === 2 ? (
              <Tooltip content="Superadmin">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <VerifiedUser className="text-xl text-green-500" />
                </span>
              </Tooltip>
            ) : Number(user.privilege) === 1 ? (
              <Tooltip content="Remove admin" color="danger">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <AdminPanelSettingsOutlinedIcon
                    className="text-xl scale-105 text-green-400"
                    onClick={() => removeAdmin(user._id)}
                  />
                </span>
              </Tooltip>
            ) : (
              <Tooltip content="Add admin" color="success">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <PersonOutlineOutlinedIcon
                    className="text-xl scale-105"
                    onClick={() => addAdmin(user._id)}
                  />
                </span>
              </Tooltip>
            )}
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon
                  onClick={() => deleteBtnClk(user._id)}
                  className="mt-[2px]"
                />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onRowsPerPageChange = React.useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            radius="sm"
            size="sm"
            className="max-w-[350px]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown radius="sm">
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  radius="sm"
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                radius="sm"
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown radius="sm">
              <DropdownTrigger className="hidden sm:flex" radius="sm">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                  radius="sm"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                radius="sm"
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-8 items-center justify-center">
            <span className="text-default-400 text-small">
              Total {contentData.length} users
            </span>
            <div className="h-[20px] w-[1px] border-r border-black/30"></div>
            <BredCrumbFun category={"Users"} />
          </div>
          <label className="flex items-center text-default-400 text-small">
            Rows per Page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    contentData.length,
    onSearchChange,
    onClear,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-end items-center">
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          Page={Page}
          total={Pages}
          onChange={setPage}
          radius="sm"
        />
      </div>
    );
  }, [Page, Pages]);

  return (
    <>
      <Table
        radius="sm"
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[490px]",
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader
          columns={headerColumns}
          radius="sm"
          className="!top-0 !absolute"
        >
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No users found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <UserModal btnRef={userRef} data={fullUserData} />
      <ConFirm
        btnRef={btnRef}
        DeleteFunction={handelDelete}
        deleteId={deleteId}
      />
      <ConFirmAddadmin
        btnRef={adminconfirmRef}
        handelUpdate={handelUpdate}
        updateAdminData={updateAdminData}
        setUpdateAdminData={setUpdateAdminData}
      />
    </>
  );
}
