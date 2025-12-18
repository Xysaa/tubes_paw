import os
from pyramid.paster import get_app

# Gunicorn will import this as `app`
INI_PATH = os.environ.get("PYRAMID_INI", "/var/www/hexafit-backend/production.ini")
app = get_app(INI_PATH, "main")
