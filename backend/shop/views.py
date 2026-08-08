from decimal import Decimal, InvalidOperation

from django.db.models import Prefetch, Q
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
    JournalArticle,
    Material,
    NewsletterSubscriber,
    Product,
    ProductColor,
    ProductImage,
    Testimonial,
)
from .serializers import (
    JournalArticleListSerializer,
    JournalArticleSerializer,
    MaterialSerializer,
    NewsletterSubscriberSerializer,
    ProductListSerializer,
    ProductSerializer,
    TestimonialSerializer,
)


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    lookup_field = 'slug'
    search_fields = ['name', 'description', 'leather_type', 'collection']
    ordering_fields = ['price', 'name', 'created_at', 'featured_order']
    ordering = ['name']

    def get_queryset(self):
        qs = Product.objects.prefetch_related(
            Prefetch('images', queryset=ProductImage.objects.order_by('order', 'id')),
            Prefetch('colors', queryset=ProductColor.objects.order_by('id')),
            'sizes',
        )

        params = self.request.query_params

        category = params.get('category')
        if category:
            qs = qs.filter(category__iexact=category)

        material = params.get('material') or params.get('leather_type')
        if material:
            qs = qs.filter(leather_type__icontains=material)

        color = params.get('color')
        if color:
            qs = qs.filter(
                Q(colors__name__icontains=color) | Q(colors__hex__iexact=color)
            ).distinct()

        size = params.get('size')
        if size:
            qs = qs.filter(sizes__size=size, sizes__in_stock=True).distinct()

        search = params.get('search')
        if search:
            qs = qs.filter(
                Q(name__icontains=search)
                | Q(description__icontains=search)
                | Q(leather_type__icontains=search)
                | Q(collection__icontains=search)
            )

        min_price = params.get('min_price')
        if min_price is not None:
            try:
                qs = qs.filter(price__gte=Decimal(min_price))
            except (InvalidOperation, ValueError):
                pass

        max_price = params.get('max_price')
        if max_price is not None:
            try:
                qs = qs.filter(price__lte=Decimal(max_price))
            except (InvalidOperation, ValueError):
                pass

        collection = params.get('collection')
        if collection:
            qs = qs.filter(collection__iexact=collection)

        ordering = params.get('ordering')
        if ordering:
            allowed = {
                'price',
                '-price',
                'name',
                '-name',
                'created_at',
                '-created_at',
                'featured_order',
                '-featured_order',
            }
            if ordering in allowed:
                qs = qs.order_by(ordering)

        return qs

    def get_serializer_class(self):
        if self.action == 'list' or self.action == 'featured':
            return ProductListSerializer
        return ProductSerializer

    @action(detail=False, methods=['get'])
    def featured(self, request):
        qs = self.get_queryset().filter(is_featured=True).order_by(
            'featured_order', 'name'
        )
        serializer = self.get_serializer(qs, many=True)
        return Response(serializer.data)


class MaterialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer
    lookup_field = 'slug'


class JournalArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = JournalArticle.objects.all()
    lookup_field = 'slug'

    def get_serializer_class(self):
        if self.action == 'list':
            return JournalArticleListSerializer
        return JournalArticleSerializer


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer


class NewsletterSubscribeView(APIView):
    def post(self, request):
        serializer = NewsletterSubscriberSerializer(data=request.data)
        if serializer.is_valid():
            NewsletterSubscriber.objects.create(
                email=serializer.validated_data['email']
            )
            return Response(
                {
                    'detail': 'Welcome to the atelier list. Crafted by hand. Shaped by time.',
                    'email': serializer.validated_data['email'],
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CollectionsListView(APIView):
    def get(self, request):
        collections = (
            Product.objects.exclude(collection='')
            .values_list('collection', flat=True)
            .distinct()
            .order_by('collection')
        )
        return Response([{'name': name, 'slug': name.lower().replace(' ', '-')} for name in collections])
