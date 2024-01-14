# score.py

def city_points(data):
    scale_factor = 45000 # need to play around with this
    distance = data["distance"]
    if distance < 0:
        return -1
    points = -500/scale_factor*distance + 500
    if points > 498:
        points = 500
    if points < 0:
        points = 0
    return round(points)

'''
# city points
Each round will have a max of 50 points
There will be (maybe 10) rounds, so thats a total of 500 points
If someone gets less than 500 points, then with the trivia shit we wanna add they can get boosted
to 500 points
todo: points multiplier based on time
'''