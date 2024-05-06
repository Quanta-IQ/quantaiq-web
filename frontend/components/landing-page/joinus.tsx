import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import  Link from "next/link";

export const Newsletter = () => {


  return (
    <section id="newsletter">
      <hr className="w-11/12 mx-auto" />

      <div className="container py-24 sm:py-32">
        <h3 className="text-center text-4xl md:text-5xl font-bold">
          Join{" "}
          <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
            quantaIQ
          </span>
        </h3>
        <p className="text-xl text-muted-foreground text-center mt-4 mb-8">
          Take the next step to level up your classroom experience.
        </p>

        <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-50">
          <Link href="/sign-up">
          <Button className="w-full md:w-10/30">Join Us</Button>
          </Link>
          </div>
      </div>

      <hr className="w-11/12 mx-auto" />
    </section>
  );
};