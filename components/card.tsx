"use client";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@heroui/react";
import { useEffect, useState } from "react";

interface Data {
  name?: string;
  number: string;
  iban: string;
}

interface Bank {
  id: number;
  bank: string;
  bin: string;
  logo: string;
  to: string;
  from: string;
}

export default function CardBank({ name, iban, number }: Data) {
  const [banks, setBanks] = useState<Bank[]>([]);
  const [matchedBank, setMatchedBank] = useState<Bank | null>(null);

  useEffect(() => {
    fetch("/bank-name.json")
      .then((res) => res.json())
      .then((data) => {
        setBanks(data);

        const binCardNumbers = number.slice(0, 6);

        const bank = data.find((b: Bank) => b.bin === binCardNumbers);

        if (bank) {
          setMatchedBank(bank);
        }
      })
      .catch((err) => console.error(err));
  }, [number]);

  return (
    <div className="w-full font-vazir">
      {matchedBank && (
        <Card
          className="w-auto max-w-xl h-auto py-2 rounded-2xl backdrop-blur-lg m-auto"
          style={{
            background: `linear-gradient(to bottom right, ${matchedBank.from}CC, ${matchedBank.to}CC)`,
            boxShadow: `0 8px 20px ${matchedBank.from}20, 0 4px 12px ${matchedBank.to}55`,
          }}
        >
          <div className="absolute inset-0  " /> {/* لایه شفاف */}
          <CardHeader className="w-full flex gap-3">
            <Image height={40} radius="sm" src={matchedBank.logo} width={40} />
          </CardHeader>
          <Divider />
          <CardBody className="flex flex-col items-center justify-center text-2xl">
            <div className="text-[16px] font-light tracking-widest text-gray-">
              IR {iban}
            </div>
            <div
              className=" text-xl tracking-widest flex justify-center gap-4 font-vazir  "
              style={{ direction: "ltr" }}
            >
              {number
                .match(/.{1,4}/g)
                ?.map((chunk, index) => <span key={index}>{chunk}</span>)}
            </div>
          </CardBody>
          <CardFooter className="flex items-center justify-between">
            <Link
              isExternal
              showAnchorIcon
              className="text-sm"
              color="success"
              href="https://gecut.ir"
            >
              Gecut
            </Link>{" "}
            <span className="text-sm text-white">{name}</span>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
