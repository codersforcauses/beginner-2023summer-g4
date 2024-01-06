# old.py

# literally unused code

'''
@router.post("/register")
async def register(request: Request):
    data = await request.json()
    
    valid = sanitise_register_and_login(data)
    details = data

    if valid == True:
        result = db_register(details) # THIS IS NOT ENTIRELY SECURE (PROBABLY)
    else:
        result = {"error":"sanitisation failed"}
    response = result

    return JSONResponse(content=response)

#  curl -X POST http://127.0.0.1:5000/api/register --data '{"usern":"torry2","passw":"1234"}'

@router.post("/login")
def login():
    response = {}
    return JSONResponse(content=response)

    def db_register(details):
    data = details 

    prepare = (details["usern"], details["passw"])
    
    con, cursor = db_connect()

    query = \'\'\'INSERT INTO users (usern, passw)
               VALUES (?, ?)\'\'\'

    cursor.execute(query, prepare)

    db_disconnect(con)
    print("done")
    result = {}
    return result


def sanitise_register_and_login(json) -> bool:
    data = json
    details = data

    usern_v = False
    passw_v = False

    usern = details["usern"]
    username_regex = r'^[a-zA-Z0-9._ ]+$' # easy 2 google
    if re.match(username_regex, usern):
        usern_v = True
    else:
        usern_v = False    # oh god
      
    passw = details["passw"]
    digits = [int(char) for char in passw if char.isdigit()]
    if len(digits) != len(passw):
        passw_v = False
    else:                        # bad logic
        if len(passw) != 4:
            passw_v = False
        else:
            passw_v = True

    if usern_v != True:
        return False             # worse logic
    elif passw_v != True:
        return False

    return True



    '''