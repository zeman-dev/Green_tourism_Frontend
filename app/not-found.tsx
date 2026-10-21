
import { Metadata } from "next";


const title = "404 - Page not found | NoteHub";
const description = "Sorry, the page you are looking for does not exist.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://notehub.com/404",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub page not found",
      },
    ],
  },
};

const NotFound = () => {

    return (
        <>
        <h1 className={title}>404 - Page not found</h1>
        <p className={description}>Sorry, the page you are looking for does not exist.</p>
        </>
    );
};

export default NotFound;