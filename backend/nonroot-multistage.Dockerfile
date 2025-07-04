# Stage 1: Build the Spring Boot app
FROM maven:3.9.6-eclipse-temurin-21 AS builder
WORKDIR /build
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Create the runtime image
FROM eclipse-temurin:21-alpine-3.21

MAINTAINER Dimitris
WORKDIR /app

RUN apk update && apk add curl
# Set non-root user
RUN addgroup -S appgroup && adduser -S robin -G appgroup

# Copy the built jar from the builder stage
COPY --from=builder /build/target/crowdfunding-0.0.1-SNAPSHOT.jar ./application.jar

# Set ownership to the appuser
RUN chown robin /app/application.jar

# Switch to the unprivileged user
USER robin

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "application.jar"]