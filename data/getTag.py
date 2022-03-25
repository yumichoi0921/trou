import time
from traceback import print_tb
from xml.dom.minidom import Element
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup

import pandas as pd
from multiprocessing import connection
from unittest import result
from matplotlib.pyplot import connect
import pymysql.cursors
import re

pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)
pd.set_option('display.width', None)
pd.set_option('display.max_colwidth', -1)

# placedata json file -> dataframe


def toDataframe():
    global df
    df = pd.read_json(r'.\placedata.json')

### 테스트용 place 생성 ###


def preprocessing():
    list = []
    content_type_id = [12, 14, 15, 28]
    for idx in range(0, len(df)):
        # for idx in range(0, 500):
        if(df.loc[idx, 'area_code'] == 39 and df.loc[idx, 'content_type_id'] in content_type_id):
            place_name = df.loc[idx, 'place_name']
            if ('㈜' in place_name):
                continue
            data = [df.loc[idx]['place_id'], place_name]
            list.append(data)
    global place
    place = pd.DataFrame(list, columns=['place_id', 'place_name'])
    # print(place)

### 크롤링 시작 ###


def crawling():
    driver = webdriver.Chrome("./driver/chromedriver")
    tags = []
    for idx, row in place.iterrows():
        tag = ""
        place_name = row['place_name']

        detail_url_before = ''
        try:  # 자세히 보기 있는 경우
            url = 'https://korean.visitkorea.or.kr/search/search_list.do?keyword=' + place_name
            driver.get(url)
            time.sleep(0.5)
            detail_url_before = driver.find_element_by_xpath(
                '//*[@id="contents"]/div/div[1]/div[6]/div[2]/div[1]/span/a').get_attribute('href')
        except:  # 자세히 보기 없고 리스트 형식으로 검색결과 나오는 경우
            # list -> 검색어랑 list의 text 비교 -> 같은거 들어가면될꺼같다는 생각
            idx = 1
            root = driver.find_elements_by_xpath('//*[@id="listBody"]/ul/li')
            for el in root:
                try:
                    el_text = el.find_element_by_xpath('div[2]/div[1]/a').text
                    if(place_name == el_text):
                        break
                    else:
                        idx += 1
                except:
                    idx += 1

            detail_url_before = driver.find_element_by_xpath(
                '//*[@id="listBody"]/ul/li['+str(idx)+']/div[2]/div[1]/a').get_attribute('href')

        ##### 상세 페이지 들어가서 태그 추출 시작 ####
        start_idx = detail_url_before.find('\'') + 1

        keyword_id = detail_url_before[start_idx:-3]  # 필요한 부분만 추출
        detail_url_after = 'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=' + keyword_id

        driver.get(detail_url_after)
        time.sleep(1)  # 페이지의 동적 요소가 생성되는 시간을 기다려줘야 정상적으로 크롤링 가능

        # elements.. 후..
        root = driver.find_elements_by_xpath(
            '//*[@id="detailGo"]/div[8]/div/ul/li')
        if(len(root) == 0):
            pass
        for el in root:
            el_text = el.find_element_by_xpath('a/span').text
            tag += el_text
        tags.append(tag)
        ##### 상세 페이지 들어가서 태그 추출 종료 ####

    ### 크롤링 종료 ###
    driver.quit()
    place['tag'] = tags


def toJsonFile():
    place.to_json(r'.\tags.json', orient='records')


toDataframe()
preprocessing()
crawling()
toJsonFile()
# print(place)
