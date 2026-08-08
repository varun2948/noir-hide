from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    CollectionsListView,
    JournalArticleViewSet,
    MaterialViewSet,
    NewsletterSubscribeView,
    ProductViewSet,
    TestimonialViewSet,
)

router = DefaultRouter()
router.register(r'products', ProductViewSet, basename='product')
router.register(r'materials', MaterialViewSet, basename='material')
router.register(r'journal', JournalArticleViewSet, basename='journal')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')

urlpatterns = [
    path('newsletter/subscribe/', NewsletterSubscribeView.as_view(), name='newsletter-subscribe'),
    path('collections/', CollectionsListView.as_view(), name='collections-list'),
    path('', include(router.urls)),
]
