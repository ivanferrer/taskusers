# Task Manager

Author: Ivan Soares Ferrer

Considerations:
- Created using PHP language and Javascript with React Js
- The folder {project}/ contain the APIs
- The folder {project}/database_files contain the database SQL structures   
- The folder {project}/resources/js/frontend contain the system frontend in react, layout screens use SCSS and use JavaScript language.

Role Users types default: admin, consult, editor and editor

The system no validation with login
          
Model:       crud task 

Build/runtime dependencies:
- PHP 7.29 or newer
- npm or yarn
- ReactJs 17.0.2 
- composer 1.10.6 or newer
- laravel using a mix to build js

 

Database:
- mysql 8.0.25 or newer

Framework PHP:
- Laravel 7.29


## Command to run application in:
In folder project:

Development:

```bash
    $ npm run dev
```
Watch application:
```bash
    $ npm run watch
```
Prodution:
```bash
    $ npm run prod
```


## Setup

Make copies of the files below. And change the compliance values ​​according to the project environment:

```bash
    $ cp {project}/.env.example {project}/.env
```


Run command for permissions on folder

```bash
$ chmod 755 -R {project}/storage/framework/cache/data
```



