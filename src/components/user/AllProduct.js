import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FilterProduct from "./FilterProduct";
import CardFeature from "./CardFeature";

const AllProduct = ({ heading }) => {
    const { items: data } = useSelector((state) => state.products);
    const categoryList = [...new Set(data.map((product) => product.category))];
    const loadingArrayFeature = new Array(10).fill(null);

    const [filterBy, setFilterBy] = useState("");
    const [dataFilter, setDataFilter] = useState([]);

    useEffect(() => {
        setDataFilter(data);
    }, [data]);

    const handleFilterProduct = (category) => {
        setFilterBy(category);
        const filter = data.filter(
            (product) => product.category.toLowerCase() === category.toLowerCase()
        );
        setDataFilter(() => {
            return [...filter];
        });
    };
    return (
        <div>
            <div className="my-5">
                <h2 className="font-bold text-2xl text-slate-800 mb-4">
                    {heading}
                </h2>

                <div className="flex gap-4 justify-center overflow-scroll scrollbar-none">
                    {categoryList[0] ? (
                        categoryList.map((product) => (
                            <FilterProduct
                                category={product}
                                key={product}
                                isActive={product.toLowerCase() === filterBy.toLowerCase()}
                                onClick={() => handleFilterProduct(product)}
                            />
                        ))
                    ) : (
                        <div className="min-h-[150px] flex justify-center items-center">
                            <p>Loading...</p>
                        </div>
                    )}
                </div>

                <div className="flex flex-wrap gap-4 justify-center my-4">
                    {dataFilter[0]
                        ? dataFilter.map((product) => {
                            return (
                                <CardFeature
                                    key={product._id + product.category}
                                    id={product._id}
                                    image={product.image}
                                    name={product.name}
                                    category={product.category}
                                    price={product.price}
                                    extraOptions={product.extraOptions}
                                />
                            );
                        })
                        : loadingArrayFeature.map((product, index) => (
                            <CardFeature
                                loading={"Loading..."}
                                key={index + "products"}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default AllProduct;
