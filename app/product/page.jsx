"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ProductCard from "@/Component/ProductCard";
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
import { get, set } from "react-hook-form";
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
import Link from "next/link";
import { ModeToggle } from "@/Component/Mode";

const Product = () => {
  const [allProducts, setAllProducts] = useState([]);

  const [productAmnt, setProductAmnt] = useState(0);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [productLimitAdded, setProductLimitAdded] = useState(false);
  const [priceLimitAdded, setPriceLimitAdded] = useState(false);

  const [productUpdated, setProductUpdated] = useState(false);

  const [MultipleDelete, setMultipleDelete] = useState([]);

  const multiDel = () => {
    for (let i = 0; i < MultipleDelete.length; i++) {
      axios
        .delete(`${process.env.NEXT_PUBLIC_Link}/products/${MultipleDelete[i]}`)
        .then((res) => {
          console.log(res.data);
          setProductUpdated(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
    setMultipleDelete([]);
  };

  const [cart, setCart] = useState([]);

  const [userDetails, setUserDetails] = useState({
    City: "",
    Country: "",
    ZipCode: "",
  });

  useEffect(() => {
    if (minPrice > maxPrice) {
      setMaxPrice(minPrice);
    }
  }, [minPrice]);

  useEffect(() => {
    if (productUpdated) {
      GetAllProducts();
      setProductUpdated(false);
    }
  }, [productUpdated]);

  const GetAllProducts = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_Link}/products/all?limit=100`)
      .then((res) => {
        setAllProducts(res.data.data);
        setProductLimitAdded(false);
        setPriceLimitAdded(false);
        setProductAmnt(0);
        setMinPrice(0);
        setMaxPrice(0);
      });
  };
  useEffect(() => {
    GetAllProducts();
  }, []);

  const AllProducts = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_Link}/products/all?${
          (productLimitAdded ? `limit=${productAmnt}` : "limit=100") +
          (priceLimitAdded
            ? `&min_price=${minPrice}&max_price=${maxPrice}`
            : "")
        }`
      )
      .then((res) => {
        setAllProducts(res.data.data);
        setProductLimitAdded(false);
        setPriceLimitAdded(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const SortProducts = () => {
    const sortedProducts = [...allProducts].sort((a, b) => a.price - b.price);
    setAllProducts(sortedProducts);
  };

  const AddtoOrder = (e) => {
    e.preventDefault();
    console.log({
      products: cart,
      userAddress: userDetails,
    });
    axios
      .post(`${process.env.NEXT_PUBLIC_Link}/orders/create`, {
        items: cart,
        userAddress: userDetails,
      })
      .then((res) => {
        console.log(res.data);
        setCart([]);
        setUserDetails({
          City: "",
          Country: "",
          ZipCode: "",
        });
      });
  };

  return (
    <>
      <div className=" flex flex-col">
        <div className=" px-3 py-2 mt-4">
          <ModeToggle />
          <div className=" font-semibold text-lg ml-auto mr-5  w-fit flex gap-3 items-center">
            {cart.length == 0 && (
              <p className=" text-sm text-zinc-400   px-1 pt-2 ">
                Add Something to the Cart !
              </p>
            )}
            <Dialog>
              <DialogTrigger
                className="rounded-lg border hover:bg-slate-100  active:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-600
                text-[#272626] px-4 py-2 transition duration-300 ease-in-out text-sm shadow-inner cursor-pointer dark:text-white dark:hover:bg-slate-500"
                disabled={cart.length === 0}
              >
                <p>
                  Order {cart.length > 0 && "(" + cart.length + ")"}{" "}
                  {cart.length > 1 ? "Products" : "Product"}
                </p>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Fill Up The Details</DialogTitle>
                  <DialogDescription>
                    Give Your order a quantity and add it to your cart.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={AddtoOrder}>
                  <div className="grid gap-4 py-4 mb-3">
                    <div className="flex flex-col items-start gap-1">
                      <Label htmlFor="City" className=" px-1 text-gray-700">
                        City
                      </Label>
                      <Input
                        id="City"
                        placeholder="City"
                        value={userDetails.City}
                        onChange={(e) =>
                          setUserDetails({
                            ...userDetails,
                            City: e.target.value,
                          })
                        }
                        type="text"
                        required
                      />
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <Label htmlFor="Country" className="px-1 text-gray-700">
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
                        type="text"
                        required
                      />
                    </div>
                    <div className="flex flex-col items-start gap-1">
                      <Label htmlFor="ZipCode" className="px-1 text-gray-700">
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
                        type="number"
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter className=" items-center">
                    <p className=" mr-auto pl-2 font-medium">
                      Total Products {cart.length}
                    </p>
                    <Button
                      type="submit"
                      className="rounded-lg bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition duration-300 ease-in-out"
                    >
                      Order Now
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>

            <Link
              href="/orders"
              className="rounded-lg border hover:bg-zinc-200  active:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-600
                 text-[#272626] px-4 py-2 transition duration-300 ease-in-out text-sm shadow-inner cursor-pointer dark:text-white dark:hover:bg-slate-500"
              disabled={cart.length === 0}
            >
              <p>Update Orders </p>
            </Link>

            <AlertDialog>
              <AlertDialogTrigger className="rounded-lg  bg-zinc-100 border text-black hover:bg-zinc-300  px-4 py-2 active:bg-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-600 focus:ring-opacity-50 transition duration-300 ease-in-out text-sm">
                <p>Empty Cart</p>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. this will empty your cart.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-500 hover:bg-red-600 text-white"
                    onClick={() => {
                      setCart([]);
                    }}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
          <div className=" font-semibold mb-4 flex mx-4 text-xl gap-4 pb-2 mt-2 items-center border-b select-none">
            All Products{" "}
            <div className="flex gap-4 ml-10 items-center">
              <Button
                variant=""
                onClick={AllProducts}
                className="rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 transition duration-300 ease-in-out"
              >
                Get Products
              </Button>{" "}
              <Button
                variant=""
                onClick={SortProducts}
                className="rounded-lg bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 active:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 transition duration-300 ease-in-out"
              >
                Sort Based On Price
              </Button>
              <Button onClick={GetAllProducts}>Refresh</Button>
              <AlertDialog>
                <AlertDialogTrigger
                  className="rounded-lg  bg-red-500 border  hover:bg-red-400  px-4 py-2 active:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 transition duration-300 ease-in-out text-sm text-white cursor-pointer"
                  disabled={MultipleDelete.length === 0}
                >
                  <p>Delete Multiple</p>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. this will delete all the
                      {" ("}
                      {MultipleDelete.length}
                      {")"} selected products.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-500 hover:bg-red-600 text-white"
                      onClick={multiDel}
                    >
                      Delete All {MultipleDelete.length}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <p className=" text-sm text-red-500  px-3 py-2 rounded">
                {MultipleDelete.length > 0 &&
                  "Total Items Selected: " + MultipleDelete.length}
              </p>
            </div>
          </div>
          <h1 className=" font-semibold text-lg ml-4  w-fit ">Filters</h1>
          <div className=" font-semibold  flex mx-4 gap-6 pb-2  items-end  select-none">
            <div className=" flex items-center whitespace-nowrap gap-2">
              <label
                htmlFor="product_amount"
                className=" text-sm text-zinc-700 dark:text-white"
              >
                Limits Products
              </label>
              <Input
                id="product_amount"
                placeholder="Enter Product Amount"
                onChange={(e) => setProductAmnt(e.target.value)}
                value={productAmnt}
                type="number"
              />
              <Button
                onClick={() => setProductLimitAdded(!productLimitAdded)}
                className="rounded-lg bg-green-500 hover:bg-green-600 text-white px-4 py-1 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition duration-300 ease-in-out"
              >
                {productLimitAdded ? "Remove" : "Apply"}
              </Button>
            </div>
          </div>
          <div className=" font-semibold mb-2 flex mx-4  gap-6 pb-2  items-end border-b select-none">
            <div className=" flex items-center gap-2">
              <label
                htmlFor="min_price"
                className=" whitespace-nowrap text-sm text-zinc-700 dark:text-white"
              >
                Min Price
              </label>
              <Input
                id="min_price"
                placeholder="Enter Min Price"
                onChange={(e) => setMinPrice(e.target.value)}
                value={minPrice}
                type="number"
              />
            </div>
            <div className=" flex items-center gap-2">
              <label
                htmlFor="max_price"
                className=" whitespace-nowrap text-sm text-zinc-700 dark:text-white"
              >
                Max Price
              </label>
              <Input
                id="max_price"
                placeholder="Enter Max Price"
                onChange={(e) => setMaxPrice(e.target.value)}
                value={maxPrice}
                type="number"
              />
            </div>
            <Button
              onClick={() => setPriceLimitAdded(!priceLimitAdded)}
              className="rounded-lg bg-green-500 hover:bg-green-600 text-white px-4 py-1 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 transition duration-300 ease-in-out"
            >
              {priceLimitAdded ? "Remove" : "Apply"}
            </Button>
          </div>
          <div className="grid grid-flow-row gap-3 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 px-3 mb-10">
            {allProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                setProductUpdated={setProductUpdated}
                setCart={setCart}
                cart={cart}
                setMultipleDelete={setMultipleDelete}
                MultipleDelete={MultipleDelete}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
