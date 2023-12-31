## Description

줌줌투어 백엔드 과제

## Set up

1. 처음 세팅시 아래처럼 주석처리 후 docker-compose up 실행

```yaml
services:
  db:
    container_name: ${MYSQL_HOST}
    image: mysql
    restart: always
    environment:
      # MYSQL_DB: ${MYSQL_DB}
      # MYSQL_USER: ${MYSQL_USER}
      # MYSQL_PASSWORD: ${MYSQL_PASSWORD}
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      TZ: Asia/Seoul
    ports:
      - '3306:3306'
    volumes:
      - mysql:/var/lib/mysql
    networks:
      - app-net

  # server:
  #   container_name: server_container
  #   build:
  #     dockerfile: Dockerfile
  #     context: .
  #   depends_on:
  #     - db
  #   volumes:
  #     - .:/usr/src/app
  #   env_file:
  #     - .env
  #   ports:
  #     - 3000:3000
  #     - 9000:9000
  #   networks:
  #     - app-net

volumes:
  mysql:

networks:
  app-net:
```

2. DB docker 실행되면 mysql 접근 후 아래 스크립트 실행

#### mysql docker 접근

```bash
docker ps
docker exec -it container-id bash
mysql -u root -p root-password
```

#### mysql db, user 세팅

```sql
CREATE DATABASE zumzum;

CREATE USER 'zz'@'%' IDENTIFIED BY 'zum1234zum';

GRANT ALL PRIVILEGES ON *.* TO 'zz'@'%';

FLUSH PRIVILEGES;
```

3. DB 도커 중지 후 docker-compose.yml 주석했던 부분을 풀고 다시 도커 실행

```bash
docker-compose up
```

## Running the app

```bash
docker-compose up
```
