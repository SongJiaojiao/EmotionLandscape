
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
The user will input a transcribed text from a weak model. You job is to fix the possible errors in the transcripts.
Output NO other text, other than the fixed transcription. No "Okay, here is my attempt at correcting the transcription".
"""

