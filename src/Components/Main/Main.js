import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./Main.css";
import { IoAddOutline } from "react-icons/io5";

import { Navigation } from "swiper/modules";

export default function Main({ title, desc, items }) {
  return (
    <div className="main">
      <div className="main-info">
        <h2 className="main-info_title">{title}</h2>
        <p className="main-info_desc">{desc}</p>
      </div>
      <div className="main-products">
        {items.length > 0 && (
          <Swiper
            className="swiper"
            spaceBetween={20}
            slidesPerView={3}
            loop={true}
            navigation={true}
            centeredSlides={true}
            modules={[Navigation]}
          >
            {items.map((item) => (
              <SwiperSlide>
                <div className="salad-wrapper">
                  <img className="salad-image" src={item.image} alt="" />
                  <div className="salad-infos">
                    <span>{item.name}</span>
                    <p>{item.description}</p>
                  </div>
                  <div className="salad-buy_section">
                    <span>{item.price}</span>
                    <button>
                      <IoAddOutline />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
}
