import React from "react";
const Order = () => {
    return ( 
        <div className="flex flex-col justify-center items-center">
            <div className="w-1/2">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>STATUS</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={"alert-success"}>
                            <td><a href={`/`} className="link">1</a></td>
                            <td>Paid</td>
                            <td>Dec 12 2021</td>
                            <td>$234</td>
                        </tr>
                        {/* Cancelled */}
                        <tr className={"alert-danger"}>
                            <td><a href={`/`} className="link">2</a></td>
                            <td>Not Paid</td>
                            <td>Dec 12 2021</td>
                            <td>$34</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
     );
}
 
export default Order;