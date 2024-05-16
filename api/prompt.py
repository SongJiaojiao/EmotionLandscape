from emotion_data import emotion_list


preprocess = """
<instruction>
Given a journal entry, do the following:
1. Output between 2-4 list of emotions using Brené Brown list of emotions. 
2. For each emotions, output a valence between -10 to 10. -10 being extreme negative, 10 being extreme positive. 
3. For each emotions, output an arousal between 0 to 10. 0 is low energy, 10 is high energy emotion. Positive emotions can be low energy as well. Relax would be 2.
4. Output between 2-3 list of themes in transcripts, eg: Family,Career,Friendship,Love,Adventure,Conflict,Freedom,Identity,Betrayal,Justice,Survival,Transformation,Power,Ambition,Sacrifice,Truth,Redemption,Isolation,Community,Wisdom,Faith

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

