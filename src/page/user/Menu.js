import React, { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../../slices/cartSlice";
import axios from "axios";
import { url } from "../../slices/api";
import { toast } from "react-toastify";
// import AllProduct from "../../components/user/AllProduct";
import { GrPrevious, GrNext } from "react-icons/gr";
import CardFeature from "../../components/user/CardFeature";


const Menu = () => {
  const { id } = useParams();
  const items = useSelector((state) => state.products.items);
  const auth = useSelector((state) => state.auth);
  const productDisplay = items.filter((el) => el._id === id)[0];
  const [optionOrder, setOptionOrder] = useState([]);
  const [note, setNote] = useState("");

  const handleCheckboxChange = (option) => {
    const isOptionSelected = optionOrder.includes(option);

    if (isOptionSelected) {
      setOptionOrder(optionOrder.filter((selectedOption) => selectedOption !== option));
    } else {
      setOptionOrder([...optionOrder, option]);
    }
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const relatedProducts = useMemo(() => {
    return items.filter((el) => el.category === productDisplay.category && el._id !== productDisplay._id);
  }, [items]);

  const loadingArrayFeature = new Array(6).fill(null);
  const slideProductRef = useRef();
  const prevProduct = () => {
    slideProductRef.current.scrollLeft -= 220;
  };
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 220;
  };

  const handleAddCartProduct = (e) => {
    dispatch(addToCart({
      _id: productDisplay._id,
      name: productDisplay.name,
      price: productDisplay.price,
      image: productDisplay.image,
      optionOrder,
      totalPrice: productDisplay.price +
        optionOrder?.reduce(
          (total, option) => total + option.price,
          0
        ),
      note
    }));
    navigate("/cart")
  };

  // const handleCheckout = () => {
  //   if (auth._id) {
  //     axios
  //       .post(`${url}/stripe/create-checkout-session`, {
  //         productDisplay,
  //         userId: auth._id,
  //       })
  //       .then((response) => {
  //         if (response.data.url) {
  //           window.location.href = response.data.url;
  //         }
  //       })
  //       .catch((err) => console.log(err.message));
  //   } else {
  //     toast("You must login to order product!", {
  //       position: "top-center",
  //       hideProgressBar: true,
  //       autoClose: 1500,
  //       style: { background: "#e74c3c", color: "white" },
  //     });
  //     navigate("/login");
  //   }
  // };
  return (
    <div className="p-2 md:p-4">
      <div className="w-full max-w-4xl m-auto bg-white md:flex">
        <div className="w-full max-w-sm p-5 overflow-hidden">
          <img
            src={productDisplay.image?.url}
            className="h-full transition-all hover:scale-105"
            alt="Product"
          />
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-2xl font-semibold capitalize text-slate-600 md:text-4xl">
            {productDisplay.name}
          </p>
          <p className="w-full max-w-lg py-2 font-normal">{productDisplay.desc}</p>
          <p className="font-bold text-2xl ml-4">
            <span>{(productDisplay.price).toLocaleString()}</span>
            <span className="text-red-500">₫</span>
          </p>
          {productDisplay.extraOptions.length > 0 && (
            <>
              <h1 className="font-medium text-slate-600 text-lg">Phần ăn phụ:</h1>
              {productDisplay.extraOptions.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    className="h-4 w-4"
                    type="checkbox"
                    id={`option${index}`}
                    name={`option${index}`}
                    checked={optionOrder.includes(option)} // Đánh dấu checkbox nếu option đã được chọn
                    onChange={() => handleCheckboxChange(option)}
                  />
                  <label htmlFor={`option${index}`} className="text-base">
                    {option.name} {`+${option.price.toLocaleString()}₫`}
                  </label>
                </div>
              ))}
            </>
          )}
          <h1 className="font-medium text-slate-600 text-lg">Ghi chú:</h1>
          <textarea
            className="p-1 my-1 resize-none border border-gray-300 rounded-sm"
            rows={3}
            placeholder="Ghi chú tăng giảm gia vị của món ăn theo nhu cầu cá nhân"
            onChange={(e) => setNote(e.target.value)}
          />
          <div className="flex gap-10 mb-3 justify-center">
            {/* <button
              className="bg-yellow-500 py-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
              onClick={handleCheckout}
            >
              Mua luôn
            </button> */}
            <button
              className="bg-yellow-500 p-1 mt-2 rounded hover:bg-yellow-600 min-w-[100px]"
              onClick={handleAddCartProduct}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>

      <div className="">
        <div className="flex w-full items-center p-4">
          <h2 className="font-bold text-2xl text-slate-800 ">
            Sản phẩm tương tự
          </h2>
          <div className="ml-auto flex gap-4">
            <button
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
              onClick={prevProduct}
            >
              <GrPrevious />
            </button>
            <button
              className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded"
              onClick={nextProduct}
            >
              <GrNext />
            </button>
          </div>
        </div>
        <div
          className="flex gap-5 overflow-scroll scrollbar-none scroll-smooth transition-all"
          ref={slideProductRef}
        >
          {relatedProducts[0]
            ? relatedProducts.map((el) => {
              return (
                <CardFeature
                  key={el._id + "vegetable"}
                  id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                  extraOptions={el.extraOptions}
                />
              );
            })
            : loadingArrayFeature.map((el, index) => {
              return (
                <CardFeature
                  key={index + "loading"}
                  loading={"Loading..."}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Menu;
