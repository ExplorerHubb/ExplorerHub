import json
from django.core.management.base import BaseCommand
from cities.models import CateringPlace,City,EntertainmentPlace,ShoppingMallsPlace,Accommodation

class Command(BaseCommand):
    help = 'Import external JSON file data into Djnago database'

    def handle(self,*args,**kwargs):
        with open(r'C:\Users\sebaa\Desktop\final_project_starUnion\main_project\mysite\server\file.json','r',encoding='utf8') as file:
            data = json.load(file)
            print(data)

        for item in data:
            Accommodation.objects.create(
                
                name=item['name'],
                country_code=item['country_code'],
                city=City.objects.get(id=item['city']),
                district=item.get('district', None),
                suburb=item.get('suburb', None),
                street=item.get('street', None),
                formatted=item.get('formatted', None),
                categories=item['categories'],
                
                house_number=item.get('house_number', None),
                website=item.get('website', None),
                opening_hours=item.get('opening_hours', None),
                contact=item.get('contact', None),
                facilities=item.get('facilities', None),
               
                phone=item.get('phone', None),
                email=item.get('email', None)
            )
        self.stdout.write(self.style.SUCCESS('DONE'))
