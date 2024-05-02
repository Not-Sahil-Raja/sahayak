"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";

const OrderCard = ({ order, setOrderRefresh }) => {
  const [orderItem, setOrderItem] = useState(order);

  const deleteOrder = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_Link}/orders/${order.orderId}`)
      .then((res) => {
        console.log(res);
        setOrderRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let date = order.createdOn.split("T")[0];

  const updateOrderItem = () => {
    axios
      .put(`${process.env.NEXT_PUBLIC_Link}/orders/${order.orderId}`, orderItem)
      .then((res) => {
        setOrderRefresh(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(order);
  return (
    <>
      <Card className="flex-row flex w-full">
        <div
          className=" px-4 py-2 rounded-md flex-1 flex flex-col"
          style={{ flex: ".75" }}
        >
          <CardHeader>
            <CardTitle>Order Date: {date}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className=" text-base flex-col flex">
              <span>Order Total Amount: {order.totalAmount}</span>
              <span>User City: {order.userAddress.City}</span>
              <span>User Country: {order.userAddress.Country}</span>
              <span>User Zipcode: {order.userAddress.ZipCode}</span>
            </CardDescription>
          </CardContent>
          <CardFooter className="flex  gap-4" style={{ marginTop: "auto" }}>
            <Dialog>
              <DialogTrigger asChild>
                <div className="bg-yellow-300 text-sm text-[#292828] dark:text-[black] font-medium shadow-inner px-4 py-2 rounded-md cursor-pointer">
                  Edit Order
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit Order</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-2 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="userCity" className="text-right">
                      User City
                    </Label>
                    <Input
                      id="userCity"
                      value={orderItem.userAddress.City}
                      className="col-span-3 w-fit"
                      onChange={(e) => {
                        setOrderItem({
                          ...orderItem,
                          userAddress: {
                            ...orderItem.userAddress,
                            City: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="userCountry"
                      className="text-right whitespace-nowrap"
                    >
                      User Country
                    </Label>
                    <Input
                      id="userCountry"
                      value={orderItem.userAddress.Country}
                      className="col-span-3 w-fit"
                      onChange={(e) => {
                        setOrderItem({
                          ...orderItem,
                          userAddress: {
                            ...orderItem.userAddress,
                            Country: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label
                      htmlFor="userZipCode"
                      className="text-right whitespace-nowrap"
                    >
                      User ZipCode
                    </Label>
                    <Input
                      id="userZipCode"
                      value={orderItem.userAddress.ZipCode}
                      className="col-span-3 w-fit"
                      onChange={(e) => {
                        setOrderItem({
                          ...orderItem,
                          userAddress: {
                            ...orderItem.userAddress,
                            ZipCode: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={updateOrderItem}>
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger>
                <div
                  className=" text-sm font-medium shadow-inner px-4 py-2 rounded-md"
                  style={{ backgroundColor: "#f87171", color: "white" }}
                >
                  Delete Order
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the order.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    style={{ backgroundColor: "#f87171" }}
                    onClick={deleteOrder}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </div>
        <div
          className="bg-blue-50 w-[5rem] text-white px-4 py-2 rounded-md flex-1 flex flex-col"
          style={{ flex: "1" }}
        >
          <Table>
            <TableCaption>A list of all products.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Product Id</TableHead>

                <TableHead>Product Quanity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody
              className="divide-y divide-gray-200 "
              style={{ overflowY: "scroll", color: "black" }}
            >
              {order.items.map((products) => (
                <TableRow key={products.productId} className="dark:text-white">
                  <TableCell className="font-medium">
                    {products.productId}
                  </TableCell>

                  <TableCell>{products.boughtQuantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* <div className="bg-blue-500 w-[5rem] text-white px-4 py-2 rounded-md flex-1 flex flex-col">
          {order.items.map((products) => (
            <div key={products.productId} className="flex gap-2 w-fit flex-col">
              <p>{products.productId}</p>
              <p>{products.amount}</p>
              <p>{products.boughtQuantity}</p>
            </div>
          ))}
        </div> */}
      </Card>
    </>
  );
};

export default OrderCard;
