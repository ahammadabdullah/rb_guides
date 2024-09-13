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
import {
  Dialog,
  DialogClose,
  DialogFooter,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { cancelBooking, confirmTicket } from "@/lib/api";
import { useState } from "react";
import { LoaderPinwheel } from "lucide-react";

const Headers = ["ID", "UserId", "Name", "Title", "Date", "Status", "Action"];
const info = {
  id: 1,
  userId: 3,
  name: "John Doe",
  title: "Support",
  message: "I need help",
  date: "2022-02-02",
  status: "Pending",
};
const SupportMessages = ({ guides: tickets }: { guides: any }) => {
  const [open, setOpen] = useState(false);
  const [ticket, setTicket] = useState<any>(info);
  const [loading, setLoading] = useState(false);

  const handleModal = (info: any) => {
    setTicket(info);
    setOpen(true);
  };
  const handleConfirmTicket = async (id: number) => {
    setLoading(true);
    const res = await confirmTicket(id);
    if (res.success === "true") {
      toast({
        variant: "success",
        title: "Hurray!",
        description: "Ticket Confirmed successfully",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Oops!",
        description: "Something went wrong, please try again",
      });
    }
    setLoading(false);
    setOpen(false);
  };
  console.log(tickets);
  return (
    <div>
      <Dialog open={open} onOpenChange={() => setOpen(!open)}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-md border-none !rounded-[12px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              {ticket?.name} ({ticket?.userId})
            </DialogTitle>
            <DialogDescription className="space-y-4">
              <div>
                <h3 className="text-xl">Title: {ticket?.title}</h3>
                <p className="text-lg">Message: {ticket?.message}</p>
              </div>

              <div>
                <h3 className="text-lg">Date: {ticket?.date}</h3>
                <h3 className="text-lg">Status: {ticket?.status}</h3>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-3">
            <Button
              type="button"
              disabled={loading || ticket?.status === "confirmed"}
              onClick={() => handleConfirmTicket(ticket?.id)}
              className="rounded-[12px]"
            >
              {loading ? (
                <LoaderPinwheel className="animate-spin" />
              ) : ticket?.status === "confirmed" ? (
                "Confirmed"
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
          {tickets?.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No Tickets Found
              </TableCell>
            </TableRow>
          )}
          {tickets?.map((tkt: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="text-center">{tkt.id}</TableCell>
              <TableCell className="text-center">{tkt.userId}</TableCell>
              <TableCell className="text-center">{tkt.name}</TableCell>
              <TableCell className="text-center">{tkt.title}</TableCell>
              <TableCell className="text-center">
                {new Date(tkt?.createdAt).toLocaleDateString("en-US")}
              </TableCell>
              <TableCell className="text-center">{tkt.status}</TableCell>
              <TableCell className="text-center">
                <Button
                  onClick={() => handleModal(tkt)}
                  className="rounded-[8px]"
                >
                  View More
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SupportMessages;
