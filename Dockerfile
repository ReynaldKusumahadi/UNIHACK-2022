FROM python:3-alpine as base
ENV PYTHONUNBUFFERED=1

FROM base as builder
RUN apk add --update --no-cache gcc postgresql-dev python3-dev musl-dev
WORKDIR /install
COPY distribuddit_backend/requirements.txt /requirements.txt
RUN pip install --prefix=/install -r /requirements.txt

FROM base
RUN apk --no-cache add --update libpq
COPY --from=builder /install /usr/local/
WORKDIR /app
COPY . /app/