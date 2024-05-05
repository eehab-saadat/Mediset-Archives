from rest_framework import viewsets # type: ignore
from .models import * 
from .serializers import * # type: ignore

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class DatasetViewSet(viewsets.ModelViewSet):
    queryset = Dataset.objects.all()
    serializer_class = DatasetSerializer

class TagRequestsViewSet(viewsets.ModelViewSet):
    queryset = TagRequests.objects.all()
    serializer_class = TagRequestsSerializer

class DatasetCollaboratorViewSet(viewsets.ModelViewSet):
    queryset = DatasetCollaborator.objects.all()
    serializer_class = DatasetCollaboratorSerializer

class DatasetTagViewSet(viewsets.ModelViewSet):
    queryset = DatasetTag.objects.all()
    serializer_class = DatasetTagSerializer

class DatasetVotesViewSet(viewsets.ModelViewSet):
    queryset = DatasetVotes.objects.all()
    serializer_class = DatasetVotesSerializer

class DatasetCommentsViewSet(viewsets.ModelViewSet):
    queryset = DatasetComments.objects.all()
    serializer_class = DatasetCommentsSerializer