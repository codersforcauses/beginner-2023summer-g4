# score.py

'''
City points
Each round will have a max of 50 points
There will be (maybe 10) rounds, so thats a total of 500 points
If someone gets less than 500 points, then with the trivia shit we wanna add they can get boosted
to 500 points
todo: points multiplier based on time
'''

def city_points(data):

    elapsed_time = data["elapsedTime"]
    scale_factor = 45000 
    distance = data["distance"]
    if distance < 0 or elapsed_time == None:
        return -1,1
    points = -500/scale_factor*distance + 500
    if points > 498:
        points = 500
    if points < 0:
        points = 0

    multiplier = points_multiplier(elapsed_time, points)
    return round(points), round(multiplier,2)

def points_multiplier(elapsed_time, points):

    if points < 200:
        return 1
    
    MULTIPLIER = 1.5
    
    time_intervals = [10, 30, 60, 180]
    
    for interval in time_intervals:
        if elapsed_time <= interval:
            return MULTIPLIER
        MULTIPLIER -= 0.1
    
    return 1


        
