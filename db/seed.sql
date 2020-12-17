--  account
INSERT INTO account (id, email, password, created_at, updated_at)
VALUES ('1', '1@passenger.com', '1', '2020-12-16 16:22:49', '2020-12-16 16:22:49');
INSERT INTO account (id, email, password, created_at, updated_at)
VALUES ('2', '2@passenger.com', '1', '2020-12-16 16:29:16', '2020-12-16 16:29:16');
INSERT INTO account (id, email, password, created_at, updated_at)
VALUES ('3', '1@driver.com', '1', '2020-12-16 16:29:16', '2020-12-16 16:29:16');

--  dispatch
INSERT INTO dispatch (id, passenger_id, passenger_location, driver_id, driver_location, created_at, updated_at)
VALUES ('1', '1', '서울시 강남구 역삼동
', null, null, '2020-12-16 16:30:52', '2020-12-16 16:30:52');
INSERT INTO dispatch (id, passenger_id, passenger_location, driver_id, driver_location, created_at, updated_at)
VALUES ('2', '2', '경기도 수원시 팔달구
', null, null, '2020-12-16 16:30:52', '2020-12-16 16:30:52');

--  driver
INSERT INTO driver (id, account_id, created_at, updated_at)
VALUES ('1', 3, '2020-12-16 16:29:45', '2020-12-16 16:29:45');

--  passenger
INSERT INTO passenger (id, account_id, created_at, updated_at)
VALUES ('1', 1, '2020-12-16 16:30:03', '2020-12-16 16:30:03');
INSERT INTO passenger (id, account_id, created_at, updated_at)
VALUES ('2', 2, '2020-12-16 16:30:08', '2020-12-16 16:30:08');
