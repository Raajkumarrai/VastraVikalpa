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
  Pagination,
  Tooltip,
} from "@nextui-org/react";
import { SearchIcon } from "../../../common/components/Tables/Icons/SearchIcon";
import { ChevronDownIcon } from "../../../common/components/Tables/Icons/ChevronDownIcon";
import { capitalize } from "../../../common/components/Tables/utils";
import { EditIcon } from "../../../common/components/Tables/Icons/EditIcons";
import { DeleteIcon } from "../../../common/components/Tables/Icons/DeleteIcon";
import ModalApp from "./Modal";
import ConFirm from "../../../common/components/ConFirm";
import { PlusIcon } from "../../../common/components/Tables/Icons/PlusIcon";
import BredCrumbFun from "../../../common/Navigation/BredCrumb";

const INITIAL_VISIBLE_COLUMNS = [
  "sn",
  "categoryName",
  "displayOrder",
  "image",
  "active",
  "showTop",
  "actions",
];
const columns = [
  { name: "SN", uid: "sn" },
  { name: "ID", uid: "_id", sortable: true },
  { name: "NAME", uid: "categoryName", sortable: true },
  { name: "DISPLAY ORDER", uid: "displayOrder", sortable: true },
  { name: "ACTIVE", uid: "active" },
  { name: "VIEW IN", uid: "showTop" },
  { name: "IMAGE", uid: "image" },
  { name: "DATE", uid: "date" },
  { name: "ACTIONS", uid: "actions" },
];

export default function Tablepage(props) {
  const {
    handelPostCategory,
    categoryData,
    handelDelete,
    handelUpdate,
    postUpload,
  } = props;
  const [filterValue, setFilterValue] = React.useState("");
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [rowsPerpage, setRowsPerpage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setpage] = React.useState(1);

  const btnRef = useRef();
  const [deleteId, setDeleteId] = useState("");
  const deleteBtnClk = (id) => {
    setDeleteId(id);
    btnRef.current.click();
  };

  const updateBtnRef = useRef();
  const [updateData, setUpdateData] = useState({ status: false, data: {} });
  const updateBtnClk = (row) => {
    updateBtnRef.current.click();
    setUpdateData({ status: true, data: row });
  };

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...categoryData];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.categoryName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredUsers;
  }, [categoryData, filterValue, hasSearchFilter]);

  // const pages = Math.ceil(filteredItems.length / rowsPerpage);
  let pages = 1;
  pages = Math.ceil(filteredItems.length / rowsPerpage);
  pages = pages > 0 ? pages : 1;

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerpage;
    const end = start + rowsPerpage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerpage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  function dateConverter(isoDate) {
    const date = new Date(isoDate);
    return date.toLocaleString();
  }

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case "image":
        return (
          <>
            {String(user.image).length < 2 ? (
              "-"
            ) : (
              <img
                height={28}
                width={28}
                className="h-[28px] w-[28px] rounded-md object-cover"
                src={user.image}
                alt={user.categoryName}
              />
            )}
          </>
        );
      case "date":
        return <div>{dateConverter(user.date)}</div>;
      case "active":
        return (
          <Chip
            className="capitalize"
            color={user.active ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {user.active ? "Active" : "Inactive"}
          </Chip>
        );
      case "showTop":
        return (
          <Chip
            className="capitalize"
            color={user.showTop ? "success" : "warning"}
            size="sm"
            variant="flat"
          >
            {user.showTop ? "TOP" : "BOTTOM"}
          </Chip>
        );
      case "sn":
        return <div name={cellValue}>{user.sn}</div>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon onClick={() => updateBtnClk(user)} />
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

  const onRowsPerpageChange = React.useCallback((e) => {
    setRowsPerpage(Number(e.target.value));
    setpage(1);
  }, []);

  const onSearchChange = React.useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setpage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setpage(1);
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
            placeholder="Search by category name..."
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
            <Button
              radius="sm"
              color="primary"
              endContent={<PlusIcon />}
              onClick={() => updateBtnRef.current.click()}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-5 items-center justify-center">
            <span className="text-default-400 text-small">
              Total {categoryData.length} categories
            </span>
            <div className="h-[20px] w-[1px] border-r border-black/30"></div>
            <BredCrumbFun category={"Categories"} />
          </div>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerpageChange}
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
    onRowsPerpageChange,
    categoryData.length,
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
          page={page}
          total={pages}
          onChange={setpage}
          radius="sm"
        />
      </div>
    );
  }, [page, pages]);

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
        <TableBody emptyContent={"No Category found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ConFirm
        btnRef={btnRef}
        DeleteFunction={handelDelete}
        deleteId={deleteId}
      />
      <ModalApp
        handelPostCategory={handelPostCategory}
        handelUpdate={handelUpdate}
        updateBtnRef={updateBtnRef}
        updateData={updateData}
        setUpdateData={setUpdateData}
        postUpload={postUpload}
      />
    </>
  );
}
