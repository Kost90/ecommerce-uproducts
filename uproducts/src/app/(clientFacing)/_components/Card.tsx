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
  description: string;
  className?: string;
  imageHeigth?: string;
}

function CardComponent({ ...props }: IProps) {
  const { name, price, picture, description, className, imageHeigth } = props;
  return (
    <Card
      className={`hover:border-sky-600 cursor-pointer w-full h-full flex flex-col items-start justify-around p-2 ${className}`}
    >
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className={`flex flex-col ${imageHeigth}`}>
        <div className={`relative ${imageHeigth}`}>
          <Image
            src={picture}
            alt={`picture_of_${name}`}
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex gap-4">
        <CardTitle className="text-foreground">{price}</CardTitle>
        <Button className="bg-sky-500 rounded-lg h-8">Add</Button>
      </CardFooter>
    </Card>
  );
}

export default CardComponent;
