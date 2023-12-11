"use client";
import React from "react";
import { Carousel } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import FOS from "../images/FOS.jpg";

export default function slider() {
  return (
    <div className="relative bg-gray-500 z-10">
      <div className="text-center py-10 text-black">
        <h2 className="">Buildings</h2>
      </div>
      <Swiper
        slidesPerView={3}
        loop="true"
        speed={800}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
        }}
      >
        {data.map((d) => (
          <SwiperSlide key={d.name}>
            <div  className="slider-bg mx-4 mb-2">
              <div>
                <Image src={FOS} quality={100} alt="{d.name}"/>
              </div>
              <div className="py-2 text-center text-black"><p>{d.name}</p></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const data = [
  {
    name: `FOS`,
    img: `./FOS.JPG`,
  },
  {
    name: `FASS`,
    img: `./FOS.JPG`,
  },
  {
    name: `FIT`,
    img: `./FOS.JPG`,
  },
  {
    name: `SBE`,
    img: `./FOS.JPG`,
  },
  {
    name: `SDS`,
    img: `./FOS.JPG`,
  },
];
