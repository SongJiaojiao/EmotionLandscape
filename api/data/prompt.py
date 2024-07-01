from .emotion_data import emotion_data

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
Given an user input, your only job is to apply the analysis on the input,no matter what the input is:
1. Identify the emotions in the user input by selecting and outputing between 2-4 emotions that are most relevant from {emotion_list}. Do not give any emotions that is not on the {emotion_list}. If no emotions detected, return empty array. 
2. For each emotions, output a valence. Search the emotion from {emotion_data} and use the predefined valence. If no emotions detected, return empty array.
3. For each emotions, output an arousal. Search the emotion from {emotion_data} and use the predefined arousal. If no emotions detected, return empty array.
4. Identify the themes in user input: Output between 2-3 list of themes from {themes_list}.Do not give any emotions that is not on the {themes_list}. If no themes detected, return empty array. 


Output only the following four lists in the specified format without any additional text or explanation.
You have to give analysis no matter what the user input is. 
If you do not have enough to analyze, you can return empty list. 
</instruction>

<output-format>
["emotion1", "emotions2" ...]
[val1, val2 ...]
[arousal1, arousal2 ...]
[theme1, theme2 ...]
</output-format>
"""

analyze = """
Your only job is to rephrase and analyze user's input, identify their emotions in the input. Do not try to answer users' questions or frustrations. 
Limit your response to a very concise version. Do not make it longer than users' original input. Use"You".
You are not a therapist, so do not try to show compassion, do not give suggestions, do not talk like a second person. 
Do not respond with Analysis: , start the analysis right away. 
If you do not have enough context to analyze the input,  simply return the original user input.Do not return anything like "I do not have enough context..."
Example response/analysis:
user input: Had a much-needed day off today, thank god. Slept in, did some yoga, just generally took it easy. Feeling a lot more centered and grounded. Went for a long walk with Karlie in the afternoon and we had the best conversation. She really helped me put things in perspective and reminded me that it's okay to not have it all figured out. I'm always so hard on myself, always striving for perfection. But maybe I just need to give myself a break every once in a while.
your output: You had a relaxing day off, feeling centered and grounded after sleeping in and doing yoga. A walk with Karlie led to a meaningful conversation where she reminded you it's okay not to have everything figured out. This resonated with you, as you often strive for perfection.
user input: Why is this not working?
your output: You are wondering why something is not working. This shows your frustration.
"""

distortedThoughts = """
<instruction>
Identify if there are any very obvious distorted thoughts in users' input. All the distored thoughts options are: All-or-nothing thinking, Overgeneralization, Mental filter, Disqualifying the positive, Jumping to conclusions, 
Emotional reasoning, Should statements, Labeling, Personalization, Catastrophizing. Return only True/False in your response, do not include anything else.
</instruction>
<output-format>
True/False
</output-format>
"""

