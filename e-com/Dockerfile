FROM maven:3.8.8-eclipse-temurin-21-alpine AS build
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:21-slim
COPY --from=build /app/target/e-com-0.0.1-SNAPSHOT.jar ecom.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "ecom.jar"]
