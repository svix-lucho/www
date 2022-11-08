import * as React from "react";
import NextImage from "next/image";
import Link from "next/link";

export type ServiceLogo = {
  img?: any;
  imgAspectRatio: {
    width: number;
    height: number;
  };
  company: string;
  link: string;
};

interface LogoProps {
  testimonials: ServiceLogo[];
}

export default function LogoWall(props: LogoProps) {
  const logos = props.testimonials;

  return (
    <div>
      <div className="flex wrap w-full justify-evenly flex-wrap gap-x-8 md:gap-x-12 gap-y-8">
        {logos.map((item) => (
          <React.Fragment key={item.company}>
            <Link className="max-w-[140px] w-full" href={item.link}>
              <NextImage
                className="mx-auto filter grayscale w-auto h-6 md:h-7"
                src={item.img}
                height={item.imgAspectRatio.height}
                width={item.imgAspectRatio.width}
                alt={item.company}
                title={item.company}
              />
            </Link>
          </React.Fragment>
        ))}
      </div>
      <div className="text-center text-lg pt-12">
        Standard Webhooks compatible?{" "}
        <Link
          className="underline"
          href="https://github.com/standard-webhooks/standard-webhooks/issues/new"
        >
          Contact us
        </Link>{" "}
        to add your logo.
      </div>
    </div>
  );
}
