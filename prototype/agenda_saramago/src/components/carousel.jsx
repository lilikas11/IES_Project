import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

function CarouselComponent({ data }) {
  const [eventData, setEventData] = useState(null);
  const carouselRefs = useRef({});
  const autoPlayInterval = 3000;
  const [currentSlides, setCurrentSlides] = useState({});
  const totalSlides = 1;

  const goToPreviousSlide = (type) => {
    const currentSlide = currentSlides[type] || 0;
    const previousSlide = currentSlide - 1 < 0 ? totalSlides - 1 : currentSlide - 1;
    setCurrentSlides((prevSlides) => ({ ...prevSlides, [type]: previousSlide }));
    carouselRefs.current[type].scrollLeft -= carouselRefs.current[type].offsetWidth;
  };

  const goToNextSlide = (type) => {
    const currentSlide = currentSlides[type] || 0;
    const nextSlide = currentSlide + 1 >= totalSlides ? 0 : currentSlide + 1;
    setCurrentSlides((prevSlides) => ({ ...prevSlides, [type]: nextSlide }));
    carouselRefs.current[type].scrollLeft += carouselRefs.current[type].offsetWidth;
  };

  async function fetchData(apiEndpoint) {
    try {
      const response = await fetch(apiEndpoint);
      const data = await response.json();
      setEventData(data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  useEffect(() => {
    fetchData(data);

    const interval = setInterval(() => {
      Object.keys(carouselRefs.current).forEach((type) => {
        if (carouselRefs.current[type]) {
          carouselRefs.current[type].scrollLeft += carouselRefs.current[type].offsetWidth;
        }
      });
    }, autoPlayInterval);

    const handleScroll = () => {
      Object.keys(carouselRefs.current).forEach((type) => {
        const scrollPosition = window.scrollY;
        const carouselPosition = carouselRefs.current[type].getBoundingClientRect().top;

        if (scrollPosition > carouselPosition) {
          goToNextSlide(type);
        } else {
          goToPreviousSlide(type);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, [currentSlides]);

  if (!eventData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="carousel-container" class="mt-16 mr-40 mb-16 ml-40 ">
      {Object.keys(eventData).map((type, index) => (
        <div key={index}>
          <div className="text-neutral decoration-solid font-bold text-5xl text-shadow m-2">
            {`Eventos de ${type}...`}
          </div>
          <div className="rounded-box relative">
            <div
              className="carousel m-4 carousel-center w-[calc(100%-2rem)] space-x-4 h-[34rem]"
              ref={(el) => (carouselRefs.current[type] = el)}
            >
              {Array.isArray(eventData[type])
                ? eventData[type].map((event, eventIndex) => (
                    <Link to={`/event_page/${event.id}`}>
                    <div className="group carousel-item w-96 relative">
                          <img
                            src={event.poster}
                            alt={event.name}
                            className="transition duration-300 ease-in-out group-hover:blur"
                          />
                      <div className="absolute inset-0 flex flex-col p-8 text-center justify-center items-center bg-black bg-opacity-50 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
                        <h1 className="text-white text-xl">{event.name}</h1>
                        <h2 className="text-white text-l">
                          {"Organizadora: "}
                          {event.company}
                        </h2>
                        <h2 className="text-white text-l">
                          {"Data: "}
                          {event.datestart}
                        </h2>
                        <h2 className="text-white text-l">
                          {"Local: "}
                          {event.location}
                        </h2>
                      </div>
                    </div>
                    </Link>
                  ))
                : null}
              {/* Botoes */}
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
              <a className="btn btn-primary" onClick={() => goToPreviousSlide(type)}>
                {"❮"}
              </a>
              <a className="btn btn-primary" onClick={() => goToNextSlide(type)}>
                {"❯"}
              </a>
            </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CarouselComponent;
