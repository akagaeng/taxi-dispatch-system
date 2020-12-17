# Brief api spec

## Auth

### 회원가입

* [POST] /auth/join
  * params(body): 이메일, 비밀번호, 승객/기사 여부
    * email
    * password
    * role: 'passenger' or 'driver'

### 로그인

* [POST] /auth/login
  * params(body): 이메일, 비밀번호를 이용해 로그인
    * email
    * password

## Dispatch (배차)

### 배차 목록 조회
* [GET] /dispatch
  * 내용:
    * 전체 목록 응답
    * 배치완료, 대기목록 모두 표시
    * 상태 표시 (status: 'waiting' (= requested) or 'finished')
    * 배차 요청시간(requested_at) 및 배차완료시간(finished_at) 표시
  * params(query string)
    * 배치 상태(완료 여부)에 따른 필터
    * pagination
  * order: requested_at desc
  
  ### 승객의 택시 배차 요청
  * [POST] /dispatch
  * params(body)
    * 승객의 요청시 주소 (passenger_location) 100자 이내 string
  
  ### 기사의 배차 승인 (배차 상태 업데이트)
  * [PUT] /dispatch
  * 내용: 
    * 하나의 배차 요청에는 최대 1명의 기사만 배차될 수 있음
  * params(body)
    * 택시의 현재 주소 (driver_location) 100자 이내 string
 