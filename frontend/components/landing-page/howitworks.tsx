import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "./icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "AI Tutoring",
    description:
      "Our advanced AI technology helps students study more effectively by providing personalized AI tutors and study plans. With quantaIQ, you can maximize your learning potential and chieve academix success like never before.",
  },
  {
    icon: <MapIcon />,
    title: "Personalized Testing",
    description:
      "At quantaIQ, our platform enables teachers to create personalized tests for students, allowing for a more tailered learning experience. Say goodbye to generic tests and hello to assessments that cater to individual needs.",
  },
  {
    icon: <PlaneIcon />,
    title: "All in One Classroom",
    description:
      "quantaIQ brings your classes together in one convinient place, making it easier than ever to stay organized and focused. From materials to class schedules, everything you need is just a click away.",
  },
  {
    icon: <GiftIcon />,
    title: "Teachers are Welcome",
    description:
      "Here at quantaIQ, we want to work with teachers to create tests with ease, customizable to each student, provide automatic grading while managing all courses in one spot.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        What{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          quantaIQ{" "}
        </span>
        can Offer You
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Explore the versatile features that quantaIQ has to offer, and how it can help you in your journey.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};