def includeme(config):
    config.add_static_view('static', 'static', cache_max_age=3600)
    config.add_route('home', '/')

    # Auth routes
    config.add_route('auth_register_member', '/api/auth/register')
    config.add_route('auth_login', '/api/auth/login')
    config.add_route('auth_me', '/api/auth/me')
    config.add_route('admin_users', '/api/admin/users')

    # Classes routes
    config.add_route("classes_list_create", "/api/classes")
    config.add_route("classes_detail", "/api/classes/{id}")
