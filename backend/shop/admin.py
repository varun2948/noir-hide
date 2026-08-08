from django.contrib import admin

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


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


class ProductColorInline(admin.TabularInline):
    model = ProductColor
    extra = 1


class ProductSizeInline(admin.TabularInline):
    model = ProductSize
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        'name',
        'category',
        'price',
        'leather_type',
        'stock_status',
        'is_featured',
        'collection',
    )
    list_filter = ('category', 'stock_status', 'is_featured', 'collection')
    search_fields = ('name', 'slug', 'leather_type')
    prepopulated_fields = {'slug': ('name',)}
    inlines = [ProductImageInline, ProductColorInline, ProductSizeInline]


@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ('name', 'sample_number', 'durability_rating')
    search_fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}


@admin.register(JournalArticle)
class JournalArticleAdmin(admin.ModelAdmin):
    list_display = ('title', 'category_label', 'published_at')
    search_fields = ('title', 'slug')
    prepopulated_fields = {'slug': ('title',)}


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ('email', 'created_at')
    search_fields = ('email',)


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('attribution', 'product_name', 'location', 'order')
    list_editable = ('order',)
