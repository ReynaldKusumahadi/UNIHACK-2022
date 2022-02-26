from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
    page_title = 'Home'
    context = {'page_title': page_title}
    return render(request, 'distribuddit/homepage.html', context)


def post(request):
    return HttpResponse("TODO")