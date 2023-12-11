import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { productsEdit } from "../../../slices/productsSlice";

export default function EditProduct({ prodId }) {
    const [open, setOpen] = useState(false);
    const { items, editStatus } = useSelector((state) => state.products);

    const [currentProd, setCurrentProd] = useState({});
    const [previewImg, setPreviewImg] = useState("");

    const [productImg, setProductImg] = useState("");
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [desc, setDesc] = useState("");

    const dispatch = useDispatch();
    // const navigate = useNavigate()

    const TransformFileData = (file) => {
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setProductImg(reader.result);
                setPreviewImg(reader.result);
            };
        } else {
            setProductImg("");
        }
    };

    const handleProductImageUpload = (e) => {
        const file = e.target.files[0];

        TransformFileData(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        dispatch(
            productsEdit({
                productImg,
                product: {
                    ...currentProd,
                    name: name,
                    category: category,
                    price: price,
                    desc: desc
                }
            })
        );
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
        let selectedProd = items.filter((item) => item._id === prodId)[0];
        setCurrentProd(selectedProd);
        setPreviewImg(selectedProd.image.url);
        setProductImg("");
        setCategory(selectedProd.category);
        setName(selectedProd.name);
        setPrice(selectedProd.price);
        setDesc(selectedProd.desc);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Edit onClick={handleClickOpen}>Edit</Edit>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                fullWidth={true}
                maxWidth={"md"}
            >
                <DialogTitle>Edit Product</DialogTitle>
                <DialogContent className="mb-3">
                    <StyledEditProduct>
                        <StyledForm onSubmit={handleSubmit}>
                            <input
                                id="imgUpload"
                                accept="image/*"
                                type="file"
                                onChange={handleProductImageUpload}
                            />
                            <select
                                onChange={(e) => setCategory(e.target.value)}
                                value={category}
                                required
                            >
                                <option value="">Select Category</option>
                                <option value="burger">Burger</option>
                                <option value="cake">Cake</option>
                                <option value="pizza">Pizza</option>
                                <option value="sandwich">Sandwich</option>
                                <option value="combo">Combo</option>
                                <option value="other">Other</option>
                            </select>
                            <input
                                type="text"
                                placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                                required
                            />
                            <textarea
                                placeholder="Short Description"
                                onChange={(e) => setDesc(e.target.value)}
                                rows={4}
                                value={desc}
                                required
                            />

                            {/* <PrimaryButton type="submit">
                                {editStatus === "pending"
                                    ? "Updating"
                                    : "Update"}
                            </PrimaryButton> */}
                        </StyledForm>
                        <ImagePreview>
                            {previewImg ? (
                                <>
                                    <img src={previewImg} alt="error!" />
                                </>
                            ) : (
                                <p>
                                    Product image upload preview will appear
                                    here!
                                </p>
                            )}
                        </ImagePreview>
                    </StyledEditProduct>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

const Edit = styled.button`
    // border: none;
    // outline: none;
    // padding: 3px 5px;
    // color: white;
    // border-radius: 3px;
    // cursor: pointer;
    background-color: #4b70e2;
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    max-width: 300px;
    margin-top: 2rem;

    select,
    input {
        padding: 7px;
        min-height: 30px;
        outline: none;
        border-radius: 5px;
        border: 1px solid rgb(182, 182, 182);
        margin: 0.3rem 0;

        &:focus {
            border: 2px solid rgb(0, 208, 255);
        }
    }

    select {
        color: rgb(95, 95, 95);
    }
`;

const StyledEditProduct = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ImagePreview = styled.div`
    margin: 2rem 0 2rem 2rem;
    padding: 2rem;
    border: 1px solid rgb(183, 183, 183);
    max-width: 300px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    color: rgb(78, 78, 78);

    img {
        max-width: 100%;
    }
`;

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
