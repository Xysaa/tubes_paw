from pyramid.view import view_config

@view_config(route_name='home', renderer='myapp:templates/mytemplate.jinja2')
def home(request):
    # sementara: JANGAN akses database dulu
    return {
        "message": "Halo, Pyramid sudah jalan dan DB sudah connect.",
        "project": "myapp",
    }
