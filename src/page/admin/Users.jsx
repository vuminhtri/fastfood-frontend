import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { usersDelete, usersEdit, usersFetch } from "../../slices/usersSlice";
import { useEffect } from "react";


export default function Users() {
    const { list } = useSelector((state) => state.users);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(usersFetch());
    }, [dispatch]);

    const handleCustomerRole = (id) => {
        dispatch(
            usersEdit({
                id,
                isAdmin: false,
            })
        );
    };

    
    const handleAdminRole = (id) => {
        dispatch(
            usersEdit({
                id,
                isAdmin: true,
            })
        );
    };

    const rows =
        list &&
        list.map((user) => {
            return {
                id: user._id,
                uName: user.name,
                uEmail: user.email,
                isAdmin: user.isAdmin,
            };
        });

    const columns = [
        { field: "id", headerName: "ID", width: 220 },
        {
            field: "uName",
            headerName: "Name",
            width: 150,
        },
        {
            field: "uEmail",
            headerName: "Email",
            width: 200,
        },
        {
            field: "isAdmin",
            headerName: "Role",
            width: 100,
            renderCell: (params) => {
                return (
                    <Role>
                        {params.row.isAdmin ? (
                            <Admin>Admin</Admin>
                        ) : (
                            <Customer>Customer</Customer>
                        )}
                    </Role>
                );
            },
        },
        {
            field: "editRole",
            headerName: "Edit Role",
            sortable: false,
            width: 150,
            renderCell: (params) => {
                return (
                    <Actions>
                        <CustomerBtn onClick={() => handleCustomerRole(params.row.id)}>
                            Customer
                        </CustomerBtn>
                        <AdminBtn onClick={() => handleAdminRole(params.row.id)}>
                            Admin
                        </AdminBtn>
                    </Actions>
                );
            },
        },
        {
            field: "actions",
            headerName: "Action",
            sortable: false,
            width: 170,
            renderCell: (params) => {
                return (
                    <Actions>
                        <Delete onClick={() => handleDelete(params.row.id)}>
                            Delete
                        </Delete>
                    </Actions>
                );
            },
        },
    ];

    const handleDelete = (id) => {
        dispatch(usersDelete(id));
    };

    return (
        <div style={{ height: 400, width: "100%" }}>
            <h2 className="font-bold text-2xl pb-5">Users</h2>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                // pageSizeOptions={5}
                pageSize={5}
                checkboxSelection
                disableColumnSelector
            />

            {/* {isRoleChangeModalOpen && (
                <RoleChangeModal
                    userId={selectedUserId}
                    onClose={handleCloseRoleChangeModal}
                    onSave={handleSaveRoleChange}
                />
            )} */}
        </div>
    );
}

const Actions = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    button {
        border: none;
        outline: none;
        padding: 3px 5px;
        color: white;
        border-radius: 3px;
        cursor: pointer;
    }
`;

const Delete = styled.button`
    background-color: rgb(255, 77, 73);
`;

const Role = styled.div`
    padding: 3px 5px;
    border-radius: 3px;
    font-size: 14px;
    cursor: pointer;
    background: rgba(38, 198, 249, 0.12);

    &:hover {
        background: rgba(38, 198, 249, 0.3);
    }
`;

const AdminBtn = styled.button`
    background-color: rgb(8, 102, 255);
`;

const CustomerBtn = styled.button`
    background-color: rgb(76, 175, 80);
`;

const Admin = styled.div`
    color: rgb(8, 102, 255);
    background: rgba(8, 102, 255, 0.12);
`;

const Customer = styled.div`
    color: rgb(76, 175, 80);
    background: rgba(76, 175, 80, 0.12);
`;

// const AdminHeaders = styled.div`
//     display: flex;
//     justify-content: space-between;
// `;

// const PrimaryButton = styled.button`
//     padding: 9px 12px;
//     border-radius: 5px;
//     font-weight: 400;
//     letter-spacing: 1.15px;
//     background-color: #4b70e2;
//     color: #f9f9f9;
//     border: none;
//     outline: none;
//     cursor: pointer;
//     margin: 0.5rem 0;
// `;
