/*
  Warnings:

  - Added the required column `catagorie_id` to the `PostContent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `postcontent` ADD COLUMN `catagorie_id` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Catagories` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `catagory_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PostContent` ADD CONSTRAINT `PostContent_catagorie_id_fkey` FOREIGN KEY (`catagorie_id`) REFERENCES `Catagories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
