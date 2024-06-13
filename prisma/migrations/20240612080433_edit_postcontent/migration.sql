-- AlterTable
ALTER TABLE `postcontent` ADD COLUMN `description` VARCHAR(256) NULL,
    MODIFY `messageText` LONGTEXT NULL;
