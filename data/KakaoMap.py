import time
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

########################
#   select = find_all
#   select_one = find
########################

### DB의 place_name 조회한걸로 DataFrame에 생성 ###
# connection = pymysql.connect(host='j6b203.p.ssafy.io',user='root',password='b203',db='trou',
#                              charset='utf8', port=33306, cursorclass=pymysql.cursors.DictCursor)
# cursor = connection.cursor()
# sql = 'select place_name from place'
# cursor.execute(sql)

# result = cursor.fetchall()
# connection.close()

# df = pd.DataFrame(result)


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
    for idx, row in place.iterrows():    # place -> df 로 변경하기
        review_text = ''
        # 테스트로 4개까지만 해봄
        # if(idx == 4):
        #     break
        keyword = row['place_name']
        # print(keyword)
        try:
            kakao_map_url = 'https://map.kakao.com/?q=' + keyword
            # print(kakao_map_url)
            driver.get(kakao_map_url)
            time.sleep(0.5)

            url = driver.find_element_by_xpath(
                '//*[@id="info.search.place.list"]/li[1]/div[5]/div[4]/a[1]').get_attribute('href')
            # print(url)
            driver.get(url)
            time.sleep(1)  # 페이지의 동적 요소가 생성되는 시간을 기다려줘야 정상적으로 크롤링 가능

            soup = BeautifulSoup(driver.page_source, 'html.parser')

            try:
                data = soup.select_one(
                    '#mArticle > div.cont_evaluation > div.evaluation_review > ul > li:nth-child(1) > div.comment_info > p > span')
                # 리뷰가 하나라도 있으면 for문 들어감
                for i in range(1, 6):
                    # review 추출
                    try:
                        review_text = review_text + '|' + \
                            soup.select_one('#mArticle > div.cont_evaluation > div.evaluation_review > ul > li:nth-child('+str(
                                i)+') > div.comment_info > p > span').text
                    # 반복문 돌다가 리뷰 없으면 멈춤
                    except:
                        # print(str(i) + '번째 리뷰가 없습니다.')
                        break
                reviews.append(review_text)
                # print(review_text)
            except:
                reviews.append(review_text)
                # print('리뷰가 없습니다.')
        except:
            reviews.append(review_text)
            # print('검색 결과가 없습니다.')
    place['review'] = reviews  # place -> df 로 변경하기.
    ### 크롤링 종료 ###
    driver.quit()


def toJsonFile():
    place.to_json(r'.\reviews.json', orient='records')


toDataframe()
preprocessing()
crawling()
toJsonFile()
print(place)
