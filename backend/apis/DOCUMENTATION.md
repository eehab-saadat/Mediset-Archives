# API Documentation

## Base URL
All API requests are made to: `http://localhost:8000/apis/`

## Endpoints

### Users
- `GET /users/`: Returns a list of all users. Supports pagination with optional query parameters `limit`.
- `GET /users/{id}/`: Returns the details of a specific user.
- `POST /users/`: Creates a new user.
- `PUT /users/{id}/`: Updates a specific user.
- `DELETE /users/{id}/`: Deletes a specific user.

### Tags
- `GET /tags/`: Returns a list of all tags. Supports pagination with optional query parameters `limit`.
- `GET /tags/{id}/`: Returns the details of a specific tag.
- `POST /tags/`: Creates a new tag.
- `PUT /tags/{id}/`: Updates a specific tag.
- `DELETE /tags/{id}/`: Deletes a specific tag.

### Datasets
- `GET /datasets/`: Returns a list of all datasets. Supports pagination with optional query parameters `limit`. Also supports optional query parameters `ordered` and `limit` for ordering and limiting the number of datasets returned.
- `GET /datasets/{id}/`: Returns the details of a specific dataset.
- `POST /datasets/`: Creates a new dataset.
- `PUT /datasets/{id}/`: Updates a specific dataset.
- `DELETE /datasets/{id}/`: Deletes a specific dataset.

### Tag Requests
- `GET /tagrequests/`: Returns a list of all tag requests. Supports pagination with optional query parameters `limit`.
- `GET /tagrequests/{id}/`: Returns the details of a specific tag request.
- `POST /tagrequests/`: Creates a new tag request.
- `PUT /tagrequests/{id}/`: Updates a specific tag request.
- `DELETE /tagrequests/{id}/`: Deletes a specific tag request.

### Dataset Collaborators
- `GET /datasetcollaborators/`: Returns a list of all dataset collaborators. Supports pagination with optional query parameters `limit`.
- `GET /datasetcollaborators/{id}/`: Returns the details of a specific dataset collaborator.
- `POST /datasetcollaborators/`: Creates a new dataset collaborator.
- `PUT /datasetcollaborators/{id}/`: Updates a specific dataset collaborator.
- `DELETE /datasetcollaborators/{id}/`: Deletes a specific dataset collaborator.

### Dataset Tags
- `GET /datasettags/`: Returns a list of all dataset tags. Supports pagination with optional query parameters `limit`.
- `GET /datasettags/{id}/`: Returns the details of a specific dataset tag.
- `POST /datasettags/`: Creates a new dataset tag.
- `PUT /datasettags/{id}/`: Updates a specific dataset tag.
- `DELETE /datasettags/{id}/`: Deletes a specific dataset tag.

### Dataset Votes
- `GET /datasetvotes/`: Returns a list of all dataset votes. Supports pagination with optional query parameters `limit`.
- `GET /datasetvotes/{id}/`: Returns the details of a specific dataset vote.
- `POST /datasetvotes/`: Creates a new dataset vote.
- `PUT /datasetvotes/{id}/`: Updates a specific dataset vote.
- `DELETE /datasetvotes/{id}/`: Deletes a specific dataset vote.

### Dataset Comments
- `GET /datasetcomments/`: Returns a list of all dataset comments. Supports pagination with optional query parameters `limit`.
- `GET /datasetcomments/{id}/`: Returns the details of a specific dataset comment.
- `POST /datasetcomments/`: Creates a new dataset comment.
- `PUT /datasetcomments/{id}/`: Updates a specific dataset comment.
- `DELETE /datasetcomments/{id}/`: Deletes a specific dataset comment.

## Query Parameters
- `limit`: Limits the number of items on a page. Used for pagination. Supports only positive `Integer` input type.
- `ordered`: Orders the datasets by `-VoteCount`, `-DownloadCount`, `-CommentCount` when set to `True`. Only applicable to the `/datasets/` endpoint. Supports only `Boolean` input type.

> **Note:** A `detail` attribute is returned in the response JSON, in cases of PUT and POST to communicate error details. 

## Example Usage

### Fetching All Datasets

Hitting the API endpoint `GET http://localhost:8000/apis/datasets/` fetches all datasets available and returns a response similar to the following:

```json
[
    {
        "DatasetID": 1,
        "Name": "PCOS Dataset",
        "Description": "Some description.",
        "StoragePath": "/files/pcos_dataset.csv",
        "CreatedAt": "2024-05-05T11:29:27.382676Z",
        "LastEditedAt": "2024-05-05T11:29:27.382676Z",
        "VoteCount": 1,
        "DownloadCount": 3,
        "CommentCount": 0,
        "IsPublic": true,
        "OwnerID": 1,
        "LastEditedBy": 1
    },
    {
        "DatasetID": 2,
        "Name": "COVID Dataset",
        "Description": "Some description.",
        "StoragePath": "/files/covid_dataset.csv",
        "CreatedAt": "2024-05-05T11:30:21.759934Z",
        "LastEditedAt": "2024-05-05T11:30:21.759934Z",
        "VoteCount": 2,
        "DownloadCount": 3,
        "CommentCount": 0,
        "IsPublic": true,
        "OwnerID": 2,
        "LastEditedBy": 2
    }
]
```

### Fetching Top 15 Trending Datasets

Hitting the API endpoint `GET http://localhost:8000/apis/datasets/?limit=15&ordered=True`, a response similar to the following maybe returned:

```json
[
    {
        "DatasetID": 2,
        "Name": "COVID Dataset",
        "Description": "Some description.",
        "StoragePath": "/files/covid_dataset.csv",
        "CreatedAt": "2024-05-05T11:30:21.759934Z",
        "LastEditedAt": "2024-05-05T11:30:21.759934Z",
        "VoteCount": 2,
        "DownloadCount": 3,
        "CommentCount": 0,
        "IsPublic": true,
        "OwnerID": 2,
        "LastEditedBy": 2
    },
    {
        "DatasetID": 1,
        "Name": "PCOS Dataset",
        "Description": "Some description.",
        "StoragePath": "/files/pcos_dataset.csv",
        "CreatedAt": "2024-05-05T11:29:27.382676Z",
        "LastEditedAt": "2024-05-05T11:29:27.382676Z",
        "VoteCount": 1,
        "DownloadCount": 3,
        "CommentCount": 0,
        "IsPublic": true,
        "OwnerID": 1,
        "LastEditedBy": 1
    }
]
```

## Fetching A Specific Dataset

Hitting the API enpoint `GET http://localhost:8000/apis/datasets/2` returns the Dataset with `DatasetID` = 2.

```json
{
    "DatasetID": 2,
    "Name": "COVID Dataset",
    "Description": "Some description.",
    "StoragePath": "/files/covid_dataset.csv",
    "CreatedAt": "2024-05-05T11:30:21.759934Z",
    "LastEditedAt": "2024-05-05T11:30:21.759934Z",
    "VoteCount": 2,
    "DownloadCount": 3,
    "CommentCount": 0,
    "IsPublic": true,
    "OwnerID": 2,
    "LastEditedBy": 2
}
```