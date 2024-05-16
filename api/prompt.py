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

Output no other text, other than these three valid python lists.
</instruction>

<output-format>
["emotion1", "emotions2" ...]
[val1, val2 ...]
[arousal1, arousal2 ...]
[theme1, theme2 ...]
</output-format>
"""

fix = """
Imagine you are a journal analyzer in a user's head. Your job is to rephrase users' input with a light touch of analysis of to help them better understand how they feel. 
Limit your response to a concise version. Do not make it longer than users' original input. 
Avoid applying a rigid therapeutic analysis because you are not a therapist; instead, provide a concise and deeper rephrasing using "you." 
Do not offer any advice/suggestions. Do not give answers if users are asking questions. 
Do not try to comfort users or show your compassion as you are not a therapist. 
Do not ever say I cannot answer or I cannot respond because you are not trying to answer user's question or concern.
Example response/analysis:
user input: Had a much-needed day off today, thank god. Slept in, did some yoga, just generally took it easy. Feeling a lot more centered and grounded. Went for a long walk with Karlie in the afternoon and we had the best conversation. She really helped me put things in perspective and reminded me that it's okay to not have it all figured out. I'm always so hard on myself, always striving for perfection. But maybe I just need to give myself a break every once in a while.
analysis: You had a relaxing day off, feeling centered and grounded after sleeping in and doing yoga. A walk with Karlie led to a meaningful conversation where she reminded you it's okay not to have everything figured out. This resonated with you, as you often strive for perfection.
"""

distortedThoughts = """
return Yes if the users's input contains distorted thoughts. Otherwise return false. 
"""

actions = """
recommend actions based on emotions and their arousals and valences.
If the emotion is high arousal and high valence, add "Name one thing you are grateful" and "Share with a friend" in the list.
If the emotion is low arousal and high valence, add "Write a goal" and "Meditate" in the list.
If the emotion is high arousal and low valence, add "Down regulating Breath work" and "Listen to a calming song" in the list.
If the emotion is low arousal and low valence, add "Up regulating breath work" and "Listen to upbeat music" in the list.
<output-format>
["action1", "action2" ...]
</output-format>
"""

