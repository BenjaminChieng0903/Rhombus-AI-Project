from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from .utils import read_file_and_convert

def hello(request):
    print(request)
    return HttpResponse("hello world")


@csrf_exempt
@require_POST
def type_inference(request):
    uploaded_file = request.FILES.get('file')
    if uploaded_file:
        try:
            dtype_results = read_file_and_convert(uploaded_file)
            response_data = {
                "status": 200,
                "message": "success",
                "data": dtype_results
            }
        except Exception as e:
            response_data = {
                "status": 500,
                "message": f"Error processing CSV file: {str(e)}",
            }
        
    else: 
        response_data = {
            "status": 400,
            "message": "No file was uploaded",
        }
    
    return JsonResponse(response_data)
   