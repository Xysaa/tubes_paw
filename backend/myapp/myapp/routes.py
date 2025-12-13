from logging import config


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
        # BOOKING
    config.add_route("class_book", "/api/classes/{id}/book")
    config.add_route("member_bookings", "/api/bookings")
    config.add_route("class_participants", "/api/classes/{id}/participants")
    #admin membership plan
    config.add_route("membership_plans", "/api/memberships")
    config.add_route("membership_plan_detail", "/api/memberships/{id}")
    # member membership
    config.add_route("member_subscribe_membership", "/api/memberships/{id}/subscribe")
    config.add_route("member_my_membership", "/api/my/membership")

    # Attendance
    config.add_route("trainer_mark_attendance", "/api/classes/{id}/attendance")
    config.add_route("trainer_class_attendance", "/api/classes/{id}/attendance/list")
    config.add_route("member_attendance_history", "/api/my/attendance")

    config.add_route("openapi_spec", "/openapi.yaml")
    config.add_route("swagger_ui", "/docs")

