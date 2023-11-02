FROM adoptopenjdk:11-jre-hotspot-focal
ARG JAR_FILE=target/dear-diary-1.jar
COPY ${JAR_FILE} dear-diary.jar
ENTRYPOINT ["java","-jar","/dear-diary.jar"]
EXPOSE 8080