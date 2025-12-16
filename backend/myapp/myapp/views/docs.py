from pyramid.view import view_config
from pyramid.response import Response
from pyramid.httpexceptions import HTTPNotFound
import pkgutil

OPENAPI_ASSET = "myapp:openapi.yaml"


@view_config(route_name="openapi_spec", request_method="GET")
def openapi_yaml(request):
    """
    GET /openapi.yaml
    Return raw OpenAPI yaml
    """
    # load asset dari package (myapp/openapi.yaml)
    data = pkgutil.get_data("myapp", "openapi.yaml")
    if not data:
        raise HTTPNotFound(json_body={"error": "openapi.yaml not found in package"})

    return Response(
        body=data,
        content_type="application/yaml; charset=utf-8",
    )


@view_config(route_name="swagger_ui", request_method="GET")
def swagger_ui(request):
    """
    GET /docs
    Swagger UI halaman HTML yang membaca spec dari /openapi.yaml
    """
    spec_url = request.route_url("openapi_spec")

    html = f"""<!doctype html>
<html>
  <head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width,initial-scale=1"/>
    <title>API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css">
  </head>
  <body>
    <div id="swagger-ui"></div>

    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-standalone-preset.js"></script>
    <script>
      window.onload = () => {{
        SwaggerUIBundle({{
          url: "{spec_url}",
          dom_id: "#swagger-ui",
          presets: [
            SwaggerUIBundle.presets.apis,
            SwaggerUIStandalonePreset
          ],
          layout: "StandaloneLayout"
        }});
      }};
    </script>
  </body>
</html>
"""
    return Response(html, content_type="text/html; charset=utf-8")
