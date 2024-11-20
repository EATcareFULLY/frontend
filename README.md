# Getting Started with EatcareFully
## How to run:
For a simple dev version
### `npm start`

## How to test:
 for a whole test check use
### `npm test`
If you want to DO NOT want check coverage of the code use: 
### `rightclick on __tests__ and run`
### What's the sufficient coverage?
### `around 50-60% for all stats`
### What should be tested?
`Services`
`Components`
### Uncovered lines
All red should be covered. Yellow is not necessary.
## Service worker:
### What is it?
It stores the data from the frontend and backend provider.
### What data should be in it?
html, css, images, cached fetch responses.
### Where can I find it?
Firefox:
`Inspect -> Data -> Local storage -> Link -> my-pwa-cache1`
Chrome: 
`Inspect -> Application -> Cache storage -> my-pwa-cache1`
# Possible errors
## Page is reloading infinitely
Go to your browser settings and clear storage for a whole website.
Probably service worker registered itself twice
## I see the old version of application 
It can happen that old data from service worker overrides the port that you want to use.
You just need to delete my-pwa-cache1.
`Service worker occupies url so it may save your different project which was hosted using this url.` 
## Some pages are on infinite loading
Redirect doesn't seem to work currently so page is blocked on loading screen
## keycloak true error
After no activity for a long time, error occurs stating 'true' caused by keycloak.
logs:
(:8080/realms/eat-car…nid-connect/token:1
Failed to load resource: the server responded with a status of 400 (Bad Request)
Uncaught (in promise) true)
