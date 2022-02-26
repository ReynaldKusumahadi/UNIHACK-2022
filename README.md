# UNIHACK-2022
Our project in UNIHACK 2022

Making an App that has the characteristics of reddit, but is immutable

Done by: Stackoverflow Enjoyers

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