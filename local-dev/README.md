
# Docker setup

  

- Dependencyte installeerimine

```
docker-compose run --rm --no-deps backend-node install
docker-compose run --rm --no-deps frontend install

```

- Dockeri käivitamiseks

`docker-compose up -d`

Frontend  - [http://localhost:3000/](http://localhost:3000/)

Backend - [http://localhost:8081/](http://localhost:8081/)

## Troubleshoot

-   Probleemi ilmnemisel võid vaadata, kas probleem Dockeris ja reinstallida see
-   Kustutada node_modules kaust mõlemast folderist ja installida need ülemiste käskudega uuesti