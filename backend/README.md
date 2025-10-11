# 1 init

active your virtual env

```sh
source .venv/bin/activate

```

install packages

```sh
uv sync
```

install black in virtual env

```sh

uv pip install black
uv pip install pre-commit
pre-commit install
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

# 3 db migration

if you want to change db table structure you can change models and run

```sh

alembic revision --autogenerate -m "your change title"

alembic upgrade head
```

verify your db status

```sh
alembic current
```
