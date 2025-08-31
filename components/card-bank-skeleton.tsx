"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Skeleton,
} from "@heroui/react";

export default function CardBankSkeleton() {
  return (
    <Card className="w-80 max-w-xl h-auto py-2 rounded-2xl backdrop-blur-lg m-auto">
      <CardHeader className="w-full flex gap-3">
        <Skeleton className="h-10 w-10 rounded-sm" />
        <Skeleton className="h-6 w-24 rounded-lg" />
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col items-center justify-center gap-4">
        <Skeleton className="h-5 w-40 rounded-lg" />
        <div className="flex justify-center gap-4 w-full">
          <Skeleton className="h-8 w-12 rounded-lg" />
          <Skeleton className="h-8 w-12 rounded-lg" />
          <Skeleton className="h-8 w-12 rounded-lg" />
          <Skeleton className="h-8 w-12 rounded-lg" />
        </div>
      </CardBody>
      <CardFooter className="flex items-center justify-between">
        <Skeleton className="h-5 w-16 rounded-lg" />
        <Skeleton className="h-5 w-20 rounded-lg" />
      </CardFooter>
    </Card>
  );
}
