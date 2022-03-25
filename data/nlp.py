# -*- coding: utf-8 -*-
from konlpy.tag import Okt
from krwordrank.word import KRWordRank
from krwordrank.word import summarize_with_keywords
import re
import pandas as pd
# - okt.morphs(문장): 텍스트를 형태소 단위로 나눠준다. norm은 문장을 정규화. stem은 각 단어에서 어간을 추출
# - okt.nouns(text): 명사만 추출
# - okt.phrases(text): 어절단위로 나눠서 추출
# - okt.pos(text) : norm, stem, join -> join=True: 형태소와 품사가 함께
pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)
pd.set_option('display.width', None)
pd.set_option('display.max_colwidth', -1)


def toDataframe():
    global places
    places = pd.read_json(r'.\reviews.json')


def preprocessing():
    print(places)
    for idx, row in places.iterrows():
        review = row['review']
        sentence = re.sub('|', '', review)
        sentence = re.sub('\u200b', '', sentence)
        sentence = re.sub('\xa0', '', sentence)
        sentence = re.sub('([a-zA-Z])', '', sentence)
        sentence = re.sub('[ㄱ-ㅎㅏ-ㅣ]+', '', sentence)
        sentence = re.sub(
            '[-=+,#/\?:^$.@*\"※~&%ㆍ!』\\‘|\(\)\[\]\<\>`\'…》]', '', sentence)
        if len(sentence) == 0:
            continue
        sentence = okt.pos(sentence)
        word = []
        for s in sentence:
            if not s[1] == 'Noun' or s[1] == 'Adverb' or s[1] == 'Verb' or s[1] == 'Adjective':
                continue
            if len(s[0]) == 1:
                continue
            word.append(s[0])
        word = ' '.join(word)
        word += '.'
        places.loc[idx, 'review'] = word


def getKeyword():
    print(places)
    for idx, row in places.iterrows():
        if not row['review']:
            continue
        # if(len(row['review'].split(' ')) < 2):
        #     print(row['review'])
        #     continue
        try:
            print(idx, row['review'])
            reviews = row['review'].split(".")
            print(reviews)
            keywords = summarize_with_keywords(reviews, min_count=2, max_length=10,
                                               beta=0.85, max_iter=10,  verbose=True)
            for word, r in sorted(keywords.items(), key=lambda x: x[1], reverse=True)[:30]:
                print('%8s:\t%.4f' % (word, r))
        except:
            print("안됨")

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


okt = Okt()
toDataframe()
preprocessing()
getKeyword()
