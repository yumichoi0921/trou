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
    for idx in range(0, 100):
        if(df.loc[idx, 'content_type_id'] == 12):
            place_name = df.loc[idx, 'place_name']
            if ('㈜' in place_name):
                continue
            place_name = re.sub(
                '[-=+,#/\?:^$.@*\"※~&%ㆍ!』\\‘|\(\)\[\]\<\>`\'…》]', ' ', place_name)
            data = [df.loc[idx]['place_id'], place_name]
            list.append(data)
    global place
    place = pd.DataFrame(list, columns=['place_id', 'place_name'])
    # print(place)
    
### 크롤링 시작 ###
def crawling():
    driver = webdriver.Chrome("./driver/chromedriver")
    reviews = []    # review 담을 리스트
    for idx, row in place.iterrows():
        review_text = ''
        # 테스트로 4개까지만 해봄
        if(idx == 4):
            break
        keyword = row['place_name']
        print(keyword)
        detail_url_before = ''
        
        try: # 자세히 보기 있는 경우
            url = 'https://korean.visitkorea.or.kr/search/search_list.do?keyword=' + keyword
            # url = 'https://korean.visitkorea.or.kr/search/search_list.do?keyword=fmfkmk'

            # print(kakao_map_url)
            driver.get(url)
            time.sleep(0.5)
            
            detail_url_before = driver.find_element_by_xpath(
                '//*[@id="contents"]/div/div[1]/div[6]/div[2]/div[1]/span/a').get_attribute('href')
        except: # 자세히 보기 없고 리스트 형식으로 검색결과 나오는 경우
            # list -> 검색어랑 list의 text 비교 -> 같은거 들어가면될꺼같다는 생각 
            idx = 1
            print('자세히 보기 없는거')
            root = driver.find_elements_by_xpath('//*[@id="listBody"]/ul/li')
            if(len(root) == 0): # 검색결과가 아예 없을경우
                pass
                # continue
            for el in root:
                try:
                    el_text = el.find_element_by_xpath('div[2]/div[1]/a').text
                    el_text = re.sub(
                    '[-=+,#/\?:^$.@*\"※~&%ㆍ!』\\‘|\(\)\[\]\<\>`\'…》]', ' ', el_text)
                    if(keyword == el_text):
                        break
                    else:
                        idx += 1
                except:
                    idx += 1
                    
            detail_url_before = driver.find_element_by_xpath(
                '//*[@id="listBody"]/ul/li['+str(idx)+']/div[2]/div[1]/a').get_attribute('href')
        
        ##### 상세 페이지 들어가서 태그 추출 시작 ####
        start_idx = detail_url_before.find('\'') + 1

        keyword_id = detail_url_before[start_idx:-3] # 필요한 부분만 추출
        detail_url_after = 'https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=' + keyword_id

        driver.get(detail_url_after)
        time.sleep(1)  # 페이지의 동적 요소가 생성되는 시간을 기다려줘야 정상적으로 크롤링 가능
            
        root = driver.find_elements_by_xpath('//*[@id="detailGo"]/div[8]/div/ul/li')    # elements.. 후..
        for el in root:
            el_text = el.find_element_by_xpath('a/span').text
            print(el_text)
        ##### 상세 페이지 들어가서 태그 추출 종료 ####
            
    # place['review'] = reviews  # place -> df 로 변경하기.
    ### 크롤링 종료 ###
    driver.quit()

def toJsonFile():
    place.to_json(r'.\reviews.json', orient='records')
    

toDataframe()
preprocessing()
crawling()
toJsonFile()
# print(place)