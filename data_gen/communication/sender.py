import pika
import json
import os

class Sender():
    def __init__(self):
        self.rabbitmq_host = os.environ.get('RABBIT_HOST', 'localhost')
        self.rabbitmq_port = os.environ.get('RABBIT_PORT', 5672)
        self.rabbitmq_username = os.environ.get('RABBIT_USER', 'guest')
        self.rabbitmq_password = os.environ.get('RABBIT_PASSWORD', 'guest')
        print(f'Connecting to RabbitMQ at {self.rabbitmq_host}:{self.rabbitmq_port} as {self.rabbitmq_username}')
        self.exchange = '' 
        self.queue = 'new_event'
        self.routing_key = 'new_event'
        self.channel = None
        self.connection_instance = None  # Renomeado para evitar conflito de nomes
        self.connection()

    def __enter__(self):
        return self
    
    def __exit__(self, exc_type, exc_value, traceback):
        self.connectionclose()

    def connection(self):
        credentials = pika.PlainCredentials(self.rabbitmq_username, self.rabbitmq_password)
        self.connection_instance = pika.BlockingConnection(pika.ConnectionParameters(host=self.rabbitmq_host, port=self.rabbitmq_port, credentials=credentials))
        self.channel = self.connection_instance.channel()
        self.channel.queue_declare(queue=self.queue, durable=False)
    
    def connectionclose(self):
        if self.connection_instance:
            self.connection_instance.close()
    
    def send(self, message):
        self.channel.basic_publish(exchange=self.exchange, routing_key=self.routing_key, body=message)
        print(f'Message sent: {message}')

