# calc_points.py

# Each round will have a max of 50 points
# There will be (maybe 10) rounds, so thats a total of 500 points
# If someone gets less than 500 points, then with the trivia shit we wanna add they can get boosted
# to 500 points
def calc_points(data):

    scale_factor = 60000 # need to play around with this

    print(data)

    distance = data["distance"]

    points = -50/scale_factor*distance + 50

    if points > 49.995:
        return 50
    


    print(f"You got {points}!")

    return points

