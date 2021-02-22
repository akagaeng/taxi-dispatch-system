# Brief api spec

## Auth

### Join (Sign up)

* [POST] /auth/join
  - [x] params(body): email, password, role ('passenger' or 'driver')
    * email
    * password
    * role: 'passenger' or 'driver'

### Login (Sign in)

* [POST] /auth/login
  - [x] params(body): login with email and password
    * email
    * password

## Dispatch

### Dispatch list
- [x] [GET] /dispatch

  * Description:
    - [x] list all
    - [x] display finished and waiting
  * Status (status: 'waiting' (= requested) or 'finished')
    - [x] display requested_at and finished_at
  * params(query string)
    - [x] filter dispatch completion
    - [x] pagination (limit, page)
  - [x] order: requested_at desc (from recent)

  ### Request for dispatch from passengers
  * [POST] /dispatch
  - [x] only whose role is passenger can request
  * params(body)
    - [x] passenger_location: up to 100 byte long string

  ### Approve for dispatch from driver (Update for dispatch state)
  * [PUT] /dispatch/:id
    * id = dispatch.id
  * Description: 
    - [x] only whose role is driver can request
    - [x] up to 1 driver for 1 dispatch request
  * params(body)
    - [x] driver_location: up to 100 byte long string
    - [x] update status: waiting -> finished
    - [x] update finished_at, updated_at
    - [x] update driver_id (shown when re-issue the jwt)
