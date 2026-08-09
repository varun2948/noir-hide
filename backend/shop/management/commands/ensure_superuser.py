"""
Idempotently create or update a Django superuser from environment variables.

Safe to run on every deploy: if the user exists, its password/flags are
refreshed; if `DJANGO_SUPERUSER_PASSWORD` is unset, the command is a no-op so
builds never fail.

Env vars:
    DJANGO_SUPERUSER_USERNAME  (default: "admin")
    DJANGO_SUPERUSER_EMAIL     (default: "admin@mocchi.local")
    DJANGO_SUPERUSER_PASSWORD  (required to actually create/update)
"""

import os

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Create or update a superuser from environment variables (idempotent).'

    def handle(self, *args, **options):
        User = get_user_model()

        username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
        email = os.environ.get('DJANGO_SUPERUSER_EMAIL', 'admin@mocchi.local')
        password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')

        if not password:
            self.stdout.write(self.style.WARNING(
                'DJANGO_SUPERUSER_PASSWORD not set — skipping superuser setup.'
            ))
            return

        user, created = User.objects.get_or_create(
            username=username,
            defaults={'email': email},
        )
        user.email = email
        user.is_staff = True
        user.is_superuser = True
        user.set_password(password)
        user.save()

        action = 'Created' if created else 'Updated'
        self.stdout.write(self.style.SUCCESS(f'{action} superuser "{username}".'))
