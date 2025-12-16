from pyramid.view import notfound_view_config

@notfound_view_config(renderer="json", accept="application/json")
def notfound_json(request):
    request.response.status_code = 404
    return {
        "error": "Not Found",
        "path": request.path,
        "message": "Endpoint does not exist"
    }
