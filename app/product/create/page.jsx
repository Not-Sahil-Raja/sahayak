"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [alert, setAlert] = useState(false);

  const CreateProduct = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.NEXT_PUBLIC_Link}/products/create`, {
        name,
        quantity,
        price,
      })
      .then((res) => {
        console.log(res.data);
        setName("");
        setQuantity(0);
        setPrice(0);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <div className="px-3 py-2 mt-4">
      <Alert
        className={`w-fit bg-green-200 absolute bottom-5 transition-all ${
          alert ? "left-5" : "-left-96"
        }`}
      >
        <AlertTitle>Successfully Added</AlertTitle>
        <AlertDescription>
          Product has been successfully added.
        </AlertDescription>
      </Alert>

      <h1 className="font-semibold mb-4 flex mx-4 text-xl gap-4 pb-2  items-center border-b select-none">
        Create A New Product
      </h1>
      <div className=" w-1/3  mx-4">
        <form className="flex flex-col gap-4" onSubmit={CreateProduct}>
          <div className=" flex flex-col">
            <label className=" text-sm font-medium mb-1" htmlFor="name">
              Product Name
            </label>
            <Input
              placeholder="Product Name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className=" flex flex-col">
            <label className=" text-sm font-medium mb-1" htmlFor="quantity">
              Product Quantity
            </label>
            <Input
              placeholder="Product Quantity"
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className=" flex flex-col">
            <label className=" text-sm font-medium mb-1" htmlFor="price">
              Product Price
            </label>
            <Input
              placeholder="Product Price"
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <Button
            type="submit"
            className="rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 transition duration-300 ease-in-out"
          >
            Create Product
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
