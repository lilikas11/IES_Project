import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ticket_cards';
import mercado from '../assets/images/mercado.jpg';
import corrida from '../assets/images/corrida.jpg';
import festival from '../assets/images/festival.png';
import carro from '../assets/images/carro.jpg';
import junina from '../assets/images/junina.png';
import yoga from '../assets/images/yoga.jpg';
import ai from '../assets/images/ai.jpg';

function Favourites() {
    const likedevents = [
        { title: 'Mercado de Agricultores', content: 'Um evento que transforma as ruas da cidade em galerias de arte ao ar livre, apresentando murais, esculturas e performances artísticas.', imageSrc: mercado },
        { title: 'Corrida de Rua Beneficente', content: 'Uma corrida ou caminhada que arrecada fundos para uma causa específica, incentivando a atividade física e o envolvimento comunitário.', imageSrc: corrida },
        { title: 'Feira Gastronómica', content: 'Um festival de sabores que destaca a culinária local e internacional, oferecendo uma variedade de pratos, alimentos gourmet e experiências culinárias únicas.', imageSrc: festival },
        { title: 'Exposição de Carros Antigos', content: 'Um evento que exibe carros clássicos e antigos, atraindo entusiastas de automóveis e proporcionando uma viagem no tempo automotiva.', imageSrc: carro },
      ];

      const savedevents = [
        { title: 'Festa Junina', content: 'Vem aí o "Arraiá da Alegria," a nossa tradicional Festa Junina que promete trazer calor humano, muita animação e a magia das festividades juninas para todos! Prepare-se para dançar quadrilha, saborear delícias típicas e se envolver numa atmosfera acolhedora e festiva.', imageSrc: junina },
        { title: 'Aula de Ioga ao Ar Livre', content: 'Uma sessão de ioga realizada em um parque ou área verde, proporcionando uma experiência relaxante e saudável para participantes de todos os níveis.', imageSrc: yoga },
        { title: 'Conferência de Inovação Tecnológica', content: 'Um encontro para profissionais da área de tecnologia, inovação e startups discutirem as últimas tendências e avanços na indústria.', imageSrc: ai },
      ];

  return (
    <div className="p-10 space-y-10">
      <div className="bg-blue-200 bg-width-100px space-y-2">
        <p className='font-poppins font-bold text-4xl'>Eventos que Gostaste</p>
      </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {likedevents.map((event, index) => (
          <Card key={index} title={event.title} content={event.content} imageSrc={event.imageSrc} />
        ))}
      </div>

      <div className="bg-blue-200 space-y-2">
        <p className='font-poppins font-bold text-4xl'>Eventos que Guardaste</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {savedevents.map((event, index) => (
          <Card key={index} title={event.title} content={event.content} imageSrc={event.imageSrc} />
        ))}
      </div>

    </div>
  );
}

export default Favourites;
