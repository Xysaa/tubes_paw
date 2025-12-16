# backend/myapp/myapp/check_db.py

from pyramid.paster import get_appsettings
from sqlalchemy import engine_from_config, text

def main():
    # baca development.ini di folder myapp
    settings = get_appsettings("development.ini")
    engine = engine_from_config(settings, prefix="sqlalchemy.")

    print("Menguji koneksi ke database...")
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        print("Hasil SELECT 1:", result.scalar())

if __name__ == "__main__":
    main()
