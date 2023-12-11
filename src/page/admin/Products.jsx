import React, { useState } from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Modal from "react-modal";
import NewProduct from "../../components/admin/products/NewProduct";

const Products = () => {
    const [isCreateProductModalOpen, setCreateProductModalOpen] =
        useState(false);

    const openCreateProductModal = () => {
        setCreateProductModalOpen(true);
    };

    const closeCreateProductModal = () => {
        setCreateProductModalOpen(false);
    };

    return (
        <>
            <AdminHeaders>
                <h2 className="font-bold text-2xl">Products</h2>
                <PrimaryButton onClick={openCreateProductModal}>
                    Create
                </PrimaryButton>
            </AdminHeaders>
            <Outlet />

            <Modal
                isOpen={isCreateProductModalOpen}
                onRequestClose={closeCreateProductModal}
                contentLabel="Create Product Modal"
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
                <NewProduct
                    isOpen={isCreateProductModalOpen}
                    onRequestClose={closeCreateProductModal}
                />
            </Modal>
        </>
    );
};

export default Products;

const AdminHeaders = styled.div`
    display: flex;
    justify-content: space-between;
`;

const PrimaryButton = styled.button`
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
`;
