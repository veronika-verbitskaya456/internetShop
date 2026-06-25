import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './MainSlider.css';

import banner1 from '../../assets/slider1.webp';
import banner2 from '../../assets/slider2.webp';
import banner3 from '../../assets/slider3.webp';
import banner4 from '../../assets/slider4.webp';

const MainSlider = () => {
  const banners = [banner1, banner2, banner3, banner4];

  return (
    <div className="slider-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        className="mySwiper"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="slide-content">
              <img
                src={banner}
                alt={`bannerImage-${index + 1}`}
                loading="lazy"
                className="slide-image"
              />
              <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainSlider;