from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# Fallback to local SQLite file for development if PostgreSQL database service is not actively bound
database_url = settings.DATABASE_URL
if database_url.startswith("postgresql") and "postgres_password" in database_url:
    try:
        engine = create_engine(database_url, pool_pre_ping=True)
        # Test connection fast
        conn = engine.connect()
        conn.close()
    except Exception:
        database_url = "sqlite:///./crm_local.db"
        engine = create_engine(database_url, connect_args={"check_same_thread": False})
else:
    engine = create_engine(database_url, pool_pre_ping=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)