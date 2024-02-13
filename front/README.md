# :mortar_board: SBH - Study Buddy Hub - Front End

:it:

Questa è la documentazione di FronEnd React per un progetto MERN più ampio.

:uk:

This is the FronEnd React Documentation for a larger MERN project.

## :question: Why

This project is the final MERN project for start2impact full stack developer master course.

## :punch: General

:it:
La richiesta principale dell'esercizio era sviluppare l'autentificazione al sistema e la registrazione utente inoltre bisognava dare qualche funzionalita a piacere .
Ispirato da quest'ultimi anni si studio intenso e dagli obiettivi onu a cui a sua volta si inspira s2i e dalle persone conosciute in questa avventura ho voluto fare qualcosa che stimolasse lo studio di gruppo visto che io in prima persona e ho visto tanti altri dopo di me soprattuto all'inizio di un corso si trovano molto propensi allo studio di gruppo , lanciano qualche richiesta sul discord ma non sempre e' facile coordinare le tempistiche ma secondo me e' un esigenza servizio che potrebbe riempire questa piccola lacuna , supportare nell'incontro e nella creazione di piccoli gruppi studio. seguiranno ulteriori dettagli

:gb:
The main request of the exercise was to develop system authentication and user registration and it was also necessary to provide some functionality as desired.
Inspired by these last years of intense study and by the UN objectives which in turn inspire s2i and by the people I met in this adventure, I wanted to do something that stimulated group study since I personally and I have seen many others afterwards of me, especially at the beginning of a course, they find themselves very inclined towards group study, they launch some requests on the discord but it is not always easy to coordinate the timing but in my opinion it is a need for a service that could fill this small gap, support in ' meeting and creating small study groups. further details will follow

## :bulb: How it Works

:it:
La app avra' una Cover che e' la "Home page" quando non si e' loggati.
Le altre voci del menu per i non loggati saranno "Sign Up" , "Login" ed "About" che e' l'unica pagina tra queste insieme a "Page Not Found" per i path non gestiti che saranno uguali per gli utenti autenfificati e no.
Il menu per gli utenti autentificati invece sara' "Home"(dove si gestiranno i gruppi studio a cui si e' iscritti), "Groups" dove si potra creare un nuovo gruppo ed iscriversi ad altri oltre che navigare fra i gruppi.Ci sara' la pagina "About" che come gia' detto sara' l'unica se no nconsideriamo "Page not found" accessibile allo stesso modo da utenti autentificati o no.Ci sara' ovviamente la pagina per il "Logout" ed infine solo per utenti "admin" un pannello per creare nuove scuole , master e corsi a cui i gruppi faranno riferimento.

:en:
The app will have a Cover which is the "Home page" when you are not logged in.
The other menu items for non-logged in users will be "Sign Up", "Login" and "About" which is the only page among these together with "Page Not Found" for unmanaged paths which will be the same for authenticated users and no.
The menu for authenticated users will instead be "Home" (where you will manage the study groups you have signed up to), "Groups" where you can create a new group and subscribe to others as well as navigate between the groups. There will be ' the "About" page which, as already mentioned, will be the only one if we do not consider "Page not found" accessible in the same way by authenticated or non-authenticated users. There will obviously be the "Logout" page and finally only for users "admin" a panel to create new schools, masters and courses to which the groups will refer.

### :: ScreenShot

:it:
la app oltre alla gestionde dell'autentificazione che reputo molto approfondita ma in realta' che non richiede un manuale utente particolare, i lresto dell'app e' appena accennata, idee per renderla piu completa e complessa nel readme del progetto principale nella root folder.

Nonostante questo metto qualche screenshots di esempio.
:uk:
the app in addition to the authentication management which I consider very in-depth but in reality does not require a particular user manual, the rest of the app is just mentioned, ideas to make it more complete and complex in the readme of the main project in the root folder.

Despite this I post some example screenshots:

![Setting Render 2](/assets/pictures/render2Setting.png "Setting Render 2")
![cover](/assets/pictures/cover.png "cover")
![about](/assets/pictures/about.png "about")
![signup](/assets/pictures/signup.png "signup")
![login](/assets/pictures/login.png "login")
![cardmygroup](/assets/pictures/cardmygroup.png "cardmygroup")
![chat](/assets/pictures/chat.png "chat")
![groups](/assets/pictures/groups.png "groups")
![logout](/assets/pictures/groups.png "logout")

## :art:Styles

:it:
Per Gestire lo stile ho usato Tailwind.
Lo stile e' volutamente molto semplice ma ho voluto cercare di rendere il codice leggibile senza astrarre troppo . Ho quindi creato Elementi riutilizzabili alcuni anche personalizzabili , ed ho usato comunque una serie di variabili colore di base personalizzati per rendere piu veloce possibile eventual cambiamenti futuri , la tabella si trova nel file `index.css` nella root.
Le mediaquery sono molto semplici ed anche il menu' principale diventa a scomparsa in caso di schermo piccoli.

:en:
To manage the style I used Tailwind.
The style is deliberately very simple but I wanted to try to make the code readable without abstracting too much. I therefore created reusable elements, some of which were also customizable, and I still used a series of customized basic color variables to make any future changes as fast as possible, the table is found in the index.css file in the root.
The media queries are very simple and even the main menu disappears on small screens.

## :books: Dependencies

:it:
spiegazione delle librerie usate per scopo:
:uk:
explanation of libraries used for purpose:

### general react

"react": "^18.2.0"
"react-dom": "^18.2.0"
"react-router-dom": "^6.18.0"

## fetching

For react query and axios settings
"@tanstack/react-query": "^5.17.19",
"@tanstack/react-query-devtools": "^5.17.21"
"axios": "^1.6.1"

### Jwt Token and http only cookies

"js-cookie": "^3.0.5",
"jsonwebtoken": "^9.0.2"

### form

"react-hook-form": "^7.48.2",
"@hookform/resolvers": "^3.3.2",
"yup": "^1.3.2"

### toggle dark mode

"react-dark-mode-toggle": "^0.2.0"

### icons

"react-icons": "^4.11.0"

### spinners

"react-loader-spinner": "^6.1.6"
"react-spinners": "^0.13.8",

### carousel

"react-slick": "^0.30.1",
"slick-carousel": "^1.8.1",

### chat

"socket.io-client": "^4.7.2",
"react-scroll-to-bottom": "^4.2.0",

## :paw_prints: Settings config.env

:it:
Di file config.env ne ho pensati 2 , sono da creare quindi 2 file :
il primo si chiamra' `.env.development` ed avra' nel mio caso con il server in locale che gira su localhost:3005 :

:uk:
I thought of 2 config.env files, so 2 files need to be created:
the first will be called `.env.development` and in my case will have the local server running on localhost:3005

```
{VITE_APP_BASE_URL=http://localhost:3005/api/v1
VITE_APP_BASE_URL_SOCKET=http://localhost:3005}
```

:it:
il secondo si chiamera' `.env.production` ed avra' nel mio caso:

:uk:
the second will be called `.env.production` and will have in my case:

```
{VITE_APP_BASE_URL=https://s2i-study-buddy-hub-4coach.onrender.com/api/v1
VITE_APP_BASE_URL_SOCKET=https://s2i-study-buddy-hub-4coach.onrender.com}
```

## :tv: Deploy on netlify

Deploy for free on [netlify.com](https://app.netlify.com/)

if you want to immediately test the on line app :
[STUDYBUDDYHUB](https://studybuddyhub.netlify.app/)

## :floppy_disk: Installation

First of all, you need Node.js installed.  
If you don't have it, you can download it here:
[Node.js](https://nodejs.org/it/download/)  
After the installation, you're ready to go.

### 1 - Clone the repository

`git clone https://github.com/boobaGreen/S2INodeJsPOF`

IMPORTANT!! - NOW go to the FOLDER "front"" :
`cd back`

### 2 - Install the dependencies

REMEBER: we are in the "front" folder now!

`npm install`

### 3 - Start it

`npm run dev` for development mode, open the browser on http://localhost:4000/

## :page_with_curl: License

[MIT](https://choosealicense.com/licenses/mit/)

## :e-mail: Contact Me

Any questions? Send me an e-mail here: claudiodallara77@gmail.com <br>
You can find my Linkedin profile here: https://www.linkedin.com/in/claudio-dall-ara-244816175/
