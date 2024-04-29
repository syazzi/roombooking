"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function slider({buildings}) {  
  return (
    <div className="relative bg-gray-500 z-10">
      <div className="text-center py-10 text-black text-5xl">
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
        {buildings?.map((building) => (
          <SwiperSlide key={building.id}>
            <div className="slider-bg mx-4 mb-2">
              <div>
                <Image src={building.image} width={300} height={200} quality={100} alt={building.name}/>
              </div>
              <div className="py-2 text-center text-black"><p>{building.name}</p></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

