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

## :art:Styles

:it:
Per Gestire lo stile ho usato Tailwind.
Lo stile e' volutamente molto semplice ma ho voluto cercare di rendere il codice leggibile senza astrarre troppo . Ho quindi creato Elementi riutilizzabili alcuni anche personalizzabili , ed ho usato comunque una serie di variabili colore di base personalizzati per rendere piu veloce possibile eventual cambiamenti futuri , la tabella si trova nel file index.css nella root.

:en:
To manage the style I used Tailwind.
The style is deliberately very simple but I wanted to try to make the code readable without abstracting too much. I therefore created reusable elements, some of which were also customizable, and I still used a series of customized basic color variables to make any future changes as fast as possible, the table is found in the index.css file in the root.

## :books: Dependencies

"@hookform/resolvers": "^3.3.2",
"@tanstack/react-query": "^5.17.19",
"@tanstack/react-query-devtools": "^5.17.21",
"axios": "^1.6.1",
"js-cookie": "^3.0.5",
"jsonwebtoken": "^9.0.2",
"react": "^18.2.0",
"react-dark-mode-toggle": "^0.2.0",
"react-dom": "^18.2.0",
"react-hook-form": "^7.48.2",
"react-icons": "^4.11.0",
"react-loader-spinner": "^6.1.6",
"react-router-dom": "^6.18.0",
"react-slick": "^0.30.1",
"slick-carousel": "^1.8.1",
"socket.io-client": "^4.7.2",
"react-spinners": "^0.13.8",
"react-scroll-to-bottom": "^4.2.0",
"yup": "^1.3.2"

:it:

## :tv: Test Endpoint now !

Deploy for free on Render.com:

if you want to immediately test the endpoints use this link:
`https://s2i-pof.onrender.com/`

## :floppy_disk: Installation

First of all, you need Node.js installed.  
If you don't have it, you can download it here:
[Node.js](https://nodejs.org/it/download/)  
After the installation, you're ready to go.

### 1 - Clone the repository

`git clone https://github.com/boobaGreen/S2INodeJsPOF`

### 2 - Install the dependencies

`npm install`

### 3 - Start it

add this scripts at your "package.json" file :

```
"scripts": {
    "start": "SET NODE_ENV=development&&nodemon server.js",
    "start:prod": "SET NODE_ENV=production&&nodemon server.js",
  },
```

`npm start` - start in DEV mode default (error's message are set for developers)
`npm start:prod ` - start in PROD mode (error's messages are set for clients)

### 4 - Connect your MongoDB database

Create, if don't exist, a `config.env` file and the insert an enviroment variable named `DB` with your MongoDB connection string. Set a `PORT` , in the example is "3000" , if not set the default is 5000.
There is a configFAKE.env file as an example and as a possible template.

EXAMPLE "config.env" :

```
PORT=3000
DB=mongodb://localhost:27017/NodePOFLocal
```

in the example above it is a local MongoDb database but you can also connect one in the cloud , the string will be approximately :

```
mongodb+srv://claudiodallara77:cA3K32LqwPsvsqWs@cluster0.3dfdb4w.mongodb.net/POF-S2I-NodeJs?retryWrites=true&w=majority
```

### 5 - Extra - Import already packaged data for Testing

The dev-data folder contains sample data to help test your project: `orders.json` `products.json` , and `orders.json` .
There is also a file utility `import-dev-data.js` that is used to import sample files with one click or delete the entire database.

from the terminal in the main project folder launch the following command to import the files:

```
node dev-data\data\import-dev-data.js --import
```

to delete use instead:

```
node dev-data\data\import-dev-data.js --delete
```

### 6 - Test it with a client

Using something like Postman, you can start using this API on the the same port (in the example : 3000).

For convenience, with the button below you can access the entire collection relating to the project on postman with all the queries and documentation.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/29686969-8160f5f1-20a3-46ab-9f91-eeae9e858ef1?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D29686969-8160f5f1-20a3-46ab-9f91-eeae9e858ef1%26entityType%3Dcollection%26workspaceId%3D876f4699-cfab-4d6d-a566-22ea8c0045e9)

## :open_file_folder: Endpoints

I used the envoiroments variable {{URL}} which in DEV mode can be replaced directly by 127.0.0.1:3000 (or instead of 3000 the port you are using), and in the PROD phase it can be replaced by the domain real.

For the deploy site use the real name , in my case : `https://s2i-pof.onrender.com`

### Users

You can get the entire users list with a GET request:

`/api/v1/users/`

or GET data for a specific user:

`/api/v1/users/:userID`

:userID must be a valid MongoDB id.  
You can PATCH or DELETE user data with the same endpoint.

Finally, you can add a new user with a POST request:

`/api/v1/users/`

```json
{
  "name": "insert an alphanumeric string (apostrophe exception), min 2 characters , max 40",
  "surname": "insert an alphanumeric string (apostrophe exception), min 2 characters , max 40",
  "email": "insert a valid email"
}
```

### Products

You can get the entire targets list with a GET request:

`/api/v1/products`

or GET data for a specific target:

`/api/v1/products/:productsID`

:productsID must be a valid MongoDB id.  
You can PATCH or DELETE a target with the same endpoint.

Finally, you can add a new target with a POST request:

`/api/v1/products`

```json
{
  "name": "an alphanumeric string (`-` exception) , min 3 characters, max 40"
}
```

### Orders

You can get all the available orders with a GET request

`/api/v1/orders`

You can get all the order for one specific day (in this example 2023-10-27) with this GET request .

`/api/v1/orders/?createdAt[lte]=2023-10-27T23:59:59.999Z&createdAt[gte]=2023-10-27T00:00:00.000Z`

You can get all the order after a specific day&time (in this example 2023-10-27 , 20:30) with this GET request .

`/api/v1/orders/?createdAt[gte]=2023-10-27T11:58:52.255Z`

You can get all the order before a specific day&time (in this example 2023-10-27 , 11:58:52) with this GET request .

`/api/v1/orders/?createdAt[lte]=2023-10-27T11:58:52.000Z`

You can get all the orders that contain a specific product or a specific list of products by they "name" field , separate by a comma:

`/api/v1/orders/getOrdersByProductName?productNames=dattero,miele`

or GET data for a specific product by id:

`/api/v1/:ordersID`

You can PATCH or DELETE a target with the same endpoint.

For a new order, use a POST request:

`/api/v1/orders`

```json
{
  "buyers": ["653afc5f684ac741822e6124", "653b7fd7d6b437985a02a501"],
  "products": ["653b7e3be0406350e6b284ce", "653b7e2fe0406350e6b284ca"]
}
```

the `"createdAt"` field will then be created which will be used for the filters and display order according to the main requirements

## :mag_right: API feautures

In all the GET function you can set the fields you want to project in the response object or to not include("-", minus sign before the name without space)

EXAMPLE (exclude the "\_\_v" field from this response):
`/api/v1/products/?page=2&limit=3&fields=-_v`

In all GetAllOrders,GetAllUsers and GetAllProducts you can set a `limit` and the page selected for every query .
EXAMPLE (set : page 2 , limit 3):
`/api/v1/products/?page=2&limit=3`.

You can `sort` the response of the GetAll functions :
EXAMPLE (sort ascending by name):
`/api/v1/products/?sort=name`.

For the Orders- "get all" the default orders is "-createdAt" (newest first) , for switch use "sort=createdAt" (no minus sign)

## :triangular_ruler: Database Architecture

The Product collection is very simple with only the "name" field.
I only set the validation rules (see Endpoints section)

The User collection is very simple with the "name","surname" and the "email" fields.
I only set the validation rules (see Endpoints section)

For "Order collection" however, different choices could already be made. Each order will have a list of related products and a list of buyers. Given the nature of small and widespread purchasing groups for example from small direct growers, I thought that the lists would never be too long (one - few). I therefore decided to register an array containing the IDs of the "buyers" and an array with the IDs of the products. I therefore decided that in the get phase the other details are also populated which are therefore virtual fields of both the product and the users

## :page_with_curl: License

[MIT](https://choosealicense.com/licenses/mit/)

## :e-mail: Contact Me

Any questions? Send me an e-mail here: claudiodallara77@gmail.com <br>
You can find my Linkedin profile here: https://www.linkedin.com/in/claudio-dall-ara-244816175/
