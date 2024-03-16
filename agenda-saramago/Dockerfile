FROM openjdk:17.0.1 AS builder
WORKDIR /agenda-saramago
COPY . .
RUN mvn clean package
FROM openjdk:17
ARG JAR_FILE=target/agenda-saramago-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} App.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/App.jar"]