/**
 * Renders the page with a message indicating that no board is selected.
 *
 * @return {JSX.Element} The rendered page with the message.
 */
export default async function page() {
  return (
    <section className="flex flex-col items-center justify-center space-y-5 h-full w-full">
      <h1 className="text-center opacity-70">
        No board selected. Create a new board or select a board to get started
      </h1>
    </section>
  );
}
