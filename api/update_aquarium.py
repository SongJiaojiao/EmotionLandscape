import math

def calculate_aquarium_state(data):
    quadrant_scores = {}

    for entry in data:
        valence = float(entry['valence'])
        arousal = float(entry['arousal'])
        quadrant = determine_quadrant(valence, arousal)
        intensity = round(math.sqrt(valence**2 + arousal**2), 2)
        
        if quadrant not in quadrant_scores:
            quadrant_scores[quadrant] = 0
        quadrant_scores[quadrant] = round(quadrant_scores[quadrant] + intensity, 2)

    return quadrant_scores

def determine_quadrant(valence, arousal):
    if valence >= 0 and arousal >= 0:
        return 'Q1'
    elif valence < 0 and arousal >= 0:
        return 'Q2'
    elif valence < 0 and arousal < 0:
        return 'Q3'
    elif valence >= 0 and arousal < 0:
        return 'Q4'

