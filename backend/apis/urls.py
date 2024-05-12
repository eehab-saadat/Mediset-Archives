from django.urls import path, include
from rest_framework.routers import DefaultRouter # type: ignore
from .views import *

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')
router.register(r'tags', TagViewSet, basename='tag')
router.register(r'datasets', DatasetViewSet, basename='dataset')
router.register(r'tagrequests', TagRequestsViewSet)
router.register(r'datasetcollaborators', DatasetCollaboratorViewSet)
router.register(r'datasettags', DatasetTagViewSet)
router.register(r'datasetvotes', DatasetVotesViewSet)
router.register(r'datasetcomments', DatasetCommentsViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('oauth/', OAuthLoginView.as_view(), name='oauth-login'),
    path('isowner/', is_owner, name='is-owner')
]