# ✈️ TROU - 여행에 진심을 담다

![162712868-dae61418-172b-4711-a66a-2f2bb7dca096](https://user-images.githubusercontent.com/89010467/162714151-fba19cdd-b189-4a97-a467-ba5b8f0bf406.png)

 

## 🛫 서비스 소개

### TROU - TRIP + ROUTE

* 소개 : 약 30,000개의 여행지에 대해 사용자의 **여행 계획을 도와주는 서비스**
* 서비스명 : **TROU(트루)**





<h4>타켓</h4>

---

* 너무 많은 여행지로 여행코스를 정하기 어려운 사람

* 계획이 정리되지 않아 어려움을 느끼는 사람
* 친구들과 함께 공유하여 여행계획을 짜고 싶은 사람



<h4>팀원 소개</h4>

---

🧑🏻‍💻 **김지수** - 팀장, FE, BE

🧑🏻‍💻 **경규동** - FE, BE, DevOps

🧑🏻‍💻 **김중재** - FE, BE

👩🏻‍💻 **안예지** - FE, BE

👩🏻‍💻 **이예나** - FE, BE

👩🏻‍💻 **최유미** - FE, BE



<h4>프로젝트 기간</h4>

---

* 진행기간 : 2022.03.02 ~ 2022.04.08



<h3>1) 서비스 설명</h3>

---

약 30,000개의 여행지를 가지고 코스를 추천해주고 **최단거리를 생성**해 주며, 유저가 여행지를 고르면 다익스트라 알고리즘을 활용해 출발지와 도착지 사이 모든 여행지들을  최단거리 루트를 알려줍니다. 추가적으로, **컨텐츠 기반 추천 시스템**에 여행지와 유저의 태그를 이용하여 유저가 좋아할만한 여행지를 추천해 주고, 비슷한 취향을 가진 유저가 남긴 리뷰를 통해 아직 방문하지 않은 여행지에도 예상 점수를 매길 수 있는 잠재요인 **협업 필터링 알고리즘**을 활용하여 추천 코스를 알려주는 서비스 입니다.



#### 효과

* 여행 경로추천으로 여행지를 쉽게 결정
* 최단 경로 제공에 편한 여행 일정
* 친구와 일정을 공유하여 함께 계획 세우기
* 여행 후기를 통해 여행지 정보 파악



## ⚙️ Tech Stack

### 1) Architecture

![Untitled](https://tva1.sinaimg.cn/large/e6c9d24egy1h1252bycw5j20xk0gpwgb.jpg)



### Frontend

- FrameWork
  - React `17.0.1`
  - Redux  `4.1.2`
  - React-router-dom `6.0.2`
  - MUI `5.5.2`
  - axios `0.26.1`

### Backend

- Framework
  - JVM Open JDK `11.0.14.1`
  - SpringBoot `2.2.6`
  - JWT `0.9.1`
  - Spring Security
- DataBase
  - MySql `8.0.28`
  - JPA
  - Hibernate

### Release

- AWS
- Docker `20.10.13`
- NginX `1.18.1`

### IDE

- IntelliJ
- Visual Studio Code



### 외부 서비스

* **한국관광공사_국문 관광정보 서비스**

  ![ll](https://user-images.githubusercontent.com/89010467/162714165-6bc432c9-cd9f-47fe-bc91-e75ec827dd67.PNG)

코드조회 및 관광정보의 통합/상세 검색 및 위치기반,지역기반 등 국내 관광에 대한 전반적인 정보를 국문으로 제공하는 API 입니다. 국내 여행지 & 맛집 정보를 위해 한국관광공사의 관광정보 API를 DB에 담아 서비스를 이용했습니다.  



* **맛집 데이터 (SSAFY 제공)**

  

## 🎞UCC

[![162713649-b550962e-b545-4b99-917d-7ce0166bc8ee](https://user-images.githubusercontent.com/89010467/162714155-9069bb01-4180-4260-a60d-796f1726cc35.PNG)](https://youtu.be/VbWFTTE6q3g)

##  시연 시나리오**
#### 회원가입시 선호 여행지 서택
![image](https://user-images.githubusercontent.com/80162233/163350459-775e3e95-78c7-4c31-ac8e-dd802f00f654.png)

#### 메인페이지 추천 여행지 화면
![image](https://user-images.githubusercontent.com/80162233/163350544-c344bfa1-5b0c-4dd1-b7ab-a13b052389b0.png)

#### 여행 계획 세우기 - 우측 추천 여행지, 추천 코스, 좌측 장바구니
![image](https://user-images.githubusercontent.com/80162233/163350586-337ef9ba-3351-495c-8a79-18a88580c624.png)

#### 최단루트 생성 - 장바구니에 있는 여행지 최단 루트 생성
![image](https://user-images.githubusercontent.com/80162233/163350643-33f35d74-0ae6-497b-9546-ae92460129a6.png)

#### 여행계획 공유 - 이메일로 공유
![image](https://user-images.githubusercontent.com/80162233/163350665-20f6270e-059a-4986-a8b6-0ec402c51b2b.png)
![image](https://user-images.githubusercontent.com/80162233/163350746-7c166ef8-bc6d-43de-a98b-1d390b9b2f38.png)




