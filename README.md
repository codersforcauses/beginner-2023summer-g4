# Perth PinPoint by "Nef Fan Club"  
Group (4) repository for Coders for Causes Summer Beginner Project (2023/24)  
> Members: [Torry](https://torrytw.ooo), [Anay](https://github.com/Anay-Joshi26) & [Connor](https://github.com/CJFernie)

to do: insert a image here

## Table of Contents:
0. [Original Repository](#original-repository)
1. [Concept](#concept)
2. [Features](#features)
3. [Required APIs](#required-apis)
4. [Structure](#structure)  
5. [Dependencies & Deployment](#dependencies--deployment)
6. [Demo](#demo)  
7. [Notes & To Do](#notes--to-do)
8. [LICENSE](#license)

## Concept
Perth PinPoint is a remake of the popular game "GeoGuessr" within the context of Perth, Western Australia. It features several different game modes which will test your knowledge about how well you know the amazing city of Perth.

## Features
Perth PinPoint features 4 gamemodes, including:
- City (Classic)
- Street Sleuth (Accuracy)
- Local Landmark (Awareness)

Challenge your friends by getting on the leaderboard for the Classic mode!

## Required APIs
Perth PinPoint relies on multiple APIs in order to function, this includes `<apis>`. Perth PinPoint provides restricted keys for this that are free to use, however instructions on using your own API keys are below:
`todo`

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

## Demo
You can visit the `tutorial` page for more information on the game, but here is a quick demo of what it looks like:
![demovideo](https://github.com/codersforcauses/beginner-2023summer-g4/assets/102455961/c782b37e-727f-4cc4-81c8-8c8eb776ff5e)



## Notes & To Do:

Upcoming Features: (Soon TM):
- uhhhhhhhhhhhhhhhhhhhhh

## LICENSE
License: [here](/LICENSE)

### Original Repository:
The contents of the original repository (generated via `beginner-2023S`) is located [here](/beginner-2023summer-g4.bak/).  
This is for use of learning web technologies, namely javascript etc, etc...
