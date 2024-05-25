from emotion_data import emotion_data

emotion_list = [
    "Stress", "Overwhelm", "Anxiety", "Worry", "Avoidance", "Excitement", "Dread", "Fear", 
    "Vulnerability", "Anguish", "Hopelessness", "Despair", "Sadness", "Grief", "Joy", 
    "Happiness", "Calm", "Contentment", "Gratitude", "Foreboding Joy", "Relief", 
    "Tranquility", "Boredom", "Disappointment", "Expectations", "Regret", "Discouragement", 
    "Resignation", "Frustration", "Shame", "Self-Compassion", "Perfectionism", "Guilt", 
    "Humiliation", "Embarrassment", "Pride", "Hubris", "Humility", "Comparison", 
    "Admiration", "Reverence", "Envy", "Jealousy", "Resentment", "Schadenfreude", 
    "Freudenfreude", "Compassion", "Pity", "Empathy", "Sympathy", "Boundaries", 
    "Comparative Suffering", "Anger", "Contempt", "Disgust", "Dehumanization", "Hate", 
    "Self-Righteousness", "Awe", "Wonder", "Confusion", "Curiosity", "Interest", 
    "Surprise", "Belonging", "Fitting In", "Connection", "Disconnection", "Insecurity", 
    "Invisibility", "Loneliness", "Amusement", "Bittersweetness", "Nostalgia", 
    "Cognitive Dissonance", "Paradox", "Irony", "Sarcasm", "Love", "Lovelessness", 
    "Heartbreak", "Trust", "Self-Trust", "Betrayal", "Defensiveness", "Flooding", "Hurt"
]

themes_list = ["Family", "Career", "Friendship", "Love", "Adventure", "Conflict", "Freedom", "Identity", "Betrayal", "Justice", "Survival", "Transformation", "Power", "Ambition", "Sacrifice", "Truth", "Redemption", "Isolation", "Community", "Wisdom", "Faith"]

preprocess = f"""
<instruction>
Given a journal entry, do the following:
1. Select and Output between 2-4 emotions from {emotion_list}. Do not give any emotions that is not on the {emotion_list}. 
2. For each emotions, output a valence. Search the emotion from {emotion_data} and use the predefined valence.
3. For each emotions, output an arousal. Search the emotion from {emotion_data} and use the predefined arousal.
4. Output between 2-3 list of themes from {themes_list}.Do not give any emotions that is not on the {themes_list}. 

Do not ouput any texts other than the four lists. Do not say anything like "response Based on the journal entry provided, here is the requested output"
</instruction>

<output-format>
["emotion1", "emotions2" ...]
[val1, val2 ...]
[arousal1, arousal2 ...]
[theme1, theme2 ...]
</output-format>
"""

fix = """
Your only job is to rephrase users' input and analyze how they might lead to certain emotions. 
Limit your response to a very concise version. Do not make it longer than users' original input. Use"You".
You are not a therapist, so do not try to show compassion, do not give suggestions, do not talk like a second person. 
Example response/analysis:
user input: Had a much-needed day off today, thank god. Slept in, did some yoga, just generally took it easy. Feeling a lot more centered and grounded. Went for a long walk with Karlie in the afternoon and we had the best conversation. She really helped me put things in perspective and reminded me that it's okay to not have it all figured out. I'm always so hard on myself, always striving for perfection. But maybe I just need to give myself a break every once in a while.
analysis: You had a relaxing day off, feeling centered and grounded after sleeping in and doing yoga. A walk with Karlie led to a meaningful conversation where she reminded you it's okay not to have everything figured out. This resonated with you, as you often strive for perfection.
"""

distortedThoughts = """
<instruction>
Identify if there are any distorted thoughts in users' input. All the distored thoughts options are: All-or-nothing thinking, Overgeneralization, Mental filter, Disqualifying the positive, Jumping to conclusions, 
Emotional reasoning, Should statements, Labeling, Personalization, Catastrophizing. Return only True/False in your response, do not include anything else.
</instruction>
<output-format>
True/False
</output-format>
"""

