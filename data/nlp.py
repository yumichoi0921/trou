# -*- coding: utf-8 -*-
from concurrent.futures import process
from ntpath import join
from konlpy.tag import Okt
from krwordrank.word import KRWordRank
from krwordrank.word import summarize_with_keywords
from krwordrank.sentence import summarize_with_sentences
import re
# - okt.morphs(문장): 텍스트를 형태소 단위로 나눠준다. norm은 문장을 정규화. stem은 각 단어에서 어간을 추출
# - okt.nouns(text): 명사만 추출
# - okt.phrases(text): 어절단위로 나눠서 추출
# - okt.pos(text) : norm, stem, join -> join=True: 형태소와 품사가 함께


def preprocessing(inputs):
    processed_review = ''
    for input in inputs:
        sentence = re.sub('\n', '', input)
        sentence = re.sub('\u200b', '', sentence)
        sentence = re.sub('\xa0', '', sentence)
        sentence = re.sub('([a-zA-Z])', '', sentence)
        sentence = re.sub('[ㄱ-ㅎㅏ-ㅣ]+', '', sentence)
        sentence = re.sub(
            '[-=+,#/\?:^$.@*\"※~&%ㆍ!』\\‘|\(\)\[\]\<\>`\'…》]', '', sentence)
        print(sentence)
        if len(sentence) == 0:
            continue
        sentence = okt.pos(sentence, norm=True, stem=True)
        word = []
        for s in sentence:
            if not s[1] == 'Noun' or s[1] == 'Adverb' or s[1] == 'Verb' or s[1] == 'Adjective':
                continue
            if len(s[0]) == 1:
                continue
            word.append(s[0])
        word = ' '.join(word)
        word += '. '
        processed_review += word
    return processed_review


# min_count = 3   # 단어의 최소 출현 빈도수 (그래프 생성 시)
# max_length = 10  # 단어의 최대 길이
# wordrank_extractor = KRWordRank(min_count=min_count, max_length=max_length)
# beta = 0.85    # PageRank의 decaying factor beta
# max_iter = 10
# keywords, rank, graph = wordrank_extractor.extract(texts, beta, max_iter)

# keywords = summarize_with_keywords(processed_review, min_count=2, max_length=10,
#                                    beta=0.85, max_iter=10,  verbose=True)
# for word, r in sorted(keywords.items(), key=lambda x: x[1], reverse=True)[:30]:
#     print('%8s:\t%.4f' % (word, r))

text1 = '''10월달 오후 4-5시쯤 갔는데 구름도 몽글몽글하고 예뻤어요'''
text2 = '''놀러기기 좋은해수욕장 입니다.여름에는사람도 많고 쇼핑도 많아요.외국인 많이 모이는자리예요.'''
text3 = '''동해안 최고의 해수욕장 중 하나인 해운대 추운 겨울 날이었는데 맑은 하늘과 바닷소리로 힐링했다. 비록 물을 느끼진 못했지만, 아쉬움이 있어 더욱 그리워지는 겨울 바다 였다.언제나 여행의 진리는 바닷가라는걸 느끼고 왔다.'''
text4 = '''강아지와 함께 여행하기 좋은 해운대 해수욕장. 산책하기도 좋고 앉아 바닷바람 맞으며 파도소리 듣기도 좋다. 근처에 이용할 수 있는 시설이 많아서 편하다. 강아지와 함께 산책하는 사람이 많아 친구 만나는 재미가 있다.'''
text5 = '''마! 붓싼하면 해운대아이가 봄 여름 가을 겨울 다 좋습니다 도심속 바닷가  여름이면 해운대역에서 바닷가로 이어진 구남로에 버스킹도 많이하고요 먹거리도 많구요'''
text6 = '''바람이 많이 불어 파도가 세게 오긴하네여. 간만에 바다바람 시원하게 느끼고 왔어요,.'''
text7 = '''정말... 제 2의 도시라는게 뭔소린지 알겠음. 사람 많고 경치 이쁘고 물 맑은 해수욕장+산책하기도 좋음 여름에 왔다면 더 좋았을거같지만'''
okt = Okt()
inputs = [text1, text2, text3, text4, text5, text6, text7]
processed_review = [preprocessing(inputs)]

keywords = summarize_with_keywords(processed_review, min_count=2, max_length=10,
                                   beta=0.85, max_iter=10,  verbose=True)
for word, r in sorted(keywords.items(), key=lambda x: x[1], reverse=True)[:30]:
    print('%8s:\t%.4f' % (word, r))
