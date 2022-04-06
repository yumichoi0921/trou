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
from sklearn.decomposition import TruncatedSVD
import numpy as np
import seaborn as sns
import matplotlib.pyplot as plt 

app = FastAPI()

def init():
    # 데이터 프레임 생성
    db_connection_str = 'mysql+pymysql://root:b203@j6b203.p.ssafy.io:33306/trou'
    db_connection = create_engine(db_connection_str)
    conn = db_connection.connect()

    sql = "select p.place_id,p.place_name,GROUP_CONCAT(tt.tag_name separator ' ') as tags from place as p, place_tag as t , tag as tt where p.place_id = t.place_id and t.tag_id = tt.tag_id group by p.place_id"
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
    # place_name: str
    # tags: str
  
    # class Config:
    #     orm_mode = True 

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
    # result = result.sort_values(
    #     'read_count', ascending=False)[:20]
    result= result.loc[:,['place_id']]
    dictList = result.to_dict('records')
    print(result)
    
    
    return dictList



def init2():
    db_connection_str = 'mysql+pymysql://root:b203@j6b203.p.ssafy.io:33306/trou'
    db_connection = create_engine(db_connection_str)
    conn = db_connection.connect()

    sql = "select p.place_id,p.place_name,GROUP_CONCAT(tt.tag_name separator ' ') as tags from place as p, place_tag as t , tag as tt where p.place_id = t.place_id and t.tag_id = tt.tag_id group by p.place_id"
    result = pd.read_sql_query(sql, conn)
    global tagDataFrame
    tagDataFrame = pd.DataFrame(result)
   

    sql2="select user_id, place_id, score from review"
    result2= pd.read_sql_query(sql2, conn)
    result3= pd.merge(result,result2,on="place_id")
    ##user-place 테이블 생성, 0으로 채우기
    usr_place_pivot= result3.pivot_table('score', index='user_id',columns='place_name')
    usr_place_pivot=usr_place_pivot.fillna(0)
    ##place-user 테이블 생성, 전치 행렬
    place_usr_pivot = usr_place_pivot.values.T

    global plcae_title_list
    global corr
    global place_title
    ## 4개 추천해주기
    SVD = TruncatedSVD(n_components=2)
    matrix=SVD.fit_transform(place_usr_pivot)

    ## 상관관계수 값 구하기
    
    corr = np.corrcoef(matrix)

    print(corr.shape)

    place_title = usr_place_pivot.columns
    plcae_title_list= list(place_title)


@app.get('/recommand/user/{title}',response_model=List[str])
def recommand_place(title: str):
    init2()
    target=plcae_title_list.index(title)
    corr_target = corr[target]
    result= list(place_title[(corr_target>=0.9)])[:10]
    print(result)
    return result

# recommend_place_list([{"name":"천지연폭포 (제주도 국가지질공원)"},{"name":"정방폭포"}])