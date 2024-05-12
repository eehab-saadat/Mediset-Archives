from rest_framework import viewsets # type: ignore
from .models import * 
from .serializer import * # type: ignore
from django.core.paginator import Paginator
from django.db import connection
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        print(User.objects.all())
        print(f"\nINFO MESSAGE: User {username} (Password: {password}) is trying to authenticate.", end="\n\n")
        user = authenticate(username=username, password=password)
        print(f"{user}")
        if user is not None:
            login(request, user)
            print("\nOK MESSAGE: User successfully authenticated and logged in.", end="\n\n")
            return JsonResponse({'status': 'success', 'message': 'User authenticated'}, status=200)
        else:
            print("\nERROR MESSAGE: Invalid credentials.", end="\n\n")
            return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=400)

class OAuthLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email').strip().lower()
        password = request.data.get('password').strip().lower()
        print(f"OAUTH REQUEST BY {email}")
        try:
            user = User.objects.get(Email=email)
            print(f"\nINFO MESSAGE: User {user.Username} ({user.Email}) is trying to authenticate.")
            if user is not None:
                if password == 'oauth':
                    password = user.password
                    login(request, user)
                    print("\nOK MESSAGE: User successfully authenticated and logged in.", end="\n\n")
                    return JsonResponse({'status': 'success', 'message': 'User authenticated'}, status=200)
                else:
                    print("\nERROR MESSAGE: Invalid password.", end="\n\n")
            else:
                print("\nERROR MESSAGE: User not found.", end="\n\n")
        except Exception as e:
            print(f"ERROR MESSAGE: {e}")

        return JsonResponse({'status': 'error', 'message': 'Invalid credentials'}, status=400)

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
        regex = self.request.query_params.get('contains', '')
        if ordered == 'True':
            limit = self.request.query_params.get('limit', None)
            queryset = Dataset.objects.filter(Name__contains=regex).order_by('-VoteCount', '-DownloadCount', '-CommentCount')
            if limit is not None:
                queryset = super().get_queryset(queryset=queryset)
            return queryset
        if regex != '':
            queryset = Dataset.objects.filter(Name__contains=regex)
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

class DatasetCommentsViewSet(BaseViewSet):
    queryset = DatasetComments.objects.all()
    serializer_class = DatasetCommentsSerializer

    def get_queryset(self):
        dataset = self.request.query_params.get('dataset', None)
        if dataset is not None:
            queryset = DatasetComments.objects.filter(DatasetID=dataset)
            return queryset
        return super().get_queryset()

def OwnershipView(APIView):
    def get(self, request):
        owner_id = request.query_params.get('OwnerID')
        user = request.user
        if user.UserID == owner_id:
            return JsonResponse({'response':'true'})
        else:
            return JsonResponse({'response':'false'})
        
def is_owner(request):
    if request.user.is_authenticated:
        owner_id = request.GET.get('OwnerID', '')
        user = request.user
        if user.UserID == owner_id:
            return JsonResponse({'response':'true'})
    return JsonResponse({'response':'false'})