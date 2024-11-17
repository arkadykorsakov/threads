# Для запуска проекта, необходимо выполнить следующие шаги:

1. Склонировать репозиторий по ссылке https://github.com/arkadykorsakov/threads.git на свой компьютер.

```
git clone https://github.com/arkadykorsakov/threads.git
```

2. Открыть терминал (или командную строку) и перейти в корневую директорию сервера.

```
cd server
```

3. Переименовать файл .env.local (убрать .local)

```
.env
```

4. Запустить команду docker compose которая поднимет сервер, клиент и базу данных

```
docker compose up
```

5. Открыть браузер и перейти по адресу http://localhost:80, чтобы увидеть запущенный проект.

# Если вы хотите скачать образ базы данных MongoDB

Запустите контейнер с образом MongoDB и настройками replica set (он автоматически скачает и запустит этот образ):

```
  docker run --name mongo \
       -p 27017:27017 \
       -e MONGO_INITDB_ROOT_USERNAME="monty" \
       -e MONGO_INITDB_ROOT_PASSWORD="pass" \
       -d prismagraphql/mongo-single-replica:5.0.3
```
