# :mortar_board: SBH - Study Buddy Hub - MERN STACK PROJECT

:it:
Se si utilizza la app di prova on line e si riscontrano dei ritardi nella risposta al primo accesso aspettare 1 minuto e riprovare probabilemente il server di render.com gratuito e' andato in sleep mode pochi secondi e dovrebbe partire alla prima richiesta ricevuta<br>
Questa è la documentazione GENERALE del progetto , nelle sottocartelle front e back si troveranno le documentazioni dettagliate per il back end ed il front end. menter nella versione `/assets/documentation.pdf` e `/assets/documentation.md` si trovano i 3 readme generale,back-end e front-end tutti insieme uno sotto l'altro.<br>

:uk:
If you use the online test app and experience delays in the response at the first login, wait 5 minutes and try again, probably the free render.com server went into sleep mode for a few seconds and should start at the first request received<br>

## :boom: Try Now!

[StudyBuddyHub](https://studybuddyhub.netlify.app/)

## :hammer: Tools

![Javascript](https://img.shields.io/badge/Javascript-F0DB4F?style=for-the-badge&labelColor=black&logo=javascript&logoColor=F0DB4F)
![React](https://img.shields.io/badge/-React-61DBFB?style=for-the-badge&labelColor=black&logo=react&logoColor=61DBFB)
![Nodejs](https://img.shields.io/badge/Nodejs-3C873A?style=for-the-badge&labelColor=black&logo=node.js&logoColor=3C873A)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![SASS Badge](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-092749?style=for-the-badge&logo=tailwindcss&logoColor=06B6D4&labelColor=000000)
![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![React Query](https://img.shields.io/badge/-React_Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
![VSCode](https://img.shields.io/badge/Visual_Studio-0078d7?style=for-the-badge&logo=visual%20studio&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

## :question: Why

This project is the final MERN project for start2impact full stack developer master course.

## :punch: General

:it:
La richiesta principale dell'esercizio era sviluppare l'autentificazione al sistema e la registrazione utente inoltre bisognava dare qualche funzionalita a piacere .
Ispirato da quest'ultimi anni di studio e dagli obiettivi onu a cui a sua volta si inspira s2i e dalle persone conosciute in questa avventura ho voluto fare qualcosa che stimolasse lo studio di gruppo visto che io in prima persona e ho visto tanti altri dopo di me soprattuto all'inizio di un corso si trovano molto propensi allo studio di gruppo , lanciano qualche richiesta sul discord ma non sempre e' facile coordinare le tempistiche ma secondo me e' un esigenza servizio che potrebbe riempire questa piccola lacuna , supportare nell'incontro e nella creazione di piccoli gruppi studio. seguiranno ulteriori dettagli

:uk:
The main request of the exercise was to develop system authentication and user registration and it was also necessary to provide some functionality as desired.
Inspired by these last years of intense study and by the UN objectives which in turn inspire s2i and by the people I met in this adventure, I wanted to do something that stimulated group study since I personally and I have seen many others afterwards of me, especially at the beginning of a course, they find themselves very inclined towards group study, they launch some requests on the discord but it is not always easy to coordinate the timing but in my opinion it is a need for a service that could fill this small gap, support in ' meeting and creating small study groups. further details will follow

## :art: Pricipal Functions

:it:
-Gli utenti possono iscriversi o essere fondatori di tre gruppi al massimo contemporaneamente
-Gli utenti possono creare un gruppo studio solo se prima scelgono un corso su cui appogiare il gruppo.
-Un partecipante ad un gruppo puo' accedere alla chat privata del gruppo.
-Un utente puo' cancellarsi da un gruppo e se e' il fondatore eliminare il gruppo.
-Solo gli admin possono acceder alla Admin Panel per creare Scuole,Master e Corsi su cui gli utenti potranno appoggiare i loro gruppi studio

-Login tramite mail e password
-Sign up che crea la scheda utente ma in stato Pending. poi manda una email che poi andra' aperta e cliccato il link di conferma per rendere l'account Active
-Funzione di Forgot password che mandera' una mail con link che ha validita' 10 minuti per eventuale cambio password.

:uk:
Users can join or be founders of up to three groups at the same time
-Users can create a study group only if they first choose a course on which to base the group.
-A participant in a group can access the group's private chat.
-A user can unsubscribe from a group and if he is the founder delete the group.
-Only admins can access the Admin Panal to create Schools, Masters and Courses on which users can support their study groups

-Login via email and password

- Sign up which creates the user card but in Pending status sends an email which will then be opened and the confirmation link must be clicked to make the account Active
  -Forgot password function which will send an email with a link valid for 10 minutes for any password change.

## :triangular_ruler: General Architecture

![Alt text](/assets/pictures/finalProjextDoc.png "General Architecture")

:it:
Il back end e' basato su NODE-JS ed EXPRESS per la gestione del server , utilizziamo MONGOOSE per aiuatrci a gestire il database MONGO-DB.
Il front end e' sviluppato in React con diverse librerie , fra le principal cito ReactQuery(tenstackquery) ed Axios per la gestione delle fetch , context api e reducer per la gestione degli stati, Cookies e Jwt token per la gestione delle autorizzazoni.
Tailwind e' la scelta principale per la gestione dello stile.

:uk:
The back end is based on NODE-JS and EXPRESS for server management, we use MONGOOSE to help us manage the MONGO-DB database.
The front end is developed in React with various libraries, the main ones being ReactQuery (tenstackquery) and Axios for managing fetches, context api and reducer for managing states, Cookies and Jwt tokens for managing authorizations.
Tailwind is the leading choice for style management.

## :door: Security

![Alt text](/assets/pictures/jwt.png "Jwt")

:it:
La sicurezza per l'accesso e' gestita con token JWT / HTTP ONLY COOKIES per l'autorizzazione principale alle api.
La password viene registrata sul database encryptata.(bcrypt).
Invce i token di conferma account e cambio password scordata visto che sono temporanei e gia' spediti via mail ho deciso per questo progetto di lasciarli solo bcrytati senza gestione jwt.
C'e un controllo quindi sia lato back end che front end sull'autorizzazione solo gli utenti loggati possono vedere alcuni parti del menu front end ma per molte operazioni sensibili il controllo viene effettuato anche lato back.
Una volta registrato un nuovo utente sara' in "status : pending" finche' non clicchera' il link di autorizzazione nella mail ricevuta sull'indirizzo di registrazione. Una volta cliccato sul link lo stato diventera' "Active".
I tokens con il link di conferma via mail dopo la registrazione e anche quello per il cambio passowrd provvisorio ( che ha validita- di 10 minuti) hanno solo uno livello di crypting con Bcrypt ma non sono jwt come il gettone principale di autentificazione.

Avevo per motivi di studio anche implementato l'accesso tramite "google auth" ed in locale funziona con alcune limitazioni per esempio 100 indirizzi di "test" massimo che possono interagire col progetto , e con notifica aggiuntiva di google che l'app non 'e sicura seguendo queste info per chi fosse interessato ad approfondire : [Google OAuth2](https://developers.google.com/identity/protocols/oauth2?hl=it).
In locale funziona bene , e fa riferimento a localhost:4000 (nel mio caso), invece per renderlo operativo con i siti dove ho deployato il back end ed il front end al momento mi e' impossibile , perche' google richiede solo domini di primo livello e SSL e https , cosa che al momento mi e' impossibile o molto difficile gratuitamente . Anche usando servizi di reindirizzamento serve montare un server Linux per esempio che faccia il reindirezzamento.

:uk:
Access security is managed with a JWT token.
The password is recorded in the encrypted database.
However, since the account confirmation and forgotten password change tokens are temporary and already sent via email, for this project I decided to leave them only bcrytated without jwt management.
There is therefore a control on both the back end and front end on the authorization only logged in users can see some parts of the front end menu but for many sensitive operations the control is also carried out on the back side.
Once registered, a new user will be in "status: pending" until they click the authorization link in the email received on the registration address. Once you click on the link the status will become "Active".
The tokens with the confirmation link via email after registration and also the one for the temporary password change (which is valid for 10 minutes) only have one level of encryption with Bcrypt but are not jwt like the main authentication token.

For study reasons I had also implemented access via "google auth" and locally it works with some limitations for example 100 maximum "test" addresses that can interact with the project, and with additional notification from Google that the app is not secure by following this info for those interested in learning more: [Google OAuth2](https://developers.google.com/identity/protocols/oauth2?hl=it).
Locally it works well, and refers to localhost:4000 (in my case), however it is impossible for me to make it operational with the sites where I have deployed the back end and the front end at the moment, because Google only requires first domains level and SSL and https, which at the moment is impossible or very difficult for me for free. Even using redirection services you need to set up a Linux server for example that does the redirection.

```

### :triangular_flag_on_post: Note

:it:
Per leggere i campi dipendenti da altre' entita' ricordarsi di usare "populate" come in questo estratto del progetto :

:uk:
To read fields dependent on other entities, remember to use "populate" as in this project excerpt:

```

{
const populateOptions = [
{ path: 'school', select: 'name' },
{ path: 'master', select: 'name' },
{ path: 'course', select: 'name' },
{ path: 'participants.user', select: 'userName' }, // Aggiunta per popolare i partecipanti
{ path: 'founder', select: 'userName' }, // Aggiunta per popolare i partecipanti
];

}

## :rocket: Chat

:it:
la chat funziona di base con dei socket in ascolto sul server. la chat e' in tempo reale ma viene anche registrata sul database in un campo relativo ad ogni gruppo di studio <br>
essendo una funziona sperimentale e non oggeto prncipale del progetto scolastico in essere non entro nei particolari qui nella documentazione ma rimango a disposizione nei contatti in calce per ulteriori info <br>

:ukn:
the chat basically works with sockets listening on the server. the chat is in real time but is also recorded on the database in a field relating to each study group<br>
Since it is an experimental function and not the main object of the existing school project, I will not go into detail here in the documentation but I remain at your disposal with the contacts at the bottom for further information<br>

## :bulb: IDEAS

:it:
Il progetto potrebbe avere anche una gestione delle foto profilo ma diventava una scelta da gestire che complicava ancora il progetto , quindi ho fatto un po' di ricerche ma per il momento ho voluto sorvolare.
In futuro si potrebbero implementare dei punteggi bonus / malus , che si ottengono da gli altri utenti del gruppo magari in base alla frequenza nel gruppo o altri fattori, si potrebbe cosi decidere se entrare o fare entrare qualcuno nel gruppo con una bassa reputazione. Si potrebbe aggiungere un controllo su quando qualcuno o tutti nel gruppo superano l'esame relativo con punti o badge dedicati.

Si potrebbe pensare di monetizzare in almeno 3 modi:

- funzioni aggiuntive per gli utenti premium , per esempio adesso il numero massimo di gruppi contemporanei e' 3, si potrebbe rendere piu alto o manipolare questo numero dietro un abbonamento premium (occasione per approfondire e testare Stripe o altre librerie per i pagamenti reali) o per esempio rendere il fatto di creare piu' di un gruppo una funzione premium invce iscriversi una funzione free ecc ecc
- gestione dei tutor , utenti esperti che abbiano dimostrato frequenza costanza ed affidabilita' coi punteggi e badge interni, una volta completato un master per esempio potrebbero diventare Tutor, essere sceltri da un gruppo che andranno a seguire e che paghera' una somma extra che andra' al tutor ed in precentuale al sito
- servizio esterno per le scuole , una scuola per inserirsi nell'elenco e aggiunegre i suoi master ed i suoi corsi dovrebbe pagare una somma annuale al sito , ed aggiungere cosi un servizio molto fidelizzante fra quelli proposti ... in questo caso si potrebbe escludere dalla vista dell'user la scelta delle altre scuole per esempio.

:uk:
The project could also have profile photo management but it became a choice to manage which further complicated the project, so I did a bit of research but for the moment I wanted to ignore it.
In the future, bonus/malus scores could be implemented, which are obtained from other users in the group, perhaps based on frequency in the group or other factors, so it could be decided whether to enter or have someone with a low reputation join the group. You could add a check on when someone or everyone in the group passes the relevant exam with dedicated points or badges.

You could think of monetizing in at least 3 ways:

- additional functions for premium users, for example now the maximum number of simultaneous groups is 3, this number could be made higher or manipulated behind a premium subscription (an opportunity to delve deeper and test Stripe or other libraries for real payments) or for example, making the fact of creating more than one group a premium function instead of signing up a free function etc etc
- management of tutors, expert users who have demonstrated frequency, consistency and reliability with internal scores and badges, for example once they have completed a master's degree they could become tutors, be chosen by a group that they will follow and who will pay an extra sum which will ' to the tutor and in percentage to the site
- external service for schools, for a school to be included in the list and add its masters and courses it would have to pay an annual sum to the site, and thus add a very loyalty-building service among those offered... in this case it could be excluded from the user's view the choice of other schools for example.

## :tv: External Service

:it:
Per il database come gia' detto utilizzo il servizio base di Cloud di [MongoDb](https://www.mongodb.com/it-it)
Per il deploy del backend il servizio gratuito base di [render.com](https://app.netlify.com/)
Per il deploy del frontend il servizio gratito base di [netlify.com](https://app.netlify.com/)
Per il servizio di mail transictional il servizio base gratuito di [brevo.com](https://www.brevo.com/it/)
Per il servizio di mail usato in develpoment local mode il servizio gratuito base [mailtrap.io](https://mailtrap.io/)

:uk:
For the database, as already mentioned, I use the basic Cloud service of [MongoDb](https://www.mongodb.com/it-it)
For the deployment of the backend the free basic service of [render.com](https://app.netlify.com/)
For the deployment of the frontend the free basic service of [netlify.com](https://app.netlify.com/)
For the transitional email service, the free basic service of [brevo.com](https://www.brevo.com/it/)
For the email service used in local development mode, the free basic service [mailtrap.io](https://mailtrap.io/)

if you want to immediately test the endpoints use this link for the test response from browser or with a GET:

[test backend](https://s2i-study-buddy-hub-4coach.onrender.com/test)

if you want to immediately see the site :
[test frontend](https://studybuddyhub.netlify.app/)

## :floppy_disk: Installation

First of all, you need Node.js installed.
If you don't have it, you can download it here:
[Node.js](https://nodejs.org/it/download/)
After the installation, you're ready to go.
you will find instructions for local installation or deployment both in the \front and \back folders in the readme.md relating to the front-end and back-end in detail.

[MIT](https://choosealicense.com/licenses/mit/)

## :e-mail: Contact Me

Any questions? Send me an e-mail here: claudiodallara77@gmail.com <br>
You can find my Linkedin profile here: https://www.linkedin.com/in/claudio-dall-ara-244816175/
