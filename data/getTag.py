import time
from selenium import webdriver
import pandas as pd

pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)
pd.set_option('display.width', None)
pd.set_option('display.max_colwidth', -1)

driver = webdriver.Chrome("./driver/chromedriver")

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
    print('루루루루루루루루루루루')
    print(len(list))
    place = pd.DataFrame(list, columns=['place_id', 'place_name'])
    # print(place)
    
def goDetailPage(place_name,i):
    check = False
    
    url = 'https://korean.visitkorea.or.kr/search/search_list.do?keyword=' + place_name
    driver.get(url)
    time.sleep(0.5)
    
    driver.find_element_by_xpath('//*[@id="tabView'+str(i)+'"]/a').click()
    time.sleep(0.5)
    
    try:  # 자세히 보기 있는 경우
        driver.find_element_by_xpath('//*[@id="contents"]/div/div[1]/div[6]/div[2]/div[1]/span/a')
        driver.find_element_by_xpath('//*[@id="contents"]/div/div[1]/div[6]/div[2]/div[1]/span/a').click()
        time.sleep(1)
        return True
    except:  # 자세히 보기 없고 리스트 형식으로 검색결과 나오는 경우
            # list -> 검색어랑 list의 text 비교 -> 같은거 들어가면될꺼같다는 생각
        index = 1
        root = driver.find_elements_by_xpath('//*[@id="listBody"]/ul/li')
        
        if(len(root) == 0): # 검색 결과가 하나도 없는 경우
            return False
        for el in root:
            try:
                el_text = el.find_element_by_xpath('div[2]/div[1]/a').text
                if(place_name == el_text):
                    check = True
                    break
                else:
                    index += 1
            except:
                index += 1

        if(check):
            driver.find_element_by_xpath(
            '//*[@id="listBody"]/ul/li['+str(index)+']/div[2]/div[1]/a').click()
            time.sleep(1)  # 페이지의 동적 요소가 생성되는 시간을 기다려줘야 정상적으로 크롤링 가능
            return True
        else:
            return False

def getTagList(i):
    tagList = ''
    root = driver.find_elements_by_xpath(
        '//*[@id="detailGo"]/div['+str(i)+']/div/ul/li')
    print(len(root))
    if(len(root) == 0):
        pass
    for el in root:
        el_text = el.find_element_by_xpath('a/span').text
        print(el_text)
        tagList += el_text
        
    return tagList

### 크롤링 시작 ###
def crawling():
    tags = []
    for idx, row in place.iterrows():
        tag = ""
        place_name = row['place_name']
        print(place_name)
        
        if(goDetailPage(place_name,1)): # 여행정보 탭에서 찾은 경우
            print('여행정보')
            tag += getTagList(8)
        elif(goDetailPage(place_name,3)): # 축제 탭에서 찾은 경우
            print('축제')
            tag += getTagList(6)
        else:   # 여행정보, 축제 탭에서 못찾은 경우 그냥 빼버림
            continue
        tags.append(tag)
        ##### 상세 페이지 들어가서 태그 추출 종료 ####

    ### 크롤링 종료 ###
    place['tag'] = tags
    driver.quit()


def toJsonFile():
    print('to JSON !!!!')
    place.to_json(r'.\Jeju_tags.json', orient='records')


toDataframe()
preprocessing()
crawling()
toJsonFile()
# print(place)
