CREATE TABLE `contactFormRateLimits` (
	`id` int AUTO_INCREMENT NOT NULL,
	`ipAddress` varchar(45) NOT NULL,
	`submissionCount` int NOT NULL DEFAULT 1,
	`windowStart` timestamp NOT NULL DEFAULT (now()),
	`lastSubmission` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contactFormRateLimits_id` PRIMARY KEY(`id`)
);
