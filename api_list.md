# Brief api spec

## Auth

### 회원가입

* [POST] /auth/join
  - [x] params(body): 이메일, 비밀번호, 승객/기사 여부
    * email
    * password
    * role: 'passenger' or 'driver'

### 로그인

* [POST] /auth/login
  - [x]params(body): 이메일, 비밀번호를 이용해 로그인
    * email
    * password

## Dispatch (배차)

### 배차 목록 조회
- [x] [GET] /dispatch

  * 내용:
    - [x] 전체 목록 응답
    - [x] 배치완료, 대기목록 모두 표시
  * 상태 표시 (status: 'waiting' (= requested) or 'finished')
    - [x] 배차 요청시간(requested_at) 및 배차완료시간(finished_at) 표시
  * params(query string)
    - [x] 배치 상태(완료 여부)에 따른 필터
    - [x] pagination (limit, page)
  - [x] order: requested_at desc (최근 목록부터)

  ### 승객의 택시 배차 요청
  * [POST] /dispatch
  - [x] role이 승객(passenger)인 경우에만 요청 가능
  * params(body)
    - [x] 승객의 요청시 주소 (address - passenger_location) 100자 이내 string

  ### 기사의 배차 승인 (배차 상태 업데이트)
  * [PUT] /dispatch/:id
    
    * id = dispatch.id
  * 내용: 
    - [x] role이 기사(driver)인 경우에만 요청 가능
    - [x] 하나의 배차 요청에는 최대 1명의 기사만 배차될 수 있음
  * params(body)
    - [x] 택시의 현재 주소 (address - driver_location) 100자 이내 string
    - [x] status: waiting -> finished 업데이트
    - [x] finished_at, updated_at 업데이트
    - [x] driver_id 업데이트-> 로그인후에 다시 봐야 함
