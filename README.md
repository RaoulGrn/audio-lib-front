# Audio Library

This project was made for the technical assessment of MMCTech. My task was to design and implement a digital music library, where you’ll be able to visualize your artists and their albums and open the albums to view a description and list of songs.
I also had to implement an autocomplete component that provides suggestions as a user enters a search box. 

## Technologies Involved

* Backend in NestJs
* Frontend in React(vite).
  
### Other modules/plugins/technologies:
            * styled components
            * react-bootstrap
            * mdb-react-ui-kit
            * react-icons
            * tailwindcss, postcss, autoprefixer
            * lodash.debounce - for limiting unnecessary API calls (autocomplete feature)
            * react-toaster - for custom success/error messages (toasts)
  
## How to run

* Clone the project
  
```bash
$ npm install
```

* You should create .env file (yes, it works on frontend) and enter a Google Youtube Data v3 API BUT (for testing purposes I will let my .env file come with my API key for a few days, just for testing purposes. (It is restricted anyway so no harm can be done). Check photos if you want to replace it.

<img src="https://github.com/RaoulGrn/audio-lib-front/assets/108396853/eaa4a27a-cbb9-4072-8c74-1cd26010b17c" width="50%" height="5%">
  
<img src="https://github.com/RaoulGrn/audio-lib-front/assets/108396853/e6eb1ca3-94e9-4f23-8c69-a726bb77cb12" width="50%" height="50%">

* Run the project

```bash
$ npm run dev
```

# Features 

## Public page which you can access and from where users can choose to register or login

<img src="https://github.com/RaoulGrn/audio-lib-front/assets/108396853/da271b6c-25f9-4cd1-9f7b-7291e225386f" width="100%" height="100%">

### Register Modal - With validators and success/error custom messages (react-toaster)

<img src="https://github.com/RaoulGrn/audio-lib-front/assets/108396853/3f682561-38b5-483c-bd25-f1a58b1b584b" width="100%" height="100%">

### Login Modal  - With validators and success/error custom messages (react-toaster)

<img src="https://github.com/RaoulGrn/audio-lib-front/assets/108396853/2fd60e88-2a83-4bd8-8b7d-d0302f07715a" width="100%" height="100%">

### Home Page - Where users can use the input to search for their preffered artists/album/songs.
* The input has an autocomplete feature that is sanitized and also has lodash.debounce implemented to limit unnecessary requests to the server
* If users click on a song name a youtube Iframe will appear
  
<img src="https://github.com/RaoulGrn/audio-lib-front/assets/108396853/70e98209-5cdb-4edf-acdd-97917e2eb14e" width="100%" height="100%">

<img src="https://github.com/RaoulGrn/audio-lib-front/assets/108396853/bd29b89d-960e-4d1a-a2ac-2bfdeb09f74a" width="100%" height="100%">

<img src="https://github.com/RaoulGrn/audio-lib-front/assets/108396853/8308939b-d16c-4a00-a9e8-e965a63834f2" width="100%" height="100%">

<img src="https://github.com/RaoulGrn/audio-lib-front/assets/108396853/5d3f07d6-14fe-4c64-bf65-8bd96b1debaa" width="100%" height="100%">

<img src="https://github.com/RaoulGrn/audio-lib-front/assets/108396853/bb8340ac-6e60-4929-9249-f359b0d33d34" width="100%" height="100%">

