# Build stage: Use Maven to build the JAR file
FROM maven:3.8.8-eclipse-temurin-21-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy the pom.xml file and the source code into the container
COPY pom.xml .
COPY src /app/src

# Run Maven to clean and package the project (this will create the JAR file in /app/target)
RUN mvn clean package -DskipTests

# Runtime stage: Use OpenJDK to run the application
FROM openjdk:21-slim

# Set the working directory in the container
WORKDIR /app

# Copy the built JAR file from the build stage to the runtime stage
COPY --from=build /app/target/e-com-0.0.1-SNAPSHOT.jar ecom.jar

# Expose port 8080 for the application
EXPOSE 8080

# Define the entrypoint to run the JAR file
ENTRYPOINT ["java", "-jar", "ecom.jar"]
