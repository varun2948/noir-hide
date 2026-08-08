"""
Seed catalog, materials, journal, and testimonials for NOIR HIDE.

Brand: Crafted by hand. Shaped by time.
Workshop established 1987 — inspired by artisan Nepal leather makers.
"""

from datetime import datetime, timezone
from decimal import Decimal

from django.core.management.base import BaseCommand
from django.db import transaction

from shop.models import (
    JournalArticle,
    Material,
    Product,
    ProductColor,
    ProductImage,
    ProductSize,
    Testimonial,
)

# Centralized Unsplash imagery for leather footwear
IMAGES = {
    'oxford_1': 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=1200&q=80',
    'boot_1': 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=1200&q=80',
    'loafer_1': 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=1200&q=80',
    'sneaker_1': 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=1200&q=80',
    'boot_2': 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=1200&q=80',
    'oxford_2': 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=1200&q=80',
    'boot_3': 'https://images.unsplash.com/photo-1612902376491-7a80a99ceef8?w=1200&q=80',
    'leather_1': 'https://images.unsplash.com/photo-1582897085656-c636d006a867?w=1200&q=80',
    'care_1': 'https://images.unsplash.com/photo-1582897085656-c636d006a867?w=800&q=80',
    'texture_fullgrain': 'https://images.unsplash.com/photo-1582897085656-c636d006a867?w=900&q=80',
    'texture_vegtan': 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=900&q=80',
    'texture_suede': 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=900&q=80',
    'texture_cordovan': 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=900&q=80',
    'journal_1': 'https://images.unsplash.com/photo-1582897085656-c636d006a867?w=1400&q=80',
    'journal_2': 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=1400&q=80',
    'journal_3': 'https://images.unsplash.com/photo-1612902376491-7a80a99ceef8?w=1400&q=80',
}

DEFAULT_SIZES = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13']

CARE_INFO = (
    'Wipe with a soft cloth after wear. Condition with our Leather Conditioning Balm '
    'every 4–6 weeks. Cedar shoe trees preserve shape overnight. Avoid prolonged '
    'exposure to water; if wet, air-dry away from direct heat.'
)

SHIPPING_INFO = (
    'Ships within 3–5 business days from our workshop. Complimentary repairs for '
    'the life of the sole on Goodyear-welted pairs. Free domestic shipping on '
    'orders over $200.'
)


def _add_images(product, urls, alt_prefix):
    for i, url in enumerate(urls):
        ProductImage.objects.create(
            product=product,
            url=url,
            alt=f'{alt_prefix} — view {i + 1}',
            is_primary=(i == 0),
            order=i,
        )


def _add_sizes(product, out_of_stock=None):
    out_of_stock = set(out_of_stock or [])
    for size in DEFAULT_SIZES:
        ProductSize.objects.create(
            product=product,
            size=size,
            in_stock=size not in out_of_stock,
        )


def _add_colors(product, colors):
    for name, hex_code, image_url in colors:
        ProductColor.objects.create(
            product=product,
            name=name,
            hex=hex_code,
            image_url=image_url or '',
        )


class Command(BaseCommand):
    help = 'Seed NOIR HIDE catalog, materials, journal articles, and testimonials.'

    @transaction.atomic
    def handle(self, *args, **options):
        self.stdout.write('Clearing existing shop data…')
        Product.objects.all().delete()
        Material.objects.all().delete()
        JournalArticle.objects.all().delete()
        Testimonial.objects.all().delete()

        self._seed_materials()
        self._seed_products()
        self._seed_journal()
        self._seed_testimonials()

        self.stdout.write(self.style.SUCCESS(
            f'Seeded {Product.objects.count()} products, '
            f'{Material.objects.count()} materials, '
            f'{JournalArticle.objects.count()} articles, '
            f'{Testimonial.objects.count()} testimonials.'
        ))

    def _seed_materials(self):
        materials = [
            {
                'slug': 'full-grain',
                'name': 'Full-Grain',
                'sample_number': 'NH-FG-01',
                'description': (
                    'The uppermost layer of the hide, left intact with its natural grain. '
                    'Our oil pull-up full-grain leather is drummed with natural oils until '
                    'it yields a living surface — one that darkens, softens, and maps every '
                    'mile. Selected from small-batch tanneries, each hide carries the quiet '
                    'marks of the animal: healed scars, subtle variation, character that '
                    'cannot be stamped or printed. Inspired by the repair culture of '
                    'artisan leather makers in Nepal, we choose hides meant to be worn, '
                    'mended, and handed down.'
                ),
                'durability_rating': 5,
                'aging_behavior': (
                    'Develops a rich patina within months. High-wear zones deepen in tone; '
                    'the oil pull-up effect lightens under flex, then settles darker with time.'
                ),
                'care_recommendation': (
                    'Condition sparingly. Brush dust before applying balm. Never saturate — '
                    'the oils already in the leather do most of the work.'
                ),
                'typical_products': 'Service boots, field boots, derbies, cap-toe oxfords',
                'texture_image_url': IMAGES['texture_fullgrain'],
            },
            {
                'slug': 'vegetable-tanned',
                'name': 'Vegetable-Tanned',
                'sample_number': 'NH-VT-02',
                'description': (
                    'Tanned slowly with tree bark extracts — oak, chestnut, mimosa — over '
                    'weeks rather than hours. Vegetable-tanned leather begins firm and '
                    'pale, then warms to amber and chestnut as sunlight and wear work the '
                    'surface. It is the traditional choice for Goodyear welting, lasting, '
                    'and resoling: structural, honest, and endlessly repairable. Our '
                    'workshop has used vegetable-tanned bends since 1987 for soles, '
                    'welts, and the upper leathers of our most archival silhouettes.'
                ),
                'durability_rating': 5,
                'aging_behavior': (
                    'Brightens then deepens to honey and cognac. Takes water marks early; '
                    'with care, those marks become part of a uniform, lived-in tone.'
                ),
                'care_recommendation': (
                    'Keep conditioned but not greasy. Use a light cream; avoid silicone '
                    'sprays. Store with cedar trees to hold the last.'
                ),
                'typical_products': 'Foundry Service Boot, welted oxfords, structured loafers',
                'texture_image_url': IMAGES['texture_vegtan'],
            },
            {
                'slug': 'suede',
                'name': 'Suede',
                'sample_number': 'NH-SU-03',
                'description': (
                    'Split from the reverse of the hide and finished to a soft, open nap. '
                    'Our suede is brushed for an even hand without losing the depth that '
                    'makes suede feel quiet and substantial. Used on seasonal colorways '
                    'and lighter constructions where breath and drape matter as much as '
                    'structure.'
                ),
                'durability_rating': 3,
                'aging_behavior': (
                    'Nap compresses in high-flex areas, creating tonal contrast. Color '
                    'softens rather than darkens dramatically.'
                ),
                'care_recommendation': (
                    'Brush with a suede eraser and wire brush. Protect with a dedicated '
                    'suede spray before first wear. Spot-clean; do not soak.'
                ),
                'typical_products': 'Seasonal sneakers, casual loafers, limited colorways',
                'texture_image_url': IMAGES['texture_suede'],
            },
            {
                'slug': 'shell-cordovan',
                'name': 'Shell Cordovan',
                'sample_number': 'NH-SC-04',
                'description': (
                    'Not hide at all in the conventional sense — a dense, non-porous '
                    'membrane from the horse’s hindquarters, vegetable-tanned and glazed '
                    'to a glass-like polish. Shell Cordovan is scarce, slow, and '
                    'legendary for its bounce-back and mirror shine. At NOIR HIDE we '
                    'reserve it for small editions where the leather itself is the '
                    'statement: deep burgundy, whisky, and black that catch light like '
                    'lacquered wood.'
                ),
                'durability_rating': 5,
                'aging_behavior': (
                    'Holds color with remarkable fidelity. Scratches burnish out with '
                    'friction and cream; the surface grows more luminous, never chalky.'
                ),
                'care_recommendation': (
                    'Wipe after wear. Use cordovan cream sparingly. Avoid heavy conditioners '
                    'that dull the glaze. Buff with a soft horsehair brush.'
                ),
                'typical_products': 'Limited oxfords, special-order boots, archival colorways',
                'texture_image_url': IMAGES['texture_cordovan'],
            },
        ]
        for data in materials:
            Material.objects.create(**data)
        self.stdout.write(f'  Materials: {len(materials)}')

    def _seed_products(self):
        products = [
            {
                'slug': 'the-mercer-cap-toe-oxford',
                'name': 'The Mercer Cap-Toe Oxford',
                'category': Product.Category.OXFORDS,
                'price': Decimal('325.00'),
                'description': (
                    'A closed-lace oxford for rooms that still reward formality — and for '
                    'days that refuse to. The Mercer is cut from oil pull-up full-grain '
                    'leather, hand-stitched at the toe cap, and built on a last shaped for '
                    'all-day wear. From a workshop established in 1987, each pair carries '
                    'the quiet discipline of handmade lasting and the repair culture we '
                    'learned from artisan leather makers in Nepal: sew it well once, so '
                    'it can be worn for decades.'
                ),
                'leather_type': 'full-grain',
                'construction': 'Goodyear welt, leather midsole, rubber outsole tip',
                'material_info': 'Oil pull-up full-grain calf. Vegetable-tanned heel counters.',
                'care_info': CARE_INFO,
                'shipping_info': SHIPPING_INFO,
                'stock_status': Product.StockStatus.IN_STOCK,
                'is_featured': True,
                'featured_order': 2,
                'collection': 'Atelier Essentials',
                'images': [IMAGES['oxford_1'], IMAGES['oxford_2']],
                'colors': [
                    ('Cognac', '#8B5A2B', IMAGES['oxford_1']),
                    ('Black', '#1A1A1A', IMAGES['oxford_2']),
                ],
                'out_of_stock_sizes': ['13'],
            },
            {
                'slug': 'the-foundry-service-boot',
                'name': 'The Foundry Service Boot',
                'category': Product.Category.BOOTS,
                'price': Decimal('410.00'),
                'description': (
                    'The Foundry is our signature service boot — a silhouette born in '
                    'workshops that never stopped believing leather should age louder '
                    'than branding. Cut from vegetable-tanned full-grain, the upper is '
                    'hand-skived, hand-folded, and hand-stitched along the vamp seam. '
                    'A Goodyear welt locks the leather midsole to a storm welt and a '
                    'commando outsole that grips wet pavement without apology.\n\n'
                    'Established in 1987, our bench still follows practices shared by '
                    'artisan leather makers in Nepal: slow lasting, visible stitching, '
                    'and the expectation that every boot will return for a resole. The '
                    'oil pull-up character of the hide means the Foundry arrives already '
                    'alive — and only grows more so. Wear it hard. Wipe it down. Send '
                    'it home when the sole thins. Crafted by hand. Shaped by time.'
                ),
                'leather_type': 'vegetable-tanned',
                'construction': 'Goodyear welt, storm welt, leather midsole, commando outsole',
                'material_info': (
                    'Vegetable-tanned full-grain upper. Leather lining. Recycled brass eyelets. '
                    'Waxed cotton laces.'
                ),
                'care_info': CARE_INFO,
                'shipping_info': SHIPPING_INFO,
                'stock_status': Product.StockStatus.IN_STOCK,
                'is_featured': True,
                'featured_order': 1,
                'collection': 'Foundry',
                'images': [IMAGES['boot_1'], IMAGES['boot_3'], IMAGES['leather_1']],
                'colors': [
                    ('Natural Tan', '#C4A574', IMAGES['boot_1']),
                    ('Dark Brown', '#3D2314', IMAGES['boot_3']),
                ],
                'out_of_stock_sizes': ['7'],
            },
            {
                'slug': 'the-vale-penny-loafer',
                'name': 'The Vale Penny Loafer',
                'category': Product.Category.LOAFERS,
                'price': Decimal('295.00'),
                'description': (
                    'Slip-on ease without casual compromise. The Vale is lasted from '
                    'supple full-grain, with a hand-cut saddle strap and a leather sole '
                    'finished thin enough for city pavement, thick enough for a first '
                    'resole. A quiet companion for linen trousers and winter wool alike.'
                ),
                'leather_type': 'full-grain',
                'construction': 'Blake stitch, leather sole, stacked leather heel',
                'material_info': 'Full-grain calf upper. Leather sock lining. Unlined vamp for drape.',
                'care_info': CARE_INFO,
                'shipping_info': SHIPPING_INFO,
                'stock_status': Product.StockStatus.IN_STOCK,
                'is_featured': True,
                'featured_order': 3,
                'collection': 'Atelier Essentials',
                'images': [IMAGES['loafer_1'], IMAGES['oxford_1']],
                'colors': [
                    ('Whisky', '#A0522D', IMAGES['loafer_1']),
                    ('Espresso', '#2C1810', IMAGES['oxford_1']),
                ],
                'out_of_stock_sizes': [],
            },
            {
                'slug': 'the-ash-minimal-sneaker',
                'name': 'The Ash Minimal Sneaker',
                'category': Product.Category.SNEAKERS,
                'price': Decimal('260.00'),
                'description': (
                    'A low-profile leather sneaker for days between workshops and weekends. '
                    'The Ash uses a suede and full-grain panel mix, hand-stitched overlays, '
                    'and a gum rubber cupsole. Minimal branding. Maximum hand feel.'
                ),
                'leather_type': 'suede',
                'construction': 'Cupsole, hand-stitched overlays, cushioned leather insole',
                'material_info': 'Suede panels with full-grain heel counter. Organic cotton laces.',
                'care_info': (
                    'Brush suede regularly. Spot-clean with a damp cloth. Use cedar trees '
                    'to preserve the last. Protect with suede spray before first wear.'
                ),
                'shipping_info': SHIPPING_INFO,
                'stock_status': Product.StockStatus.IN_STOCK,
                'is_featured': False,
                'featured_order': 0,
                'collection': 'Weekend',
                'images': [IMAGES['sneaker_1'], IMAGES['boot_2']],
                'colors': [
                    ('Stone', '#A8A29E', IMAGES['sneaker_1']),
                    ('Ink', '#1C1917', IMAGES['boot_2']),
                ],
                'out_of_stock_sizes': ['12'],
            },
            {
                'slug': 'the-oxblood-field-boot',
                'name': 'The Oxblood Field Boot',
                'category': Product.Category.BOOTS,
                'price': Decimal('445.00'),
                'description': (
                    'A taller field boot in deep oxblood — the color of aged mahogany and '
                    'late-afternoon wine. Built for wet grass and city grit alike, with a '
                    'storm welt, speed hooks, and a pull-up leather that flashes lighter '
                    'at every crease. Limited to the Oxblood collection.'
                ),
                'leather_type': 'full-grain',
                'construction': 'Goodyear welt, storm welt, leather midsole, lug outsole',
                'material_info': 'Oil pull-up full-grain in oxblood. Brass speed hooks. Waxed laces.',
                'care_info': CARE_INFO,
                'shipping_info': SHIPPING_INFO,
                'stock_status': Product.StockStatus.LOW_STOCK,
                'is_featured': True,
                'featured_order': 4,
                'collection': 'Oxblood',
                'images': [IMAGES['boot_2'], IMAGES['boot_1']],
                'colors': [
                    ('Oxblood', '#4A0E0E', IMAGES['boot_2']),
                ],
                'out_of_stock_sizes': ['7', '7.5'],
            },
            {
                'slug': 'the-hawthorne-derby',
                'name': 'The Hawthorne Derby',
                'category': Product.Category.OXFORDS,
                'price': Decimal('310.00'),
                'description': (
                    'An open-lace derby with a softer throat and a rounder toe than the '
                    'Mercer — the everyday dress shoe for men who still walk. Hand-lasted '
                    'in full-grain, finished with a leather sole and a discreet rubber tip.'
                ),
                'leather_type': 'full-grain',
                'construction': 'Goodyear welt, leather sole with rubber tip',
                'material_info': 'Full-grain calf. Vegetable-tanned stiffeners. Cotton laces.',
                'care_info': CARE_INFO,
                'shipping_info': SHIPPING_INFO,
                'stock_status': Product.StockStatus.IN_STOCK,
                'is_featured': False,
                'featured_order': 0,
                'collection': 'Atelier Essentials',
                'images': [IMAGES['oxford_2'], IMAGES['loafer_1']],
                'colors': [
                    ('Dark Brown', '#3D2314', IMAGES['oxford_2']),
                    ('Burgundy', '#6B1E2A', IMAGES['loafer_1']),
                ],
                'out_of_stock_sizes': [],
            },
            {
                'slug': 'the-ledger-chelsea-boot',
                'name': 'The Ledger Chelsea Boot',
                'category': Product.Category.BOOTS,
                'price': Decimal('385.00'),
                'description': (
                    'Elastic-sided, clean of line, and built to disappear under a trouser '
                    'break. The Ledger uses a dense full-grain upper, hand-set elastic '
                    'gores, and a Goodyear welt for a lifetime of resoles. Named for the '
                    'workshop ledger where every pair has been logged since 1987.'
                ),
                'leather_type': 'full-grain',
                'construction': 'Goodyear welt, elastic gores, stacked leather heel',
                'material_info': 'Full-grain calf. Elasticated textile gores. Leather lining.',
                'care_info': CARE_INFO,
                'shipping_info': SHIPPING_INFO,
                'stock_status': Product.StockStatus.IN_STOCK,
                'is_featured': True,
                'featured_order': 5,
                'collection': 'Foundry',
                'images': [IMAGES['boot_3'], IMAGES['boot_2']],
                'colors': [
                    ('Black', '#111111', IMAGES['boot_3']),
                    ('Cognac', '#8B5A2B', IMAGES['boot_2']),
                ],
                'out_of_stock_sizes': ['13'],
            },
            {
                'slug': 'leather-conditioning-balm',
                'name': 'Leather Conditioning Balm',
                'category': Product.Category.CARE,
                'price': Decimal('38.00'),
                'description': (
                    'A beeswax and lanolin balm formulated for oil pull-up and '
                    'vegetable-tanned leathers. Softens without flooding the grain. '
                    'One tin lasts through seasons of weekend conditioning.'
                ),
                'leather_type': '',
                'construction': '',
                'material_info': 'Beeswax, lanolin, carnauba, natural oils. 2 oz tin.',
                'care_info': 'Apply sparingly with a soft cloth. Buff after 10 minutes.',
                'shipping_info': 'Ships with footwear orders at no extra packing charge.',
                'stock_status': Product.StockStatus.IN_STOCK,
                'is_featured': False,
                'featured_order': 0,
                'collection': 'Care',
                'images': [IMAGES['care_1']],
                'colors': [],
                'out_of_stock_sizes': None,  # no sizes
            },
            {
                'slug': 'edge-dressing',
                'name': 'Edge Dressing',
                'category': Product.Category.CARE,
                'price': Decimal('28.00'),
                'description': (
                    'Restores the painted edge of leather soles and heels. A small bottle '
                    'for the ritual of maintenance — wipe, paint, let dry, walk again.'
                ),
                'leather_type': '',
                'construction': '',
                'material_info': 'Water-based edge paint. Black and brown available.',
                'care_info': 'Apply thin coats. Allow to dry fully before wear.',
                'shipping_info': 'Ships with footwear orders at no extra packing charge.',
                'stock_status': Product.StockStatus.IN_STOCK,
                'is_featured': False,
                'featured_order': 0,
                'collection': 'Care',
                'images': [IMAGES['leather_1']],
                'colors': [
                    ('Black', '#0A0A0A', ''),
                    ('Brown', '#4A3728', ''),
                ],
                'out_of_stock_sizes': None,
            },
            {
                'slug': 'cedar-shoe-trees',
                'name': 'Cedar Shoe Trees',
                'category': Product.Category.CARE,
                'price': Decimal('45.00'),
                'description': (
                    'Aromatic cedar shoe trees cut to hold the last of our oxfords and '
                    'boots. Absorb moisture overnight, preserve the toe shape, and scent '
                    'the closet like a workshop should.'
                ),
                'leather_type': '',
                'construction': '',
                'material_info': 'Solid aromatic cedar. Split-toe with coiled spring.',
                'care_info': 'Insert while shoes are still warm from wear. Lightly sand once a year.',
                'shipping_info': 'Ships with footwear orders at no extra packing charge.',
                'stock_status': Product.StockStatus.IN_STOCK,
                'is_featured': False,
                'featured_order': 0,
                'collection': 'Care',
                'images': [IMAGES['care_1'], IMAGES['texture_fullgrain']],
                'colors': [],
                'out_of_stock_sizes': None,
            },
            # Extra product beyond the required 10 for a fuller catalog
            {
                'slug': 'the-kathmandu-chukka',
                'name': 'The Kathmandu Chukka',
                'category': Product.Category.BOOTS,
                'price': Decimal('355.00'),
                'description': (
                    'A two-eyelet chukka named for the mountain city where our founders '
                    'first studied hand-stitched repair culture. Soft full-grain, a '
                    'crepe-inspired rubber sole, and a silhouette that lives between '
                    'workshop and trail.'
                ),
                'leather_type': 'full-grain',
                'construction': 'Goodyear welt, rubber outsole, unlined upper',
                'material_info': 'Oil pull-up full-grain. Waxed laces. Leather heel lining.',
                'care_info': CARE_INFO,
                'shipping_info': SHIPPING_INFO,
                'stock_status': Product.StockStatus.IN_STOCK,
                'is_featured': False,
                'featured_order': 0,
                'collection': 'Foundry',
                'images': [IMAGES['boot_1'], IMAGES['sneaker_1']],
                'colors': [
                    ('Sand', '#C2A878', IMAGES['boot_1']),
                    ('Olive', '#556B2F', IMAGES['sneaker_1']),
                ],
                'out_of_stock_sizes': ['11.5'],
            },
        ]

        for data in products:
            images = data.pop('images')
            colors = data.pop('colors')
            out_of_stock = data.pop('out_of_stock_sizes')
            product = Product.objects.create(**data)
            _add_images(product, images, product.name)
            if colors:
                _add_colors(product, colors)
            # Care items intentionally have no footwear sizes (out_of_stock_sizes is None)
            if out_of_stock is not None:
                _add_sizes(product, out_of_stock)

        self.stdout.write(f'  Products: {Product.objects.count()}')

    def _seed_journal(self):
        articles = [
            {
                'slug': 'how-full-grain-leather-ages',
                'title': 'How Full-Grain Leather Ages',
                'excerpt': (
                    'Patina is not a finish — it is a record. How oil pull-up full-grain '
                    'darkens, softens, and becomes unmistakably yours.'
                ),
                'content': (
                    'Full-grain leather keeps the outermost layer of the hide: the densest '
                    'fibers, the natural grain, the healed marks that cheaper leathers '
                    'sand away. At NOIR HIDE we drum our hides with oils until the surface '
                    'moves — the pull-up effect that lightens under stress and settles '
                    'darker with time.\n\n'
                    'In the first weeks, you will notice creases at the ball of the foot '
                    'and a slight deepening at the heel counter. By six months, high-wear '
                    'zones have their own weather map. By two years, a well-worn pair looks '
                    'less like a product and more like a companion.\n\n'
                    'This is why we design for repair. Inspired by artisan leather makers '
                    'in Nepal, we treat every welt as a promise: the upper can outlive the '
                    'sole. Crafted by hand. Shaped by time.'
                ),
                'cover_image': IMAGES['journal_1'],
                'category_label': 'Materials',
                'published_at': datetime(2025, 11, 12, 10, 0, tzinfo=timezone.utc),
            },
            {
                'slug': 'the-anatomy-of-a-goodyear-welted-shoe',
                'title': 'The Anatomy of a Goodyear-Welted Shoe',
                'excerpt': (
                    'From insole to outsole: the layers that make a shoe worth resoling '
                    'for a lifetime.'
                ),
                'content': (
                    'A Goodyear-welted shoe is a small architecture. The upper is lasted '
                    'over an insole. A strip of leather — the welt — is stitched to both '
                    'the upper and a rib on the insole. The outsole is then stitched to '
                    'the welt, not to the upper itself.\n\n'
                    'That separation is everything. When the tread wears down, a cobbler '
                    'can unstitch the sole, leave the upper intact, and rebuild from the '
                    'welt outward. It is slower to make. It is why our Foundry and Mercer '
                    'pairs leave the workshop ready for decades, not seasons.\n\n'
                    'Our bench has practiced this construction since 1987. We still hand-'
                    'trim welts and check every stitch line under workshop light before '
                    'a pair earns its box.'
                ),
                'cover_image': IMAGES['journal_2'],
                'category_label': 'Craft',
                'published_at': datetime(2026, 1, 20, 10, 0, tzinfo=timezone.utc),
            },
            {
                'slug': 'five-steps-to-proper-leather-care',
                'title': 'Five Steps to Proper Leather Care',
                'excerpt': (
                    'A simple ritual: wipe, tree, brush, condition, rest. Keep leather '
                    'alive without drowning it in product.'
                ),
                'content': (
                    '1. Wipe after wear. Dust and street grit act like sandpaper on grain. '
                    'A soft cloth takes seconds and saves years.\n\n'
                    '2. Insert cedar shoe trees while the leather is still warm. Trees '
                    'hold the last, absorb moisture, and prevent the toe from collapsing.\n\n'
                    '3. Brush before you condition. Lift dirt first so balm does not seal '
                    'grime into the hide.\n\n'
                    '4. Condition sparingly. Our Leather Conditioning Balm is meant for '
                    'thin coats every 4–6 weeks — more often in dry climates, less if the '
                    'leather still feels supple.\n\n'
                    '5. Rest the pair. Alternating shoes lets leather rebound. Repair '
                    'culture begins with patience: do not wear one pair into the ground.\n\n'
                    'Care is not vanity. It is how handmade objects stay in the world.'
                ),
                'cover_image': IMAGES['journal_3'],
                'category_label': 'Care',
                'published_at': datetime(2026, 3, 8, 10, 0, tzinfo=timezone.utc),
            },
        ]
        for data in articles:
            JournalArticle.objects.create(**data)
        self.stdout.write(f'  Journal articles: {len(articles)}')

    def _seed_testimonials(self):
        testimonials = [
            {
                'quote': (
                    'After six months, the boots feel less like something I purchased '
                    'and more like something I earned.'
                ),
                'attribution': 'Daniel R.',
                'product_name': 'Foundry Boot',
                'location': 'Chicago',
                'order': 1,
            },
            {
                'quote': (
                    'The Mercer took a month to mold to my stride. Now I reach for them '
                    'the way I reach for a favorite coat — without thinking.'
                ),
                'attribution': 'Amira K.',
                'product_name': 'The Mercer Cap-Toe Oxford',
                'location': 'Brooklyn',
                'order': 2,
            },
            {
                'quote': (
                    'I sent the Ledger back for a resole after four winters. The upper '
                    'still looks honest. That is the point of buying once.'
                ),
                'attribution': 'James T.',
                'product_name': 'The Ledger Chelsea Boot',
                'location': 'Portland',
                'order': 3,
            },
        ]
        for data in testimonials:
            Testimonial.objects.create(**data)
        self.stdout.write(f'  Testimonials: {len(testimonials)}')
