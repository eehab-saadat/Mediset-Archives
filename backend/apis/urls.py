from django.urls import path, include
from rest_framework.routers import DefaultRouter # type: ignore
from .views import UserViewSet, TagViewSet, DatasetViewSet, TagRequestsViewSet, DatasetCollaboratorViewSet, DatasetTagViewSet, DatasetVotesViewSet, DatasetCommentsViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'tags', TagViewSet)
router.register(r'datasets', DatasetViewSet)
router.register(r'tagrequests', TagRequestsViewSet)
router.register(r'datasetcollaborators', DatasetCollaboratorViewSet)
router.register(r'datasettags', DatasetTagViewSet)
router.register(r'datasetvotes', DatasetVotesViewSet)
router.register(r'datasetcomments', DatasetCommentsViewSet)

urlpatterns = [
    path('', include(router.urls)),
]