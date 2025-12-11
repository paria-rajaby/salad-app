import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./Main.css";
import { IoAddOutline } from "react-icons/io5";
import { Navigation } from "swiper/modules";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function Main({ title, desc, items, onAdd }) {
  const showAlert = () => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      text: "The selected salad was successfully added to your basket.",
      icon: "success",
    });
  };
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
            slidesPerView={1}
            loop={true}
            navigation={true}
            centeredSlides={true}
            modules={[Navigation]}
            breakpoints={{
              1024: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 2,
              },
            }}
          >
            {items.map((item) => (
              <SwiperSlide>
                <div className="salad-wrapper">
                  <img className="salad-image" src={item.image} alt="salad" />
                  <div className="salad-infos">
                    <span>{item.name}</span>
                    <p>{item.description}</p>
                  </div>
                  <div className="salad-buy_section">
                    <span>{item.price}$</span>
                    <button
                      onClick={() => {
                        onAdd(item.id);
                        showAlert();
                      }}
                    >
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
