import React from "react";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import Image from "next/image";

const GuideCard = ({ data }: any) => {
  const style = {
    width: "100%",
    height: "100%",
  };
  return (
    <Card className="w-[432px] h-[595px] border-none rounded-[10px] bg-primary/[0.07] relative">
      <Image
        src={data.image}
        width={400}
        height={400}
        alt="Image"
        className=" w-full h-[434px] rounded-t-[10px] object-cover"
      />
      <CardContent className="p-3 bg-[#3E2930] rounded-[10px] w-[90%] mx-auto space-y-3 absolute bottom-[3%] left-[4%]">
        <div>
          <h1 className="text-2xl font-extrabold">
            {data.name} <span>({data.age})</span>
          </h1>
          <p className="text-base font-semibold">{data.location}</p>
        </div>
        <p className="font-medium text-sm text-white/60">{data.description}</p>
        <p className="text-2xl font-extrabold">$ {data.price}/day</p>
      </CardContent>
    </Card>
  );
};

export default GuideCard;
