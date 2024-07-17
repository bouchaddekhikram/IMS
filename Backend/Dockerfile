# Build stage
FROM maven:3.6.3-openjdk-17-slim AS build

WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests


#Runtime stage
FROM amazoncorretto:17

WORKDIR /app
COPY --from=build /build/target/Internship-*.jar /app/
EXPOSE 8085
ENV DB_URL=jdbc:mysql://internship_management_db:3306/Internship-Management-System
CMD java -jar -Dspring.datasource.url=${DB_URL} Internship-Management-System-2.1.1.jar
ENTRYPOINT ["java", "-jar", "Internship-Management-System-2.1.1.jar"]

