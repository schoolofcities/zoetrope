*Prereqs: git, Python 3.6 or later*
1. Clone the repository from Github, i.e. in terminal `git clone https://github.com/schoolofcities/zoetrope.git`

2. In terminal, set up a working environment using conda or virtualenv:
    * Using Conda:
        1. Create the environment: `conda create --name zoetrope-env`
        2. Activate the environment: `conda activate zoetrope-env`
        3. Install pip to the conda environment: `conda install pip`
        4. Navigate to the location of the requirements.txt file, and then install packages from file: `pip install -r requirements.txt`
        5. Check that the packages were installed into the environment correctly with: `conda list`
        * It is recommended to install the required packages into the conda environment using pip instead of conda because some of the packages are not readily available through conda
    * Using virtualenv:
        1. Install virtualenv using `pip install virtualenv`
        2. Create a virtual environment: `virtualenv zoetrope-venv`
        3. Activate the venv: `source venv/bin/activate` (Linux/MacOS) OR `source venv/Scripts/activate` (Windows)
        4. Install the packages from file: `pip install -r requirements.txt`
    * In either case, if installing the packages from the `requirements.txt` fails, install the packages individually using pip or conda. 

3. Create a `.env` file in the same directory as `manage.py`, containing the following variables ([guide](https://pypi.org/project/python-dotenv/) for python-dotenv):
    * _make sure_ `DEBUG = 1`
    * ZOE_SECRET_KEY
      * generate a value using `django.core.management.utils.get_random_secret_key`
    * GMAIL_PASS
      * contact maintainer (include what OS you are running)
    * Request API Key from maintainer or <a href='https://developers.google.com/maps/documentation/geocoding/get-api-key'>create your own</a> and assign to the following variables:
      * GOOGLE_SV_KEY
      * GOOGLE_MAPS_KEY
      * Note: Create a single key with the Geocoding API, Maps JavaScript API, and Street View Static API enabled, then reuse it for both variables above.
    * Use <a href='https://erangad.medium.com/upload-a-remote-image-to-s3-without-saving-it-first-with-python-def9c6ee1140'>this guide</a> to get values for the following variables:
      * AMAZON_S3_BUCKET_NAME
      * AMAZON_S3_ACCESS_KEY_ID
      * AMAZON_S3_SECRET_ACCESS_KEY

4. Create a database by running `manage.py`:
    1. first check for changes: `python manage.py makemigrations`
    2. then create database: `python manage.py migrate`

5. Run development server (`python3 manage.py runserver`)
6. Go to link specified in terminal