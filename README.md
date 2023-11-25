# POGG by "Nef Fan Club"
Perth Original Geographical Guess "POGG"  
Group (4) repository for Coders for Causes Summer Beginner Project (2023/24)  
> Members: [Torry](https://torrytw.ooo), [Anay](https://github.com/Anay-Joshi26) & [Connor](https://github.com/connorstegall77997761125)

## Table of Contents:
0. [Original Repository](#original-repository)
1. [Concept](#concept)
2. [Features](#features)
3. [Google Maps Platform API](#google-maps-platform-api)
4. [Dependencies & "Setup" (Stack)](#dependencies--setup-stack)
5. [Structure](#structure)
6. [Running](#running)    
7. [Demo](#demo)  
8. [Notes & To Do](#notes--to-do)
9. [LICENSE](#license)

## Concept
Implementation of the popular "GeoGuessr" game set in the context of Perth, Western Australia.  
Upon user selection (input) said user will be presented with a Google street view image/location, this is paired with a map in which a pinpoint must be selected and submitted. The goal of this is to match the pinpoint as close to the presented streetview image/location as possible, the smaller the difference in distance the more points awarded to the user. This will repeat with new locations for a set amount of rounds each of which are timed to calculate a final score which will remain on a persistent scoreboard.

## Features
`SECTION TO BE UPDATED - need to actually make the thing`  
- Multiple Users
- "How to play" Meny
- Geoguessr except its Perth
- Timed set of (n) Rounds
- Score Formula (time and distance)
- Persistent Scoreboard

## Google Maps Platform API
`SECTION TO BE UPDATED - need to actually use the api`  

## Dependencies & "Setup" (Stack)
`SECTION TO BE UPDATED - need more detail`  

POGG is written in Python using FastAPI, SQLite3 for the backend with a pure HTML/CSS/JS frontend.

Install Dependencies:
```
pip install -r requirements.txt
```

## Stucture
`SECTION TO BE UPDATED - need more detail +updates`  
```
.
├── LICENSE
├── README.md
├── app
│   ├── backend
│   │   └── main.py
│   ├── config.py
│   ├── frontend
│   │   ├── css
│   │   │   └── main.css
│   │   ├── index.html
│   │   ├── js
│   │   │   ├── main.js
│   │   │   └── proxy.js
│   │   └── static
│   │       └── quacker.jpg
│   └── init.py
├── beginner-2023summer-g4.bak
│   ├── README.md.bak
│   ├── index.html
│   ├── main.js
│   └── style.css
└── requirements.txt
```

## Running
`SECTION TO BE UPDATED - need more detail`  
POGG can be launched with a single python file `init.py`, then simply browse to the host as defined in `config.py` (or enable debug)  
```
python3 app/init.py
```

## Demo
`SECTION TO BE UPDATED - soon TM`  

## Notes & To Do:
stuff to do
- figure out google maps api stuff
- add sqlite3 database or fastapi edition
- modularise the API blah blah blah
- make the actual web app

## LICENSE
License: [here](/LICENSE)

### Original Repository:
The contents of the original repository (generated via `beginner-2023S`) is located [here](/beginner-2023summer-g4.bak/).  
This is for use of learning web technologies, namely javascript etc, etc...

