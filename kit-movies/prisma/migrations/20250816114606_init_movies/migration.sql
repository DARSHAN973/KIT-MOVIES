-- CreateTable
CREATE TABLE `Movie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `year` VARCHAR(191) NULL,
    `duration` VARCHAR(191) NULL,
    `genre` VARCHAR(191) NULL,
    `rating` VARCHAR(191) NULL,
    `image` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NULL,
    `type` VARCHAR(191) NULL,         
    `actors` VARCHAR(191) NULL,
    `actresses` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
