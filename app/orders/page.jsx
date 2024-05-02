"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import OrderCard from "@/Component/OrderCard";
import { get } from "react-hook-form";

const Orders = () => {
  const [amntOrders, setAmntOrders] = useState(0);

  const [orders, setOrders] = useState([]);
  const [orderRefresh, setOrderRefresh] = useState(false);

  const getOrders = async (e) => {
    e.preventDefault();
    if (amntOrders <= 0 || amntOrders > 100) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_Link}/orders/all?limit=${amntOrders}`)
      .then((res) => {
        setOrders(res.data);
        setOrderRefresh(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_Link}/orders/all?limit=10`)
      .then((res) => {
        setOrders(res.data);
        setOrderRefresh(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [orderRefresh]);

  return (
    <>
      <h1 className=" text-xl font-semibold px-7 mt-3">Orders</h1>
      <form
        className=" flex items-center w-1/3 px-6 gap-4 mt-4"
        onSubmit={getOrders}
      >
        <div className=" flex flex-col justify-end">
          <label
            htmlFor="ordersAmnt"
            className="text-sm font-semibold text-gray-600 px-2 dark:text-white"
          >
            Amount of Orders
          </label>
          <div className=" flex gap-3">
            <Input
              placeholder="Amount of orders"
              id="ordersAmnt"
              type="number"
              onChange={(e) => setAmntOrders(e.target.value)}
              value={amntOrders}
            />
            <Button type="submit">Get Orders</Button>
          </div>
          <div
            className={`text-red-500 text-sm py-2 px-1 font-medium ${
              (amntOrders <= 0 || amntOrders > 100) && "block"
            }`}
          >
            {(amntOrders <= 0 && "Minimum order request muust be 1") ||
              (amntOrders > 100 && "Maximum order request must be 100")}{" "}
          </div>
        </div>
      </form>
      <div className=" flex flex-col p-2 px-5 justify-center gap-3">
        {orders.map((order) => (
          <OrderCard
            key={order.orderId}
            order={order}
            setOrderRefresh={setOrderRefresh}
          />
        ))}
      </div>
    </>
  );
};

export default Orders;
