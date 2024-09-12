"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Loader, Search } from "lucide-react";
import GuideCard from "./guideCard";
import Footer from "../footer/Footer";
import { getUser } from "@/lib/api";

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timerId);
  }, [searchTerm]);
  useEffect(() => {
    if (!debouncedTerm) {
      fetchGuides("");
    } else {
      fetchGuides(debouncedTerm);
    }
  }, [debouncedTerm]);

  const fetchGuides = async (term: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/search?search=${term}`)
        .then((res) => res.json())
        .then((data) => setGuides(data.guides));
    } catch (error) {
      console.error("Error fetching guides:", error);
    } finally {
      setLoading(false);
    }
  };
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
    };
    fetchUser();
  }, []);
  return (
    <>
      <section className="flex justify-between items-center ">
        <h1 className="text-6xl font-medium xl:w-[50%] font-clash">
          <span className="text-primary block">Find a local</span>
          to show you around
        </h1>
        <div className="flex gap-2 h-[70px] flex-1">
          <input
            className="w-full bg-primary/[0.07] border-none rounded-[12px] pl-6 focus:ring-0 focus:outline-none"
            type="text"
            placeholder="Search by name, location or language"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="h-full w-[70px] rounded-[12px] bg-primary/20">
            <Search width={28} height={28} color="white" />
          </Button>
        </div>
      </section>

      <section className="flex  flex-wrap justify-between gap-10 mt-20">
        {loading && (
          <div className="w-full flex justify-center">
            <Loader className="animate-spin" size={100} />
          </div>
        )}
        {guides.map((guide: any) => (
          <GuideCard key={guide.id} data={guide} user={user} />
        ))}
      </section>
      <Footer />
    </>
  );
};

export default HomePage;
