from django.urls import path, re_path
from . import views


urlpatterns = [
    path('index', views.index, name='index'),
    path('explore', views.explore, name='explore'),
    path('tnode', views.tnode, name='tnode'),
    path('newTopic', views.newTopic, name='newTopic'),
    path('subscription', views.subscription, name='subscription'),
    path('post', views.post, name='post'),
    path('submit', views.submit, name='submit'),
    re_path(r'^ajax/ajax/$', views.ajax, name='ajax'),



    # path('post', views.post, name='post'),
    # path('create_subreddit', views.create_subreddit, name='create_subreddit'),
    # path('submit', views.submit, name='submit'),
    # path('subreddit', views.subreddit, name='subreddit'),
    # path('subscribed', views.subscribed, name='subscribed'),
    # path('user', views.user, name='user')
]
