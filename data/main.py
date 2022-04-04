# -*- coding: utf-8 -*-
from sqlalchemy import Table, Column, Integer, String
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy import select
from sqlalchemy import MetaData
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List
from pydantic import BaseModel
from fastapi import FastAPI,Query

app = FastAPI()

def init():
    # 데이터 프레임 생성
    db_connection_str = 'mysql+pymysql://root:b203@j6b203.p.ssafy.io:33306/trou'
    db_connection = create_engine(db_connection_str)
    conn = db_connection.connect()

    sql = "select p.place_id,p.place_name,p.read_count,GROUP_CONCAT(tt.tag_name separator ' ') as tags,p.mapx, p.mapy, COALESCE(p.first_image, ' ') as img from place as p, place_tag as t , tag as tt where p.place_id = t.place_id and t.tag_id = tt.tag_id group by p.place_id"
    result = pd.read_sql_query(sql, conn)
    global tagDataFrame
    tagDataFrame = pd.DataFrame(result)
    counter_vector = CountVectorizer(ngram_range=(1, 3))
    c_vector_tags = counter_vector.fit_transform(tagDataFrame['tags'])

    # 유사도값 추출(코사인 유사도)
    global similarity_tag
    similarity_tag = cosine_similarity(
        c_vector_tags, c_vector_tags).argsort()[:, ::-1]
    return tagDataFrame


class OutEntity(BaseModel):
    place_id: str
    place_name: str
    read_count: int
    tags: str
    mapx: str
    mapy: str
    img: str
    class Config:
        orm_mode = True 

class Place(BaseModel):
    name: str     
        

# 추천 사용자 함수 생성
@app.post('/recommand/', response_model=List[OutEntity])
def recommend_place_list( place_names : List[Place]):
    
    top=10
    init()
    result=pd.DataFrame()
    print(place_names)
   
    for p in place_names:
    # for place in place_names:
        place_name = p.name
        target_place_index = tagDataFrame[tagDataFrame["place_name"] == place_name].index.values
        print(target_place_index)
        sim_index = similarity_tag[target_place_index,:top].reshape(-1)
        sim_index = sim_index[sim_index != target_place_index]
        tmp = tagDataFrame.iloc[sim_index]
        result = pd.concat([result, tmp])
    result.drop_duplicates(['place_id'])
    result = result.sort_values(
        'read_count', ascending=False)[:20]
    dictList = result.to_dict('records')
    
    
    return dictList



#print(recommend_place_list(tagDataFrame, place_names=["정방폭포", "훈데르트바서파크"]))
