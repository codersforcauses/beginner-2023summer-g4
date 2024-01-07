# Perth PinPoint by "Nef Fan Club"  
Group (4) repository for Coders for Causes Summer Beginner Project (2023/24)  
> Members: [Torry](https://torrytw.ooo), [Anay](https://github.com/Anay-Joshi26) & [Connor](https://github.com/connorstegall77997761125)

to do: insert a cool image here

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
Perth PinPoint is a remake of the popular game "GeoGuessr" within the context of Perth, Western Australia.

## Features
Perth PinPoint features 4 gamemodes, including:
- City (Classic)
- Divs Discoveries (Classic +Events)
- Street Sleuth (Accuracy)
- Local Landmark (Awareness)

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

Configuration:
To configure Perth PinPoint, edit `app/config.py`, code comments explain options however importantly if youre not intending to develop Perth PinPoint, `DEV` should be set to `False` to run in "production" mode - this (should) be the case for any (updated) code on the main branch.
- The host/port on which Perth PinPoint is made accesable is modifiable to suit enviroment needs (even on prod), see the config file or this is printed out via console upon running.

Running Perth PinPoint:
```py
`which python3` app/init.py
```
or the respective windows equivilent

Note on Deployment:
Perth PinPoint is not designed for concurrent users, deploying this on an environment in which multiple users can access and attempt to play the game at once will break (feel free to try it tho) - PPP is designed for a single local instance and to be played "arcade style"

## Demo
todo

## Notes & To Do:

Upcoming Features: (Soon TM):
- All gamemodes!
- Time based point multiplier
- Gamedata statistics (user and overall)

stuff to do (development wise)
- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP uhhhhhhhhhhhhhhhhhh * hehe
- finish all gamemodes
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries FIX SCALING ISSUES LMAO
- end game screen
- leaderboard page
- landing page css uhh
- MAKE IT LOOK NICE!!!!!!!!!!!!

## LICENSE
License: [here](/LICENSE)

### Original Repository:
The contents of the original repository (generated via `beginner-2023S`) is located [here](/beginner-2023summer-g4.bak/).  
This is for use of learning web technologies, namely javascript etc, etc...