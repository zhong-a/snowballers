# snowballers

```
Uncaught error when login button is clicked doesn't actually impact the functionality, you can check in firestore to see that the user is still added/logged in upon clicking the button

Here is the firestore link where you can verify this: 

https://console.firebase.google.com/u/0/project/snowballers-198f9/firestore/data~2Fusers~2FmZglE3hUTERVGecrk98u2y7k2Zh1

also one easy way to demo run the project is to use: 
$ npm run dev
and then go to http://localhost:8080/

A sample workflow to demo the app is as follows:
1. create an account (use a reasonably long name so it'll meet our account criteria (not something like e@e.e))
2. click back to log in
3. log in with that account
4. click make teams
5. make a team (show off different team sizes + passwords)
6. Click see teams
7. join a team
8. maybe join a different team with a password or something
```

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Run locally 

# install Surge
npm install --global surge

npm run build 

surge
# first time you run you'll be prompted to sign up, register
# click enter to confirm folder of app, surge will deploy the app build to the url specified in the next line
https://docs.kontent.ai/tutorials/develop-apps/get-started/run-sample-app?tech=javascript

note: if you get a permission denied error, try retyping in the URL surge gave you previously 
