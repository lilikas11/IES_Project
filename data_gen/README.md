event dic : {
            'name': self.name,
            'company': self.company.name,
            'description': self.description,
            'tags': self.tags,
            'data': self.data,
            'schedule': self.schedule,
            'poster': self.poster,
            'prices': self.prices,
            'location': self.location,
            'xy_location': self.xy_location,
            'duration': self.duration
        }

{"type": "event_created", "event": event_dic} -> mensagem de resposta à event criation



pode se correr o main.py com um argumento (int) para limitar a quantidade de eventos a serem criados