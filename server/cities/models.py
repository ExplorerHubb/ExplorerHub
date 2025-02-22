from django.db import models
from cloudinary.models import CloudinaryField
# Create your models here.



class City(models.Model):
 
    choices = [('coastal','Coastal'),('agricultural','Agricultural'),('industrial','Industrial'),('desert','Desert')]

    name = models.CharField(max_length=100)
    funfact = models.TextField()
    type = models.CharField(max_length=100,choices=choices)
    image = CloudinaryField('image',default='http://res.cloudinary.com/djibubqdg/image/upload/v1739547762/g2kxssiifzsqbac9tar3.jpg')
    
    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name


class FamousFood(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    city = models.ManyToManyField(City,related_name='famous_food')

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name
    

CATEGORY_DEFAULT_IMAGES = {
    'catering': 'https://res.cloudinary.com/djibubqdg/image/upload/v1740060765/xdamt9qiiq8bjlt99zio.jpg',
    'catering.restaurant': 'https://res.cloudinary.com/djibubqdg/image/upload/v1740060828/oapjqql8kp7njuhxsxag.jpg',
    'catering.bar':'https://res.cloudinary.com/djibubqdg/image/upload/v1740060663/ayoqnkjihysirxunwcad.jpg',
    'catering.cafe':'https://res.cloudinary.com/djibubqdg/image/upload/v1740060724/oqmtktr8jxx1va6frxu7.jpg',
    'catering.fast_food':'https://res.cloudinary.com/djibubqdg/image/upload/v1740060871/nlpmbjjtbknogksmwoca.jpg',
    'bulding.catering':'https://th.bing.com/th/id/R.a32ef99d3e94728afd5b0fc3048379d1?rik=5tYdTDTwkbrdgQ&pid=ImgRaw&r=0'
}

class CateringPlace(models.Model):

    name = models.CharField(max_length=200,null=True)
    country_code = models.CharField(max_length=10)
    city = models.ForeignKey(City,on_delete=models.CASCADE,related_name='catering_place')
    district = models.TextField(null=True,blank=True)
    suburb = models.TextField(null=True,blank=True)
    street = models.TextField(null=True,blank=True)
    formatted = models.TextField(null=True,blank=True)
    categories = models.CharField(max_length=100)
    image = CloudinaryField('image',default = 'catering_places/caf.jpg')
    
    house_number = models.CharField(max_length=1000,null=True,blank=True)
    website = models.URLField(max_length=100,null=True,blank=True)
    opening_hours = models.CharField(max_length=200,null=True,blank=True)
    contact = models.CharField(max_length=100,null=True,blank=True)
    facilities = models.CharField(max_length=100,null=True,blank=True)
    catering = models.CharField(max_length=100,null=True,blank=True)
    phone = models.CharField(max_length=50,null=True,blank=True)
    email = models.EmailField(max_length=200,null=True,blank=True)


        
    def __str__(self):
        return self.name

ACCOMMODATION_DEFAULT_IMAGES = {
    'accommodation': 'https://res.cloudinary.com/djibubqdg/image/upload/v1740063223/zwhfighfqaga6vnqfs3o.jpg',
    'accommodation.hotel': 'https://res.cloudinary.com/djibubqdg/image/upload/v1740062669/iqkuxcp4t5uchdxycv2f.webp',
    'accommodation.apartment':'https://res.cloudinary.com/djibubqdg/image/upload/v1740062992/kdosencepaag7uobwe5i.jpg',
    'accommodation.hostel':'https://res.cloudinary.com/djibubqdg/image/upload/v1740062957/trmt5yfmg8lieciv6l5x.jpg',
    'accommodation.guest_house':'https://res.cloudinary.com/djibubqdg/image/upload/v1740063049/z3nrgzxtrumexuzk6xuk.png',
    'accommodation.hut':'https://res.cloudinary.com/djibubqdg/image/upload/v1740063087/vhefin0bvvblau0pknua.jpg',
    'accommodation.motel':'https://res.cloudinary.com/djibubqdg/image/upload/v1740063132/m4roixqhqssz3ngogsyp.jpg'
}


ENTERTAINMENT_DEFAULT_IMAGES = {
    'entertainment': 'https://res.cloudinary.com/djibubqdg/image/upload/v1740064787/xid1v4x0savn1qydxckq.jpg',
    'entertainment.museum': 'https://res.cloudinary.com/djibubqdg/image/upload/v1740064843/tj3zef0lctfteuefnj8m.jpg',
    'building':'https://res.cloudinary.com/djibubqdg/image/upload/v1740064884/amkzqkeggovj7znwkypn.jpg',
    'entertainment.cinema':'https://res.cloudinary.com/djibubqdg/image/upload/v1740064928/oxmjvni7vl72polepw9h.jpg',
    'entertainment.culture':'https://res.cloudinary.com/djibubqdg/image/upload/v1740064964/dagth78zxh82vmi57fde.jpg',
    'building.tourism':'https://res.cloudinary.com/djibubqdg/image/upload/v1740065016/b71gjxdz0cvkezvzre2p.jpg',
    'entertainment.culture.theatre':'https://res.cloudinary.com/djibubqdg/image/upload/v1740065055/xenn7cvwxnb95sfwarjl.jpg',
    'entertainment.zoo':'https://res.cloudinary.com/djibubqdg/image/upload/v1740065132/ytzdi43fw2avtezbdkes.jpg',
    'building.historic':'https://res.cloudinary.com/djibubqdg/image/upload/v1740065190/a5hwtfibiadpfcfwv3tc.jpg',
    'entertainment.theme_park':'https://res.cloudinary.com/djibubqdg/image/upload/v1740065245/wjvvjvn2tzmw9qsjtxzb.jpg',
    'entertainment.miniature_golf':'https://res.cloudinary.com/djibubqdg/image/upload/v1740065342/zj5obyyq6uktacxqjef1.jpg',
}
class EntertainmentPlace(models.Model):
    name = models.CharField(max_length=200,null=True)
    country_code = models.CharField(max_length=10)
    city = models.ForeignKey(City,on_delete=models.CASCADE,related_name='entertainment_place')
    district = models.TextField(null=True,blank=True)
    suburb = models.TextField(null=True,blank=True)
    street = models.TextField(null=True,blank=True)
    formatted = models.TextField(null=True,blank=True)
    categories = models.CharField(max_length=100)
    image = CloudinaryField('image',default = 'catering_places/caf.jpg')
    house_number = models.CharField(max_length=1000,null=True,blank=True)
    website = models.URLField(max_length=100,null=True,blank=True)
    opening_hours = models.CharField(max_length=200,null=True,blank=True)
    contact = models.CharField(max_length=100,null=True,blank=True)
    facilities = models.CharField(max_length=100,null=True,blank=True)
    catering = models.CharField(max_length=100,null=True,blank=True)
    phone = models.CharField(max_length=50,null=True,blank=True)
    email = models.EmailField(max_length=200,null=True,blank=True)

    def __str__(self):
        return self.name
    
class ShoppingMallsPlace(models.Model):
    name = models.CharField(max_length=200,null=True)
    country_code = models.CharField(max_length=10)
    city = models.ForeignKey(City,on_delete=models.CASCADE,related_name='shopping_place')
    district = models.TextField(null=True,blank=True)
    suburb = models.TextField(null=True,blank=True)
    street = models.TextField(null=True,blank=True)
    formatted = models.TextField(null=True,blank=True)
    categories = models.CharField(max_length=100)
    image = CloudinaryField('image',default = 'catering_places/caf.jpg')
    house_number = models.CharField(max_length=1000,null=True,blank=True)
    website = models.URLField(max_length=100,null=True,blank=True)
    opening_hours = models.CharField(max_length=200,null=True,blank=True)
    contact = models.CharField(max_length=100,null=True,blank=True)
    facilities = models.CharField(max_length=100,null=True,blank=True)
   
    phone = models.CharField(max_length=50,null=True,blank=True)
    email = models.EmailField(max_length=200,null=True,blank=True)

    def __str__(self):
        return self.name
    

class Accommodation(models.Model):
    name = models.CharField(max_length=200,null=True)
    country_code = models.CharField(max_length=10)
    city = models.ForeignKey(City,on_delete=models.CASCADE,related_name='accommodation_place')
    district = models.TextField(null=True,blank=True)
    suburb = models.TextField(null=True,blank=True)
    street = models.TextField(null=True,blank=True)
    formatted = models.TextField(null=True,blank=True)
    categories = models.CharField(max_length=100)
    image = CloudinaryField('image',default = 'catering_places/caf.jpg')
    house_number = models.CharField(max_length=1000,null=True,blank=True)
    website = models.URLField(max_length=100,null=True,blank=True)
    opening_hours = models.CharField(max_length=200,null=True,blank=True)
    contact = models.CharField(max_length=100,null=True,blank=True)
    facilities = models.CharField(max_length=100,null=True,blank=True)
    phone = models.CharField(max_length=50,null=True,blank=True)
    email = models.EmailField(max_length=200,null=True,blank=True)

    def __str__(self):
        return self.name

