import React, { useEffect, useState } from 'react';
import axios from "axios";
import CarouselWithContent from '../components/carousel.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChair, faChild, faPerson, faPersonCane, faPlus, faUsers, faGraduationCap, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import ProgressBar from '../components/progress_bar.jsx';
import { Link } from 'react-router-dom';


function event_page() {
    const [isHeartFilled, setIsHeartFilled] = useState(false);

    const handleToggleHeart = () => {
        setIsHeartFilled(!isHeartFilled);
    };
    const { id } = useParams();
    const [eventData, setEventData] = useState(null);
    const [imagePath, setImagePath] = useState();

    function formatarData(dateString) {
        const data = new Date(dateString);
        const dia = data.getDate();
        const mes = data.getMonth() + 1;
        const ano = data.getFullYear();
    
        const diaFormatado = dia < 10 ? `0${dia}` : dia;
        const mesFormatado = mes < 10 ? `0${mes}` : mes;
    
        return `${diaFormatado}/${mesFormatado}/${ano}`;
    }
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(import.meta.env.VITE_API_URL+`/events/${id}`);
            const url = "../../" + response.data.poster 
            setImagePath(url)
            setEventData(response.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, [id]);



      useEffect(() => {
        if (eventData) {
        }
      }, [eventData, id, history]);
    
      if (!eventData) {
        return <div>Loading...</div>;
      }

    const getUserPreferences = async () => {
      try {
        // Recupere o userId do localStorage
        const userId = localStorage.getItem("user_id");

        // Faça uma chamada para o endpoint de preferências do usuário
        const response = await axios.get(import.meta.env.VITE_API_URL+`/user_preferences/${userId}`);

        // Extraia as cidades, tags e empresas da resposta
        const { cities, tags, companies } = response.data;

        // Agora, você pode usar esses valores conforme necessário
        console.log("Cidades:", cities);
        console.log("Tags:", tags);
        console.log("Empresas:", companies);

        // Retorne ou utilize os valores conforme necessário
        return { userId, cities, tags, companies };
      } catch (error) {
        console.error("Erro ao buscar preferências do usuário:", error);
        // Lide com o erro conforme necessário
      }
    };

    const addPref = async (new_company) => {
      try {
        // Obtenha as preferências do usuário
        const { userId, cities, tags, companies } = await getUserPreferences();

         if (companies && companies.includes(new_company)) {
              console.log("A empresa já está nas preferências do usuário. Não é necessário adicionar.");
              return;
            }

        const oldCompanies = companies || "";
        const newCompanies = `${oldCompanies}, ${new_company}`;

        // Faça a chamada para atualizar as preferências do usuário
        const response = await axios.put(
            import.meta.env.VITE_API_URL+`/user_preferences/${userId}/update`,
          { cities, tags, companies: newCompanies }
        );

        console.log("Preferência adicionada com sucesso:", response.data);
      } catch (error) {
        console.error("Erro ao adicionar preferência:", error);
      }
    };

    const buyTicket = async (eventId) => {
        const userId = localStorage.getItem("user_id");
        try {
            const response = await axios.post(
                import.meta.env.VITE_API_URL+`/tickets/buy`,
                { user_id: userId, event_id: eventId }  // Use user_id e event_id conforme definido na sua DTO
            );
            console.log("Ticket comprado com sucesso:", response.data);
        } catch (error) {
            console.error("Erro ao comprar bilhete:", error);
        }
    };
    const pricesArray = eventData.prices.split(',').map((price) => price.trim());

        return ( 
                <div className="p-10 space-y-16">
                    <div className="mt-8 text-[#758ca4] space-y-2">
                        <p className='font-poppins font-bold text-4xl ' style={{ textShadow: '2px 1px 1px rgba(0, 0, 0, 0.5)'}}>{eventData.name}</p> {/* Title */}
                        
                        <p className='font-poppins text-3xl '>{eventData.company}
                            <button className="ml-2" onClick={() => {
                                handleToggleHeart();
                                addPref(eventData.company);
                              }}
                            >
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className={`text-xl ${isHeartFilled ? 'text-red-500' : 'text-gray-500'}`}
                                />
                            </button>
                        </p> {/* Company*/}
                            
                        
                    </div>
                    <div className=' flex space-x-10'>
                            <div className='flex-initial w-1/4'>
                                <div className='relative'>
                                    <img style={{ boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}  src={eventData.poster} alt="Event Poster"></img>{/*Image-> POSTER */}
                                    <div className="absolute top-0 right-0 p-4 flex items-center justify-center">
                                         <button
                                                className="w-10 h-10 rounded-full hover:bg-slate-500 text-white"
                                                onClick={() => buyTicket(eventData.id)}
                                            >
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='w-1/2 flex flex-col'>
                                <div className='flex font-poppins font-bold mb-4'>
                                    <div className='w-1/2 flex flex-row items-center'>
                                        <FontAwesomeIcon icon={faChair}  className="mr-2" />
                                            <div className=" p-2 text-center text-xs font-medium leading-none text-primary-100" style={{ width: '25%' }}>
                                            <ProgressBar bgcolor="#a7c7eb" progress={eventData.seats} height={20} />
                                            </div>
                                    </div>
                                </div>
                                <div className='font-poppins w-full mb-6'> {/* Description*/}
                                    <p className="text-xl">{eventData.description}</p>
                                </div>
                                <div className='mt-8 font-poppins'>
                                    <h2 className='font-bold mb-2'>Filtros:</h2>
                                    <div className=" h-20 w-full p-4 ">
                                        <div className='flex space-x-2'>
                                            {eventData.tags.split(',').map((tag, index) => (
                                                <Link key={index} to={`/event_search_page?tag=${tag.trim()}`}>
                                                    <div className="rounded-full bg-slate-200 bg-opacity-100 p-2">
                                                        <p className="text-black">#{tag.trim()}</p>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='font-poppins space-y-8'>
                                <div className='flex flex-col'>
                                    <h2 className='font-bold text-2xl mb-2'>Preços</h2>
                                    {pricesArray.map((priceItem, index) => {
                                    const [category, value] = priceItem.split(':');
                                    let icon = null;
                                    if (category.toLowerCase() === 'crianças') {
                                        icon = <FontAwesomeIcon icon={faChild} />;
                                    } else if (category.toLowerCase() === 'seniores') {
                                        icon = <FontAwesomeIcon icon={faPersonCane} />;
                                    } else if (category.toLowerCase() === 'adultos') {
                                        icon = <FontAwesomeIcon icon={faPerson} />;
                                    }else if (category.toLowerCase() === 'familia') {
                                        icon = <FontAwesomeIcon icon={faUsers} />;
                                    }else if (category.toLowerCase() === 'estudantes') {
                                        icon = <FontAwesomeIcon icon={faGraduationCap} />;
                                    }
                                    return (
                                        <div key={index} className="flex items-center">
                                            {icon && <div className="mr-2">{icon}</div>}
                                            <h3>{category}:</h3>
                                            <p>{value}€</p>
                                        </div>
                                    );
                                    })}
                                </div>
                                <div className='mt-4 mb-4'>
                                    <h2 className='font-bold text-2xl mt-4 mb-2'>Data</h2>
                                        <p>{formatarData(eventData.datestart)}</p>
                                        <h2 className='font-bold text-2xl mt-6 mb-2'>Horário</h2>
                                        <p>{eventData.schedule}</p>
                                        <h2 className='font-bold text-2xl mt-6 mb-2'>Duração</h2>
                                        <p>{eventData.duration} minutos</p>
                                </div>
                            </div>
                        </div>


                        <div className=' h-auto flex-col-reverse md:flex-row sm:flex-col'>
                            <div className='inline md:w-2/3'>
                                <h1 className='font-poppins font-bold text-[#758ca4] text-3xl mb-8' style={{ textShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)'}}>Eventos Semelhantes</h1>
                                <div className='space-y-16'>
                                    <div className=''>
                                        <div className='ml-6'>  
                                            <h3 className='font-poppins font-semibold text-[#758ca4] text-2xl mb-4'>Para Miúdos sem Graúdos:</h3>
                                            <CarouselWithContent/>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='ml-6'>
                                            <h3 className='font-poppins font-semibold text-[#758ca4] text-2xl mb-4'>Se és Amante do Teatro:</h3>
                                            <CarouselWithContent />
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='ml-6'>
                                            <h3 className='font-poppins font-semibold text-[#758ca4] text-2xl mb-4'>Embarca numa Fantasia:</h3>
                                            <CarouselWithContent/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                                
                        </div>
        
        </div>
    );
    }


export default event_page;