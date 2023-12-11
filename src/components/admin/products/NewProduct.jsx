import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";

import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { productsCreate } from "../../../slices/productsSlice";

const NewProduct = ({ isOpen, onRequestClose }) => {
    const [extraOptions, setExtraOptions] = useState([{ name: "", price: "" }]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");
    const { createStatus } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    const handleProductImageUpload = (e) => {
        const file = e.target.files[0];

        TransformFileData(file);
    };

    const TransformFileData = (file) => {
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result);
            };
        } else {
            setImage("");
        }
    };

    const handleOptionChange = (index, key, value) => {
        const newOptions = [...extraOptions];
        newOptions[index][key] = value;
        setExtraOptions(newOptions);
    };

    const addOption = () => {
        setExtraOptions([...extraOptions, { name: "", price: "" }]);
    };

    const removeOption = (index) => {
        const newOptions = [...extraOptions];
        newOptions.splice(index, 1);
        setExtraOptions(newOptions);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(
            productsCreate({
                name,
                category,
                price,
                desc,
                image,
                extraOptions
            })
        );
        onRequestClose();
    };

    return (
        <>
            <h2 className="-mt-3 font-bold text-3xl text-center">
                Create Product
            </h2>
            <CloseButton onClick={onRequestClose}>
                <IoIosCloseCircleOutline />
            </CloseButton>
            <Form onSubmit={handleSubmit}>
                <LeftContainer>
                    <Label htmlFor="name">Product Name:</Label>
                    <Input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <div style={{ display: "flex", gap: "16px" }}>
                        <div style={{ flex: 1 }}>
                            <Label htmlFor="category">Category:</Label>
                            <Select
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="burger">Burger</option>
                                <option value="cake">Cake</option>
                                <option value="pizza">Pizza</option>
                                <option value="sandwich">Sandwich</option>
                                <option value="combo">Combo</option>
                                <option value="other">Other</option>
                            </Select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <Label htmlFor="price">Price:</Label>
                            <Input
                                type="text"
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <Label htmlFor="image">Image:</Label>
                    <Input
                        type="file"
                        accept="image/*"
                        id="image"
                        onChange={handleProductImageUpload}
                        required
                    />

                    <Label htmlFor="description">Description:</Label>
                    <TextArea
                        onChange={(e) => setDesc(e.target.value)}
                        rows="4"
                        required
                    />
                </LeftContainer>
                <RightContainer>
                    <ImagePreview>
                        {image ? (
                            <>
                                <img src={image} alt="error!" />
                            </>
                        ) : (
                            <p>
                                Product image upload preview will appear here!
                            </p>
                        )}
                    </ImagePreview>
                    <ExtraOptionsContainer>
                        <Label>Extra Options:</Label>
                        {extraOptions.map((option, index) => (
                            <ExtraOption key={index}>
                                <Input
                                    type="text"
                                    placeholder="Option Name"
                                    value={option.name}
                                    onChange={(e) =>
                                        handleOptionChange(
                                            index,
                                            "name",
                                            e.target.value
                                        )
                                    }
                                />
                                <Input
                                    type="text"
                                    placeholder="Option Price"
                                    value={option.price}
                                    onChange={(e) =>
                                        handleOptionChange(
                                            index,
                                            "price",
                                            e.target.value
                                        )
                                    }
                                />
                                <RemoveOption
                                    onClick={() => removeOption(index)}
                                >
                                    <IoCloseSharp />
                                </RemoveOption>
                            </ExtraOption>
                        ))}
                    </ExtraOptionsContainer>

                    <AddOption onClick={addOption}>
                        Add More Extra Option
                    </AddOption>

                    <br />
                    <br />
                </RightContainer>
                <PrimaryButton type="submit">
                    {createStatus === "pending" ? "Submitting" : "Submit"}
                </PrimaryButton>
            </Form>
        </>
    );
};

export default NewProduct;

const CloseButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
    border: none;
    background: none;
    outline: none;
`;

const Form = styled.form`
    display: flex;
    flex-direction: row;
    width: 100%;
`;

const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`;

const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
`;

const ImagePreview = styled.div`
    flex-direction: row;
    width: 50%;
    margin: auto;
    padding: 2rem;
    color: rgb(78, 78, 78);

    img {
        max-width: 100%;
        height: 50%;
    }
`;

const Label = styled.label`
    margin-bottom: 2px;
`;

const inputStyles = `
    width: 100%;
    padding: 5px;
    min-height: 30px;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;

    &:focus {
        border: 2px solid rgb(0, 208, 255);
    }
`;

const Input = styled.input`
    ${inputStyles}
`;

const Select = styled.select`
    ${inputStyles}
`;

const TextArea = styled.textarea`
    ${inputStyles}
`;

// const TextArea = styled.textarea`
//     width: 100%;
//     padding: 8px;
//     margin-bottom: 16px;
//     box-sizing: border-box;
// `;

const ExtraOptionsContainer = styled.div`
    margin-left: 16px;
    flex-direction: row;
    width: 90%;
`;

const ExtraOption = styled.div`
    width: 100%;
    display: flex;
    gap: 1rem;
    align-items: center;
    margin-bottom: 8px;
`;

const RemoveOption = styled.button`
    margin-left: 8px;
    cursor: pointer;
`;

const AddOption = styled.button`
    cursor: pointer;
    color: #007bff;
    text-decoration: underline;
`;

const PrimaryButton = styled.button`
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
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
