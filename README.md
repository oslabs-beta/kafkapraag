![kafkaPRAAG-logo-transparent](https://github.com/oslabs-beta/progue-for-kafka/assets/97624308/935ba100-9231-4318-b693-1a9e604644df)

# kafkaPRAAG: A health and performance visualizer for Apache Kafka.

Description of the project

- [Features](#features)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [License](#license)
- [FAQ](#faq)
- [Team](#team)

## Features
- Real-time monitoring of key Apache Kafka metrics
- Modern, responsive, and accessibility-conscious UI scaled for desktop and mobile devices
- Customizeable to suit a wide range of Kafka deployment configurations
- Authentication through Google and GitHub OAuth

## Getting Started

Whether you want to run our already containerized version of the application in a demo setup or build the application image yourself, you will need the following to get started:

1. A clone of this repository to your local machine
2. [Jolokia JVM Agent](https://jolokia.org/index.html) 
3. [Docker or Docker Desktop](https://docs.docker.com/get-docker/) 
4. [Docker Compose](https://docs.docker.com/compose/)
5. [Google](https://developers.google.com/identity/protocols/oauth2) or [GitHub](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) OAuth app registration
6. [MongoDB](https://www.mongodb.com/) instance/cluster 

### Demo Setup:
1. Clone this repository to your local machine
2. Download the latest Jolokia JVM agent from [here](https://jolokia.org/download.html). The filename will be in the format jolokia-jvm-\<version\>.jar
3. Rename the file to jolokia.jar. (Alternatively, you can skip this step and instead change the docker-compose.yml file in a later step to reflect the current filename.)
4. Place the file 

1. Docker Compose file
    1. configuration of environmental variables
    2. Jolokia and mapping volumes
2. App authentication 

**Using the app**

1. Dashboard
2. Producer Creation

### Configuration


### License


### FAQ


### Team