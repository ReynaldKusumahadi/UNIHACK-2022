# UNIHACK-2022
Our project in UNIHACK 2022

Making an App that has the characteristics of reddit, but is immutable

Done by: Stackoverflow Enjoyers

Live demo: https://distribuddit.herokuapp.com/

Members:
1. Reynald Kusumahadi   **(Monash University)**
2. Akbar Fadiansyah     **(Monash University)**
3. Yuki Kume            **(Monash University)**
4. Sanskar Gauchan      **(University of Technology Sydney)**
5. Hassaan Qadeer       **(University of Melbourne)**
6. Clarie Chek          **(University of Adelaide)**

## Deployment

### Heroku

```
git subtree push --prefix distribuddit_backend heroku main
```

#### Configuration
##### Migrate scripts

This should be done on a fresh build or when you edit or add some models.

```
$ heroku run bash
$ python manage.py makemigrations
$ python manage.py migrate
```

More info: https://stackoverflow.com/questions/38330432/django-makemigrations-and-migrate-on-heroku-server-dont-create-tables

##### Set up a superuser

A superuser allows access to the Django admin console. This should be done on a fresh build if you want to have an admin
account.
```
$ heroku run python manage.py createsuperuser
```

### Docker Compose

#### Backend server

```
docker-compose up
```

#### Gun

Currently, there is no docker-compose file for this container. Do this outside this repo directory.

```
git clone https://github.com/amark/gun.git
cd gun
docker build -t gundb .
docker run -p 8765:8765 --name distribuddit-gun gundb
```