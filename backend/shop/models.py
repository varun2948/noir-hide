from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models


class Product(models.Model):
    class Category(models.TextChoices):
        BOOTS = 'boots', 'Boots'
        OXFORDS = 'oxfords', 'Oxfords'
        LOAFERS = 'loafers', 'Loafers'
        SNEAKERS = 'sneakers', 'Sneakers'
        CARE = 'care', 'Care'

    class StockStatus(models.TextChoices):
        IN_STOCK = 'in_stock', 'In Stock'
        LOW_STOCK = 'low_stock', 'Low Stock'
        OUT_OF_STOCK = 'out_of_stock', 'Out of Stock'
        MADE_TO_ORDER = 'made_to_order', 'Made to Order'

    slug = models.SlugField(unique=True, max_length=120)
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=20, choices=Category.choices)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    leather_type = models.CharField(max_length=100, blank=True)
    construction = models.CharField(max_length=200, blank=True)
    material_info = models.TextField(blank=True)
    care_info = models.TextField(blank=True)
    shipping_info = models.TextField(blank=True)
    stock_status = models.CharField(
        max_length=20,
        choices=StockStatus.choices,
        default=StockStatus.IN_STOCK,
    )
    is_featured = models.BooleanField(default=False)
    featured_order = models.PositiveIntegerField(default=0)
    collection = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class ProductImage(models.Model):
    product = models.ForeignKey(
        Product, related_name='images', on_delete=models.CASCADE
    )
    url = models.URLField(max_length=500)
    alt = models.CharField(max_length=255, blank=True)
    is_primary = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f'{self.product.name} image {self.order}'


class ProductColor(models.Model):
    product = models.ForeignKey(
        Product, related_name='colors', on_delete=models.CASCADE
    )
    name = models.CharField(max_length=80)
    hex = models.CharField(max_length=7)
    image_url = models.URLField(max_length=500, blank=True)

    class Meta:
        ordering = ['id']

    def __str__(self):
        return f'{self.product.name} — {self.name}'


class ProductSize(models.Model):
    product = models.ForeignKey(
        Product, related_name='sizes', on_delete=models.CASCADE
    )
    size = models.CharField(max_length=10)
    in_stock = models.BooleanField(default=True)

    class Meta:
        ordering = ['size']
        unique_together = [('product', 'size')]

    def __str__(self):
        return f'{self.product.name} — {self.size}'


class Material(models.Model):
    slug = models.SlugField(unique=True, max_length=120)
    name = models.CharField(max_length=120)
    sample_number = models.CharField(max_length=40, blank=True)
    description = models.TextField()
    durability_rating = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    aging_behavior = models.TextField(blank=True)
    care_recommendation = models.TextField(blank=True)
    typical_products = models.TextField(blank=True)
    texture_image_url = models.URLField(max_length=500, blank=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class JournalArticle(models.Model):
    slug = models.SlugField(unique=True, max_length=160)
    title = models.CharField(max_length=255)
    excerpt = models.TextField()
    content = models.TextField()
    cover_image = models.URLField(max_length=500, blank=True)
    category_label = models.CharField(max_length=80, blank=True)
    published_at = models.DateTimeField()

    class Meta:
        ordering = ['-published_at']

    def __str__(self):
        return self.title


class NewsletterSubscriber(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.email


class Testimonial(models.Model):
    quote = models.TextField()
    attribution = models.CharField(max_length=120)
    product_name = models.CharField(max_length=200, blank=True)
    location = models.CharField(max_length=120, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', 'id']

    def __str__(self):
        return f'{self.attribution} — {self.product_name or "General"}'
