import GuideCard from "@/components/home/guideCard";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function Home() {
  const guides = [
    {
      id: 1,
      name: "Shipra Rahman",
      image:
        "https://plus.unsplash.com/premium_photo-1661508557554-e3d96f2fdde5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      age: 25,
      location: "Dhaka, Bangladesh",
      description:
        "They there im there for ur best trip ever. I do travel to be there, to know them and to know myself. So be with m",
      price: 50,
    },
    {
      id: 1,
      name: "Shipra Rahman",
      image:
        "https://plus.unsplash.com/premium_photo-1661508557554-e3d96f2fdde5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      age: 25,
      location: "Dhaka, Bangladesh",
      description:
        "They there im there for ur best trip ever. I do travel to be there, to know them and to know myself. So be with m",
      price: 50,
    },
    {
      id: 1,
      name: "Shipra Rahman",
      image:
        "https://plus.unsplash.com/premium_photo-1661508557554-e3d96f2fdde5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      age: 25,
      location: "Dhaka, Bangladesh",
      description:
        "They there im there for ur best trip ever. I do travel to be there, to know them and to know myself. So be with m",
      price: 50,
    },
    {
      id: 1,
      name: "Shipra Rahman",
      image:
        "https://plus.unsplash.com/premium_photo-1661508557554-e3d96f2fdde5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      age: 25,
      location: "Dhaka, Bangladesh",
      description:
        "They there im there for ur best trip ever. I do travel to be there, to know them and to know myself. So be with m",
      price: 50,
    },
    {
      id: 1,
      name: "Shipra Rahman",
      image:
        "https://plus.unsplash.com/premium_photo-1661508557554-e3d96f2fdde5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      age: 25,
      location: "Dhaka, Bangladesh",
      description:
        "They there im there for ur best trip ever. I do travel to be there, to know them and to know myself. So be with m",
      price: 50,
    },
    {
      id: 1,
      name: "Shipra Rahman",
      image:
        "https://plus.unsplash.com/premium_photo-1661508557554-e3d96f2fdde5?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      age: 25,
      location: "Dhaka, Bangladesh",
      description:
        "They there im there for ur best trip ever. I do travel to be there, to know them and to know myself. So be with m",
      price: 50,
    },
  ];
  return (
    <main>
      <section className="flex justify-between items-center mt-20">
        <h1 className="text-6xl font-medium xl:w-[50%] font-clash">
          <span className="text-primary block">Find a local</span>
          to show you around
        </h1>
        <div className="flex gap-2 h-[70px] flex-1">
          <input
            className="w-full bg-primary/[0.07] border-none rounded-[12px] pl-6 focus:ring-0 focus:outline-none"
            type="text"
            placeholder="Search your destination..."
          />
          <Button className="h-full w-[70px] rounded-[12px]">
            <Search width={28} height={28} />
          </Button>
        </div>
      </section>

      <section className="flex  flex-wrap justify-between gap-10 mt-20">
        {guides.map((guide) => (
          <GuideCard key={guide.id} data={guide} />
        ))}
      </section>
    </main>
  );
}
