"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { acceptGuide, getAllGuides } from "@/lib/api";
import React, { useEffect, useState } from "react";

const GuideList = ({ guides }: { guides: any }) => {
  const Headers = ["ID", "Name", "Email", "Age", "Price", "Status", "Action"];

  const handleChangeStatus = async (id: number) => {
    const res = await acceptGuide(id);
    if (res.success === "true") {
      toast({
        variant: "success",
        title: "Hurray!",
        description: "Guide Accepted successfully",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Oops!",
        description: "Something went wrong, please try again",
      });
    }
  };
  return (
    <div>
      <Table className="text-xl">
        <TableHeader>
          <TableRow>
            {Headers.map((header, index) => (
              <TableHead className="text-center" key={index}>
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {guides.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No Guides Found
              </TableCell>
            </TableRow>
          )}
          {guides.map((guide: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="text-center">{guide.id}</TableCell>
              <TableCell className="text-center">{guide.name}</TableCell>
              <TableCell className="text-center">{guide.email}</TableCell>
              <TableCell className="text-center">{guide.age}</TableCell>
              <TableCell className="text-center">{guide.price}</TableCell>
              <TableCell className="text-center">{guide.status}</TableCell>
              <TableCell className="text-center">
                {guide.status === "pending" ? (
                  <Button
                    className="rounded-[8px] "
                    onClick={() => handleChangeStatus(guide.id)}
                  >
                    Accept
                  </Button>
                ) : (
                  <Button disabled className="rounded-[8px] ">
                    Already Accepted
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GuideList;
