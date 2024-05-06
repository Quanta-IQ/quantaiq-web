import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TestimonialProps {
  image: string;
  name: string;
  userName: string;
  comment: string;
}

const testimonials: TestimonialProps[] = [
  {
    image: "https://media.licdn.com/dms/image/D5603AQGd3lq2zqxR6A/profile-displayphoto-shrink_800_800/0/1676359917729?e=1720656000&v=beta&t=2qAqhZdZCRTuSx4VAuUZjDfW8rQRI6EpByDmLhB-qBs",
    name: "Charles Calapini",
    userName: "@thePipsAI",
    comment: "This is going to make EI almost uneccessary, I had my own tutor in my room!",
  },
  {
    image: "https://media.licdn.com/dms/image/D5603AQExljljEOqnTg/profile-displayphoto-shrink_100_100/0/1696917163747?e=1720656000&v=beta&t=2z85mSWZMwwTuouV0tsenQxKNhQk2KRQlT9oD4KN8us",
    name: "Noah Harper",
    userName: "@known_as_noah",
    comment:
      "The only reason I am passing ECE is because of quantaIQ!",
  },

  {
    image: "https://media.licdn.com/dms/image/D4E03AQFb3ji1n5g_IQ/profile-displayphoto-shrink_100_100/0/1706745499858?e=1720656000&v=beta&t=yfaG-5UciFDbURt9lsATMoF6_gmDB7AjAc2O-5kkO7E",
    name: "Sean Andres",
    userName: "@smandres",
    comment:
      "This gave me the summary of all of my textbooks, not that I read them answay!",
  },
  {
    image: "https://scontent-den2-1.cdninstagram.com/v/t51.2885-19/273948571_1342621592818121_8293940397281879619_n.jpg?stp=dst-jpg_s320x320&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_cat=105&_nc_ohc=JDyG9fqGKFoQ7kNvgFeb4XZ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfAis1gRvqcnQiE734KgmKBu7-SGCen22TI5un7g1pc30A&oe=663E547F&_nc_sid=8b3546",
    name: "Andre Birkner",
    userName: "@andreblob",
    comment:
      "It even knows 中文!",
  },
  {
    image: "hhttps://scontent-den2-1.cdninstagram.com/v/t51.2885-19/440732334_2131860763839852_5234969168400999966_n.jpg?_nc_ht=scontent-den2-1.cdninstagram.com&_nc_cat=100&_nc_ohc=uxPz_ihH5ooQ7kNvgEYPR3O&edm=AEhyXUkBAAAA&ccb=7-5&oh=00_AfC7FT60AT3Ehyl8EDao9jLqOicJHxdhER-2ntjtxKNXfA&oe=663E60BE&_nc_sid=cf751b",
    name: "Lim Lorz",
    userName: "@jim.lorz",
    comment:
      "As an international student, this is a game changer!",
  },
  {
    image: "https://scontent-den2-1.cdninstagram.com/v/t51.2885-19/410179285_3378037105820647_6224536502510810550_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent-den2-1.cdninstagram.com&_nc_cat=107&_nc_ohc=5gi1EZvfOwcQ7kNvgERRIpj&edm=AEhyXUkBAAAA&ccb=7-5&oh=00_AfDFihfYMP987IIfnYZMK1XehzmTnB8R9JfDFuEnWjscCA&oe=663E586D&_nc_sid=cf751b",
    name: "Ruel Biniahan",
    userName: "@bins.010",
    comment:
      "This makes all the difference in the world, especially as someone whose second language is English!",
  },
];

export const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold">
        Discover Why
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          {" "}
          People Love{" "}
        </span>
        quantaIQ
      </h2>

      <p className="text-xl text-muted-foreground pt-4 pb-8">
        Get to know what our users think about quantaIQ, with absolutely no bias.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:block columns-2  lg:columns-3 lg:gap-6 mx-auto space-y-4 lg:space-y-6">
        {testimonials.map(
          ({ image, name, userName, comment }: TestimonialProps) => (
            <Card
              key={userName}
              className="max-w-md md:break-inside-avoid overflow-hidden"
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <Avatar>
                  <AvatarImage
                    alt=""
                    src={image}
                  />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <CardTitle className="text-lg">{name}</CardTitle>
                  <CardDescription>{userName}</CardDescription>
                </div>
              </CardHeader>

              <CardContent>{comment}</CardContent>
            </Card>
          )
        )}
      </div>
    </section>
  );
};