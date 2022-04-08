# 포팅 메뉴얼

## **1) 사용한 기술 스택 및 버전**

---

### OS

- Ubuntu `20.04`

### Frontend

- FrameWork
    - React `17.0.1`
    - Redux  `4.1.2`
    - React-router-dom `6.0.2`
    - MUI `5.5.2`
    - axios `0.26.1`

### Backend

- Framework
    - JVM Open JDK `11.0.14.1`
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

## 2) 빌드 / 배포 / 데이터베이스 관련 

---

### **FrontEnd**

*>* 로컬에서 ```npm run build``` 명령어를 통해 React 프로젝트를 빌드하였습니다.

**빌드 파일 적용 방법**

**1.** NGINX 설정에 작성한 위치에 파일 옮기기.

**2.** ```sudo service nginx restart``` 명령어로 nginx 재시작

### **BackEnd**

*>* 로컬에서 jar 파일로 빌드하였습니다.

**백엔드 서버 실행 방법**

```jsx
# 서버 실행 명령어

java -jar 파일명.jar

# 데몬 형태로 백그라운드에서 실행 명령어

nohup java -jar 파일명.jar
```

### **DATABASE 설정**

*>* ID: root

*>*

*>* PW: b203

*>*

*>* DB명 : trou

**## NGINX 설정**

*>* Nginx의 리버스 프록시 기능을 사용해 프론트와 백엔드 요청을 처리했습니다.

**#### /etc/nginx/sites-available/default**
```
server {
	listen 80 default_server;
	listen [::]:80 default_server;

	root /home/trou-web/build;

	index index.html index.htm index.nginx-debian.html;

	server_name j6b203.p.ssafy.io;

	location / {
 		try_files $uri /index.html;
	}

	location /api/ {
		proxy_pass  http://j6b203.p.ssafy.io:8080/;
	}
	location /recommand {
		proxy_pass  http://j6b203.p.ssafy.io:8000;
	}
	

}
```

## **3) 시연 시나리오**
#### 회원가입시 선호 여행지 서택
![image](/uploads/ed16febf6e07486ee8a80f9b8bcaa9d8/image.png)

#### 메인페이지 추천 여행지 화면
![image](/uploads/63bacaad5ed142b06e496b013eda06c3/image.png)

#### 여행 계획 세우기 - 우측 추천 여행지, 추천 코스, 좌측 장바구니
![image](/uploads/bbb4344cf19a149792a1763991c0836b/image.png)

#### 최단루트 생성 - 장바구니에 있는 여행지 최단 루트 생성
![image](/uploads/57e2f1a5fea6e36ba0ce20ee44c9439e/image.png)

#### 여행계획 공유 - 이메일로 공유
![image](/uploads/d5bb96830cd3bbb82cef881516715676/image.png)
![image](/uploads/d57b040effd5f4ab9bcdae7326af8947/image.png)

