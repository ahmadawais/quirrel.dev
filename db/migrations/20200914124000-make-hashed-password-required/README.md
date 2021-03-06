# Migration `20200914124000-make-hashed-password-required`

This migration has been generated by Simon Knott at 9/14/2020, 2:40:00 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"email" text   NOT NULL ,
"hashedPassword" text   NOT NULL ,
"isActive" boolean   NOT NULL DEFAULT true,
"id" text   NOT NULL ,
"subscriptionId" text   ,
"defaultPaymentMethodId" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Session" (
"id" SERIAL,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"updatedAt" timestamp(3)   NOT NULL ,
"expiresAt" timestamp(3)   ,
"handle" text   NOT NULL ,
"userId" text   ,
"hashedSessionToken" text   ,
"antiCSRFToken" text   ,
"publicData" text   ,
"privateData" text   ,
PRIMARY KEY ("id")
)

CREATE TABLE "public"."Project" (
"slug" text   NOT NULL ,
"createdAt" timestamp(3)   NOT NULL DEFAULT CURRENT_TIMESTAMP,
"ownerId" text   NOT NULL ,
"isActive" boolean   NOT NULL DEFAULT true,
PRIMARY KEY ("ownerId","slug")
)

CREATE TABLE "public"."Token" (
"projectSlug" text   NOT NULL ,
"projectOwnerId" text   NOT NULL ,
"name" text   NOT NULL ,
"isActive" boolean   NOT NULL DEFAULT true,
PRIMARY KEY ("projectSlug","projectOwnerId","name")
)

CREATE TABLE "public"."UsageRecord" (
"tokenProjectOwnerId" text   NOT NULL ,
"tokenProjectSlug" text   NOT NULL ,
"tokenName" text   NOT NULL ,
"timestamp" timestamp(3)   NOT NULL ,
"invocations" integer   NOT NULL ,
PRIMARY KEY ("tokenProjectSlug","tokenName","timestamp","tokenProjectOwnerId")
)

CREATE UNIQUE INDEX "User.email_unique" ON "public"."User"("email")

CREATE UNIQUE INDEX "User.id_unique" ON "public"."User"("id")

CREATE UNIQUE INDEX "User.subscriptionId_unique" ON "public"."User"("subscriptionId")

CREATE UNIQUE INDEX "User.defaultPaymentMethodId_unique" ON "public"."User"("defaultPaymentMethodId")

CREATE UNIQUE INDEX "Session.handle_unique" ON "public"."Session"("handle")

ALTER TABLE "public"."Session" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE

ALTER TABLE "public"."Project" ADD FOREIGN KEY ("ownerId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."Token" ADD FOREIGN KEY ("projectSlug", "projectOwnerId")REFERENCES "public"."Project"("slug","ownerId") ON DELETE CASCADE ON UPDATE CASCADE

ALTER TABLE "public"."UsageRecord" ADD FOREIGN KEY ("tokenProjectSlug", "tokenName", "tokenProjectOwnerId")REFERENCES "public"."Token"("projectSlug","name","projectOwnerId") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200914082122-deactive-tokens..20200914124000-make-hashed-password-required
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
@@ -15,9 +15,9 @@
 model User {
   createdAt      DateTime  @default(now())
   updatedAt      DateTime  @updatedAt
   email          String    @unique
-  hashedPassword String?
+  hashedPassword String
   sessions       Session[]
   isActive       Boolean @default(true)
```


