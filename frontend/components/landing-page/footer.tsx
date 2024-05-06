import Image from "next/image";

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <a
            rel="noreferrer noopener"
            href="/"
            className="font-bold text-xl flex"
          >
            <Image src="/assets/atomic.png" className="w-8 h-auto block dark:hidden" alt="logo" width={100} height={100} />
            <Image src="/assets/atomic-white.png" className="w-8 h-auto hidden dark:block" alt="logo" width={100} height={100} />
                              
            quantaIQ
          </a>
        </div>


      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; 2024 Landing page made by{" "}

            quantaIQ
        </h3>
      </section>
    </footer>
  );
};