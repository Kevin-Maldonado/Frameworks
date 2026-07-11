-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "academic";

-- CreateEnum
CREATE TYPE "academic"."Role" AS ENUM ('STUDENT', 'MENTOR');

-- CreateEnum
CREATE TYPE "academic"."Status" AS ENUM ('PENDING', 'ACCEPTED', 'CANCELLED');

-- CreateTable
CREATE TABLE "academic"."users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "academic"."Role" NOT NULL DEFAULT 'STUDENT',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic"."categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "academic"."mentorships" (
    "id" SERIAL NOT NULL,
    "scheduled_at" TIMESTAMP(3) NOT NULL,
    "status" "academic"."Status" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "student_id" INTEGER NOT NULL,
    "mentor_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "mentorships_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "academic"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "academic"."categories"("name");

-- AddForeignKey
ALTER TABLE "academic"."mentorships" ADD CONSTRAINT "mentorships_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "academic"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic"."mentorships" ADD CONSTRAINT "mentorships_mentor_id_fkey" FOREIGN KEY ("mentor_id") REFERENCES "academic"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "academic"."mentorships" ADD CONSTRAINT "mentorships_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "academic"."categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
