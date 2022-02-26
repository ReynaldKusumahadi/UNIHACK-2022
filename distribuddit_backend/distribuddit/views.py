from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.http import JsonResponse

# Create your views here.
def index(request):
    page_title = 'index'
    context = {'page_title': page_title}
    return render(request, 'distribuddit/index.html', context)


def newTopic(request):
    page_title = 'newTopic'
    context = {'page_title': page_title}
    return render(request, 'distribuddit/newTopic.html', context)


def explore(request):
    page_title = 'Explore'
    context = {'page_title': page_title}
    return render(request, 'distribuddit/explore.html', context)


def subscription(request):
    page_title = 'Subscription'
    context = {'page_title': page_title}
    return render(request, 'distribuddit/subscription.html', context)


def tnode(request):
    page_title = 'TopicNode'
    context = {'page_title': page_title}
    return render(request, 'distribuddit/tnode.html', context)


def post(request):
    page_title = 'Post'
    context = {'page_title': page_title}
    return render(request, 'distribuddit/post.html', context)


def submit(request):
    page_title = 'Submit'
    context = {'page_title': page_title}
    return render(request, 'distribuddit/submit.html', context)


# Receive ajax post request
def ajax(request):
    if request.method == 'POST':
        return HttpResponse('Success')
    else:
        return HttpResponse('Failed')



# def post(request):
#     page_title = 'Post'
#     context = {'page_title': page_title}
#     return render(request, 'distribuddit/post.html', context)


# def create_subreddit(request):
#     page_title = 'Create subreddit'
#     context = {'page_title': page_title}
#     return render(request, 'distribuddit/create-subreddit.html', context)
#
#
# def submit(request):
#     page_title = 'Create a post'
#     context = {'page_title': page_title}
#     return render(request, 'distribuddit/submit.html', context)
#
#
# def subreddit(request):
#     page_title = '/r/subreddit'
#     context = {'page_title': page_title}
#     return render(request, 'distribuddit/subreddit.html', context)
#
#
# def subscribed(request):
#     page_title = 'Subscriptions'
#     context = {'page_title': page_title}
#     return render(request, 'distribuddit/subscribed.html', context)
#
#
# def user(request):
#     page_title = 'User'
#     context = {'page_title': page_title}
#     return render(request, 'distribuddit/user.html', context)
#
#
# def tnode(request):
#     page_title = 'Tnode'
#     context = {'page_title': page_title}
#     return render(request, 'distribuddit/tnode.html', context)
