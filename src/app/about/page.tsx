import Image from "next/image";
import React from "react";
import img1 from "@/assets/image1.jpg";
import img2 from "@/assets/image2.jpg";
import img3 from "@/assets/image3.jpg";
import img4 from "@/assets/image4.jpg";
import Footer from "@/components/footer/Footer";
const aboutUsPage = () => {
  return (
    <>
      <div className="space-y-14 mb-20">
        <section>
          <h1 className="text-4xl font-bold font-clash">About Us</h1>
          <div className="text-xl space-y-4 mt-10">
            <p>
              Welcome to RB Guides - your go-to destination for personalized
              travel experiences! At RB Guides, we believe that every journey
              should be unique and memorable. That&apos;s why we connect
              travelers with local guides who are passionate about sharing the
              hidden gems, cultural stories, and unforgettable adventures of
              their regions.
            </p>
            <p>
              Our platform makes it easy for you to find and book guides who
              match your interests and travel style. Whether you&apos;re looking
              for a historical tour of a city, an off-the-beaten-path adventure,
              or an immersive cultural experience, our handpicked guides are
              here to help you explore with confidence and curiosity.
            </p>
            <p>
              With RB Guides, you&apos;re not just seeing the sights -
              you&apos;re experiencing them through the eyes of someone who
              knows them best. Discover the world like never before with RB
              Guides, and make every trip one to remember.
            </p>
            <p>
              Travel deeper, explore smarter, and connect authentically with RB
              Guides{" "}
            </p>
          </div>
        </section>
        <section>
          <h1 className="text-4xl font-bold font-clash mb-10">Our Team</h1>
          <div className="flex justify-center gap-10">
            <div className="w-[200px] h-[280px] relative rounded-[12px]">
              <Image
                src={img1}
                alt="placeholder"
                width={200}
                height={400}
                className="rounded-[12px] object-cover w-[200px] h-[280px]"
              />
              <p className="absolute bottom-0 bg-background/80 w-full text-center  text-xl rounded-b-[12px] p-1">
                <strong>Rafsan Islam</strong>
              </p>
            </div>
            <div className="w-[200px] h-[280px] relative rounded-[12px]">
              <Image
                src={img2}
                alt="placeholder"
                width={200}
                height={400}
                className="rounded-[12px] object-cover w-[200px] h-[280px]"
              />
              <p className="absolute bottom-0 bg-background/80 w-full text-center  text-xl rounded-b-[12px] p-1">
                <strong>Mahin Shakandar</strong>
              </p>
            </div>
            <div className="w-[200px] h-[280px] relative rounded-[12px]">
              <Image
                src={img3}
                alt="placeholder"
                width={200}
                height={400}
                className="rounded-[12px] object-cover w-[200px] h-[280px]"
              />
              <p className="absolute bottom-0 bg-background/80 w-full text-center  text-xl rounded-b-[12px] p-1">
                <strong>Rakib Rahman</strong>
              </p>
            </div>
            <div className="w-[200px] h-[280px] relative rounded-[12px]">
              <Image
                src={img4}
                alt="placeholder"
                width={200}
                height={400}
                className="rounded-[12px] object-cover w-[200px] h-[280px]"
              />
              <p className="absolute bottom-0 bg-background/80 w-full text-center  text-xl rounded-b-[12px] p-1">
                <strong>Tasnim Taher</strong>
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default aboutUsPage;
