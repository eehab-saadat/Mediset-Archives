from django.contrib import admin
from .models import *

admin.site.register(User)
admin.site.register(Tag)
admin.site.register(Dataset)
admin.site.register(TagRequests)
admin.site.register(DatasetCollaborator)
admin.site.register(DatasetTag)
admin.site.register(DatasetVotes)
admin.site.register(DatasetComments)