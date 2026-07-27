from fastapi import APIRouter
from app.api.v1.endpoints import ai
from app.api.v1.endpoints import (
    auth,
    dashboard,
    contacts,
    companies,
    deals,
    notes,
    activities,
    tasks,
    products,
    reports,
    settings,
)

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(dashboard.router, prefix="/dashboard", tags=["Dashboard"])
api_router.include_router(contacts.router, prefix="/contacts", tags=["Contacts"])
api_router.include_router(companies.router, prefix="/companies", tags=["Companies"])
api_router.include_router(deals.router, prefix="/deals", tags=["Deals"])
api_router.include_router(notes.router, tags=["Notes"])
api_router.include_router(activities.router, tags=["Activities"])
api_router.include_router(tasks.router, prefix="/tasks", tags=["Tasks & Activities"])
api_router.include_router(products.router, prefix="/products", tags=["Products"])
api_router.include_router(reports.router, prefix="/reports", tags=["Reports & Analytics"])
api_router.include_router(settings.router, prefix="/settings", tags=["Settings & RBAC"])
api_router.include_router(ai.router, prefix="/ai", tags=["ai"])
api_router.include_router(ai.router, prefix="/ai", tags=["AI Assistant"])