# :mortar_board: SBH - Study Buddy Hub - BACK END

:it:

Questa è la documentazione BACK END del progetto , nella root la documentazione generale e nella cartella front la documentazione FRONT END

:uk:

This is the BACK documentation of the project, in the main folder the GENERAL doc and in front folder the FRONT END doc.

## :cop: API - Main endpoints

:it:
il back end e' in grado di gestire molte altri endpoint ma al momento spiego l'utilizzo di quelli utilizzati nel front end per quello che serve per il

:uk:
the back end is able to manage many other endpoints but at the moment I will explain the use of those used in the front end for what is needed for the project.

### General

:it:
La `root` sara' per esempio <br> `localhost:3005` (se il server e' in ascolto come nel mio caso sulla porta 3005)<br> oppure il il dominio che ospita il server on line nel nostro caso<br> `https://s2i-study-buddy-hub-4coach.onrender.com/`.<br>
Le rotte pincipali sono 5: <br>

:uk:
For example, the `root` will be <br> `localhost:3005` (if the server is listening on port 3005 as in my case)<br> or the domain that hosts the online server in our case<br> > `https://s2i-study-buddy-hub-4coach.onrender.com/`.<br>

`/test<br>
`/api/v1/users`<br>
`/api/v1/schools`<br>
`/api/v1/masters`<br>
`/api/v1/courses`<br>
`/api/v1/groups`<br>

### /test

:it:
La prima rotta e' molto semplice facendo una `GET` rispondera' con 200 SUCCESS quando il server e' on line . la rotta e' pubblica (le rotte pubbliche sono comunque gestite dal limiter per evitare abusi).<br>

:uk:
The first route is very simple doing a `GET` will respond with 200 SUCCESS when the server is online. the route is public (public routes are however managed by the limiter to avoid abuse).<br>

### /users

:it:
La seconda rotta principale `user` contiene : <br>

:uk:
The second main route `user` contains : <br>

```
{

 // THIS ROUTES ARE NOT PROTECT
  GET   - users/confirmAccount/:activeToken
  POST  - users/signup
  POST  - users/login
  GET   - users/forgotPassword
  PATCH - users/resetPassword/:token

  // THIS ROUTE IS PROTECT ONLY WITH JWT IN HEADERS REQ (bearer token)
  GET   - users/validateToken

}
```

#### GET - users/confirmAccount/:activeToken

The active token is the link receveid in the confirmation email after the signup.<br>

For 200 SUCCES case received the JWT token and activate the account from "Pending" to "Active" state in the database.

#### POST - users/signup

`body req:{password:string(min 8) , passwordConfirm(equal to passord) , userName:string(min3,max30), email:string-valid-format-Email-Address}` <br>

For 200 SUCCESS case receive the email for Activate the account

#### POST - users/login

`body req:{password:string(min 8) ,email:string-valid-format-Email-Address}`<br>

For 200 SUCCESS case receive the JWT token for access the site app.

#### POST - users/forgotPassword

`body req:{email:string-valid-format-Email-Address}`<br>

For 200 SUCCESS case receive the email with the temporary link for change the password.

#### PATCH- users/resetPassword:token

the token is the token in the link received via mail after the "forget password request"
`body req:{password:string(min8),passwordConfirm(string equal to password field )}`<br>

For 200 SUCCESS case receive set the new password in the database.

#### GET - users/validateToken

This endpoint is referred to with a get and putting req in the heder. as bearer token the authorization jwt.

`body req:{password:string(min8),passwordConfirm(string equal to password field )}`<br>
`header: jwt bearer token`

For 200 SUCCESS case receive the object with the user details: <br>
Here a response example

```
{
  status: 'success',
  message: 'Token is valid',
  userName: "claudio dallara",
  email: "claudiodallara77@gmail.com"
  role: "user"
  _id: 55556545d54s5d45,
}

```

### ### /schools

:it:
il prossimo endpoint e' /schools .
e' un endpoint protetto, bisogna sempre mettere jwt come bearer token nell'headere della richiesta. possono accedere solo gli admin al POST , possono accedere tutti al GET
:uk:
the next endpoint is /schools.it is a protected endpoint, you must always put jwt as a bearer token in the request header. Only admins can access POST, everyone can access GET

#### GET - schools/

This endpoint is referred to with a get and putting req in the heder. as bearer token the authorization jwt.<br>

For 200 SUCCESS case receive the object data whit an array of the groups details: <br>
Here a response example :

```
  {
  status: 'succes',
  results: doc.length,
  data: { data: doc },
  requestedAt: req.requestTime,
  }
```

#### POST - schools/

This endpoint is referred to with a get and putting req in the heder. as bearer token the authorization jwt.<br>
This endpoint is for create a new schools, PROTECT only for "admin" <br>

`body req:{name:string,site:valid-email-format)}`<br>
`header: jwt bearer token`

For 200 SUCCESS case cerate a new school in database and receive the new object create <br>

### ### /schools

:it:
il prossimo endpoint e' /schools .
e' un endpoint protetto, bisogna sempre mettere jwt come bearer token nell'headere della richiesta. possono accedere solo gli admin al POST , possono accedere tutti al GET
:uk:
the next endpoint is /schools.it is a protected endpoint, you must always put jwt as a bearer token in the request header. Only admins can access POST, everyone can access GET

#### GET - /schools

This endpoint is referred to with a get and putting req in the heder. as bearer token the authorization jwt.<br>

For 200 SUCCESS case receive the object data with an array of the groups details: <br>
Here a response example :

```
  {
  status: 'succes',
  results: doc.length,
  data: { data: doc },
  requestedAt: req.requestTime,
  }
```

#### POST - /schools

This endpoint is referred to with a get and putting req in the heder. as bearer token the authorization jwt.<br>
This endpoint is for create a new schools, PROTECT only for "admin" <br>

`body req:{name:string,site:valid-email-format)}`<br>
`header: jwt bearer token`

For 200 SUCCESS case create a new school in database and receive the new object create <br>

### ### /masters

:uk:
the next endpoint is /masters is a protected endpoint, you must always put jwt as a bearer token in the request header. Only admins can access POST, everyone can access GET

#### GET - /masters

This endpoint is referred to with a get and putting req in the heder. as bearer token the authorization jwt.<br>

For 200 SUCCESS case receive the object data with an array of the masters details: <br>
Here a response example :

```
  {
  status: 'succes',
  results: doc.length,
  data: { data: doc },
  requestedAt: req.requestTime,
  }
```

#### POST - /masters

This endpoint is referred to with a get and putting req in the heder. as bearer token the authorization jwt.<br>
This endpoint is for create a new master, PROTECT only for "admin" <br>
the relevant school to insert is the index `_id` of the home school to be taken from the "schools" table

`body req:{name:string,school:objectId}`<br>
`header: jwt bearer token`

For 200 SUCCESS case create a new master in database and receive the new object create <br>

### ### /courses

:uk:
the next endpoint is /course is a protected endpoint, you must always put jwt as a bearer token in the request header. Only admins can access POST, everyone can access GET

#### GET - /courses

This endpoint is referred to with a get and putting req in the heder. as bearer token the authorization jwt.<br>

For 200 SUCCESS case receive the object data with an array of the courses details: <br>
Here a response example :

```
  {
  status: 'succes',
  results: doc.length,
  data: { data: doc },
  requestedAt: req.requestTime,
  }
```

#### POST - /courses

This endpoint is referred to with a get and putting req in the heder. as bearer token the authorization jwt.<br>
This endpoint is for create a new master, PROTECT only for "admin" <br>
the relevant school to insert is the index `_id` of the home school to be taken from the "schools" table
the relevant master to insert is the index `_id` of the home master to be taken from the "masters" table

`body req:{name:string,school:objectId),master:objectId)}`<br>
`header: jwt bearer token`

For 200 SUCCESS case create a new course in database and receive the new object create <br>

### ### /groups

:uk:
the next endpoint is /groups is a protected endpoint, you must always put jwt as a bearer token in the request header. Everyone (use,admin,mod ecc )can access GET and POST.

#### GET - /groups

This endpoint is referred to with a get and putting req in the heder. as bearer token the authorization jwt.<br>

For 200 SUCCESS case receive the object data with an array of the groups details: <br>
Here a response example :

```
  {
  status: 'succes',
  results: doc.length,
  data: { data: doc },
  requestedAt: req.requestTime,
  }
```

#### POST - /courses

This endpoint is referred to with a get and putting req in the heder. as bearer token the authorization jwt.<br>
This endpoint is for create a new group <br>
the relevant school to insert is the index `_id` of the home school to be taken from the "schools" table
the relevant master to insert is the index `_id` of the home master to be taken from the "masters" table
the relevant course to insert is the index `_id` of the home course to be taken from the "courses" table

`body req:{name:string,school:objectId,master:objectId,course:objectId}`<br>
`header: jwt bearer token`

For 200 SUCCESS case create a new group in database ( the founder is the user who create the group )and receive the new object create <br>

### ### Other Endpoint

:it:
ci sono altri endpoint pronti nel backend come per esempio, il getOne per le scuole/master/corsi/gruppi, il deleteMe , getMe per l'user, il cambio password ma da loggati ed altro ... ma visto che non sono sviluppati sul front end del progetto sorvolo

:uk:
there are other endpoints ready in the backend such as, for example, getOne for schools/masters/courses/groups, deleteMe, getMe for the user, changing password but when logged in and more... but since they are not developed on the front end of the flyover project

## :blue_book: DataBase MONGO DB MONGOOSE

:it:
Il database e' sviluppato in MongoDb con servizio cloud integrato.

:uk:
The database is developed in MongoDb with integrated cloud service.
There are 5 main tables :
-User
-Group
-Course
-Master
-School

SCHOOL SCHEMA (MONGOOSE) :

```
{
  name: {
  type: String,
  required: true,
  unique: true,
  },
  site: {
  type: mongoose.SchemaTypes.Url,
  }
}

```

MASTER SCHEMA (MONGOOSE) :

```
{
  name: {
    type: String,
    required: true,
  },
  school: {
    type: mongoose.Schema.ObjectId,
    ref: 'School',
    required: [true, 'Course must belong to a school.'],
  }
  }

```

COURSE SCHEMA (MONGOOSE) :

```
{
   name: {
    type: String,
    required: true,
  },
  master: {
    type: mongoose.Schema.ObjectId,
    ref: 'Master',
    required: [true, 'Course must belong to a master.'],
  },
  school: {
    type: mongoose.Schema.ObjectId,
    ref: 'School',
    required: [true, 'Course must belong to a school.'],
  },
  }

```

GROUP SCHEMA (MONGOOSE) :

```
{
  name: {
    type: String,
    required: [true, 'Group must have a name'],
    unique: true,
    index: true, // altrimenti unique non funziona
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: [true, 'Group must refer to a course'],
  },
  master: {
    type: mongoose.Schema.ObjectId,
    ref: 'Master',
    required: [true, 'Group must refer to a master'],
  },
  school: {
    type: mongoose.Schema.ObjectId,
    ref: 'School',
    required: [true, 'Group must refer to a school'],
  },
  founder: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Group must refer to a founder'],
  },
  participants: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },

      dateStart: { type: Date, default: Date.now() },
      dateEnd: { type: Date, default: null },
    },
  ],

  maxParticipants: {
    type: Number,
    default: 2,
  },
  currentParticipantsNumber: {
    type: Number,
    virtual: true,
    get: function () {
      return this.participants.length;
    },
  },
  chat: [
    {
      user: {
        type: String,
        required: [true, 'Chat message must have a user'],
      },
      message: {
        type: String,
        required: [true, 'Chat message must have a message'],
      },
      date: {
        type: Date,
        default: Date.now,
        required: [true, 'Chat message must have a date'],
      },
    },
  ]
  }

```

USER SCHEMA (MONGOOSE) :

```
{
 userName: {
    type: String,
    required: [true, 'A user must have a name'],
    minlength: 3,
    maxlength: 30,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  role: {
    type: String,
    enum: ['user', 'mod', 'admin', 'tutor'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please provide a confirm password'],
    validate: {
      // This only works on CREATE and SAVE !!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same!',
    },

    select: false,
  },
  passwordChangedAt: {
    type: Date,
    select: false,
  },
  passwordResetToken: {
    type: String,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
  activeToken: {
    type: String,
    select: false,
  },
  status: {
    type: String,
    enum: ['Pending', 'Active', 'Ban'],
    default: 'Pending',
  }
}

## :hammer: Tools

![Javascript](https://img.shields.io/badge/Javascript-F0DB4F?style=for-the-badge&labelColor=black&logo=javascript&logoColor=F0DB4F)
![Nodejs](https://img.shields.io/badge/Nodejs-3C873A?style=for-the-badge&labelColor=black&logo=node.js&logoColor=3C873A)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)
![VSCode](https://img.shields.io/badge/Visual_Studio-0078d7?style=for-the-badge&logo=visual%20studio&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

## :dart: Settings for env file e Render.com

:it:
Per semplicita' ho aggiunto un file `config.fake` dovrebbe servire per semplificare la stesura del file stesso in locale o nel modo in qui si settono le variabile d'ambiente nel sistema di deploy scelto. Nel mio caso su render si puo' caricare un file intero con copia incolla del suo contenuto (prima tolgo le righe commentate ) ed in un sol ocopia incolla si riescono a craicare tutte le variabili d'ambiente altrimenti si posono aricare una alla volta.
:uk:
For simplicity I added a `config.fake` file which should serve to simplify the drafting of the file itself locally or in the way in which the environment variables are set in the chosen deployment system. In my case on render you can load an entire file with copy and paste of its contents (first I remove the commented lines) and in a single copy and paste you can create all the environment variables otherwise they can be loaded one at a time.

![Screen Render Env](/assets/pictures/pictures/renderEnv.png 'Screen Render Env')

:it:
Per il settings del progetto Render.com ci chiedera' di scegliere una repo da Github, nel nostro progetto indicheremo la cartella back perche' il link della repo punta all'intero progetto invece noi vogliamo scendere nella cartella `\back`.
Il progetto e' da lasciare cosi come e' sara' cura di Render.com creare la build , e poi deployare e lanciare il server.
Inoltre attenzione ad inserire come build command "yarn" e come start command `node server.js`nel mio caso o il file principale del back in generale.
Scegliamo yarn anche se in locale usaimo npm perhc'e render funziona meglio cosi per node js.
:uk:
For the project settings Render.com will ask us to choose a repo from Github, in our project we will indicate the back folder because the repo link points to the entire project instead we want to go to the `\back` folder.
Also be careful to insert "yarn" as the build command and `node server.js` as the start command in my case or the main back file in general.
We choose yarn even if we use npm locally because render works better this way for node js.

![Setting Render 1](/assets/pictures/pictures/render1Setting.png 'Setting Render 1')
![Setting Render 2](/assets/pictures/pictures/render2Setting.png 'Setting Render 2')

:it:
La variabile NODE_ENV e' impostata su develpment nll'esempio questo vuol dire che puntera' al frontend locale impostato su localhost:4000 .
Se si vuole puntare al front end di produzione in questo progetto https://studybuddyhub.netlify.app allora commentare la riga # NODE_ENV=development e toglier il commento # alla riga NODE_ENV=production.
Per lavorare su server locale far partire il programma da locale ricordarsi di coordinare il frontend in tal caso .
ALtra differenza in cui incide la variabile NODE_ENV e' che se in production usa il servizio di BREVO e manda mail reali se invece in development utilizza il servizio fittizio di MAILTRAP.
:uk:
The NODE_ENV variable is set to developpment in the example, this means that it will point to the local frontend set to localhost:4000.
If you want to point to the production front end in this project https://studybuddyhub.netlify.app then comment out the line # NODE_ENV=development and uncomment # the line NODE_ENV=production.
To work on a local server, start the program locally, remember to coordinate the frontend in this case.
Another difference affected by the NODE_ENV variable is that if in production it uses the BREVO service and sends real emails while in development it uses the fictitious MAILTRAP service.

```

{ # NODE_ENV=production
NODE_ENV=development

    # PORT SETTING
    PORT=3005

    # NODE VERSION IMPORTANT FOR SETTING
    # RENDER ON COM DEVELOP
    NODE_VERSION=18.17.1

    # GENERAL FRONT SIDE ADDRESS
    FRONT_SITE_WEB=https://studybuddyhub.netlify.app
    FRONT_SITE_LOCAL=http://localhost:4000

    # VARIABLE AFFECTED ONLY FOR GOOGLE AUTH
    # WHICH IS CURRENTLY LOCALLY ONLY IN DEV MODE
    BACK_SITE_WEB=http://localhost:3005
    CLIENT_ID=866088888888-k7s0obpjca3rj75mjnaah0dk704rrrw3.apps.googleusercontent.com
    CLIENT_SECRET=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

    # MONGODB SETTINGS
    USER_NAME=claudiodallara77
    DATABASE_PASSWORD=sD1K22PwkBertyKs
    DATABASE=mongodb+srv://claudiodallara77:<password>@cluster0.2efcc4w.mongodb.net/S2iStudyBuddyHub?retryWrites=true&w=majority

    # BREVO SETTINGS
    API_KEY_BREVO=xkeysib-6d64537333e73730129b8rtdgf785458758cf756621984cd2bf7777777bdb666-yTvfhlT2vyjSa3KX

    # JWT SETTINGS
    JWT_SECRET=fullstack-project-secret.007-dallaRussiaConFurore-Cesena
    JWT_EXPIRES_IN=90d
    JWT_COOKIE_EXPIRES_IN=90

    # MAIL TRAP SETTINGS
    EMAIL_USERNAME=9e77fd5c0a564e
    EMAIL_PASSWORD=80127255r6b921
    EMAIL_HOST=sandbox.smtp.mailtrap.io
    EMAIL_PORT=25

}

```

:it:
Ho voluto provare anche a gestire una chat. Ho scoperto l'utilizzo dei socket ed ho inziato a sperimentare un po' ... il file principale che gestisce la chat e' socketManager.js

:uk:
I also wanted to try managing a chat. I discovered the use of sockets and started experimenting a bit... the main file that manages the chat is socketManager.js

## :floppy_disk: Installation

:it:
Prima di tutto, è necessario che Node.js sia installato.
Se non ce l'hai puoi scaricarlo qui:
[Node.js](https://nodejs.org/it/download/)
Dopo l'installazione, sei pronto per partire.

:uk:
First of all, you need Node.js installed.
If you don't have it, you can download it here:
[Node.js](https://nodejs.org/it/download/)
After the installation, you're ready to go.

### 1 - Clone the repository

`git clone https://github.com/boobaGreen/S2I-STUDY_BUDDY_HUB_4COACH`

IMPORTANT!! - NOW go to the FOLDER "back" :
`cd back`

### 2 - Install the dependencies

REMEBER: we are in the "back" folder now!

`npm install`

### 3 - Setting the config.env file

:it:
Sopra abbiamo già elencato tutte le variabili d'ambiente da impostare.
Ricordo di lasciare decommentata la modalità desiderata se sviluppo punterà al front end locale e utilizzerà "mailtrap" di default, se produzione allora punterà al front end indicato come web e utilizzerà "brevo" per inviare email vere e proprie

:uk:
Above we have already listed all the environment variables to be set.
I remember to leave the desired mode uncommented if development will point to the local front end and will use "mailtrap" by default, if production then it will point to the front end indicated as web and will use "brevo" to send real emails

```

{ # NODE_ENV=production
NODE_ENV=development`
}

```

### 4 - Start it

add this scripts at your "package.json" file :

```

"scripts": {
"start": "SET NODE_ENV=development&&nodemon server.js",
"start:prod": "SET NODE_ENV=production&&nodemon server.js",
},

```

`npm start` - start in DEV mode default (error's message are set for developers)
`npm start:prod ` - start in PROD mode (error's messages are set for clients)

[MIT](https://choosealicense.com/licenses/mit/)

## :e-mail: Contact Me

Any questions? Send me an e-mail here: claudiodallara77@gmail.com <br>
You can find my Linkedin profile here: https://www.linkedin.com/in/claudio-dall-ara-244816175/
```
