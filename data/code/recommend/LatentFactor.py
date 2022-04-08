# https://romg2.github.io/mlguide/01_%EB%A8%B8%EC%8B%A0%EB%9F%AC%EB%8B%9D-%EC%99%84%EB%B2%BD%EA%B0%80%EC%9D%B4%EB%93%9C-09.-%EC%B6%94%EC%B2%9C%EC%8B%9C%EC%8A%A4%ED%85%9C-%EC%9E%A0%EC%9E%AC-%EC%9A%94%EC%9D%B8/
# https://pearlluck.tistory.com/668

# -*- coding: utf-8 -*-

from numpy import mat, matrix
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

app= FastAPI()

def init():
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
    init()
    target=plcae_title_list.index(title)
    corr_target = corr[target]
    result= list(place_title[(corr_target>=0.9)])[:10]
    print(result)
    return result

recommand_place("천지연폭포 (제주도 국가지질공원)")