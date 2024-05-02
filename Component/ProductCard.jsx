"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";

const ProductCard = ({
  product,
  setProductUpdated,
  cart,
  setCart,
  setMultipleDelete,
  MultipleDelete,
}) => {
  const [delTog, setDelTog] = useState(false);

  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    quantity: product.quantity,
    price: product.price,
  });

  const [cartAdded, setCartAdded] = useState(false);

  const handleEditProduct = (e) => {
    e.preventDefault();

    axios
      .put(`${process.env.NEXT_PUBLIC_Link}/products/${product.id}`, {
        name: editedProduct.name,
        quantity: editedProduct.quantity,
        price: editedProduct.price,
      })
      .then((res) => {
        console.log(res.data);
        setProductUpdated(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteProduct = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_Link}/products/${product.id}`)
      .then((res) => {
        console.log(res.data);
        setProductUpdated(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (cart.length == 0) setCartAdded(false);
  }, [cart]);

  useEffect(() => {
    if (cartAdded) {
      setCart([
        ...cart,
        { productId: product.id, boughtQuantity: product.quantity },
      ]);
    } else {
      setCart(cart.filter((item) => item.productId !== product.id));
    }
  }, [cartAdded]);

  useEffect(() => {
    if (MultipleDelete.length == 0) setDelTog(false);
  }, [MultipleDelete]);

  return (
    <Card
      key={product.id}
      className=" bg-zinc-50/65  "
      style={{
        opacity: delTog ? "0.75" : "",
      }}
    >
      <CardHeader className="flex-row h-fit w-full items-center gap-3 justify-en">
        {MultipleDelete && (
          <Checkbox
            checked={delTog}
            onClick={() => {
              setDelTog(!delTog);
              if (delTog) {
                setMultipleDelete(
                  MultipleDelete.filter((item) => item !== product.id)
                );
              } else {
                setMultipleDelete([...MultipleDelete, product.id]);
              }
            }}
          />
        )}
        <CardTitle className=" text-lg leading-none mr-3">
          {product.name}
        </CardTitle>

        <Dialog>
          <DialogTrigger>
            <p
              className="w-fit shadow-inner  mb-2 py-1 rounded-xl"
              variant="secondary"
            >
              <EditButton />
            </p>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit product</DialogTitle>
              <DialogDescription>
                Make changes to this product here.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleEditProduct}>
              <div className="grid gap-4 py-4 mb-3">
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Product Name"
                    value={editedProduct.name}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        name: e.target.value,
                      })
                    }
                    type="text"
                  />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Quantity
                  </Label>
                  <Input
                    id="quantity"
                    placeholder="Product Quantity"
                    value={editedProduct.quantity}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        quantity: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Price
                  </Label>
                  <Input
                    id="price"
                    placeholder="Product Price"
                    value={editedProduct.price}
                    onChange={(e) =>
                      setEditedProduct({
                        ...editedProduct,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger>
            <p className="w-fit   mb-2 py-1 rounded-xl" variant="destructive">
              <DeleteButton className="" />
            </p>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                product.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteProduct}
                className="bg-red-500 hover:bg-red-600 text-black"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button
          className="w-fit shadow-inner  mb-2 py-1 rounded-xl flex justify-center items-center gap-2 border px-3 "
          variant="secondary"
          onClick={() => setCartAdded(!cartAdded)}
        >
          {cartAdded ? (
            <>
              <Cart />
              <span>Added</span>
            </>
          ) : (
            <>
              <Cart />
              <span>Add to cart</span>
            </>
          )}
        </Button>
        {/* <Dialog>
          <DialogTrigger></DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add {product.name} to your cart?</DialogTitle>
              <DialogDescription>
                Give Your order a quantity and add it to your cart.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={AddtoOrder}>
              <div className="grid gap-4 py-4 mb-3">
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="City" className="text-right">
                    City
                  </Label>
                  <Input
                    id="City"
                    placeholder="City"
                    value={userDetails.City}
                    onChange={(e) =>
                      setUserDetails({ ...userDetails, City: e.target.value })
                    }
                    type="text"
                  />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="Country" className="text-right">
                    Country
                  </Label>
                  <Input
                    id="Country"
                    placeholder="Country"
                    value={userDetails.Country}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        Country: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor="ZipCode" className="text-right">
                    ZipCode
                  </Label>
                  <Input
                    id="ZipCode"
                    placeholder="ZipCode"
                    value={userDetails.ZipCode}
                    onChange={(e) =>
                      setUserDetails({
                        ...userDetails,
                        ZipCode: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Add to cart</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog> */}
      </CardHeader>
      <CardContent>
        <CardDescription className="leading-none text-gray-800 font-medium flex gap-2 bg-gray-100 w-fit px-3 py-2 rounded">
          <span>Quantity</span>
          <span>{product.quantity}</span>
        </CardDescription>
        <CardDescription className="leading-none text-gray-800 font-medium flex text-md bg-gray-100/30 gap-2 border mt-2 w-fit px-3 py-2 rounded">
          <span>Price</span>
          <span>₹{product.price}</span>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

const EditButton = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-pencil"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5ZM15 5l4 4" />
  </svg>
);

const DeleteButton = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="lucide lucide-trash-2"
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6" />
  </svg>
);

const Cart = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    className="lucide lucide-shopping-cart"
    {...props}
  >
    <circle cx={8} cy={21} r={1} />
    <circle cx={19} cy={21} r={1} />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
);
