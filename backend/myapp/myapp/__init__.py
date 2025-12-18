from pyramid.config import Configurator
from .models.user import Base


def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    with Configurator(settings=settings) as config:
        config.add_tween("myapp.cors.cors_tween_factory")
        config.include('pyramid_jinja2')
        config.include('.routes')
        config.include('.models')
        config.scan()
    return config.make_wsgi_app()
