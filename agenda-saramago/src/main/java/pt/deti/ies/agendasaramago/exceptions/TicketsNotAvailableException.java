package pt.deti.ies.agendasaramago.exceptions;

public class TicketsNotAvailableException extends RuntimeException {
    public TicketsNotAvailableException(String message) {
        super(message);
    }
}
