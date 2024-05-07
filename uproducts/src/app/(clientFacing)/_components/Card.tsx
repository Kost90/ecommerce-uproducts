import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface IProps {
  name: string;
  price: string;
  picture: string;
}

function CardComponent({ ...props }: IProps) {
  const { name, price, picture } = props;
  return (
    <Card className="hover:border-sky-600 cursor-pointer w-full h-full flex flex-col items-start justify-around">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <Image
          src={picture}
          alt={`picture_of_${name}`}
          layout="responsive"
          width={500}
          height={700}
        />
        <CardDescription>Some description of product</CardDescription>
      </CardContent>
      <CardFooter className="flex gap-4">
        <CardTitle className="text-foreground">{price}</CardTitle>
        <Button className="bg-sky-500 rounded-lg h-8">Add</Button>
      </CardFooter>
    </Card>
  );
}

export default CardComponent;
