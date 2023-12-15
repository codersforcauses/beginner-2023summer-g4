# calc_points.py

# Each round will have a max of 50 points
# There will be (maybe 10) rounds, so thats a total of 500 points
# If someone gets less than 500 points, then with the trivia shit we wanna add they can get boosted
# to 500 points
def calc_points(data):

    scale_factor = 70000 # need to play around with this

    distance = data["distance"]

    if distance == -1:
        return -1

    points = -500/scale_factor*distance + 500

    if points > 497:
        points = 500
    if points < 0:
        points = 0

    print(f"You got {points}!")

    return round(points)

