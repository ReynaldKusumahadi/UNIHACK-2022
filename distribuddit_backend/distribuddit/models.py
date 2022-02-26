from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
  title = models.CharField(max_length=100)  #Title of the post
  url = models.URLField()                   #URL of the post
  submitter = models.ForeignKey(User, on_delete=models.CASCADE) #Who is the poster?
  text = models.TextField(blank=True, null=True)    #Contents of the post
  created = models.DateTimeField(auto_now_add=True) #When is the post created?
  
  class Meta:
    ordering = ['-created']
