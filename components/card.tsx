import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@heroui/react";

interface Data {
  name: string;
  number: string;
  iban: string;
}

export default function CardBank({ name, iban, number }: Data) {
  return (
    <Card className="w-[28rem] h-60  backdrop-blur-lg bg-black/20">
      <CardHeader className=" w-full flex gap-3">
        <Image
          alt="heroui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-row items-center justify-center text-2xl">
        <div className="bg-gray-100/10 backdrop-blur-lg text-white rounded-xl p-4 w-80 shadow-lg text-center font-mono">
          <div className="text-xl tracking-widest flex justify-center gap-2">
            {number}
          </div>
          <div>{iban}</div>
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
        </Link>
        <span className="text-sm">{name}</span>
      </CardFooter>
    </Card>
  );
}
