from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    page_title = 'Home'
    context = {'page_title': page_title}
    return render(request, 'distribuddit/homepage.html', context)


def post(request):
    return HttpResponse("TODO")

def create_subreddit(request):
    #TODO
    return render(request, 'distribuddit/create-subreddit.html')

def submit(request):
    #TODO
    return render(request, 'distribuddit/submit.html')

def subreddit(request):
    #TODO
    return render(request, 'distribuddit/subreddit.html')

def subscribed(request):
    #TODO
    return render(request, 'distribuddit/subscribed.html')

def user(request):
    return render(request, 'distribuddit/user.html')
