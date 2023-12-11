import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ordersEdit, ordersFetch } from "../../slices/ordersSlice";
import { FiRefreshCw } from "react-icons/fi";
import Modal from "react-modal";
import moment from "moment";
import ViewOrder from "../../components/admin/orders/ViewOrder";

export default function Orders() {
    const { list } = useSelector((state) => state.orders);
    const [selectedOrderId, setSelectedOrderId] = useState("");
    const [refresh, setRefresh] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = (id) => {
        setSelectedOrderId(id);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    console.log(refresh);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ordersFetch());
    }, [dispatch, refresh]);

    const rows =
        list &&
        list.map((order) => {
            return {
                id: order._id,
                cName: order.shipping.name,
                amount: order.total?.toLocaleString() + "₫",
                dStatus: order.delivery_status,
                date: moment(order.createdAt).fromNow(),
            };
        });

    const columns = [
        { field: "id", headerName: "ID", width: 220 },
        {
            field: "cName",
            headerName: "Name",
            width: 120,
        },
        {
            field: "amount",
            headerName: "Total Amount",
            width: 120,
        },
        {
            field: "dStatus",
            headerName: "Delevery Status",
            width: 130,
            renderCell: (params) => {
                return (
                    <Status>
                        {params.row.dStatus === "pending" ? (
                            <Pending>Pending</Pending>
                        ) : params.row.dStatus === "dispatched" ? (
                            <Dispatched>Dispatched</Dispatched>
                        ) : params.row.dStatus === "delivered" ? (
                            <Delivered>Delivered</Delivered>
                        ) : (
                            "error"
                        )}
                    </Status>
                );
            },
        },
        {
            field: "editActions",
            headerName: "Edit Delivery Status",
            sortable: false,
            width: 250,
            renderCell: (params) => {
                return (
                    <EditActions>
                        <PendingBtn
                            onClick={() => handleOrderPending(params.row.id)}
                        >
                            Pending
                        </PendingBtn>
                        <Dispatch
                            onClick={() => handleOrderDispatch(params.row.id)}
                        >
                            Dispatched
                        </Dispatch>
                        <Deliver
                            onClick={() => handleOrderDeliver(params.row.id)}
                        >
                            Delivered
                        </Deliver>
                    </EditActions>
                );
            },
        },
        {
            field: "action",
            headerName: "Action",
            sortable: false,
            width: 100,
            renderCell: (params) => {
                return (
                    <EditActions>
                        <View onClick={() => openModal(params.row.id)}>
                            View Order
                        </View>
                    </EditActions>
                );
            },
        },
        {
            field: "date",
            headerName: "Date",
            width: 120,
        },
    ];

    const handleOrderPending = (id) => {
        dispatch(
            ordersEdit({
                id,
                delivery_status: "pending",
            })
        );
    };

    const handleOrderDispatch = (id) => {
        dispatch(
            ordersEdit({
                id,
                delivery_status: "dispatched",
            })
        );
    };

    const handleOrderDeliver = (id) => {
        dispatch(
            ordersEdit({
                id,
                delivery_status: "delivered",
            })
        );
    };

    return (
        <div style={{ height: 400, width: "100%" }}>
            <AdminHeaders>
                <h2 className="font-bold text-2xl">Orders</h2>
                <PrimaryButton onClick={() => setRefresh(!refresh)}>
                    <FiRefreshCw /> Refresh
                </PrimaryButton>
            </AdminHeaders>

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

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="View Order Modal"
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                    },
                    content: {
                        top: "50%",
                        left: "50%",
                        right: "auto",
                        bottom: "auto",
                        width: "50%",
                        height: "70%",
                        marginRight: "-50%",
                        transform: "translate(-50%, -50%)",
                    },
                }}
            >
                <ViewOrder
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    orderId={selectedOrderId}
                />
            </Modal>
        </div>
    );
}

const EditActions = styled.div`
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

const Dispatch = styled.button`
    background-color: rgb(6, 188, 249);
`;

const Deliver = styled.button`
    background-color: rgb(0, 128, 0);
`;

const PendingBtn = styled.button`
    background-color: rgb(255, 128, 0);
`;

const Status = styled.div`
    div {
        padding: 3px 5px;
        border-radius: 3px;
        font-size: 14px;
    }
`;

const Pending = styled.div`
    color: rgb(255, 128, 0);
    background: rgba(255, 128, 0, 0.1);
`;

const Dispatched = styled.div`
    color: rgb(6, 188, 249);
    background: rgba(6, 188, 249, 0.12);
`;

const Delivered = styled.div`
    color: rgb(0, 128, 0);
    background: rgba(0, 108, 0, 0.1);
`;

const View = styled.button`
    background-color: rgb(114, 225, 40);
`;

const AdminHeaders = styled.div`
    display: flex;
    justify-content: space-between;
`;

const PrimaryButton = styled.button`
    display: flex;
    align-items: center;
    padding: 9px 12px;
    border-radius: 5px;
    font-weight: 400;
    letter-spacing: 1.15px;
    background-color: #4b70e2;
    color: #f9f9f9;
    border: none;
    outline: none;
    cursor: pointer;
    margin: 0.5rem 0;

    svg {
        margin-right: 5px;
    }
`;
