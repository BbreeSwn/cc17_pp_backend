-- AlterTable
ALTER TABLE `activity` ADD COLUMN `detail` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `postcontent` ADD COLUMN `cover_image` VARCHAR(191) NULL,
    ADD COLUMN `title` VARCHAR(191) NULL;
