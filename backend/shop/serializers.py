from rest_framework import serializers

from .models import (
    JournalArticle,
    Material,
    NewsletterSubscriber,
    Product,
    ProductColor,
    ProductImage,
    ProductSize,
    Testimonial,
)


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ['id', 'url', 'alt', 'is_primary', 'order']


class ProductColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductColor
        fields = ['id', 'name', 'hex', 'image_url']


class ProductSizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSize
        fields = ['id', 'size', 'in_stock']


class ProductSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    colors = ProductColorSerializer(many=True, read_only=True)
    sizes = ProductSizeSerializer(many=True, read_only=True)
    primary_image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id',
            'slug',
            'name',
            'category',
            'price',
            'description',
            'leather_type',
            'construction',
            'material_info',
            'care_info',
            'shipping_info',
            'stock_status',
            'is_featured',
            'featured_order',
            'collection',
            'created_at',
            'images',
            'colors',
            'sizes',
            'primary_image',
        ]

    def get_primary_image(self, obj):
        primary = obj.images.filter(is_primary=True).first()
        if primary:
            return primary.url
        first = obj.images.first()
        return first.url if first else None


class ProductListSerializer(serializers.ModelSerializer):
    """Lighter payload for catalog listing."""

    primary_image = serializers.SerializerMethodField()
    colors = ProductColorSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            'id',
            'slug',
            'name',
            'category',
            'price',
            'leather_type',
            'stock_status',
            'is_featured',
            'featured_order',
            'collection',
            'primary_image',
            'colors',
        ]

    def get_primary_image(self, obj):
        primary = next((img for img in obj.images.all() if img.is_primary), None)
        if primary:
            return primary.url
        first = obj.images.first()
        return first.url if first else None


class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = [
            'id',
            'slug',
            'name',
            'sample_number',
            'description',
            'durability_rating',
            'aging_behavior',
            'care_recommendation',
            'typical_products',
            'texture_image_url',
        ]


class JournalArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalArticle
        fields = [
            'id',
            'slug',
            'title',
            'excerpt',
            'content',
            'cover_image',
            'category_label',
            'published_at',
        ]


class JournalArticleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalArticle
        fields = [
            'id',
            'slug',
            'title',
            'excerpt',
            'cover_image',
            'category_label',
            'published_at',
        ]


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = [
            'id',
            'quote',
            'attribution',
            'product_name',
            'location',
            'order',
        ]


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscriber
        fields = ['email']

    def validate_email(self, value):
        email = value.strip().lower()
        if NewsletterSubscriber.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError(
                'This email is already subscribed to the atelier list.'
            )
        return email
