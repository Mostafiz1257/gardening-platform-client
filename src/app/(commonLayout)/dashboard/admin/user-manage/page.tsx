"use client";
import { useGetAllUserQuery } from "@/src/redux/features/user";
import React from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, User, Chip, Tooltip } from "@nextui-org/react";
// import { EditIcon } from "./EditIcon";
// import { DeleteIcon } from "./DeleteIcon";
// import { EyeIcon } from "./EyeIcon";

const statusColorMap = {
  user: "default",
  admin: "success",
};

const UserManagement = () => {
  const { data } = useGetAllUserQuery({});
  const allUsers = data?.data || [];

  const renderCell = (user, columnKey) => {
    const cellValue = user[columnKey];
    
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: user.profileImage }}
            description={user.email}
            name={cellValue}
          />
        );
      case "role":
        return (
          <Chip className="capitalize" color={statusColorMap[user.role] || "default"} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                {/* <EyeIcon /> */}
              </span>
            </Tooltip>
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                {/* <EditIcon /> */}
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                {/* <DeleteIcon /> */}
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  const columns = [
    { name: "NAME", uid: "name" },
    { name: "ROLE", uid: "role" },
    { name: "EMAIL", uid: "email" },
   
  ];

  return (
    <div>
   
      <Table aria-label="User management table">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={allUsers}>
          {(user) => (
            <TableRow key={user._id}>
              {(columnKey) => <TableCell>{renderCell(user, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;
