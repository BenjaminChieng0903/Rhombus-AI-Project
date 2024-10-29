from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from .utils import infer_and_convert_data_types
import json
def hello(request):
    print(request)
    return HttpResponse("hello world")


@csrf_exempt
@require_POST
def type_inference(request):
    data = json.loads(request.body)
    print(data)
    response_data = {
        "status": 200,
        "message": 'type convertion is done',
        "data":data
    }
    return JsonResponse(response_data)