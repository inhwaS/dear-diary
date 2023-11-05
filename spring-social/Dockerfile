#### Stage 1: Build the application
FROM maven:3.8.4-openjdk-11 as build

# Set the current working directory inside the image
WORKDIR /app

# Copy the Maven wrapper files
COPY .mvn .mvn

# Copy the pom.xml file
COPY pom.xml .

# Copy the project source
COPY src src

# Package the application (no need for 'clean install' here)
RUN mvn package -DskipTests


#### Stage 2: A minimal docker image with command to run the app
FROM openjdk:11-jre-slim
ARG JAR_FILE=target/dear-diary-1.jar

# Copy the JAR file from the build stage to the final image
COPY --from=build /app/${JAR_FILE} /app/dear-dairy-1.jar

# Set the command to run the application
ENTRYPOINT ["java", "-jar", "/app/dear-dairy-1.jar"]
