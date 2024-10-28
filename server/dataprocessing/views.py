from django.http import HttpResponse
from .utils import infer_and_convert_data_types

def hello(request):
    print(request)
    return HttpResponse("hello world")