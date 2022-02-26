from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def index(request):
<<<<<<< HEAD
    return HttpResponse("<h1> Test</h1>")
=======
  return HttpResponse('<h1>Test</h1>')
>>>>>>> 478530e53b1023cf95b7c52ca848c9f4a2d9e944
