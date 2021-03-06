# Migration `20200914082122-deactive-tokens`

This migration has been generated by Simon Knott at 9/14/2020, 10:21:22 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "public"."Project" ADD COLUMN "isActive" boolean   NOT NULL DEFAULT true

ALTER TABLE "public"."Token" ADD COLUMN "isActive" boolean   NOT NULL DEFAULT true

ALTER TABLE "public"."User" ADD COLUMN "isActive" boolean   NOT NULL DEFAULT true
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200914075938-init..20200914082122-deactive-tokens
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
@@ -18,8 +18,10 @@
   email          String    @unique
   hashedPassword String?
   sessions       Session[]
+  isActive       Boolean @default(true)
+
   id                     String  @unique @id
   subscriptionId         String? @unique
   defaultPaymentMethodId String? @unique
@@ -46,8 +48,10 @@
   owner     User     @relation(fields: [ownerId], references: [id])
   ownerId   String
   tokens    Token[]
+  isActive  Boolean @default(true)
+
   @@id([ownerId, slug])
 }
 model Token {
@@ -55,8 +59,10 @@
   projectOwnerId String
   project        Project @relation(fields: [projectSlug, projectOwnerId], references: [slug, ownerId])
   name           String
+  isActive       Boolean @default(true)
+
   UsageRecord UsageRecord[]
   @@id([projectSlug, projectOwnerId, name])
 }
```


