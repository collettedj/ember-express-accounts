
DROP TABLE "SequelizeMeta";

ALTER TABLE "Users"
	DROP COLUMN "testField1",
	DROP COLUMN "testField2",
	DROP COLUMN "testField3",
	DROP COLUMN "testField4",
	DROP COLUMN "testField5";
