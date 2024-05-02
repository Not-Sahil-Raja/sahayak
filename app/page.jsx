import { ModeToggle } from "@/Component/Mode";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className=" h-screen w-full">
      <h1 className="text-4xl font-bold px-[5vw] pt-[10vh] text-white mb-[5vh]  flex items-end">
        <span className=" mr-auto dark:text-white text-slate-800 ">Home</span>{" "}
        <ModeToggle />
      </h1>
      <div className="   mx-[5vw] flex">
        <div className="w-1/2 h-[40vh]  flex flex-col items-center justify-center">
          <p className="dark:text-white text-slate-800  text-lg text-center font-medium opacity-75 ">
            Go to the products page by clicking on the link
          </p>
          <Link
            href="/product"
            className="bg-lime-700 text-white px-4 py-2 rounded-md mt-4 shadow-inner flex items-center justify-center gap-4 font-medium"
          >
            Product <ArrowRight size={24} />
          </Link>
        </div>
        <div className="w-1/2 h-[40vh]  flex flex-col items-center justify-center">
          <p className="dark:text-white text-slate-800  text-lg text-center font-medium opacity-75 ">
            Go to the orders page by clicking on the link
          </p>
          <Link
            href="/orders"
            className="bg-lime-700 text-white px-4 py-2 rounded-md mt-4 shadow-inner flex items-center justify-center gap-4 font-medium"
          >
            Orders <ArrowRight size={24} />
          </Link>
        </div>
      </div>
    </div>
  );
}
