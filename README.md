## Url Shortner Project

Hello there! ![Hello there](https://static.wikia.nocookie.net/starwars/images/2/2a/He-says-the-thing.png/revision/latest/scale-to-width-down/1200?cb=20230113022153)

This project aims to show how a url shortner works. It's basically 2 microservices, one for user authorization and the other one for the shortner itself.

## Installation

### Setup your platform
- Docker ^27
- Docker Compose V2 ^2.5

### Install

```bash
npm i
```

### Run the compose
```bash
docker compose up -d --build
```
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. You will in the docker compose file that it uses 2 .env files, a global one and a service one.

### Database Configs
`DATABASE_PORT`: a special port, 5432

`POSTGRES_HOST`: your cool host, localhost

`POSTGRES_PASSWORD`: a interesting password, 1234

`POSTGRES_USER`: your name, john_doe

`POSTGRES_DB`: super cool name, database

### Application Global Configs

`ENVIRONMENT`: if this is set to "PRODUCTION" your db stops autosyncing

`JWT_SECRET`: seed for the jwt encryption

### Service Envs

These envs must be created on each service. Beware that they are static, if you put something else, the database will break!

#### Authorization
`SERVICE`: AUTH

#### Shortener
`SERVICE`: SHORTENER


Ps.: You can remove the ".example" from the provided ".env" files, just remember to chage the variables values.


## API Reference

To access the documentation, you need to run the project first.

This project is documented with swagger. Since there 2 services, you can acess the authorization reference on

```
http://localhost:3000/api
```

And the url shortner on

```
http://localhost:4000/api
```

Ps.: This assumes that your docker compose file points the default project ports.

## Roadmap

- [ ] Split database so that each service has its own

- [ ] Add rabbitmq for services communication

- [ ] Add monetization features for url clicks

- [ ] Add ads integration

- [ ] Improve JWT auth. Needs to add refreshing tokens

- [ ] Add nginx for reverse proxing and load balancing

- [ ] Upload to homelab server

- [ ] Add Kubernetes orchestration

- [ ] Add it to personal page

