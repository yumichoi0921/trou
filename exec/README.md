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

## 2) 빌드 과정

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
