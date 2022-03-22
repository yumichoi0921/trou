from tkinter import N
import requests
import xml.etree.ElementTree as ET
import pymysql

url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/'
params = {'serviceKey': 'nHw+HAZ9yyTxxIa0NG07PR1zj5LRoTRnuYstPZ0jFIX1ZX1jFIIHlWfrLj6jW3uw6YmVEA+QBi5NvcXB+CC0FA==',
          'MobileOS': 'ETC', 'MobileApp': 'AppTest', 'numOfRows': '50000'}

places = []


def insertPlace(vo):
    conn = pymysql.connect(
        host='j6b203.p.ssafy.io', user='root', password='b203', db='trou', charset='utf8', port=33306)
    cur = conn.cursor()
    sql = '''insert into place (place_id, place_name, content_type_id, addr1, addr2, area_code, cat3, first_image, first_image2, mapx, mapy, read_count, sigungu_code, tel, created_date, modified_date)
                values (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, now(), now())'''
    vals = (vo.get('placeId'), vo.get('placeName'), vo.get('contenttypeid'),
            vo.get('addr1'), vo.get('addr2'), vo.get('areacode'),
            vo.get('cat3'), vo.get('firstimage'), vo.get('firstimage2'),
            vo.get('mapx'), vo.get('mapy'),
            vo.get('readcount'), vo.get('sigungucode'), vo.get('tel'))
    cur.execute(sql, vals)
    conn.commit()
    conn.close()


def getPlace():
    response = requests.get(url+'areaBasedList', params=params)
    root = ET.fromstring(response.text)
    items = root.iter("item")
    for element in items:
        place = {'placeId': None, 'placeName': None, 'contenttypeid': None,
                 'addr1': None, 'addr2': None, 'areacode': None,
                 'cat3': None, 'firstimage': None, 'firstimage2': None,
                 'mapx': None, 'mapy': None,
                 'readcount': 0, 'sigungucode': None, 'tel': None}

        place['placeId'] = element.find("contentid").text
        place['placeName'] = element.find("title").text
        place['contenttypeid'] = element.find("contenttypeid").text
        if element.find("addr1") != None:
            place['addr1'] = element.find("addr1").text
        if element.find("addr2") != None:
            place['addr2'] = element.find("addr2").text
        if element.find("areacode") != None:
            place['areacode'] = element.find("areacode").text
        if element.find("cat3") != None:
            place['cat3'] = element.find("cat3").text
        if element.find("firstimage") != None:
            place['firstimage'] = element.find("firstimage").text
        if element.find("firstimage2") != None:
            place['firstimage2'] = element.find("firstimage2").text
        if element.find("mapx") != None:
            place['mapx'] = element.find("mapx").text
        if element.find("mapy") != None:
            place['mapy'] = element.find("mapy").text
        if element.find("readcount") != None:
            place['readcount'] = element.find("readcount").text
        if element.find("sigungucode") != None:
            place['sigungucode'] = element.find("sigungucode").text
        if element.find("tel") != None:
            place['tel'] = element.find("tel").text
        insertPlace(place)
        places.append(place)


getPlace()
# print(places)
