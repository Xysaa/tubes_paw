# myapp/cors.py
from pyramid.response import Response

def cors_tween_factory(handler, registry):
    settings = registry.settings

    allowed_origins = settings.get("cors.allowed_origins", "")
    allow_methods = settings.get(
        "cors.allow_methods",
        "GET,POST,PUT,DELETE,OPTIONS"
    )
    allow_headers = settings.get(
        "cors.allow_headers",
        "Authorization,Content-Type"
    )

    def tween(request):
        origin = request.headers.get("Origin")

        # HANDLE PREFLIGHT (OPTIONS)
        if request.method == "OPTIONS":
            response = Response(status=200)
        else:
            response = handler(request)

        if origin and allowed_origins:
            allowed = [o.strip() for o in allowed_origins.split(",")]

            if origin in allowed or "*" in allowed:
                response.headers["Access-Control-Allow-Origin"] = origin
                response.headers["Vary"] = "Origin"
                response.headers["Access-Control-Allow-Methods"] = allow_methods
                response.headers["Access-Control-Allow-Headers"] = allow_headers
                response.headers["Access-Control-Allow-Credentials"] = "true"

        return response

    return tween
