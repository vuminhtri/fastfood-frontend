import { IoIosCloseCircleOutline } from "react-icons/io";

import { useSelector } from "react-redux";

const ViewOrder = ({ isOpen, onRequestClose, orderId }) => {
    const { list } = useSelector((state) => state.orders);
    const order = list.filter((order) => order._id === orderId)[0];
    return (
        <>
            <h2 className="-mt-3 font-bold text-3xl text-center">
                View Detail Order
            </h2>
            <button className="absolute top-1.5 right-1.5 text-3xl font-bold cursor-pointer " onClick={onRequestClose}>
                <IoIosCloseCircleOutline />
            </button>
            <div className="w-full flex flex-col my-8 justify-center items-center">
                <table className=" gap-2 p-6">
                    <tbody>
                        <tr>
                            <td className="pr-6 w-32 text-base font-semibold text-end text-gray-600">
                                Order ID:
                            </td>
                            <td>
                                <p className="px-3 py-1.5">{order._id}</p>
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-6 w-32 text-base font-semibold text-end text-gray-600">
                                Customer:
                            </td>
                            <td>
                                <p className="px-3 py-1.5">
                                    {order.shipping?.name}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-6 w-48 text-base font-semibold text-end text-gray-600">
                                Delivery Status:
                            </td>
                            <td>
                                <p className="px-3 py-1.5">
                                    {order.delivery_status}
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-6 w-32 text-base font-semibold text-end text-gray-600">
                                Products:
                            </td>
                            <td>
                                {order.products.map((product, index) => (
                                    <div key={index} className="px-3 py-1.5">
                                        {product.description} -{" "}
                                        {product.amount_subtotal.toLocaleString()}
                                        ₫
                                    </div>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-6 w-32 text-base font-semibold text-end text-gray-600">
                                Subtotal:
                            </td>
                            <td>
                                <p className="px-3 py-1.5">
                                    {order.subtotal.toLocaleString()}₫
                                </p>
                            </td>
                        </tr>
                        <tr>
                            <td className="pr-6 w-32 text-base font-semibold text-end text-gray-600">
                                Subtotal:
                            </td>
                            <td>
                                <p className="px-3 py-1.5">
                                    {order.total.toLocaleString()}₫ (Ship:{" "}
                                    {(
                                        order.total - order.subtotal
                                    ).toLocaleString()}
                                    ₫)
                                </p>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <button className="mt-10 px-4 py-1 text-white text-2xl cursor-pointer border-none outline-none bg-[#4b70e2] rounded-md" onClick={onRequestClose}>
                    Close
                </button>
            </div>
        </>
    );
};

export default ViewOrder;

