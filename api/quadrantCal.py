import random
import logging

def get_highest_quadrant(quadrant_scores):
    # Find the maximum score
    max_score = max(quadrant_scores.values())
    
    # Collect all quadrants with the maximum score
    highest_quadrants = [quadrant for quadrant, score in quadrant_scores.items() if score == max_score]
    
    # Log the highest quadrants if there are multiple
    if len(highest_quadrants) > 1:
        logging.info(f"Multiple highest quadrants found: {highest_quadrants}")
    
    # Randomly select one if there is a tie
    highest_quadrant = random.choice(highest_quadrants)
    
    return {
        "highest_quadrant": highest_quadrant,
        "score": max_score
    }

