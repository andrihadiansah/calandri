export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="p-4 top-14">
      <header className="flex flex-col ">
        <h3>Meetings</h3>
        <p>
          See upcoming and past events booked through your event type links.
        </p>
        <nav className="w-full flex">
          <a href="/meetings/upcoming" className="">
            Upcoming
          </a>
          <a href="/meetings/unconfirmed" className="">
            Unconfirmed
          </a>
          <a href="/meetings/past" className="">
            Past
          </a>
          <a href="/meetings/canceled" className="">
            Canceled
          </a>
        </nav>
      </header>
      <main>{children}</main>
    </section>
  );
}
