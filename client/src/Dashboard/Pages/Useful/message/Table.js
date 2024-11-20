import React, { useEffect, useRef, useState } from "react";
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
import Modal from "./Modal";
import ConFirm from "../../../common/components/ConFirm";
import BredCrumbFun from "../../../common/Navigation/BredCrumb";

const getStatus = (id) => {
  if (id === 2) return "Superadmin";
  else if (id === 1) return "Admin";
  else return "User";
};

const columns = [
  { name: "SN", uid: "sn" },
  { name: "ID", uid: "_id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "TITLE", uid: "title", sortable: true },
  { name: "MESSAGE", uid: "msg", sortable: true },
  { name: "EMAIL", uid: "email", sortable: true },
  { name: "STATUS", uid: "privilege" },
  { name: "DATE", uid: "date" },
  { name: "ACTIONS", uid: "actions" },
];

const INITIAL_VISIBLE_COLUMNS = [
  "sn",
  "name",
  "title",
  "msg",
  "privilege",
  "actions",
];

export default function TablePage(props) {
  const { contentData, handelDelete, handelUpdate, MsgId } = props;
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [Page, setPage] = React.useState(1);
  const hasSearchFilter = Boolean(filterValue);

  const btnRef = useRef();
  const [msgData, setMsgData] = useState({});
  const viewBtnclkFunction = (msg) => {
    setMsgData(msg);
    btnRef.current.click();
  };

  // !======================
  const [oneMsgData, setOneMsgData] = useState(null);

  useEffect(() => {
    // Ensure MsgId is not empty
    if (MsgId) {
      const data = contentData.find((e) => String(e._id) === String(MsgId));
      if (data) {
        setOneMsgData(data);
        btnRef.current.click();
      } else {
        // Reset oneMsgData if no matching message is found
        setOneMsgData(null);
      }
    }
  }, [MsgId, contentData]);
  // !===========================

  const deleteBtnRef = useRef();
  const [deleteId, setdeleteId] = useState("");

  const deleteBtnClk = (id) => {
    setdeleteId(id);
    deleteBtnRef.current.click();
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
        user.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [contentData, filterValue, hasSearchFilter]);

  // const Pages = Math.ceil(filteredItems.length / rowsPerPage);
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
            avatarProps={{ radius: "lg", src: user.user?.image }}
            description={user.user ? user.user.email : user.email}
            name={user.user ? user.user.name : cellValue}
          >
            {user.email}
          </User>
        );
      case "msg":
        return (
          <div>
            {user.msg?.length > 30 ? user.msg.slice(0, 30) + "..." : user.msg}
          </div>
        );
      case "title":
        return (
          <div>
            {user.title?.length > 20
              ? user.title.slice(0, 20) + "..."
              : user.title}
          </div>
        );
      case "privilege":
        return (
          <Chip
            className="capitalize"
            color={user.user?.privilege > 0 ? "success" : "default"}
            size="sm"
            variant="flat"
          >
            {getStatus(Number(user.user?.privilege))}
          </Chip>
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
      case "status":
        return (
          <Chip
            className="capitalize"
            color={"success"}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => viewBtnclkFunction(user)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon onClick={() => deleteBtnClk(user._id)} />
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
          <div className="flex gap-5 items-center justify-center">
            <span className="text-default-400 text-small">
              Total {contentData.length} message
            </span>
            <div className="h-[20px] w-[1px] border-r border-black/30"></div>
            <BredCrumbFun category={"Message"} />
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
        <TableBody emptyContent={"No Message found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal
        btnRef={btnRef}
        msgData={oneMsgData ? oneMsgData : msgData}
        setMsgData={setMsgData}
        handelUpdate={handelUpdate}
        setOneMsgData={setOneMsgData}
      />
      <ConFirm
        btnRef={deleteBtnRef}
        deleteId={deleteId}
        DeleteFunction={handelDelete}
      />
    </>
  );
}
