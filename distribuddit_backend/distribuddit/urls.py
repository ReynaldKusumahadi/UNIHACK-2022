from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('/post', views.post, name='post'),
    path('/create_subreddit', views.create_subreddit, name='create_subreddit'),
    path('/submit', views.submit, name='submit'),
    path('/subreddit', views.subreddit, name='subreddit'),
    path('/subscribed', views.subscribed, name='subscribed'),
    path('/user', views.user, name='user')
]
