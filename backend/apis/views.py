from rest_framework import viewsets # type: ignore
from .models import * 
from .serializer import * # type: ignore
from django.core.paginator import Paginator
from django.db import connection

class BaseViewSet(viewsets.ModelViewSet):
    def get_queryset(self, queryset=None):
        if queryset is None:
            queryset = super().get_queryset()
        limit = self.request.query_params.get('limit', None)
        if limit is not None:
            paginator = Paginator(queryset, limit)
            page = self.request.query_params.get('page', 1)
            queryset = paginator.get_page(page)
        return queryset

class UserViewSet(BaseViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TagViewSet(BaseViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

class DatasetViewSet(BaseViewSet):
    queryset = Dataset.objects.all()
    serializer_class = DatasetSerializer

    def get_queryset(self):
        ordered = self.request.query_params.get('ordered', False)
        if ordered == 'True':
            limit = self.request.query_params.get('limit', None)
            queryset = Dataset.objects.all().order_by('-VoteCount', '-DownloadCount', '-CommentCount')
            if limit is not None:
                queryset = super().get_queryset(queryset=queryset)
            return queryset
        return super().get_queryset()

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