from cmath import cos
from sqlalchemy import Table, Column, Integer, String
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy import select
from sqlalchemy import MetaData
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# 데이터 프레임 생성
# https://soogoonsoogoonpythonists.github.io/sqlalchemy-for-pythonist/tutorial/1.%20%ED%8A%9C%ED%86%A0%EB%A6%AC%EC%96%BC%20%EA%B0%9C%EC%9A%94.html#%E1%84%80%E1%85%A2%E1%84%8B%E1%85%AD
db_connection_str = 'mysql+pymysql://root:b203@j6b203.p.ssafy.io:33306/trou'
db_connection = create_engine(db_connection_str)
conn = db_connection.connect()

sql = "select p.place_id,p.place_name,p.read_count,GROUP_CONCAT(tt.tag_name separator ' ') as tags from place as p, place_tag as t , tag as tt where p.place_id = t.place_id and t.tag_id = tt.tag_id group by p.place_id"
result = pd.read_sql_query(sql, conn)
tagDataFrame = pd.DataFrame(result)
# tagDataFrame.to_json(r'.\place_tag_table.json', orient='records')
print(result)

# 콘텐츠 기반 필터링 추천
# https: // pearlluck.tistory.com/666
# https: // romg2.github.io/mlguide/01_ % EB % A8 % B8 % EC % 8B % A0 % EB % 9F % AC % EB % 8B % 9D-%EC % 99 % 84 % EB % B2 % BD % EA % B0 % 80 % EC % 9D % B4 % EB % 93 % 9C-09.-%EC % B6 % 94 % EC % B2 % 9C % EC % 8B % 9C % EC % 8A % A4 % ED % 85 % 9C-%EC % BD % 98 % ED % 85 % 90 % EC % B8 % A0-%EA % B8 % B0 % EB % B0 % 98/

# 장르 벡터화
# https: // taptorestart.tistory.com/entry/sklearn-textCountVectorizer % EC % 97 % 90 % EC % 84 % 9C-ngramrange-%EC % 9D % 98 % EB % AF % B8 % EB % A5 % BC-%ED % 8C % 8C % EC % 95 % 85 % ED % 95 % A0-%EC % 88 % 98-%EC % 9E % 88 % EB % 8A % 94-%EC % 98 % 88 % EC % A0 % 9C
counter_vector = CountVectorizer(ngram_range=(1, 3))
c_vector_tags = counter_vector.fit_transform(tagDataFrame['tags'])
# print(c_vector_tags.shape)
# print(c_vector_tags)

# 유사도값 추출(코사인 유사도)
similarity_tag = cosine_similarity(
    c_vector_tags, c_vector_tags).argsort()[:, ::-1]
# print(similarity_tag)
# print(similarity_tag.shape)

# 추천 사용자 함수 생성


def recommend_place_list(df, place_names, top=10):
    result = pd.DataFrame()
    for place_name in place_names:
        target_place_index = df[df["place_name"] == place_name].index.values
        sim_index = similarity_tag[target_place_index, :top].reshape(-1)
        sim_index = sim_index[sim_index != target_place_index]
        tmp = df.iloc[sim_index]
        result = pd.concat([result, tmp])

    result.drop_duplicates(['place_id'])
    result = result.sort_values(
        'read_count', ascending=False)[:20]
    return result


print(recommend_place_list(tagDataFrame, place_names=["정방폭포", "훈데르트바서파크"]))
