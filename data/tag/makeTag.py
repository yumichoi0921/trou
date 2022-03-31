from math import fabs
import pandas as pd
from sqlalchemy import create_engine
import datetime

tagGroup = {'가족': ['가족', '남녀노소'],
            '효도': ['부모'],
            '아이': ['아이'],
            '친구': ['친구'],
            '연인': ['연인', '애인', '데이트', '커플'],
            '문화': ['문화', '박물관', '기념관', '전시', '센터', '미술관', '화랑', '공연장', '문화원',
                   '도서관', '서점', '영화관', '어학당', '학교', '갤러리', '예술', '뮤지엄'],
            '액티비티': ['레포츠', '육상', '수상', '항공', '스포츠', '수련', '경기장', '인라인', '하이킹', '카트', '골프', '경마', '경륜', '카지노', '승마', '스키', '스노보드', '스케이트', '썰매장', '수렵장', '사격장', '야영장', '캠핑장', '암벽등반', '빙벽등반', '서바이벌게임',
                     'ATV', 'MTB', '오프로드', '번지점프', '경주', '트래킹', '서핑', '스키', '카약', '카누', '요트', '스노쿨링', '스킨스쿠버', '다이빙', '낚시', '수영', '래프팅', '스카이다이빙', '비행', '헹글라이딩', '패러글라이딩', '열기구', '워터파크'],
            '자연': ['자연', '공원', '산', '생태', '휴양림', '수목원', '폭포', '계곡', '약수터', '해안', '해수욕장', '섬', '항구',
                   '포구', '어촌', '등대', ' 호수', '강', '동굴', '등산', '바다', '둘레길', '숲', '해변', '등산', '습지'],
            '역사': ['유적', '고궁', '성', '고택', '생가', '민속', '유적지', '사적지', '사찰', '종교', '안보관광'],
            '공연/행사': ['공연', '행사', '연극', '뮤지컬', '오페라', '전시회', '박람회', '컨벤션', '무용', '클래식', '음악회', '콘서트', '영화', '경기'],
            '휴양지': ['휴양', '유원지', '관광단지', '온천', '욕장', '스파', '찜질방', '헬스', '테마', '공원', '유람선', '잠수함', '파크'],
            '체험': ['체험', '관광농원', '이색거리', '파크'],
            '축제': ['축제'],
            '경치': ['일몰', '일출', '해안', '해변', '산', '경치', '야경', '해돋이', '풍경', '전망'],
            '계절여행': ['봄', '여름', '가을', '겨울', '스키', '벚꽃', '썰매', '워터파크', '스노보드', '래프팅'],
            '힐링': ['힐링', '휴식', '축제', '공원', '숲', '휴양림', '드라이브', '산책', '일몰', '일출', '경치', '풍경', '전망'],
            '캠핑': ['캠핑', '캠프', '텐트'],
            '실내': ['실내'],
            '감성': ['사진', '샷', '포토', '스팟'],
            '반려동물': ['반려'],
            '드라이브': ['드라이브'],
            '관광지': ['관광지']
            }
tagKey = {
    '가족': 1,
    '효도': 2,
    '아이': 3,
    '친구': 4,
    '연인': 5,
    '문화': 6,
    '액티비티': 7,
    '자연': 8,
    '역사': 9,
    '공연/행사': 10,
    '휴양지': 11,
    '체험': 12,
    '축제': 13,
    '경치': 14,
    '계절여행': 15,
    '힐링': 16,
    '캠핑': 17,
    '실내': 18,
    '감성': 19,
    '반려동물': 20,
    '드라이브': 21,
    '관광지': 22
}

dt_now = datetime.datetime.now().date()


def toDataframe():
    global df
    df = pd.read_json(r'.\Jeju_tags.json')
    # print(df)


def toJsonFile():
    tagDataFrame.to_json(r'.\Jeju__place_tags.json', orient='records')


def insertJejuTags():
    db_connection_str = 'mysql+pymysql://root:b203@j6b203.p.ssafy.io:33306/trou'
    db_connection = create_engine(db_connection_str)
    conn = db_connection.connect()
    tagDataFrame.to_sql(name="place_tag", con=conn,
                        if_exists='append', index=False)


def processing():
    tags = []
    for idx, row in df.iterrows():
        tag = []
        real_tag_list = row['tag'].split('#')
        for real_tag in real_tag_list:
            if real_tag == "":
                continue
            tmpTag = checkTag(real_tag)
            if tmpTag != None and tmpTag not in tag:
                tag.append(tmpTag)
                tags.append(
                    {'tag_id': tagKey[tmpTag], 'place_id': row['place_id'], 'created_date': dt_now, 'modified_date': dt_now, 'count': 1})
        # tags.append(tag)
    # df['tag'] = tags
    global tagDataFrame
    tagDataFrame = pd.DataFrame(tags)
    print(tagDataFrame)


def checkTag(real_tag):
    for key, value in tagGroup.items():
        for idx in range(len(value)):
            if tagGroup[key][idx] in real_tag:
                return key


toDataframe()
processing()
toJsonFile()
# insertJejuTags()
