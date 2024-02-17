  # Perth PinPoint by "Nef Fan Club"  
Group (4) repository for Coders for Causes Summer Beginner Project (2023/24)  
> Members: [Torry](https://torrytw.ooo), [Anay](https://github.com/Anay-Joshi26) & [Connor](https://github.com/CJFernie)

![banner](https://github.com/codersforcauses/beginner-2023summer-g4/blob/main/app/frontend/assets/banner.png?raw=true)

Play PerthPinPoint Now: [perthpinpoint.city](https://perthpinpoint.city)

## Table of Contents:
0. [Original Repository](#original-repository)
1. [Concept](#concept)
2. [Features](#features)
3. [Google Maps API](#google-maps-ai)
4. [Structure](#structure)  
5. [Dependencies & Deployment](#dependencies--deployment)
6. [Testing](#testing)
7. [Demo](#demo)  
8. [LICENSE](#license)

## Concept
PerthPinpoint is a remake of the popular game "GeoGuessr" within the context of Perth, Western Australia. It features several different game modes which will test your knowledge about how well you know the amazing city of Perth.

## Features
Perth PinPoint features 3 gamemodes, including:
- Classic City
- Local Landmark
- Street Sleuth 

Challenge your friends by getting on the leaderboard for the Classic City game mode!

## Google Maps API
Perth PinPoint relies on Google Maps API for street view functionality. PerthPinPoint has its own associated API keys preloaded, or you can obtain your own [here](https://developers.google.com/maps/documentation/embed/get-api-key).

API Key Locations:
- `/app/frontend/main.html` (L31)
- `/app/frontend/js/components/streetview.js` (L71)

## Structure
Perth PinPoint is built with the stack such as:
Frontend - Vanilla HTML/CSS/JS
Backend - FastAPI (with Jinja2) & sqlite3
These components are stored in respective directores `app/frontend` and `app/backend`, with important files in `/` and `/app/core`
- please see "Dependencies & Deployment" for further information on configuarion


## Dependencies & Deployment
Perth PinPoint requires multiple dependencies, install them as such: 
```
pip install -r requirements.txt
```
\*assuming you are in the directory `/`  

Configuration:
To configure Perth PinPoint, edit `app/config.py`, code comments explain options however importantly if youre not intending to develop Perth PinPoint, `DEV` should be set to `False` to run in "production" mode - this (should) be the case for any (updated) code on the main branch.
- The host/port on which Perth PinPoint is made accesable is modifiable to suit enviroment needs (even on prod), see the config file or this is printed out via console upon running.

Running Perth PinPoint:
```sh
`which python3` app/init.py
```
\*assuming you are in the directory `/`  
or the respective windows equivilent

Deploying with Docker:
A Dockerfile exists, note this is configured for production deployment:

```
docker build -t perthpinpoint .
docker run --mount type=bind,source="$(pwd)/app/core",target=/pinpoint/app/core -dp 0.0.0.0:80:8080 --name "pinpoint" perthpinpoint
# docker stop pinpoint ; docker rm pinpoint
```

## Testing

Some basic tests have been developed to create a more robust program.

The tests are located in `app/tests/test_backend.py`.

To execute the tests run

```
pytest app/tests/test_backend.py
```

## Demo
Here is a quick demo of what the game looks like:
![demo](https://github.com/codersforcauses/beginner-2023summer-g4/blob/main/app/frontend/assets/classic-city-demo.gif?raw=true)

You can visit the `/tutorial` page for more information on the game 

## LICENSE
License: [here](/LICENSE)

### Original Repository:
The contents of the original repository (generated via `beginner-2023S`) is located [here](/beginner-2023summer-g4.bak/).  
This is for use of learning web technologies, namely javascript etc, etc...
