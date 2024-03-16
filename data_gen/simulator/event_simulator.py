import json
from simulator import Event, Company
from faker import Faker
import random


TAGS_JSON = "data/tags.json"
DESC_JSON = "data/desc.json"
CITIES_JSON = "data/cities.json"
POSTER_JSON = "data/posters.json"

class Event_Simulator():
    def __init__(self):
        
        self.companies = []
        
        
    def create_event(self):
        
        # choose company
        company = random.choice(self.companies)
        
        # gerar a categoria e tags
        tags = self.loadfile(TAGS_JSON)
        category = company.categories
        num_tags = random.randint(1, 3)
        tags = [category] + random.sample(tags[category], k=num_tags)
        
        
        cities = self.loadfile(CITIES_JSON)
        distritos = cities["distritos de portugal"]

        # Escolha um distrito aleatório
        city = random.choice(distritos)
        
        
        # nome evento
        name = random.choice(tags) + " by " + Faker().name()
        
        description = " "
        # gerar a descrição
        descs = self.loadfile(DESC_JSON)
        description = descs[category]
        
        
        # gerar a data
        num = random.random()
        if num <= 0.2:
            r = range(2)
        else:
            r = range(1)
        
        data = []
        for i in r:
            data.append(Faker().date_time_between(start_date='now', end_date='+30d'))
        
        data_time = sorted(data)
        data_inicio = data_time[0].date()
        if len(data) > 1:
            data_fim = data_time[1].date()
        else:
            data_fim = "NULL"
        

        # schedule
        schedule = data_time[0].time().strftime("%H:%M")
        
        prices = {"crianças": 0, "adultos": 0, "seniores": 0, "estudantes": 0, "familia": 0}
        
        for key in prices:
            prices[key] = random.randint(0, 10)
        
        if len(data) > 1:
            duration = (data_fim - data_inicio).days
        else:
            duration = random.randint(3, 18)
            duration = duration * 10
            
            
        # location   
        location = Faker().address()
        # xy_location = [random.uniform(-180, 180), random.uniform(-90, 90)]
        
        posters = self.loadfile(POSTER_JSON)
        poster = posters[category]
        
        # print todos as entradas de evento
        # print("Name: ", name)
        # print("Company: ", company.name)
        # print("Description: ", description) 
        # print("Tags: ", tags)
        # print("Data: ", data)
        # print("Schedule: ", schedule)
        # print("Poster: ", poster)
        # print("Prices: ", prices)
        # print("Location: ", location)
        # print("XY Location: ", xy_location)
        # print("Duration: ", duration)
        
        data_inicio_form = data_inicio.strftime("%Y-%m-%d")
        if data_fim != "NULL":
            data_fim_form = data_fim.strftime("%Y-%m-%d")
        else: 
            data_fim_form = "NULL"
            
        seats = random.randint(1, 10)
        seats = seats * 10
        
        event = Event(name, company, description, tags, data_inicio_form, data_fim_form, schedule, poster, prices, location, city, duration, seats)
        print('Event simulator finished.') 
        return {'type': 'event_created', 'event': event.toDic()}

    def run(self):
        print('Starting event simulator...')
        return self.create_event()
        
    def loadfile(self, filename):
            try:
                with open(filename, 'r') as f:
                    data = json.load(f)
            except:
                print('Error opening {} file. Exiting...'.format(filename))
                exit(1)
            
            return data

    def add_company(self, company):
        self.companies.append(company)
    
if __name__ == '__main__':
    es = Event_Simulator()
    es.run()
        