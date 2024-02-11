# :mortar_board: SBH - Study Buddy Hub - BACK END

:it:

Questa è la documentazione BACK END del progetto , nella root la documentazione generale e nella cartella front la documentazione FRONT END

:uk:

This is the BACK documentation of the project, in the main folder the GENERAL doc and in front folder the FRONT END doc.

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

![Screen Render Env](/back/pictures/renderEnv.png 'Screen Render Env')

:it:
Per il settings del progetto Render.com ci chiedera' di scegliere una repo da Github, nel nostro progetto indicheremo la cartella back perche' il link della repo punta all'intero progetto invece noi vogliamo scendere nella cartella `\back`.
Il progetto e' da lasciare cosi come e' sara' cura di Render.com creare la build , e poi deployare e lanciare il server.
Inoltre attenzione ad inserire come build command "yarn" e come start command `node server.js`nel mio caso o il file principale del back in generale.
Scegliamo yarn anche se in locale usaimo npm perhc'e render funziona meglio cosi per node js.
:uk:
For the project settings Render.com will ask us to choose a repo from Github, in our project we will indicate the back folder because the repo link points to the entire project instead we want to go to the `\back` folder.
Also be careful to insert "yarn" as the build command and `node server.js` as the start command in my case or the main back file in general.
We choose yarn even if we use npm locally because render works better this way for node js.

![Setting Render 1](/back/pictures/render1Setting.png 'Setting Render 1')
![Setting Render 2](/back/pictures/render2Setting.png 'Setting Render 2')

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
{
        # NODE_ENV=production
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

## :rocket: Chat

:it:
Ho voluto provare anche a gestire una chat. Ho scoperto l'utilizzo dei socket ed ho inziato a sperimentare un po' ... il file principale che gestisce la chat e' socketManager.js

:uk:
I also wanted to try managing a chat. I discovered the use of sockets and started experimenting a bit... the main file that manages the chat is socketManager.js
