![kafkaPRAAG-logo-transparent](https://github.com/oslabs-beta/progue-for-kafka/assets/97624308/935ba100-9231-4318-b693-1a9e604644df)

# kafkaPRAAG: A health and performance visualizer for Apache Kafka.

**Table of Contents**
- [Features](#features)
- [Getting Started](#getting-started)
  - [Demo Setup](#demo-setup)
  - [Running a Custom Cluster](#running-a-custom-cluster)
  - [Adding Authentication](#adding-authentication)
- [Using the Application](#using-the-application)
  - [Connecting to the Cluster](#connecting-to-the-cluster)
  - [Creating Producers](#creating-producers)
  - [Interpreting Metrics](#interpreting-metrics)
- [Built With](#built-with)
- [Contributors](#contributors)
- [License](#license)
---
## Features

- Real-time monitoring of key Apache Kafka metrics
- Producer creation and message generation for cluster throughput testing
- Authentication through Google and GitHub OAuth
- Modern, responsive, and accessibility-conscious UI scaled for desktop and mobile devices
- Customizeable to suit a wide range of Kafka deployment configurations
---
## Getting Started

Whether you want to run our already containerized version of kafkaPRAAG in a demo setup or [use the application with a custom cluster](#running-a-custom-cluster), you will need the following to get started:

1. A clone of this repository to your local machine
2. [Jolokia JVM Agent](https://jolokia.org/index.html)
3. [Docker or Docker Desktop](https://docs.docker.com/get-docker/)
4. [Docker Compose](https://docs.docker.com/compose/)
5. [Google](https://developers.google.com/identity/protocols/oauth2) or [GitHub](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) OAuth app registration
6. [MongoDB](https://www.mongodb.com/) instance/cluster

### Demo Setup:

If you want to get up an running with a test cluster, you can use our pre-made cluster in the `/demo` directory. This setup includes one Zookeeper node, one broker, one consumer, kafkaPRAAG, and producer creation (via kafkaPRAAG) using KafkaJS. Here's how to get started:

1. Clone this repository to your local machine
2. Download the latest Jolokia JVM agent from [here](https://jolokia.org/download.html). The filename will be in the format `jolokia-jvm-<version>.jar`
3. Rename the file to `jolokia.jar`. (Alternatively, you can skip this step and instead change the `docker-compose.yml` file in a later step to reflect the current filename.)
4. Place the .jar file in the `/demo/jolokia` directory (overwriting the original file if necessary).
5. Install [Docker or Docker Desktop](https://docs.docker.com/get-docker/) if necessary.
6. Install [Docker Compose](https://docs.docker.com/compose/) if necessary (`NOTE:` Docker Compose is included in Docker Desktop).
7. Add authentication via NextAuth.js. See the section on [adding authentication](#adding-authentication) for detailed setup instructions for authentication and setting up your .env, and return here when done.
8. If you chose not to rename `jolokia-jvm-<version>.jar`, you must edit the `docker-compose.yml` file in the `/demo` directory.
   - Open up `docker-compose.yml` in an editor. Under `kafka-broker-1`, find the `environment` property. You will see the following line:
     ```
     - KAFKA_JMX_OPTS=-javaagent:/usr/src/app/jolokia.jar=port=8778,host=0.0.0.0
     ```
     Change `jolokia.jar` to the filename of Jolokia JVM agent you downloaded.
9. In the terminal, navigate to the `/demo` folder. Run the command `docker-compose up`.
10. In your web-browser, navigate to http://localhost:3000 to open the application.

### Running a Custom Cluster:

To run kafkaPRAAG with your own custom cluster, you'll need to set up Jolokia with each node to export node-specific JMX data. Here are the steps you'll need to follow:

1. Pull the latest version of kafkaPRAAG from Docker Hub by running:
   ```
   docker pull kafkapraag/kafkapraag:latest
   ```
2. Download the latest Jolokia JVM agent from [here](https://jolokia.org/download.html). The filename will be in the format `jolokia-jvm-<version>.jar`
3. Copy the Jolokia JVM agent to the same system where the Kafka node will be running. The UID for Jolokia and the Kafka node must match in order for the agent to successfully attach to the running Kafka process.
   - If you're running a non-containerized Kafka node on your local machine, then ensure you have the agent on the same machine.
   - If you're running the Kafka node in a container, then ensure that the Jolokia JVM agent is either copied over when building the image for the Kafka node, or that you use a [bind mount](https://docs.docker.com/storage/bind-mounts/) to add the agent to a target volume in the container when the node is spun up. For example, after putting the agent into an empty directory on the host filesystem, you would run the following command from that directory in the terminal:
     ```shell
     docker run \
     --name kafka-broker \
     -v ./:/app/jolokia:z \
     your/image:latest
     ```
     This spins up a container named `kafka-broker` using the image `your/image:latest`, bind-mounting the current directory in the host filesystem to the container at `/app/jolokia`. The `jolokia-jvm-<version>.jar` file is now available inside the container.
     You may also set the bind mount in a `docker-compose.yml` file if you intend to orchestrate your nodes using Docker Compose:
     ```yml
     kafka-broker-1:
       container_name: kafka-broker-1
       image: ubuntu/kafka:latest
       ports:
         - 9092:9092
         - 8778:8778
       depends_on:
         - kafka-zookeeper-1
       environment:
         - KAFKA_JMX_OPTS=
           -javaagent:/usr/src/app/jolokia.jar=port=8778,host=0.0.0.0
           -Dcom.sun.management.jmxremote=true
           -Dcom.sun.management.jmxremote.authenticate=false
           -Dcom.sun.management.jmxremote.ssl=false
           -Djava.rmi.server.hostname=localhost
           -Dcom.sun.management.jmxremote.host=localhost
           -Dcom.sun.management.jmxremote.port=9999
           -Dcom.sun.management.jmxremote.rmi.port=9999
           -Djava.net.preferIPv4Stack=true
       volumes:
         - ./jolokia:/usr/src/app
     ```
4. Configure the environmental variables of your shell session to allow your Kafka process to run the Jolokia JVM agent on starting.
   - If you're running a non-containerized Kafka node, set the environmental variables in the shell session from which you intend to start the Kafka process:
     ```shell
     export KAFKA_JMX_OPTS="
     -javaagent:jolokia.jar=port=8778,host=0.0.0.0 \
     -Djolokia.updateInterval=500 \
     -Dcom.sun.management.jmxremote=true \
     -Dcom.sun.management.jmxremote.authenticate=false \
     -Dcom.sun.management.jmxremote.ssl=false \
     -Djava.rmi.server.hostname=localhost \
     -Dcom.sun.management.jmxremote.host=localhost \
     -Dcom.sun.management.jmxremote.port=9999 \
     -Dcom.sun.management.jmxremote.rmi.port=9999 \
     -Djava.net.preferIPv4Stack=true"
     ```
     Note that in the second line, `jolokia.jar` will need to be changed to the path and filename of the agent on your host filesystem. You can change the host from `0.0.0.0` to `localhost` if you do not want Jolokia to listen on all network interfaces.
   - If you're running the Kafka node in a container, you can either set the environmental variable (using the `ENV` statement in your Dockerfile) when building your Kafka node, or add it to your `docker run` command like this:
        ```shell
        docker run --env KAFKA_JMX_OPTS=" \
        -javaagent:jolokia.jar=port=8778,host=0.0.0.0 \
        -Djolokia.updateInterval=500 \
        -Dcom.sun.management.jmxremote=true \
        -Dcom.sun.management.jmxremote.authenticate=false \
        -Dcom.sun.management.jmxremote.ssl=false \
        -Djava.rmi.server.hostname=localhost \
        -Dcom.sun.management.jmxremote.host=localhost \
        -Dcom.sun.management.jmxremote.port=9999 \
        -Dcom.sun.management.jmxremote.rmi.port=9999 \
        -Djava.net.preferIPv4Stack=true" \
        --name my-kafka-broker \
        your/image:latest
        ```
     You can achieve the same result with Docker compose, by setting an entry under the `environment` property of the container you defined for your Kafka node:
     ```yml
     kafka-broker-1:
       container_name: kafka-broker-1
       image: ubuntu/kafka:latest
       ports:
         - 9092:9092
         - 8778:8778
       depends_on:
         - kafka-zookeeper-1
       environment:
         - KAFKA_JMX_OPTS=
           -javaagent:/usr/src/app/jolokia.jar=port=8778,host=0.0.0.0
           -Dcom.sun.management.jmxremote=true
           -Dcom.sun.management.jmxremote.authenticate=false
           -Dcom.sun.management.jmxremote.ssl=false
           -Djava.rmi.server.hostname=localhost
           -Dcom.sun.management.jmxremote.host=localhost
           -Dcom.sun.management.jmxremote.port=9999
           -Dcom.sun.management.jmxremote.rmi.port=9999
           -Djava.net.preferIPv4Stack=true
       volumes:
         - ./jolokia:/usr/src/app
     ```

### Adding Authentication

>**IMPORTANT NOTE**: NextAuth.js (now Auth.js) is built with a security-first emphasis. As a result, you CANNOT use multiple accounts for the same user(for example, once you register as a user with your Github account, you won't be able to sign in or out with your Gmail account). Pick your means of authorization carefully!

kafkaPRAAG uses NextAuth (https://github.com/nextauthjs/next-auth) to allow JWT-based user authentication. Before running your application, you'll have to add a few environment variables:

In the same directory as your docker-compose.yml file (i.e. the demo folder when running the demo setup), add your own Google and/or Github authentication secrets to the .env file provided (which we have provided for you), along with a NextAuth secret you generate via the command line:

```json
GitHub OAuth Information
GITHUB_ID=""
GITHUB_SECRET=""

Google OAuth Information
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

NextAuth (Auth.js) Information
NEXTAUTH_URL=http://localhost:3000/

Generate your own secret via the command line: openssl rand -base64 32
NEXTAUTH_SECRET=""

MongoDB Connection URI
MONGODB_URI=""
```

To get your environment variables for NextAuth, follow directions below:

>**NOTE:** when registering for OAuth, make sure you add the following Authorized redirect URI, including the name of the selected provider at the end. For example, if using Google:
http://localhost:3000/api/auth/callback/google

Register for Google OAuth (if link leads to a blank screen, try refreshing the page):
https://console.developers.google.com/apis/credentials

Register for Github OAuth:
https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps

For more OAuth providers, check out NextAuth's documentation here:
https://next-auth.js.org/providers/

>**NOTE:** The syntax will be a bit different on their site from our product, as NextAuth's documentation still uses Next12 syntax.

Register your application with MongoDB to verify user sessions: https://www.mongodb.com/basics/create-database

1. Create a new organization
2. Inside your organization, create a new project ("users" here refers to your team).
3. When prompted, click "Build a Database."
4. After creation of your database, you will be prompted to create a Username and a Password. These are important values! Store them for later.
5. After clicking "create user", connect via "My Local Environment" (your current IP address will be added automatically).
6. Click "Finish and Close" - you will then be prompted to "Go to Databases" - hit this button.
7. Click "Connect" and choose the "Drivers" option.
8. Copy and paste the code below into your DOTENV file (replacing the default values with your values from step 4):

```
mongodb+srv://<username>:<password>@cluster0.c4twmob.mongodb.net/?retryWrites=true&w=majority
```

9. After successfully running your application, you'll now be able to see your unique users in your "users" collection.
---
## Using the Application

### Connecting to the Cluster

Enter a bootstrap address of the Kafka cluster you want to connect to:

> Image here

### Creating Producers

Enter a name for the producer and a messages per second value, then click start to connect the producer and have it begin sending messages to your cluster.

> Image here

### Interpreting Metrics

1. This chart shows the
2. This chart shows the
3. This chart shows the
4. This value shows the
5. This value shows the
6. This value shows the
7. This value shows the

> Image here

## Built With

![My Skills](https://skillicons.dev/icons?i=react,nextjs,ts,tailwind,kafka,mongodb,jest,d3,docker,aws,&perline=5)

## Contributors

| Name                                                | GitHub                                                                                                                                            | LinkedIn                                                                                                                                                       |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [**Cat Kim**](https://github.com/ckim722)           | [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ckim722)        | [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/catkim722/)   |
| [**Hank McGill**](https://github.com/hankfontaine/) | [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/hankfontaine/)  | [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hank-mcgill/) |
| [**Richard Wu**](https://github.com/camina-drummer) | [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/camina-drummer) | [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/wurichard/)   |
| [**Sherry Lu**](https://github.com/sherrii)         | [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sherrii)        | [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sherryl2523/) |

### License

[**MIT License**](https://choosealicense.com/licenses/mit/)
