# Biosphere

This project requires Python 3.11 or later. You will need to create a virtual environment and install the project dependencies. Here are the steps to do that:

## Setting Up the Virtual Environment

1. Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2. Create a virtual environment:

    ```shell
    python -m venv venv
    ```

3. Activate the virtual environment:

    On Windows, use:

    ```bash
    venv\Scripts\activate
    ```

    On Unix or MacOS, use:

    ```bash
    source venv/bin/activate
    ```

## Running the Project

1. Change current directory back to root directory:
    ```bash
    cd ..
    ```

2. Run the setup file:

    ```shell
    python setup.py
    ```

3. Set up the database:

    ```shell
    python setup-db.py
    ```

4. Run the servers:

    ```shell
    python run-servers.py
    ```

Please ensure that these scripts are run in the order mentioned above.