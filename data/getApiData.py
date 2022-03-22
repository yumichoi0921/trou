import requests
import xml.etree.ElementTree as ET
import pymysql
import pandas as pd
from sqlalchemy import create_engine
import datetime

url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/'
params = {'serviceKey': 'nHw+HAZ9yyTxxIa0NG07PR1zj5LRoTRnuYstPZ0jFIX1ZX1jFIIHlWfrLj6jW3uw6YmVEA+QBi5NvcXB+CC0FA==',
          'MobileOS': 'ETC', 'MobileApp': 'AppTest', 'numOfRows': '50000'}

dt_now = datetime.datetime.now().date()
columns = ['place_id', 'place_name', 'content_type_id',
           'addr1', 'addr2', 'area_code',
           'cat3', 'first_image', 'first_image2',
           'mapx', 'mapy',
           'read_count', 'sigungu_code', 'tel',
           'created_date', 'modified_date', 'event_start_date', 'event_end_date', 'overview']
places = []


def insertPlace(df):
    db_connection_str = 'mysql+pymysql://root:b203@j6b203.p.ssafy.io:33306/trou'
    db_connection = create_engine(db_connection_str)
    conn = db_connection.connect()
    df.to_sql(name="place", con=conn, if_exists='append', index=False)


def getPlace():
    places = []
    response = requests.get(url+'areaBasedList', params=params)
    root = ET.fromstring(response.text)
    items = root.iter("item")
    for element in items:
        place = {'place_id': None, 'place_name': None, 'content_type_id': None,
                 'addr1': None, 'addr2': None, 'area_code': None,
                 'cat3': None, 'first_image': None, 'first_image2': None,
                 'mapx': 0, 'mapy': 0,
                 'read_count': 0, 'sigungu_code': None, 'tel': None,
                 'created_date': dt_now, 'modified_date': dt_now, 'event_start_date': None, 'event_end_date': None, 'overview': None
                 }

        place['place_id'] = element.find("contentid").text
        place['place_name'] = element.find("title").text
        place['content_type_id'] = element.find("contenttypeid").text
        if element.find("addr1") != None:
            place['addr1'] = element.find("addr1").text
        if element.find("addr2") != None:
            place['addr2'] = element.find("addr2").text
        if element.find("areacode") != None:
            place['area_code'] = element.find("areacode").text
        if element.find("cat3") != None:
            place['cat3'] = element.find("cat3").text
        if element.find("firstimage") != None:
            place['first_image'] = element.find("firstimage").text
        if element.find("firstimage2") != None:
            place['first_image2'] = element.find("firstimage2").text
        if element.find("mapx") != None:
            place['mapx'] = element.find("mapx").text
        if element.find("mapy") != None:
            place['mapy'] = element.find("mapy").text
        if element.find("readcount") != None:
            place['read_count'] = element.find("readcount").text
        if element.find("sigungucode") != None:
            place['sigungu_code'] = element.find("sigungucode").text
        if element.find("tel") != None:
            place['tel'] = element.find("tel").text
        places.append(place)
    df = pd.DataFrame(places)
    getEvent(df)


def getEvent(df):
    response = requests.get(url+'searchFestival', params=params)
    root = ET.fromstring(response.text)
    items = root.iter("item")

    for element in items:
        place_id = element.find("contentid").text
        event_start_date = element.find("eventstartdate").text
        event_end_date = element.find("eventenddate").text
        condition = df['place_id'] == place_id
        df.loc[condition, 'event_start_date'] = event_start_date
        df.loc[condition, 'event_end_date'] = event_end_date
    insertPlace(df)


getPlace()
