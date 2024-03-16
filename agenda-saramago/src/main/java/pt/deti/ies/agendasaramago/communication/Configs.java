package pt.deti.ies.agendasaramago.communication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.core.Queue;

@Configuration
public class Configs {
    public static final String SEND_EXCHANGE = "";
    public static final String RECV_QUEUE = "new_event";
    public static final String SEND_ROUTING_KEY = "new_event";

    @Bean Queue recv_queue() {
        return new Queue(RECV_QUEUE, false);
    }
}