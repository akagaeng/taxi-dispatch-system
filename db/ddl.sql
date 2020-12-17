CREATE TABLE `account`
(
    `id`         varchar(36) PRIMARY KEY,
    `email`      varchar(255) NOT NULL,
    `password`   varchar(100) NOT NULL,
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `passenger`
(
    `id`         varchar(36) PRIMARY KEY,
    `account_id` varchar(36) NOT NULL,
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
    FOREIGN KEY (`id`) REFERENCES `dispatch` (`passenger_id`)
);

CREATE TABLE `driver`
(
    `id`         varchar(36) PRIMARY KEY,
    `account_id` varchar(36) NOT NULL,
    `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
    FOREIGN KEY (`id`) REFERENCES `dispatch` (`driver_id`)

);

CREATE TABLE `dispatch`
(
    `id`                 varchar(36) PRIMARY KEY,
    `passenger_id`       varchar(36)  NOT NULL,
    `passenger_location` varchar(100) NOT NULL,
    `driver_id`          varchar(36),
    `driver_location`    varchar(100),
    `created_at`         timestamp DEFAULT CURRENT_TIMESTAMP,
    `updated_at`         timestamp DEFAULT CURRENT_TIMESTAMP
);

