
ALTER TABLE "AppRoles"
	DROP CONSTRAINT "AppRoles_appId_roleId_key";

ALTER TABLE "AppRoles"
	DROP CONSTRAINT "AppRoles_RoleId_fkey";

ALTER TABLE "AppRoles"
	DROP COLUMN "roleId",
	DROP COLUMN "RoleId",
	ADD COLUMN name character varying(255),
	ADD COLUMN description character varying(255);

ALTER TABLE "AppRoles"
	ADD CONSTRAINT "AppRoles_appId_name_key" UNIQUE ("appId", name);
