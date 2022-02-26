from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    page_title = 'Home'
    context = {'page_title': page_title}
    return render(request, 'distribuddit/homepage.html', context)


def post(request):
    page_title = 'Post'
    context = {'page_title': page_title}
    return render(request, 'distribuddit/post.html', context)

def create_subreddit(request):
    page_title = 'Create subreddit'
    context = {'page_title': page_title}
    return render(request, 'distribuddit/create-subreddit.html', context)

def submit(request):
    page_title = 'Create a post'
    context = {'page_title': page_title}
    return render(request, 'distribuddit/submit.html', context)

def subreddit(request):
    page_title = '/r/subreddit'
    context = {'page_title': page_title}
    return render(request, 'distribuddit/subreddit.html', context)

def subscribed(request):
    page_title = 'Subscriptions'
    context = {'page_title': page_title}
    return render(request, 'distribuddit/subscribed.html', context)

def user(request):
    page_title = 'User'
    context = {'page_title': page_title}
    return render(request, 'distribuddit/user.html', context)
