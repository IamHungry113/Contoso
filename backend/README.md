# 1 init

```sh
uv sync
```

## setup db

should install docker

```sh
docker run --name contoso-pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

# 2 start

```sh
uv run fastapi dev app/main.py
```
