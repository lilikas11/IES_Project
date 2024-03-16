import React, { useEffect, useState, useRef } from "react";
const CarouselComponent = () => {
  const [eventData, setEventData] = useState(null);
  const carouselRef = useRef(null);
  const autoPlayInterval = 3000; // Tempo em milissegundos para mudar de slide
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 1; // Total de slides no carrossel

  const goToPreviousSlide = () => {
    const previousSlide =
      currentSlide - 1 < 0 ? totalSlides - 1 : currentSlide - 1;
    setCurrentSlide(previousSlide);
    carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth;
  };

  const goToNextSlide = () => {
    const nextSlide = currentSlide + 1 >= totalSlides ? 0 : currentSlide + 1;
    setCurrentSlide(nextSlide);
    carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
  };

  async function fetchData() {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL+"/events/3");
      const data = await response.json();
      setEventData(data); // Armazena o objeto de evento completo
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
      }
    }, autoPlayInterval);

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const carouselPosition = carouselRef.current.getBoundingClientRect().top;

      console.log("Posição de rolagem:", scrollPosition);
      console.log("Posição do carrossel:", carouselPosition);

      if (scrollPosition > carouselPosition) {
        console.log("Chamando handleNext devido à rolagem");
        handleNext();
      } else {
        console.log("Chamando handlePrev devido à rolagem");      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(interval);
    };
  }, [currentSlide]);

  if (!eventData) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div className="text-primary font-poppins font-bold text-4xl text-shadow m-2">Os teus filtros favoritos...</div>
      <div className="bg-primary rounded-box relative">
        <div
          className="carousel m-6 carousel-center w-[calc(100%-3rem)] space-x-4 h-[34rem]"
          ref={carouselRef}
        >
          {/* Renderiza a imagem do evento */}
          <div className="group carousel-item w-96 relative">
            <img
              src={eventData.poster}
              alt={eventData.name}
              className="transition duration-300 ease-in-out group-hover:blur"
            />
            <div className="absolute inset-0 flex flex-col p-8 text-center justify-center items-center bg-black bg-opacity-50 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
              <h1 className="text-white text-xl">{eventData.name}</h1>
              <br></br>
              {/* <p className="text-white text-base">{eventData.description}</p> */}
              <h2 className="text-white text-l">
                {"Organizadora: "}
                {eventData.company.name}
              </h2>
              <h2 className="text-white text-l">
                {"Data: "}
                {eventData.datestart}
              </h2>
              <h2 className="text-white text-l">
                {"Local: "}
                {eventData.location}
              </h2>
            </div>
          </div>
          <div className="group carousel-item w-96 relative">
            <img
              src={eventData.poster}
              alt={eventData.name}
              className="transition duration-300 ease-in-out group-hover:blur"
            />
            <div className="absolute inset-0 flex flex-col p-8 text-center justify-center items-center bg-black bg-opacity-50 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
              <h1 className="text-white text-xl">{eventData.name}</h1>
              <br></br>
              {/* <p className="text-white text-base">{eventData.description}</p> */}
              <h2 className="text-white text-l">
                {"Organizadora: "}
                {eventData.company.name}
              </h2>
              <h2 className="text-white text-l">
                {"Data: "}
                {eventData.datestart}
              </h2>
              <h2 className="text-white text-l">
                {"Local: "}
                {eventData.location}
              </h2>
            </div>
          </div>
          <div className="group carousel-item w-96 relative">
            <img
              src={eventData.poster}
              alt={eventData.name}
              className="transition duration-300 ease-in-out group-hover:blur"
            />
            <div className="absolute inset-0 flex flex-col p-8 text-center justify-center items-center bg-black bg-opacity-50 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
              <h1 className="text-white text-xl">{eventData.name}</h1>
              <br></br>
              {/* <p className="text-white text-base">{eventData.description}</p> */}
              <h2 className="text-white text-l">
                {"Organizadora: "}
                {eventData.company.name}
              </h2>
              <h2 className="text-white text-l">
                {"Data: "}
                {eventData.datestart}
              </h2>
              <h2 className="text-white text-l">
                {"Local: "}
                {eventData.location}
              </h2>
            </div>
          </div>
          <div className="group carousel-item w-96 relative">
            <img
              src={eventData.poster}
              alt={eventData.name}
              className="transition duration-300 ease-in-out group-hover:blur"
            />
            <div className="absolute inset-0 flex flex-col p-8 text-center justify-center items-center bg-black bg-opacity-50 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
              <h1 className="text-white text-xl">{eventData.name}</h1>
              <br></br>
              {/* <p className="text-white text-base">{eventData.description}</p> */}
              <h2 className="text-white text-l">
                {"Organizadora: "}
                {eventData.company.name}
              </h2>
              <h2 className="text-white text-l">
                {"Data: "}
                {eventData.datestart}
              </h2>
              <h2 className="text-white text-l">
                {"Local: "}
                {eventData.location}
              </h2>
            </div>
          </div>

          {/* Botoes */}
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a className="btn btn-primary" onClick={goToPreviousSlide}>
              {"❮"}
            </a>
            <a className="btn btn-primary" onClick={goToNextSlide}>
              {"❯"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselComponent;
