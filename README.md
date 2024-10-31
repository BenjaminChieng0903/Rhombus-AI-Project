# Rhombus-AI-Project

## Table of Contents

- [Intro](#Intro)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
  
## Intro
This is a project for Rhombus AI task. The project aims to allow users to upload .csv or .xlsx files as feed for our backend to do type inference and type conversion. The tech stack for this project strictly follows the requirements -- React/Typescript for the Front-end and Django for the Back-end. The project focuses on the mixed dataset solution and tries its best to give a general solution for all different unique datasets. Additionally, it covers all the types that were given by the requirements. The architecture of this project has been refined, which is readable, maintainable and scalable.

## Project Structure

### Front-end Folder Structure
```
.
├── package-lock.json
├── package.json
├── public
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src
│   ├── App.css
│   ├── App.tsx
│   ├── apis
│   │   └── type-convert
│   │       └── TypeConvert.ts
│   ├── axios
│   │   └── app.ts
│   ├── component
│   │   ├── ResultDisplayTable
│   │   │   ├── ResultDisplayTable.css
│   │   │   └── ResultDisplayTable.tsx
│   │   └── UploadEntry
│   │       ├── UploadEntry.css
│   │       └── UploadEntry.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── pages
│   │   └── fileupload
│   │       ├── FileUpload.css
│   │       └── FileUpload.tsx
│   └── type
│       ├── ApiResponse.ts
│       └── interface
│           └── ResultDisplayTableProps.ts
└── tsconfig.json
```

### Back-end Folder Structure

```
.
├── backend
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── dataprocessing
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── migrations
│   │   └── __init__.py
│   ├── models.py
│   ├── static
│   │   ├── mixed_data_8_columns_standard_complex_500k.csv
│   │   └── sample_data.csv
│   ├── tests.py
│   ├── urls.py
│   ├── utils.py
│   └── views.py
└── manage.py

```
## Setup & Installation
### 1. Git Clone

use ```git clone https://github.com/BenjaminChieng0903/Rhombus-AI-Project.git``` command to clone this project into your local drive.

### 2. Open in Editor(VSCode Recommend)

find cloned project and open in VSCode

### 3. Front-end/React

1. Press ```Command + j``` to see your terminal bar.

2. use command ```cd client``` to enter front-end.

3. run command ```npm i``` to install dependencies.

4. run command ```npm run type-check``` to run ts type checking script (Optional).

### 4. Back-end/Django

1. use command ``` cd .. ``` and ``` cd server``` to enter backend folder

2. run command ```python3 -m venv venv``` to create the virtual environment for python in your local drive.

3. we need to activate our virtual env via ```source venv/bin/activate``` for Mac&Linux, ```venv\Scripts\activate``` for Windows.

4. run command ```pip3 install -r requirements.txt``` to install all backend dependencies based on requirement.txt.

5. run command ```python3 manage.py migrate``` to make sure db has the same structure as model.


## Usage

Once setup & installation is finished, use command ```npm run start``` to start front-end(default endpoint: [localhost://3000](http://localhost:3000/)) and ```python3 manage.py runserver``` to start back-end(default endpoint: http://127.0.0.1:8000/).
