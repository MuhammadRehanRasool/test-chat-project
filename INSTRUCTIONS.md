Generic Things Todo (irrespective of platform you're deploying on)

1. Folder structure

There are two things:
a. client (frontend - can be compressed aka build)
b. server (backend - can't be compressed and need to be running anytime aka host)

when a user types a url "www.facebook.com" the request goes to server and it returns a response

In our case we would simply

return => api endpoints => their respective results
return => "/" aka not any api endpoint => return the compressed website content

For that reason, there are plenty of structures but we would use:

ROOT/client (all frontend content)
ROOT/index.js
ROOT/... (rest of backend files)

In simple words we have added client folder in "server" folder and now "server" folder acts as a ROOT folder

2. URLs used within FRONTEND aka CLIENT

So in our case we are using sockets for which we need to define the endpoint of server and
it's dynamic so we need to make sure we enter the actual site link on which server will be deployed

3. Build/Compress FRONTEND aka CLIENT (not compulsory)

=> terminal command => npm run build

4. Make sure of BACKEND

a. All links for frontend should also be updated with where it's deployed. (could be the same as backend's link as well)
b. Configurations of database (free deploy platform might not provide database service so you might need external service for that)
c. Backend serves the build website content from "client/build" folder when the request is coming as "/"

const path = require("path"); (at the top)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

instead of

app.get("/", (req, res) => {
    res.send("Hello from Express!");
});

NOTE: it needs to be added right after the other routers are specified

app.use(userRouter);
app.use(dashboardRouter);
....
HERE
....

++++++

add =>

app.use(express.static(path.join(__dirname, "client", "build")));

right after

app.use(cors());
....
HERE
....

if the URL shows an error => "Error: ENOENT: no such file or directory, stat 'D:\PROGRAMMING\Fiverr\chatHelp\client\build\index.html'"
it means you have a problem in STEP#3, to validate it go manually in client folder and see if there exists a BUILD folder

<!-- URL PART -->

suppose we have a page in
frontend as "/login"

and then we have endpoint in backend as "/login"

now this will be collision so make sure of that!

d. CORS link can either be allowed for everyone "*" or any specific url "frontend-url"

e. const port = process.env.PORT || 5000; (Most important)


Now that we have successfully merged the frontend aka client with server!


We will move to DEPLOYMENT:

Specific Things Todo (respective of platform you're deploying on):

1. Make keys in "scripts" in "package.json" of server
2. one for pre-processing (things need to done before starting the server i.e install npm modules of client and then build frontend and maybe migrations)
3. one for starting the server

"start": "node index.js",
"build": "npm install && cd client && npm install && npm run build",