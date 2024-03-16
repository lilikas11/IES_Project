import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { XMarkIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { Transition, Dialog } from '@headlessui/react';
import { SearchBar } from '../components/SearchBar.jsx';
import { useLocation } from 'react-router-dom';
import Card from '../components/ticket_cards';

function EventSearchPage() {
    const [open, setOpen] = useState(false);
    const [tagData, setTagData] = useState([]);
    const [selectedFilters, setSelectedFilters] = useState([]);
    
    const location = useLocation();

    const tags = 
    [
        {
            tag_id: 1,
            tag_name: "Dança"
        },
        {
            tag_id: 2,
            tag_name: "Teatro"
        },
        {
            tag_id: 3,
            tag_name: "Música"
        },
        {
            tag_id: 4,
            tag_name: "Leitura e Literatura"
        },
        {
            tag_id: 5,
            tag_name: "Artes Visuais"
        },
        {
            tag_id: 6,
            tag_name: "Cinema e Vídeo"
        },
        {
            tag_id: 7,
            tag_name: "Gastronomia"
        },
        {
            tag_id: 8,
            tag_name: "Carreira e Desenvolvimento Profissional"
        },
        {
            tag_id: 9,
            tag_name: "Educação e Aprendizagem"
        },
        {
            tag_id: 10,
            tag_name: "Cultura e Lazer"
        },
    ];

    const handleTagClick = (tagName) => {
        // Mantenha a consistência com o nome usado no estado
        setSelectedFilters((prevFilters) => {
          if (prevFilters.includes(tagName)) {
            return prevFilters.filter((filter) => filter !== tagName);
          } else {
            return [...prevFilters, tagName];
          }
        });
      };
    
      useEffect(() => {
        const urlSearchParams = new URLSearchParams(location.search);
        const tagParam = urlSearchParams.get('tag');

        if (tagParam) {
            setSelectedFilters([tagParam]);
        }
        const fetchData = async () => {
            try {
                console.log("Fetching data...");
                console.log(selectedFilters);
          
                const filtros = selectedFilters;
                console.log(filtros);
          
                if (filtros.length > 0) {
                  let combinedData = []; // Array para armazenar os resultados combinados
          
                  for (let i = 0; i < selectedFilters.length; i++) {
                    console.log(selectedFilters[i]);
                    const response = await axios.get(import.meta.env.VITE_API_URL+`/events/tag/${selectedFilters[i]}`);
                    combinedData = [...combinedData, ...response.data]; // Adiciona os resultados ao array
                  }
          
                  setTagData(combinedData); // Define os resultados combinados uma vez fora do loop
                }
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            };          
    
        fetchData();
      }, [selectedFilters, location.search]);


    return (
        <div>

            <div className="filter-panel">
                <button className="filter-button" onClick={() => setOpen(true)}>
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                </button>

                <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-800 sm:duration-700"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-500 sm:duration-700"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-in-out duration-500"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="absolute right-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                                <button
                                    type="button"
                                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                    onClick={() => setOpen(false)}
                                >
                                    <span className="absolute -inset-2.5" />
                                    <span className="sr-only">Close panel</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                                </div>
                            </Transition.Child>
                            <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                                <div className="px-4 sm:px-6">
                                <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                                    Filtra a tua pesquisa:
                                </Dialog.Title>
                                </div>
                                <div className="relative mt-6 flex-1 px-20 sm:px-6">
                                    
                                    <div>
                                    {tags.map(tag => (
                                    <button
                                        key={tag.tag_id}
                                        className={`rounded-full font-poppins px-6 py-4 text-l mr-2 mb-2 ${selectedFilters.includes(tag.tag_name) ? 'bg-[#758ca4] text-[#fff6ed]' : 'bg-gray-200 text-black'}`}
                                        onClick={() => handleTagClick(tag.tag_name)}
                                    >
                                        {tag.tag_name}
                                    </button>
                                    ))}
                                    </div>
                                </div>
                            </div>
                            </Dialog.Panel>
                        </Transition.Child>
                        </div>
                    </div>
                    </div>
                </Dialog>
                </Transition.Root>
            </div>
            <div>
                <div className="search-bar-container">
                    <SearchBar/>
                    
                </div>
            </div>

            <div className="p-20 space-y-20">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
            {tagData && Array.isArray(tagData) && tagData.length > 0 ?
                tagData.map((event, index) => (
                <Card
                    key={index}
                    title={event.name}
                    data={event.datestart}
                    hora={event.schedule}
                    city={event.city}
                    location={event.location}
                    price={event.prices} 
                    imageSrc={event.poster}
                />
                )) :
                <p>Nenhum evento encontrado.</p>
            }
                </div>
            </div>
        </div>
    );
}

export default EventSearchPage;
