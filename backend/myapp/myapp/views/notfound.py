from pyramid.view import notfound_view_config

@notfound_view_config(renderer="myapp:templates/404.jinja2")
def notfound_html(request):
    request.response.status_code = 404
    return {}
