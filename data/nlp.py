from konlpy.tag import Okt
# - okt.morphs(문장): 텍스트를 형태소 단위로 나눠준다. norm은 문장을 정규화. stem은 각 단어에서 어간을 추출
# - okt.nouns(text): 명사만 추출
# - okt.phrases(text): 어절단위로 나눠서 추출
# - okt.pos(text) : norm, stem, join -> join=True: 형태소와 품사가 함께

# okt = Okt()
# input_text = '''그룹 방탄소년단(BTS)이 두 번째 영어 곡 '버터'(Butter)로 미국 빌보드 메인 싱글 차트에서 2주 연속 정상에 올랐습니다.
# 빌보드는 지난달 21일 발매된 BTS의 '버터'가 메인 싱글 차트인 '핫 100'에서 지난주에 이어 1위를 기록했다고 7일(현지시간) 밝혔습니다.'''
# print(okt.pos(input_text, norm=True, stem=True))


from selenium import webdriver
import time

# 크롬창(웹드라이버) 열기
driver = webdriver.Chrome("./chromedriver")

# 구글 지도 접속하기
driver.get("https://www.google.com/maps/")

# 검색창에 "카페" 입력하기
searchbox = driver.find_element_by_css_selector("input#searchboxinput")
searchbox.send_keys("카페")

# 검색버튼 누르기
searchbutton = driver.find_element_by_css_selector(
    "button#searchbox-searchbutton")
searchbutton.click()

# 여러 페이지(999)에서 반복하기
for i in range(999):
    # 시간 지연
    time.sleep(3)

    # 컨테이너(가게) 데이터 수집 // div.section-result-content
    stores = driver.find_elements_by_css_selector("div.section-result-content")

    for s in stores:
        # 가게 이름 데이터 수집 // h3.section-result-title
        title = s.find_element_by_css_selector("h3.section-result-title").text

        # 평점 데이터 수집 // span.cards-rating-score
        # 평점이 없는 경우 에러 처리
        try:
            score = s.find_element_by_css_selector(
                "span.cards-rating-score").text
        except:
            score = "평점없음"

        # 가게 주소 데이터 수집 // span.section-result-location
        addr = s.find_element_by_css_selector(
            "span.section-result-location").text

        print(title, "/", score, "/", addr)

    # 다음페이지 버튼 클릭 하기
    # 다음페이지가 없는 경우(데이터 수집 완료) 에러 처리
    try:
        nextpage = driver.find_element_by_css_selector(
            "button#n7lv7yjyC35__section-pagination-button-next")
        nextpage.click()
    except:
        print("데이터 수집 완료.")
        break

# 크롬창 닫기
# driver.close()
