# Migration `20200930100619-add-susbcription-paused-flag`

This migration has been generated by Simon Knott at 9/30/2020, 12:06:19 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
DROP INDEX "public"."User.id_unique"

ALTER TABLE "public"."User" ADD COLUMN "subscriptionPaused" boolean   NOT NULL DEFAULT false
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200930100228..20200930100619-add-susbcription-paused-flag
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgres"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -23,10 +23,11 @@
   isActive Boolean @default(true)
   hasBeenWarnedAboutOverage Boolean @default(false)
-  id             String  @unique @id @default(uuid())
-  subscriptionId String? @unique
+  id                    String  @id @default(uuid())
+  subscriptionId        String? @unique
+  subscriptionPaused    Boolean @default(false)
   subscriptionUpdateURL String?
   subscriptionCancelURL String?
   freeInvocations Int @default(100)
@@ -34,9 +35,9 @@
   projects Project[]
 }
 model Session {
-  id                 Int       @default(autoincrement()) @id
+  id                 Int       @id @default(autoincrement())
   createdAt          DateTime  @default(now())
   updatedAt          DateTime  @updatedAt
   expiresAt          DateTime?
   handle             String    @unique
```


