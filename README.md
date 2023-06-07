![kafkaPRAAG-logo-transparent](https://github.com/oslabs-beta/progue-for-kafka/assets/97624308/935ba100-9231-4318-b693-1a9e604644df)

# kafkaPRAAG: A health and performance visualizer for Apache Kafka.

Description of the project

- [Features](#features)
- [Getting Started](#getting-started)
    - [Demo Setup](#demo-setup)
    - [Running a Custom Cluster](#running-a-custom-cluster)
    - [Adding Authentication](#adding-authentication)
- [Using the Application](#using-the-application)
    - [Connecting to the Cluster](#connecting-to-the-cluster)
    - [Creating Producers](#creating-producers)
    - [Interpreting Metrics](#interpreting-metrics)
- [Configuration](#configuration)
- [Built With](#Built-With)
- [Contributors](#Contributors)
- [License](#license)

## Features
- Real-time monitoring of key Apache Kafka metrics
- Producer creation for cluster throughput testing
- Authentication through Google and GitHub OAuth
- Modern, responsive, and accessibility-conscious UI scaled for desktop and mobile devices
- Customizeable to suit a wide range of Kafka deployment configurations

## Getting Started

Whether you want to run our already containerized version of kafkaPRAAG in a demo setup or [use the application with a custom cluster](#running-a-custom-cluster), you will need the following to get started:

1. A clone of this repository to your local machine
2. [Jolokia JVM Agent](https://jolokia.org/index.html) 
3. [Docker or Docker Desktop](https://docs.docker.com/get-docker/) 
4. [Docker Compose](https://docs.docker.com/compose/)
5. [Google](https://developers.google.com/identity/protocols/oauth2) or [GitHub](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) OAuth app registration
6. [MongoDB](https://www.mongodb.com/) instance/cluster 

### Demo Setup:
If you want to get up an running with a test cluster, you can use our pre-made cluster in the `/demo` directory. This setup includes one Zookeper node, one broker, one consumer, kafkaPRAAG, and producer creation through kafkaPRAAG using KafkaJS. Here's how to get started:

1. Clone this repository to your local machine
2. Download the latest Jolokia JVM agent from [here](https://jolokia.org/download.html). The filename will be in the format `jolokia-jvm-<version>.jar`
3. Rename the file to `jolokia.jar`. (Alternatively, you can skip this step and instead change the `docker-compose.yml` file in a later step to reflect the current filename.)
4. Place the .jar file in the `/demo` directory, overwriting the original file if necessary.
5. Install [Docker or Docker Desktop](https://docs.docker.com/get-docker/) if necessary.
6. Install [Docker Compose](https://docs.docker.com/compose/) if necessary.
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

1. Pull 
2. Download the latest Jolokia JVM agent from [here](https://jolokia.org/download.html). The filename will be in the format `jolokia-jvm-<version>.jar`
3. Rename the file to `jolokia.jar`. (Alternatively, you can skip this step and instead change the `docker-compose.yml` file in a later step to reflect the current filename.)
4. Place the .jar file in the `/demo` directory, overwriting the original file if necessary.
5. Install [Docker or Docker Desktop](https://docs.docker.com/get-docker/) if necessary.
6. Install [Docker Compose](https://docs.docker.com/compose/) if necessary.
7. Add authentication via NextAuth.js. See the section on [adding authentication](#adding-authentication) for detailed setup instructions for authentication and setting up your .env, and return here when done.
8. If you chose not to rename `jolokia-jvm-<version>.jar`, you must edit the `docker-compose.yml` file in the `/demo` directory.
    - Open up `docker-compose.yml` in an editor. Under `kafka-broker-1`, find the `environment` property. You will see the following line:
        ```
        - KAFKA_JMX_OPTS=-javaagent:/usr/src/app/jolokia.jar=port=8778,host=0.0.0.0 
        ```
        Change `jolokia.jar` to the filename of Jolokia JVM agent you downloaded.
9. In the terminal, navigate to the `/demo` folder. Run the command `docker-compose up`.
10. In your web-browser, navigate to http://localhost:3000 to open the application.

### Adding Authentication

**IMPORTANT NOTE**: NextAuth.js (now Auth.js) is built with a security-first emphasis. As a result, you CANNOT use multiple accounts for the same user(for example, once you register as a user with your Github account, you won't be able to sign in or out with your Gmail account). Pick your means of authorization carefully!

kafkaPRAAG uses NextAuth (https://github.com/nextauthjs/next-auth) to allow JWT-based user authentication. Before running your application, you'll have to add a few environment variables:

-in the same directory as your docker-compose.yml file (i.e. the demo folder when running the demo setup), add your own Google and/or Github authentication secrets to the .env file provided, which we have provided for you:

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

Register for Google OAuth:
https://console.developers.google.com/apis/credentials
Register for Github OAuth:
https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps
For more OAuth providers, check out NextAuth's documentation here:
https://next-auth.js.org/providers/

`Note that the syntax will be a bit different on their site from our product`, as NextAuth's documentation still uses Next12 syntax.

Register your application with MongoDB to verify user sessions: https://www.mongodb.com/basics/create-database

1. Create a new organization
2. Inside your organization, create a new project ("users" here refers to your team).
3. When prompted, click "Build a Database."
4. After creation of your database, you will be prompted to create a Username and a Password. These are important values! Store them for later.
5. After clicking "create user", connect via "My Local Environment" (your current IP address will be added automatically).
6. Click "Finish and Close" - you will then be prompted to "Go to Databases" - hit this button.
7. Click "Connect" and choose the "Drivers" option.
8. After you `npm install mongodb`, copy and paste the code below into your DOTENV file (replacing the default values with your values from step 4):

```
mongodb+srv://<username>:<password>@cluster0.c4twmob.mongodb.net/?retryWrites=true&w=majority
```

9. After successfully installing and connecting your MongoDB database, you'll be able to see your unique users in your "users" collection.

## Using the Application
### Connecting to the Cluster
### Creating Producers
### Interpreting Metrics

## Configuration

## Planned Features

## Built With
![My Skills](https://skillicons.dev/icons?i=react,nextjs,ts,tailwind,kafka,mongodb,jest,d3,docker,aws,&perline=5)

## Contributors
| Name | GitHub | LinkedIn |
| ---- | ------ | -------- |
| [**Richard Wu**](#) | [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/camina-drummer) | [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/wurichard/) |
| [**Hank McGill**](#) | [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/hankfontaine/) | [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hank-mcgill/) |
| [**Cat Kim**](#) | [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ckim722) | [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/catkim722/) |
| [**Sherry Lu**](#) | [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sherrii) | [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/sherryl2523/) |

### License
[MIT](https://choosealicense.com/licenses/mit/)